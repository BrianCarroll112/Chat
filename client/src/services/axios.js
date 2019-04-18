import axios from 'axios'
const BASE_URL = 'http://localhost:3000'

const api = axios.create({
  baseURL: BASE_URL,
})

const getToken =  async (email, password) => {
  try {
    const resp = await api.post(`/user_token`, {auth: {email, password}})
    return (resp.data.jwt)
  } catch(e) {
    return (null)
  }
}

const createUser = async (username, password, picture, email) => {
  const resp = await api.post(`/users`, {
    user: {
      username,
      password,
      picture,
      email
    }
  })
}

const getRooms = async () => {
  const resp = await api.get(`/rooms`)
  return resp.data
}

const sendMessage = async (text, room_id) => {
  api.defaults.headers.common['Authorization'] = await localStorage.getItem('jwt');
  await api.post(`/messages`, {text, room_id})
}

const createRoom = async (name, description, motd) => {
  api.defaults.headers.common['Authorization'] = await localStorage.getItem('jwt');
  const resp = await api.post('/rooms', { name, description, motd })
  return resp.data
}

const deleteRoom = async (id) => {
  api.defaults.headers.common['Authorization'] = await localStorage.getItem('jwt');
  const resp = api.delete(`/rooms/${id}`);
  return resp.data
}

const setMotd = async (id, motd) => {
  api.defaults.headers.common['Authorization'] = await localStorage.getItem('jwt');
  const resp = api.put(`/rooms/${id}`, { motd })
  return resp.data
}




export {
  getToken,
  createUser,
  getRooms,
  sendMessage,
  createRoom,
  deleteRoom,
  setMotd
}
