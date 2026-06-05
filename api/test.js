export default async function handler(req, res) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(200).json({ 
      status: 'ERROR', 
      problem: 'ANTHROPIC_API_KEY environment variable is not set in Vercel' 
    });
  }

  if (!apiKey.startsWith('sk-ant-')) {
    return res.status(200).json({ 
      status: 'ERROR', 
      problem: 'API key found but looks wrong — should start with sk-ant-',
      keyPreview: apiKey.substring(0, 10) + '...'
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hi' }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({ 
        status: 'ERROR', 
        problem: 'Anthropic API rejected the request',
        anthropicError: data 
      });
    }

    return res.status(200).json({ 
      status: 'OK', 
      message: 'Everything is working! API key is valid and Anthropic is reachable.' 
    });

  } catch (err) {
    return res.status(200).json({ 
      status: 'ERROR', 
      problem: 'Network error reaching Anthropic',
      error: err.message 
    });
  }
}
