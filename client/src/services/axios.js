import axios from 'axios'
const BASE_URL = 'https://infinite-escarpment-51215.herokuapp.com'

const authApi = axios.create({
  baseURL: BASE_URL,
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
  authApi.defaults.headers.common['Authorization'] = await localStorage.getItem('jwt');
  await authApi.post(`/messages`, {text, room_id})
}

const createRoom = async (name, description, motd) => {
  authApi.defaults.headers.common['Authorization'] = await localStorage.getItem('jwt');
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
