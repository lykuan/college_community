import request from './request'


export const createIdea = async (idea) => {
  const { data } = await request.post(`/post/createPost`,idea)
  return data
}

export const getIdeas = async () => {
  const { data } = await request.get(`/post`)
  return data
}
