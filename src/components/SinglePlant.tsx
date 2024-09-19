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
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
interface PlantParams {
  d: string; // plant date in format MM-DD-YY
  s: string; // species
  p: string; // person
}

// TODO: add build mode via build query param
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

  console.log(router.query.d);
  const startDate = router.query.d
    ? dayjs(router.query.d as string, "MM-DD-YY")
    : dayjs();
  console.log(dayjs().format("MM-DD-YY"));
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
        color: "#d7edc4",
        fontFamily: "monospace",
      }}
      className="singlePlant"
    >
      <h1
        style={{
          zIndex: 1,
          lineHeight: "1",
          backgroundColor: "hsla(82, 34%, 35%, 0.8)",
          width: "100%",
          position: "fixed",
          top: "-.7em",
          padding: "1em .2em",
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
        planted {daysGrown} days ago on {startDate.format("MMM DD, YYYY")}
      </div>
    </div>
  );
}
