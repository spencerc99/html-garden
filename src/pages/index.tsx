import Head from "next/head";
import { Garden } from "../components/Garden";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const numSpeciesBlooming = 4;
  const totalSpecies = 10;
  const seasonName = "spring";

  return (
    <>
      <Head>
        <title>html garden</title>
      </Head>
      <hgroup>
        <h1>html garden</h1>
        <p>
          there are {numSpeciesBlooming}/{totalSpecies} species blooming
          currently. we are in {seasonName}
        </p>
      </hgroup>
      <main>
        <Garden />
      </main>
      <footer>planted by spencer chang</footer>
    </>
  );
}
