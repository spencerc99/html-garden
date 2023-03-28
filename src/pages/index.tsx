import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import {
  currentSeason,
  GenusName,
  GenusNamePlural,
  HtmlPlantType,
  HtmlPlantTypeToSpecies,
} from "../common/plants";
import { useStickyState } from "../common/utils";
import { Garden } from "../components/Garden";

const StartDate = new Date("2023-03-15");

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

  useEffect(() => {
    if (currentSpecies.filter((c) => !seenPlants.includes(c)).length) {
      setSeenPlants(Array.from(new Set([...seenPlants, ...currentSpecies])));
    }
  }, [currentSpecies]);

  return (
    <>
      <Head>
        <title>html garden</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <hgroup>
        <h1>html garden</h1>
        <p>
          we are in {seasonName}. {numSpeciesBlooming}/{totalSpecies} species
          are blooming. the garden has been growing for{" "}
          {Math.floor(
            (new Date().getTime() - StartDate.getTime()) / 1000 / 60 / 60 / 24
          )}{" "}
          days.
        </p>
        <p>
          Today, on {new Date().toLocaleDateString()}, {GenusNamePlural}{" "}
          {joinWithAnd(
            currentSpecies.map((c) => HtmlPlantTypeToSpecies[c].type)
          )}{" "}
          {currentSpecies.length > 1 ? "are" : "is"} seeding.
        </p>
      </hgroup>
      <main>
        <Garden />
      </main>
      <footer>
        🪴 planted by <a href="https://www.spencerchang.me/">sc</a>
        <p>🎐 come visit again soon</p>
      </footer>
      <Link href="/guide">
        <img
          className="pageLink"
          src="./the-html-leaf-book.png"
          alt={`parody image of Ida Geary's "The Leaf Book"`}
        ></img>
      </Link>
    </>
  );
}
