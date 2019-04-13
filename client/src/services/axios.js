import axios from 'axios'
const BASE_URL = 'https://infinite-escarpment-51215.herokuapp.com'

const api = axios.create({
  baseURL: BASE_URL,
})

const getToken =  async (email, password) => {
  try {
    const resp = await api.post(`/user_token`, {auth: {email, password}})
    return (resp.data.jwt)
  } catch(e) {
    return (404)
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


export {
  getToken,
  createUser,
  getRooms,
  sendMessage,
  createRoom
}
