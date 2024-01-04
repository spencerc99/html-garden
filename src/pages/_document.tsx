import { Html, Main, Head, NextScript } from "next/document";
import { Marquee } from "../components/Marquee";
import Link from "next/link";
export default function Document() {
  return (
    <Html data-theme="cmyk">
      <Head lang="en">
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🌿</text></svg>"
        ></link>
        <link rel="apple-touch-icon" href="./apple-touch-icon.png"></link>
        <script
          defer
          data-domain="htmls.garden"
          data-api="https://sharingan.spencerc99.workers.dev/genjutsu/event"
          src="https://sharingan.spencerc99.workers.dev/genjutsu/script.js"
        ></script>
      </Head>
      <body>
        <Marquee
          items={[
            <>
              <Link href="/timelapse">timelapse</Link> now showing at the{" "}
              <a href="https://deyoungopen2023.artcall.org/submissions/qr-view/424024">
                de Young Museum
              </a>{" "}
              through January 2024
            </>,
            <>come back in ❄️ for a new planting</>,
          ]}
          separator={" 🌑 "}
        ></Marquee>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
