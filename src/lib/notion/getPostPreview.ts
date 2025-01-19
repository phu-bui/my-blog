import { loadPageChunk } from './getPageData'
import { values } from './rpc'

const nonPreviewTypes = new Set(['editor', 'page', 'collection_view'])

interface NotionBlock {
  value: {
    type: string;
    properties?: {
      title: string[];
    };
  };
}

interface NotionData {
  recordMap: {
    block: Record<string, NotionBlock>;
  };
}

export async function getPostPreview(pageId: string) {
  let blocks
  let dividerIndex = 0

  const data = await loadPageChunk({ pageId, limit: 10 }) as NotionData
  blocks = values(data.recordMap.block)

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].value.type === 'divider') {
      dividerIndex = i
      break
    }
  }

  blocks = blocks
    .splice(0, dividerIndex)
    .filter(
      ({ value: { type, properties } }: NotionBlock) =>
        !nonPreviewTypes.has(type) && properties
    )
    .map((block: NotionBlock) => block.value.properties?.title)

  return blocks
}
