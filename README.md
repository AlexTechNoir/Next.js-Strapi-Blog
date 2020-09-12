# Next.js Blog with Strapi

Static demo blog. Deployed on [Netlify](https://www.netlify.com/).

## [Dependencies](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/package.json#L10)

## Features:

- static
- responsive
- mobile first
- built with [Strapi Headless CMS](https://github.com/strapi/strapi)
- Strapi uses [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) as database
- images stored on [Cloudinary](https://cloudinary.com/)
- Strapi deployed on [Heroku](https://www.heroku.com/home)
- autocomplete search
- search results with highlighted match (native)
- sound
- dark mode
- hamburger menu for mobile layout
- "Load More" pagination
- SEO-friendly article list initially fetched on server-side (paginated - client-side)
- progressive featured images
- categories
- like\share\tweet buttons, comment section

## How did I do...

<details>
  <summary>Search with highlighted results</summary>
  <br>
  <ol>
    <li>When user enters value, we <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/header/SearchBar.js#L101">grab it's changes</a>.</li>
    <li>Search happens <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/header/SearchBar.js#L71">onSubmit</a>.</li>
    <li>It's importnant not to use Next.js's <a href="https://nextjs.org/docs/routing/dynamic-routes">dynamic routs</a> here, because blog would not be static if we'd have pages, depending on user's request (but if you're OK with hybrid/dynamic blog, than it's alright to use them (btw, maybe <a href="https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes">optional catch all routes</a> will somehow work with static site too, but I haven't tested it)). Instead we go to search page with query passed through "?" sign, <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/header/SearchBar.js#L66">here</a>.</li>
    <li>Search page will <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/search.js#L14">fetch</a> Strapi's API and will <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/search.js#L23">render</a> the filtered results based on query parameter.</li>
    <li>In search result we <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/search/SearchResult.js#L14">convert markup to html</a> and <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/search/SearchResult.js#L15">html to text</a>.</li>
    <li>We <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/search/SearchResult.js#L98">divide text into array based on value match</a> and <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/search/SearchResult.js#L99">create new text as array with "mark" tag around match</a>.</li>
    <li>Then in useEffect, initially and every time the search value gets changed, we look for "mark" tags in text and cut the text around the first match (or just write "no match" if there is no match). The namings should be self-explanatory <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/search/SearchResult.js#L19">here</a>.</li>
    <li>It's important to wrap the text inside "p" tag with, for example, "span" tag to avoid React NotFoundError, which occurs when we re-render page (here: search for the second time) after manipulating the DOM (highlighting). Explained <a href="https://stackoverflow.com/a/54342788/10489004">here</a>.</li>
    <li>Last important thing: when we search for the second time and if in search result list we got result that was in the previous list (but with different match this time) then it will reflect previous highlighted match, which is not what we want. To avoid this we must remove old results and load new when we search. We can do this by triggering <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/search.js#L35">re-fetch</a> - this will cause "isValidating" parameter to <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/search.js#L50">change</a> on every search, removing previous result with skeleton load and load new results with correct highlighted match.</li>
  </ol>
</details>

<details>
  <summary>Pagination</summary>
  <br>
  <ol>
    <li>Featured articles <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/index.js#L18">are fetched</a> on server-side as usual for SEO.</li>
    <li>We fetch paginated data on client-side with <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/index.js#L26">useSWRInfinite</a>.</li>
    <li>We use "size" and "setSize" parameters to change page index.</li>
    <li>But instead of page index Strapi's API has <a href="https://strapi.io/documentation/v3.x/content-api/parameters.html#start">Start param</a> pointing at index from which data should be fetched and <a href="https://strapi.io/documentation/v3.x/content-api/parameters.html#limit">Limit param</a>.</li>
    <li>In getKey function <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/index.js#L12">"pageIndex" parameter</a> is the "size" parameter. It always starts with 0.</li>
    <li>We set <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/index.js#L14">limit param to 1 (fetch 1 article), start param - to "pageIndex + 7"</a> (because first 7 artciles are already fetched on server-side.</li>
    <li>On every time user clicks "Load More" button, we <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/index.js#L77">increase</a> size param to amount of articles we need to fetch (here we need 4, which depends on desktop layout).</li>
    <li>We also have to <a href="https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/index.js#L27">set initialSize parameter to 0</a>, because we don't need paginated data initially, only on demand.</li>
  </ol>
</details>

## What did I use to make this demo:

- [Create Next App](https://nextjs.org/docs/getting-started#setup)
- [styled-components](https://github.com/styled-components/styled-components) (examples: [global style](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/_app.js#L77), [usual style](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/_app.js#L153))
- [Material-UI](https://github.com/mui-org/material-ui) ([Autocomplete example](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/header/SearchBar.js#L72))
- [React Font Awesome](https://github.com/FortAwesome/react-fontawesome) ([example](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/header/UsualMenu.js#L75))
- [react-markdown](https://github.com/rexxars/react-markdown) ([example](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/article/Markdown.js#L26))
- [Showdown](https://github.com/showdownjs/showdown) ([example](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/search/SearchResult.js#L14))
- [SWR](https://github.com/vercel/swr) (examples: [client-side](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/search.js#L14), [server-side](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/pages/categories/%5Bid%5D.js#L32))
- Facebook [Like\Share Buttons](https://developers.facebook.com/docs/plugins/like-button) ([example](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/article/SocialButtons.js#L13)) and [Comments](https://developers.facebook.com/docs/plugins/comments) ([example](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/article/Comments.js))
- Twitter [Tweet Button](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview) ([example](https://github.com/AlexTechNoir/Next.js-Strapi-Blog/blob/master/components/article/SocialButtons.js#L22))

## Notes:

- at first load there is FOUC from Material-UI. MUI has [recommendations for server rendering](https://material-ui.com/guides/server-rendering/) and [example for Next.js](https://github.com/mui-org/material-ui/tree/master/examples/nextjs), however this measures doesn't work for everyone. There is fix, but it [works only in dev mode](https://github.com/vercel/next.js/issues/13058#issuecomment-666948357)
