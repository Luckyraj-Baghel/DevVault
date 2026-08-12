export const generateSummary = async (text) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that summarizes developer notes clearly and concisely.",
          },
          {
            role: "user",
            content: `Summarize the following developer note in 3-5 concise bullet points:\n\n${text}`,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.text();

    throw new Error(
      `AI request failed: ${response.status} ${errorData}`
    );
  }

  const data = await response.json();

  return data.choices[0].message.content;
};