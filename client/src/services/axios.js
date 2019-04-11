import axios from 'axios'
const BASE_URL = 'http://localhost:3000'

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}
})

const getToken =  async (email, password) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user_token`, {auth: {email, password}})
    return (resp.data.jwt)
  } catch(e) {
    return (404)
  }
}

const createUser = async (username, password, picture, email) => {
  const resp = await axios.post(`${BASE_URL}/users`, {
    user: {
      username,
      password,
      picture,
      email
    }
  })
}

const getRooms = async () => {
  const resp = await axios.get(`${BASE_URL}/rooms`)
  console.log(resp.data)
  return resp.data
}

const sendMessage = async (text, room_id) => {
  await authApi.post(`/messages`, {text, room_id})
}

const createRoom = async (name, description, motd) => {
  const resp = await authApi.post('/rooms', { name, description, motd })
  return resp.data
}


export {
  getToken,
  createUser,
  getRooms,
  sendMessage,
  createRoom
}
