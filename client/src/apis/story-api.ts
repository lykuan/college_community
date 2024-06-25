import request from './request'

export const createStory = async (values: FormData) => {
  const uid = JSON.parse(localStorage.getItem('user'))._id
  const result = await request.post(`/story/${uid}/createStory`, values)
  return result
}

export const fetchStories = async ({ pageParam }) => {
  const result = await request.get(`/story/fetchStories`, {
    params: {
      cursor: pageParam,
    },
  })
  return result
}

export const likeStory = async (sid) => {
  const { data } = await request.post(`/story/${sid}/likeStory`)
  return data
}
export const bookmarkStory = async (sid) => {
  const { data } = await request.post(`/story/${sid}/bookmark`)
  return data
}

export const dislikeStory = async (sid) => {
  const { data } = await request.post(`/story/${sid}/dislikeStory`)
  return data
}

export const getStory = async (sid) => {
  const { data } = await request.get(`/story/${sid.queryKey[1]}`)
  return data
}
export const commentForStory = async (body: FormData) => {
  const sid = body.get('sid')
  const { data } = await request.post(`/story/${sid}/commentForStory`, body)
  return data
}

export const deleteCommentOfStory = async ({ sid, cid }) => {
  const { data } = await request.put(`/story/${sid}/deleteComment/${cid}`)
  return data
}

export const deleteStory = async (sid) => {
  const { data } = await request.put(`/story/deleteStory/${sid}`)
  return data
}
