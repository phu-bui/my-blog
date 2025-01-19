import rpc from './rpc'

interface NotionUser {
  id: string;
  given_name: string;
  family_name: string;
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

  const users: Record<string, { full_name: string }> = {}

  for (const result of results) {
    const { value } = result || { value: {} as NotionUser }
    const { given_name, family_name } = value
    let full_name = given_name || ''

    if (family_name) {
      full_name = `${full_name} ${family_name}`
    }
    users[value.id] = { full_name }
  }

  return { users }
}
