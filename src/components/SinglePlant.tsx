import { useEffect, useMemo, useState } from "react";
import seedrandom from "seedrandom";
import {
  GenusName,
  HtmlPlantType,
  HtmlPlantTypeToSpecies,
} from "../common/plants";
import { HtmlPlant } from "../components/HtmlPlant";
import "../styles/guide.module.scss";
import { useRouter } from "next/router";
import dayjs from "dayjs";

interface PlantParams {
  d: string; // plant date in format MM-DD-YY
  s: string; // species
  p: string; // person
}

export default function Plant() {
  const router = useRouter();

  useEffect(() => {
    document.querySelector("body").classList.add("singlePlant");
    document.querySelector("html").classList.add("singlePlant");
    return () => {
      document.querySelector("body").classList.remove("singlePlant");
      document.querySelector("html").classList.remove("singlePlant");
    };
  }, []);

  if (!router.isReady) return null; // or a loading indicator

  const startDate = dayjs(
    (router.query.d as string) || new Date().toISOString(),
    "MM-DD-YY"
  );
  const person = (router.query.p as string) || "";
  console.log(router.query);
  const species =
    Object.keys(HtmlPlantType)[
      (router.query.s as string) ||
        Math.floor(Math.random() * Object.keys(HtmlPlantType).length)
    ];
  const daysGrown = dayjs().diff(startDate, "day");
  const { type } = HtmlPlantTypeToSpecies[species];
  const randomGenerator = seedrandom(startDate);
  const randomRotation = Math.floor(randomGenerator() * 6) * 10 - 30;
  const transform = `rotate(${randomRotation}deg)`;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: ".5em 1em",
        textAlign: "center",
        overflow: "hidden",
      }}
      className="singlePlant"
    >
      <h1
        style={{
          zIndex: 1,
        }}
      >
        {person ? `${person}'s` : "Your"} {GenusName} {type}
      </h1>
      <div
        className="plantWrapper"
        style={{
          top: "70%",
        }}
      >
        <HtmlPlant
          type={type}
          daysGrown={daysGrown}
          idx={0}
          style={{
            transform,
          }}
        />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "1em",
          margin: "0 auto",
        }}
      >
        planted on {startDate.format("MMM DD, YYYY")}
      </div>
    </div>
  );
}
