import fs from "node:fs"
import path from "node:path"

const siteRoot = path.resolve(process.argv[2] ?? "site")
const clientConfigPath = path.join(
  siteRoot,
  "src/.vuepress/plugins/AnyBlock/client/clientConfig.ts",
)

if (!fs.existsSync(clientConfigPath)) {
  throw new Error(`Pinned builder client config not found: ${clientConfigPath}`)
}

const importLine = 'import "../../../search-client-config.js"\n'
const importMarker =
  "import { defineClientConfig, usePageData } from 'vuepress/client'\n"

const source = fs.readFileSync(clientConfigPath, "utf8")

if (source.includes(importLine.trim())) {
  console.log("VuePress search client config is already injected.")
} else {
  if (!source.includes(importMarker)) {
    throw new Error(
      "Pinned builder changed: unable to locate the AnyBlock client import marker.",
    )
  }

  fs.writeFileSync(
    clientConfigPath,
    source.replace(importMarker, `${importMarker}${importLine}`),
    "utf8",
  )
  console.log("Injected Chinese SlimSearch client configuration.")
}
