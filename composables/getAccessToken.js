// composables/getAccessToken.js
import axios from 'axios'

export async function getAccessToken() {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/IAM/GetWelFareLoginCode`
    console.log('🔐 [getAccessToken] Calling:', apiUrl)
    
    const response = await axios.post(
      apiUrl,
      { AuthCode: 'wfdevadmin' },
      { headers: { 'Content-Type': 'application/json' } }
    )
    
    console.log('🔐 [getAccessToken] Response:', response.data.isSuccess, response.data.message)
    console.log('🔐 [getAccessToken] authToken present:', !!response.data.authToken)
    console.log(response.data)
    if (!response.data.isSuccess) {
      console.warn('[getAccessToken] FAILED - isSuccess=false:', response.data.message)
      console.warn('[getAccessToken] Full response:', JSON.stringify(response.data))
      return null
    }

    if (response.data.isSuccess) {  
      return response.data.authToken
    }
    
    console.warn('[getAccessToken] FAILED - isSuccess=false:', response.data.message)
    console.warn('[getAccessToken] Full response:', JSON.stringify(response.data))
  } catch (error) {
    console.error('[getAccessToken] EXCEPTION:', error?.response?.status)
    console.error('[getAccessToken] Error detail:', error?.response?.data || error.message)
    console.error('[getAccessToken] URL was:', `${import.meta.env.VITE_API_URL}/IAM/GetWelFareLoginCode`)
  }
  return null
}