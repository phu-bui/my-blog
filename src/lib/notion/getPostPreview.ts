import { loadPageChunk } from './getPageData'

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
  const data = await loadPageChunk({ pageId, limit: 200 }) as NotionData
   return data?.recordMap || null
}
