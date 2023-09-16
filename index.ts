import cohere from "cohere-ai";
cohere.init(process.env.COHERE_API_KEY as string);

async function generateBerateText(direction: string): Promise<Error | string> {
  const response = await cohere.generate({
    model: "command",
    prompt: `I am building a hackathon project that berates user in a funny way if they don't look into someones eye while talking to them. You are to generate the funny berating text. Right now the user is looking ${direction}`,
    max_tokens: 50,
    temperature: 1
  })

  if (response.statusCode != 200) {
    console.log("\n\n-----\nGeneration failed.\n\n-----\n");
    return new Error("Generation failed.");
  }

  return response.body.generations[0].text;
}

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const direction = url.searchParams.get("q") || "down at the floor";
    console.log("Search params: ", direction);

    const text = await generateBerateText(direction);
    if (text instanceof Error) {
      return new Response("error");
    }

    console.log(text);
    return new Response(text);
  },
});
