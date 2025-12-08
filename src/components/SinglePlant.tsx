import { useEffect, useMemo, useState } from "react";
import seedrandom from "seedrandom";
import {
  GenusName,
  GenusNamePlural,
  HtmlPlantType,
  HtmlPlantTypeToSpecies,
} from "../common/plants";
import { HtmlPlant } from "../components/HtmlPlant";
import "../styles/guide.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
interface PlantParams {
  d: string; // plant date in format MM-DD-YY
  s: string; // species
  p: string; // person
  mult: string; // bouquet mode - show multiple species
}

// TODO: add build mode via build query param
export default function Plant() {
  const router = useRouter();

  // Compute all values before any early returns to satisfy hooks rules
  const startDate = router.query.d
    ? dayjs(router.query.d as string, "MM-DD-YY")
    : dayjs();
  const person = (router.query.p as string) || "";
  const isBouquet = "mult" in router.query;

  const daysGrown = dayjs().diff(startDate, "day");
  const randomGenerator = seedrandom(startDate.format("MM-DD-YY"));

  // Generate species list based on mode
  const speciesList = useMemo(() => {
    if (!router.isReady) return [];

    if (isBouquet) {
      // Select 3-5 random species for bouquet mode
      const allSpecies = Object.keys(HtmlPlantType);

      // Determine count (3-5) - truly random
      const count = Math.floor(Math.random() * 3) + 3;

      // Fisher-Yates shuffle to pick unique species - truly random
      const shuffled = [...allSpecies];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      return shuffled.slice(0, count);
    } else {
      // Single plant mode
      const species =
        Object.keys(HtmlPlantType)[
          (router.query.s as string) ||
            Math.floor(randomGenerator() * Object.keys(HtmlPlantType).length)
        ];
      return [species];
    }
  }, [isBouquet, router.query.s, randomGenerator, router.isReady]);

  // Generate title
  const title = useMemo(() => {
    if (!router.isReady || speciesList.length === 0) return "";

    if (isBouquet) {
      const speciesNames = speciesList
        .map((s) => HtmlPlantTypeToSpecies[s].type)
        .join(", ");
      const prefix = person
        ? `${person}'s ${GenusNamePlural}`
        : GenusNamePlural;
      return `${prefix} ${speciesNames}`;
    } else {
      const { type } = HtmlPlantTypeToSpecies[speciesList[0]];
      if (person) {
        return `${person}'s ${GenusName} ${type}`;
      }
      return `${GenusName} ${type}`;
    }
  }, [isBouquet, person, speciesList, router.isReady]);

  useEffect(() => {
    document.querySelector("body").classList.add("singlePlant");
    document.querySelector("html").classList.add("singlePlant");
    return () => {
      document.querySelector("body").classList.remove("singlePlant");
      document.querySelector("html").classList.remove("singlePlant");
    };
  }, []);

  if (!router.isReady || speciesList.length === 0) return null;

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
          padding: ".5em 1em",
          fontSize: isBouquet ? "1rem" : undefined,
          paddingTop: "1.5em",
        }}
      >
        {title}
      </h1>
      <Link
        href="/"
        style={{
          position: "fixed",
          top: ".5em",
          left: "1em",
          zIndex: 2,
          fontSize: "0.8em",
          color: "#d7edc4",
          textDecoration: "none",
          opacity: 0.7,
        }}
      >
        ← full garden
      </Link>
      <div
        className="plantWrapper"
        style={{
          top: isBouquet ? "60%" : "70%",
          display: "flex",
          gap: isBouquet ? "2em" : "0",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {speciesList.map((species, idx) => {
          const { type } = HtmlPlantTypeToSpecies[species];
          const plantRandomGenerator = seedrandom(
            startDate.format("MM-DD-YY") + idx
          );
          const randomRotation =
            Math.floor(plantRandomGenerator() * 6) * 10 - 30;
          const transform = `rotate(${randomRotation}deg)`;

          return (
            <HtmlPlant
              key={idx}
              type={type}
              daysGrown={daysGrown}
              idx={idx}
              style={{
                transform,
              }}
            />
          );
        })}
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
