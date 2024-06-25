import request from './request'

export const createTask = async (task) => {
  const { data } = await request.post('/task/create', task)
  return data
}

export const getTasks = async () => {
  const { data } = await request.get('/task/getTasks')
  return data
}

export const deleteTask = async (tid) => {
  const { data } = await request.put(`/task/delete/${tid}`)
  return data
}

export const updateTask = async (task) => {
  const { data } = await request.put(`/task/update/${task.tid}`, task)
  return data
}
