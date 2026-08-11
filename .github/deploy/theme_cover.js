export const themeOptions2 = {
  hostname: "kangbeicai.github.io",
  repo: "kangbeicai/math-knowledge-vault",
  logo: null,
  docsDir: "src",
  locales: {
    "/": {
      navbar: [
        { text: "首页", link: "/" },
        { text: "数学地图", link: "/10%20Maps/数学知识地图.html" },
        { text: "流形学习", link: "/30%20Learning%20Paths/流形与微分几何学习路径.html" },
        { text: "知识库说明", link: "/05%20Meta/知识库架构%20V2.html" },
      ],
      sidebar: { "/": "structure" },
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },
  displayFooter: true,
  copyright: false,
  footer: "数学知识库 · 使用 Obsidian、VuePress 与 GitHub Pages 构建",
  plugins: {
    components: {
      components: ["PDF", "VPCard"],
    },
    icon: {
      prefix: "fa6-solid:",
    },
    blog: {
      article: "/Blog/",
    },
    seo: true,
    slimsearch: false,
  },
}
