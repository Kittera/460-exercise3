I used two REST API services of the loose "entertainment" category. I hope to revisit this and add a Google Maps tab later.

The first is a CORS-enabled wrapper around the XKCD comic.

const xkcdWrapperUrlBaseTemplate =
        "https://getxkcd.vercel.app/api/comic?num=";

The second is a public jokes api that I have parameterized for safe mode and english only.


  const typeParam = single? 'single' : 'twopart';
  const response = await fetch(
    `https://jokeapi-v2.p.rapidapi.com/joke/Any?type=${typeParam}&format=json&lang=en&safe-mode`,
    options
  );

In the comic page viewer, the enter key works for choosing a page. ;)

This assignment is accessible on the web thanks to GCP and my domain name. you can find it at gcp.lynxpardia.xyz/exercise3