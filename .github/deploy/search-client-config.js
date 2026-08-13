import { defineSearchConfig } from "@vuepress/plugin-slimsearch/client"

const searchSegmenter = new Intl.Segmenter("zh-CN", { granularity: "word" })

const splitSearchQuery = (query) =>
  Array.from(searchSegmenter.segment(query.normalize("NFKC")))
    .filter(({ segment, isWordLike }) => isWordLike && segment.trim())
    .map(({ segment }) => segment)

const compactSearchText = (text) =>
  text.normalize("NFKC").replace(/\s+/g, "").toLocaleLowerCase("zh-CN")

defineSearchConfig({
  querySplitter: async (query) => splitSearchQuery(query),
  combineWith: "AND",
  resultsFilter: (results, query) => {
    const compactQuery = compactSearchText(query)

    return results
      .map((result, index) => {
        const compactTitle = compactSearchText(result.title)
        const titleRank =
          compactTitle === compactQuery
            ? 0
            : compactTitle.includes(compactQuery)
              ? 1
              : 2

        return { result, index, titleRank }
      })
      .sort(
        (itemA, itemB) =>
          itemA.titleRank - itemB.titleRank || itemA.index - itemB.index,
      )
      .map(({ result }) => result)
  },
})
