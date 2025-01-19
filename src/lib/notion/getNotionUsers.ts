import rpc from './rpc'

interface NotionUser {
  id: string;
  name: string;
}

interface NotionUserResult {
  value: NotionUser;
}

interface RpcResponse {
  results: NotionUserResult[];
}

export default async function getNotionUsers(ids: string[]) {
  const response = await rpc('getRecordValues', {
    requests: ids.map((id: string) => ({
      id,
      table: 'notion_user',
    })),
  }) as RpcResponse

  const { results = [] } = response

  const users: Record<string, NotionUser> = {}

  for (const result of results) {
    const { value } = result
    users[value.id] = value
  }

  return { users }
}
