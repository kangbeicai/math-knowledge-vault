export const userConfig2 = {
  locales: {
    "/": {
      lang: "zh-CN",
      title: "数学知识库",
      description: "面向理解、练习与应用的数学知识网络",
    },
  },
  pagePatterns: [
    "**/*.md",
    "!**/*.snippet.md",
    "**/*.json",
    "!.vuepress",
    "!node_modules",
    "!**/.obsidian",
    "!**/.github",
    "!00 Inbox/**",
    "!80 Reviews/**",
  ],
}
