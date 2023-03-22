import { Html, Main, Head, NextScript } from "next/document";
export default function Document() {
  return (
    <Html data-theme="cmyk">
      <Head lang="en">
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🌿</text></svg>"
        ></link>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
          rel="stylesheet"
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
