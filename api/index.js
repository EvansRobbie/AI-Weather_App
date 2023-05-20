const express = require("express");
const app = express();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
require("dotenv").config();
const port = 4000;
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
// console.log( process.env.OPEN_AI_API_KEY)
const config = new Configuration({
  organization: "org-t2jndfDjhw0g6mCXrCSiRfev",
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(config);
app.get("/test", (req, res) => {
  res.json("test ok");
});
app.post("/weather", async (req, res) => {
  const { city } = req.body;
  try {
    let message = `Hello, I'm Robbie the creator of this weather app. Here is the weather forecast of ${city}.`;

    // Generate tommorows weather using open ai
    const prediction = await generateWeatherPrediction(city);

    // Suggest clothing based on the weather
    const clothingSuggestion = suggestClothing(prediction);

    // combine the message, prediction and clothes suggestion

    const response = `${message}\n\nPrediction for tomorrow: ${prediction}\n\nSuggested clothing: ${clothingSuggestion}`;
    res.json(response);

    // const completions = response.data.choices;
    // const suggestions = completions.map((completion) => completion.text.trim());
    // res.json({ suggestions });
  } catch (error) {
    console.error("Error generating the weather information:", error);
    res.status(500).json("Failed to generate weather information ");
  }
});
const generateWeatherPrediction = async (city) => {
  const today = new Date();
  const tommorow = new Date(today);
  tommorow.setDate(today.getDate() + 1);

  // Use OpenAI to generate a prediction for tomorrow's weather based on historical data or any other source
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `predict tommorows ${tommorow} weather in ${city}`,
    max_tokens: 100,
  });
  return response.data.choices[0].text.trim();
  // return 'Partly cloudy with a chance of rain.';
};
const suggestClothing = (prediction) => {
  const predictionString = prediction.toString();
  if (predictionString.includes("rain")) {
    return "Clothing: Wear a waterproof jacket or raincoat\n\nAccessories: Carry an umbrella or wear a rain hat.\n\nFootwear: Opt for waterproof shoes or boots.";
  } else if (predictionString.includes("sunny")) {
    return "Clothing: Choose lightweight and breathable fabrics.\n\nAccessories: Wear a hat, sunglasses, and sunscreen for sun protection.\n\nFootwear: Use comfortable sandals or breathable shoes.";
  } else if (predictionString.includes("windy")) {
    return "Clothing: Dress in layers to protect against the wind.\n\nAccessories:  Wear a windbreaker or light jacket.\n\nFootwear:  Choose closed-toe shoes or boots to keep your feet protected.";
  } else if (predictionString.includes("Light Showers")) {
    return "Clothing: Wear a waterproof or water-resistant jacket.\n\nAccessories: Carry a compact umbrella.\n\nFootwear: Opt for waterproof shoes or boots.";
  } else if (predictionString.includes("snowy")) {
    return "Clothing: Layer up with warm and insulated clothing.\n\nAccessories: Wear a winter hat, gloves, and scarf.\n\nFootwear: Use waterproof and insulated boots.";
  } else if (predictionString.includes("Hot and Humid")) {
    return "Clothing: Wear lightweight and breathable fabrics, such as cotton or linen.\n\nAccessories: Use a wide-brimmed hat and sunglasses.\n\nFootwear: Choose sandals or open-toe shoes for breathability.";
  } else {
    return "It should be a pleasant day. Dress comfortably.";
  }
};

app.listen(port);
