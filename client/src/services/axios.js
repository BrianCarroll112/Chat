import axios from 'axios'
const BASE_URL = 'http://localhost:3000'

const getToken =  async (email, password) => {
  try {
    const resp = await axios.post(`${BASE_URL}/user_token`, {auth: {email, password}})
    return (resp.data.jwt)
  } catch(e) {
    return (404)
  }
}


export {
  getToken
}
