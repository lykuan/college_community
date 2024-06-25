import request from './request'

export const getRecommendUsers = async () => {
  const {
    data: { recommendUsers },
  } = await request.get('/dating/recommendUsers')
  return recommendUsers
}
export const getDatingInfo = async () => {
  const { data } = await request.get(`/dating`)
  return data
}

export const likedUser = async (uid) => {
  const { data } = await request.post(`/dating/likedUser/${uid}`)
  return data
}

export const dislikedUser = async (uid) => {
  const { data } = await request.post(`/dating/dislikedUser/${uid}`)
  return data
}

export const updateDatingSetting = async (form: FormData) => {
  const { data } = await request.post('/dating/updateSetting', form)
  return data
}

export const getLikedUsers = async () => {
  const { data } = await request.get('/dating/getLikedUsers')
  return data
}

export const getChats = async () => {
  const { data } = await request.get('/dating/chats')
  return data
}
