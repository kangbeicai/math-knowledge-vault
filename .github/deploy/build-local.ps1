[CmdletBinding()]
param(
    [string]$BuildRoot = (Join-Path ([IO.Path]::GetTempPath()) 'math-vault-route-a-build')
)

$ErrorActionPreference = 'Stop'
$builderCommit = '54cdc975bfad38ccd60244430afecc511d4592e1'
$pnpmVersion = '9.15.9'
$builderArchiveUrl = "https://codeload.github.com/LincZero/LincZero.github.io/zip/$builderCommit"
$vaultRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
$resolvedBuildRoot = [IO.Path]::GetFullPath($BuildRoot)

if (-not $resolvedBuildRoot.StartsWith($tempRoot, [StringComparison]::OrdinalIgnoreCase)) {
    throw "BuildRoot must stay inside the temporary directory: $tempRoot"
}

if ($resolvedBuildRoot -eq $tempRoot) {
    throw 'BuildRoot cannot be the temporary directory itself.'
}

$archivePath = Join-Path $resolvedBuildRoot 'builder.zip'
$extractRoot = Join-Path $resolvedBuildRoot 'builder-source'
$siteRoot = Join-Path $resolvedBuildRoot 'site'

if (Test-Path -LiteralPath $resolvedBuildRoot) {
    Remove-Item -LiteralPath $resolvedBuildRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $resolvedBuildRoot | Out-Null
Invoke-WebRequest -Uri $builderArchiveUrl -OutFile $archivePath -Headers @{'User-Agent' = 'math-knowledge-vault-builder'}
Expand-Archive -LiteralPath $archivePath -DestinationPath $extractRoot -Force

$builderSource = Get-ChildItem -LiteralPath $extractRoot -Directory | Select-Object -First 1
if (-not $builderSource) {
    throw 'The downloaded builder archive did not contain a directory.'
}

Copy-Item -LiteralPath $builderSource.FullName -Destination $siteRoot -Recurse

$siteSrc = Join-Path $siteRoot 'src'
Get-ChildItem -LiteralPath $siteSrc -Force |
    Where-Object Name -ne '.vuepress' |
    Remove-Item -Recurse -Force

$excludedRootItems = @('.git', '.github', '.obsidian', '.agents', '.codex', '.trash')
Get-ChildItem -LiteralPath $vaultRoot -Force |
    Where-Object Name -notin $excludedRootItems |
    Copy-Item -Destination $siteSrc -Recurse -Force

Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'config_cover.js') -Destination (Join-Path $siteSrc '.vuepress\config_cover.js') -Force
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'theme_cover.js') -Destination (Join-Path $siteSrc '.vuepress\theme_cover.js') -Force
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'git_config.local.json') -Destination (Join-Path $siteRoot 'scripts\git_config.json') -Force

$corepack = (Get-Command corepack -ErrorAction Stop).Source
& $corepack prepare "pnpm@$pnpmVersion" --activate
if ($LASTEXITCODE -ne 0) { throw "Unable to prepare pnpm $pnpmVersion" }

Push-Location $siteRoot
try {
    & $corepack pnpm install --frozen-lockfile
    if ($LASTEXITCODE -ne 0) { throw "pnpm install failed with exit code $LASTEXITCODE" }

    & $corepack pnpm run gen-config
    if ($LASTEXITCODE -ne 0) { throw "Configuration generation failed with exit code $LASTEXITCODE" }

    $env:NODE_OPTIONS = '--max_old_space_size=20480'
    & $corepack pnpm run docs:build
    if ($LASTEXITCODE -ne 0) { throw "VuePress build failed with exit code $LASTEXITCODE" }
}
finally {
    Pop-Location
}

$distPath = Join-Path $siteRoot 'src\.vuepress\dist'
Write-Output "Build completed: $distPath"
