import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import seedrandom from "seedrandom";
import {
  currentSeason,
  GenusName,
  GenusNamePlural,
  HtmlPlantType,
  HtmlPlantTypeToSpecies,
} from "../common/plants";
import { useStickyState } from "../common/utils";
import dynamic from "next/dynamic";
import Guide from "./guide";

const Garden = dynamic(() => import("../components/Garden"), { ssr: false });

export const StartDate = new Date("2023-03-15");
export const GardenGrowingDays = Math.floor(
  (new Date().getTime() - StartDate.getTime()) / 1000 / 60 / 60 / 24
);
export const allDaysGenerator = Array.from(
  { length: GardenGrowingDays },
  (_, i) =>
    seedrandom(
      new Date(
        StartDate.getTime() + i * 24 * 60 * 60 * 1000
      ).toLocaleDateString()
    )
);

function joinWithAnd(arr: string[]) {
  if (arr.length === 1) {
    return arr[0];
  }
  return `${arr.slice(0, -1).join(", ")} and ${arr.slice(-1)}`;
}

export default function Home() {
  const totalSpecies = Object.keys(HtmlPlantType).length;
  const seasonName = currentSeason();
  const currentSpecies = Object.values(HtmlPlantTypeToSpecies)
    .filter((s) => s.activePlants().length)
    .map((s) => s.type);
  const numSpeciesBlooming = currentSpecies.length;
  const [seenPlants, setSeenPlants] = useStickyState("seenPlants", []);
  const [soundOn, setSoundOn] = useStickyState("soundOn", false);
  const audioRef = useRef<HTMLAudioElement>();

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (currentSpecies.filter((c) => !seenPlants.includes(c)).length) {
      setSeenPlants(Array.from(new Set([...seenPlants, ...currentSpecies])));
    }
    setHasLoaded(true);
  }, [currentSpecies]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (soundOn) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [soundOn, audioRef]);

  function openGuide() {
    document.querySelector(".guideContainer").classList.remove("hidden");
  }

  return (
    <>
      <Head>
        <title>html garden</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <hgroup>
        <h1>html garden</h1>
        <p>
          Today, on {new Date().toLocaleDateString()}, {GenusNamePlural}{" "}
          {joinWithAnd(
            currentSpecies.map((c) => HtmlPlantTypeToSpecies[c].type)
          )}{" "}
          ({numSpeciesBlooming}/{totalSpecies} species){" "}
          {currentSpecies.length > 1 ? "are" : "is"} blooming.
        </p>
        <p>
          we are in {seasonName}.{" "}
          {hasLoaded
            ? `the garden has been growing for
          ${GardenGrowingDays} days.`
            : null}
        </p>
        <p>
          enable sound?{" "}
          <input
            type="checkbox"
            checked={soundOn}
            onChange={() => {
              setSoundOn(!soundOn);
            }}
          />
        </p>
      </hgroup>
      <main>
        <audio src="/html-garden-sound.m4a" ref={audioRef} />
        <Garden />
      </main>
      <footer>
        <span>
          🪴 planted by <a href="https://www.spencerchang.me/">sc</a>
        </span>
        <p>🎐 come visit again soon</p>
      </footer>

      <div className="guideContainer hidden">
        <Guide />
      </div>

      <button onClick={openGuide}>
        <img
          className="pageLink"
          src="./the-html-leaf-book.png"
          alt={`parody image of Ida Geary's "The Leaf Book"`}
        ></img>
      </button>
    </>
  );
}
