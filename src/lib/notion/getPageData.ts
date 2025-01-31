import rpc, { values } from './rpc'

interface NotionBlock {
  value: {
    content?: string[];
  };
}

interface NotionData {
  recordMap: {
    block: Record<string, NotionBlock>;
  };
  cursor: {
    stack: any[];
  };
}

export default async function getPageData(pageId: string) {
  // a reasonable size limit for the largest blog post (1MB),
  // as one chunk is about 10KB
  const maximumChunkNumber = 100

  try {
    let chunkNumber = 0
    let data = await loadPageChunk({ pageId, chunkNumber }) as NotionData
    let blocks = data.recordMap.block

    while (data.cursor.stack.length !== 0 && chunkNumber < maximumChunkNumber) {
      chunkNumber = chunkNumber + 1
      data = await loadPageChunk({ pageId, chunkNumber, cursor: data.cursor }) as NotionData
      blocks = Object.assign(blocks, data.recordMap.block)
    }
    const blockArray = values(blocks)
    if (blockArray[0] && blockArray[0].value.content) {
      // remove table blocks
      blockArray.splice(0, 3)
    }
    return { blocks: blockArray }
  } catch (err) {
    console.error(`Failed to load pageData for ${pageId}`, err)
    return { blocks: [] }
  }
}

export function loadPageChunk({
  pageId,
  limit = 30,
  cursor = { stack: [] },
  chunkNumber = 0,
  verticalColumns = false,
}: any) {
  return rpc('loadPageChunk', {
    pageId,
    limit,
    cursor,
    chunkNumber,
    verticalColumns,
  })
}
