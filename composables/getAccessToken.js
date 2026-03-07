// composables/getAccessToken.js
import axios from 'axios'

export async function getAccessToken() {
  try {
    // GetWelFareLoginCode requires JSON body with UserName and RequestedUrl
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/IAM/GetWelFareLoginCode`,
      {
        AuthCode: 'wfdevadmin',
        
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    console.log(response.data)

    if (response.data.isSuccess) {
      
      return response.data.authToken
    }

    console.warn('[getAccessToken] isSuccess=false:', response.data.message)
  } catch (error) {
    console.error('[getAccessToken] Error:', error?.response?.status, error?.response?.data || error.message)
  }
  return null
}