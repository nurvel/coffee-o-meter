export const getRandomFact = async (): Promise<string> => {
  const RANDOM_FACT_URL = "https://useless-facts.sameerkumar.website/api";
  return fetch(RANDOM_FACT_URL)
    .then((res) => res.json())
    .then((json) => json.data)
    .catch((err) => {
      console.log("API error fetching random fact", err);
      return "I ran out of facts. This time you could discuss the weather";
    });
};
