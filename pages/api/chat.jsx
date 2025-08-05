export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed!" });
  }

  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: "Invalid message!" });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });

    // Check if the response was successful (status 200-299)
    if (!response.ok) {
      const data = await response.json(); // Parse the response only if the request was successful
      throw new Error(data.error?.message || 'Failed to fetch response from OpenAI');
    }

    // Successfully got the response, parse it
    const data = await response.json();
    const aiReply = data.choices[0].message.content;

    return res.status(200).json({ reply: aiReply });

  } catch (error) {
    console.error('Error fetching response from OpenAI:', error);
    return res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
}
