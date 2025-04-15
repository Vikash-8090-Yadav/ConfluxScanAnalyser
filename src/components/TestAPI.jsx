import { useEffect } from 'react'

export default function TestAPI() {
  useEffect(() => {
    const testAPI = async () => {
      try {
        const response = await fetch(
          'https://evmapi-testnet.confluxscan.net/api?module=account&action=txlist&address=0x742d35Cc6634C0532925a3b844Bc454e4438f44e&page=1&offset=10&sort=asc'
        )
        const data = await response.json()
        console.log('API Response Structure:', data)
      } catch (error) {
        console.error('Error testing API:', error)
      }
    }

    testAPI()
  }, [])

  return null
} 