import Link from "next/link";
import { useEffect } from "react";

export default function Timelapse() {
  useEffect(() => {
    document.querySelector("body").classList.add("guide");
    return () => {
      document.querySelector("body").classList.remove("guide");
    };
  });

  return (
    <div className="timelapse">
      <p>
        This is a timelapse video taken in May 2023 of the garden to create a
        static representation of the garden that is digestible in a single take.
        I recommend experiencing it for yourself in the{" "}
        <Link href="/">live garden</Link>.
      </p>
      <p>
        This video was composed and edited by Spencer Chang, featuring sounds
        composed by Spencer Chang using Chia Amisola's{" "}
        <a href="https://ambient.institute/soundroom">ambient tool</a>, and
        features vocals from Jasmine Wang, Jessica Zhou, Spencer Chang, and
        Google Chrome's ScreenReader.
      </p>
      <p>
        This piece has been shown at DWeb Camp,{" "}
        <a href="https://www.culturehub.org/events/inspect-elements">
          CultureHub
        </a>
        , and the DeYoung Museum (forthcoming), and its source was featured in{" "}
        <a href="https://www.frieze.com/article/online-publications-bridging-poetry-and-code">
          Frieze
        </a>{" "}
        and published in <a href="https://thehtml.review">The HTML Review</a>.
      </p>
      <iframe
        className="timelapse-video"
        src="https://www.youtube.com/embed/Fa28RSaClDk"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
