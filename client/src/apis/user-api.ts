import request from './request'

export const updateAvatarPost = async (data: { image?: FormData }) => {
  const { data: result } = await request.post('/user/uploadAvatar', data.image)
  return result
}

export const getUsers = async () => {
  const { data: result } = await request.get('/user/getUsers')
  return result
}

export const followedUser = async (uid) => {
  const { data } = await request.post(`/user/followed/${uid}`)
  return data
}

export const updateProfile = async (profile) => {
  const { data } = await request.put(`/user/updateProfile`, profile)
  return data
}
export const getProfile = async (uid) => {
  console.log(uid)
  const { data } = await request.get(`/user/${uid.queryKey[1]}`)
  return data
}
