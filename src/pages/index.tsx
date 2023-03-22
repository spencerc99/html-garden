import Head from "next/head";
import {
  GenusName,
  HtmlPlantType,
  HtmlPlantTypeToSpecies,
} from "../common/plants";
import { Garden } from "../components/Garden";

import styles from "../styles/Home.module.scss";

const StartDate = new Date("2023-03-15");

export default function Home() {
  const numSpeciesBlooming = 4;
  const totalSpecies = 10;
  const seasonName = "spring";
  // TODO: derive this from the current date
  const currentSpecies = HtmlPlantType.Linchinus;

  return (
    <>
      <Head>
        <title>html garden</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <hgroup>
        <h1>html garden</h1>
        <p>
          there are {numSpeciesBlooming}/{totalSpecies} species blooming
          currently. we are in {seasonName}. The garden has been growing for{" "}
          {Math.floor(
            (new Date().getTime() - StartDate.getTime()) / 1000 / 60 / 60 / 24
          )}{" "}
          days.
        </p>
        <p>
          Today, on {new Date().toLocaleDateString()}, {GenusName}{" "}
          {HtmlPlantTypeToSpecies[currentSpecies].type} is seeding.
        </p>
        <p>
          Visit again on a different day to see how the garden changes between
          seasons.
        </p>
      </hgroup>
      <main>
        <Garden />
      </main>
      <footer>planted by spencer chang</footer>
    </>
  );
}
