import request from './request'

export const fetchCommunitiesByUser = async ({ queryKey }) => {
  const { data } = await request.get(`/community/${queryKey[1]}`)
  return data
}

export const fetchCommunities = async (user) => {
  const { data } = await request.get(`/community/${user}`)
  return data
}

export const createCommunity = async (community) => {
  const { data } = await request.post(`/community/create`, community)
  return data
}

export const joinCommunities = async (cid) => {
  const { data } = await request.post(`/community/${cid}/join`)
  return data
}
