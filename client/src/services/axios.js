import axios from 'axios'
const BASE_URL = 'http://localhost:3000'

//all http unrestricted for now, add auth header to api config later

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


export {
  getToken,
  createUser,
  getRooms
}
