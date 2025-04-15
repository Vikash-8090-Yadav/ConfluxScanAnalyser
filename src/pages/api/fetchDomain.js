export default async function handler(req, res) {
  const { domain } = req.query;
  console.log('API route called with domain:', domain);

  if (!domain) {
    console.log('No domain provided');
    return res.status(400).json({ error: 'Domain parameter is required' });
  }

  try {
    console.log('Fetching data from ConfluxScan API');
    const response = await fetch(`https://evmapi-testnet.confluxscan.net/api/account/${domain}`);
    const data = await response.json();
    console.log('Data received from ConfluxScan API:', data);

    if (response.ok) {
      res.status(200).json(data);
    } else {
      console.log('Error response from ConfluxScan API:', data);
      res.status(response.status).json({ error: data.message || 'Failed to fetch domain data' });
    }
  } catch (error) {
    console.error('Error fetching domain data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
