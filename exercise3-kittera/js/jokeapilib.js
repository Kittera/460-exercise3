async function getRandomJoke(single) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4bb1248abfmsh73ca7bde08fcfcdp1c1a2ajsna8e79d01d89c",
      "X-RapidAPI-Host": "jokeapi-v2.p.rapidapi.com",
    },
  };
  const typeParam = single ? "single" : "twopart";
  const response = await fetch(
    `https://jokeapi-v2.p.rapidapi.com/joke/Any?type=${typeParam}&format=json&lang=en&safe-mode`,
    options
  );
  return await response.json();
}
