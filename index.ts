import cohere from "cohere-ai";

const direction = "at the floor with awkwardness."

cohere.init(process.env.COHERE_API_KEY as string);
const response = await cohere.generate({
  model: "command",
  prompt: `I am building a hackathon project that berates user if they don't look into someones eye while talking to them. You are to generate the berating text. Right now the user is looking ${direction}`,
  max_tokens: 50,
  temperature: 1
})

if (response.statusCode != 200) {
  console.log("\n\n-----\nGeneration failed.\n\n-----\n");
}

console.log(response.body.generations[0].text);
