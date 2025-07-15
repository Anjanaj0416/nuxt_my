// plugins/getAccessToken.js
import axios from 'axios'

export async function getAccessToken() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/IAM/GetAppAccessToken`, {
      params: { secretCode: 'w5jzxd02' }
    })

    if (response.data.isSuccess) {
      return response.data.authToken
    }
  } catch (error) {
    console.error('Error fetching access token:', error)
  }
  return null
}
