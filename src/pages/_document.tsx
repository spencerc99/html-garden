import { Html, Main, Head, NextScript } from "next/document";
import { Marquee } from "../components/Marquee";
import Link from "next/link";
export default function Document() {
  return (
    <Html data-theme="cmyk">
      <Head lang="en">
        <meta charSet="UTF-8" />
        <link rel="icon" href="/apple_touch_icon.png"></link>
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
              <Link href="/timelapse">timelapse</Link>
            </>,
            <>
              <Link href="/timelapse">timelapse</Link>
            </>,
            <>
              <Link href="/timelapse">timelapse</Link>
            </>,
            <>
              <Link href="/timelapse">timelapse</Link>
            </>,
            <>
              <Link href="/timelapse">timelapse</Link>
            </>,
            <>
              <Link href="/timelapse">timelapse</Link>
            </>,
            <>
              <Link href="/timelapse">timelapse</Link>
            </>,
            <>
              <Link href="/timelapse">timelapse</Link>
            </>,
            <>
              <Link href="/timelapse">timelapse</Link>
            </>,
            <>
              <Link href="/timelapse">timelapse</Link>
            </>,
            <>
              <Link href="/timelapse">timelapse</Link>
            </>,
          ]}
          separator={" 🌑 "}
        ></Marquee>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
