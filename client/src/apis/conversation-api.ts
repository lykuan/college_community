import request from './request'

export const sendMessage = async (body) => {
  const { data } = await request.post(`/conversation/send/${body.uid}`, {
    text: body.message,
  })
  return data
}

export const getMessages = async (uid) => {
  const { data } = await request.get(`/conversation/${uid}`)
  return data
}
