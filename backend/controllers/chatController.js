const axios = require("axios");

const getNlpResponse = async (req, res) => {
  const { prompt } = req.body;

  try {
    // Send the prompt to OpenAI API and get the response
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure this is correct
        },
      }
    );

    const nlpResponse = response.data.choices[0].text.trim();
    res.json({ response: nlpResponse });
  } catch (error) {
    console.error("Error in NLP API call:", error.message);
    if (error.response) {
      // Log detailed error if available from OpenAI API
      console.error("Response Data:", error.response.data);
      console.error("Status Code:", error.response.status);
    }
    res.status(500).send("Error generating response");
  }
};

module.exports = { getNlpResponse };
