import axios from 'axios'
const BASE_URL = 'http://localhost:3000'

const getToken =  async (email, password) => {
  const resp = await axios.post(`${BASE_URL}/user_token`, {auth: {email, password}})
  localStorage.setItem('jwt', resp.data.jwt)
}


export {
  getToken
}
