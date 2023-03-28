import { useEffect, useMemo, useRef, useState } from "react";
import { HtmlPlant } from "./HtmlPlant";
import seedrandom from "seedrandom";
import {
  HtmlPlantType,
  GenusName,
  HtmlPlantTypeToSpecies,
} from "../common/plants";

export function Garden() {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    const headerHeight = document.querySelector("hgroup").clientHeight;
    ref.current.style.marginTop = `${headerHeight + 20 + 32}px`;
  }, []);

  // TODO: add threshold for each to "sprout" new plant
  // TODO: figure out seasons for each, some modulo based on the date or intervals where it's in season? or maybe like moon phases where it grows to a peak and then shrinks?
  // contribute/cultivate your own plant?
  // - tamogotchi vibes lol
  // - pick from one of the species and you have to come back to water it.
  // or can you just adopt one (fake this by choosing a random one)
  // maybe by visiting the site many times, you earn the right to plant one.

  // TODO: big season clock in the top right that simulates a real clock or day/night or moon, windchime? tools for watering?
  // TODO: some progress or indicator of seeds of other ones that aren't growing right now?
  const plants = useMemo(() => {
    return Object.values(HtmlPlantTypeToSpecies).flatMap((species) =>
      species
        .activePlants()
        .map((daysGrown, idx) => (
          <PlantWrapper
            key={`${species.type}-${idx}`}
            idx={idx}
            plantType={species.type}
            daysGrown={daysGrown}
          />
        ))
    );
  }, []);

  return (
    <div id="garden" ref={ref}>
      {plants}
    </div>
  );
}

const GardenWidth = 1400;
const GardenHeight = 600;
function PlantWrapper({
  plantType,
  daysGrown,
  idx = 0,
}: {
  plantType: HtmlPlantType;
  daysGrown: number;
  idx: number;
}) {
  const numPlants = Object.keys(HtmlPlantType).length;
  const typeIdx = Object.keys(HtmlPlantType).indexOf(plantType);

  const plantId = useMemo(() => `${plantType}-${idx}`, [idx, plantType]);
  const randomGenerator = useMemo(() => seedrandom(plantId), [plantId]);
  const inSecondHalf = typeIdx + 1 > numPlants / 2;
  const basisBottom = inSecondHalf ? GardenHeight / 2 + 100 : 100;
  const basisLeft =
    ((GardenWidth - 400) / (numPlants / 2)) *
      ((typeIdx + 1) % (numPlants / 2)) +
    200;
  console.log(plantType, typeIdx, basisLeft, basisBottom);
  const bottom = useMemo(
    () => `${randomGenerator() * GardenHeight}px`,
    [randomGenerator]
  );
  const left = useMemo(
    () => `${randomGenerator() * (GardenWidth - 200) + 100}px`,
    [randomGenerator]
  );
  // const bottom = useMemo(
  //   () => `${randomGenerator() * 150 - 75 + basisBottom}px`,
  //   [basisBottom, randomGenerator]
  // );
  // const left = useMemo(
  //   () => `${randomGenerator() * 200 + basisLeft}px`,
  //   [basisLeft, randomGenerator]
  // );
  const randomRotation = useMemo(
    // TODO: normal distribution at 0, std dev of 30
    () => Math.floor(randomGenerator() * 9) * 10 - 45,
    [randomGenerator]
  );
  const randomScale = useMemo(
    () => Math.floor(randomGenerator() * 4) * 0.1 + 0.55,
    [randomGenerator]
  );

  const transform = `rotate(${randomRotation}deg) scale(${randomScale})`;

  return (
    <div
      className="plantWrapper"
      style={{
        bottom,
        left,
        transform,
      }}
    >
      <HtmlPlant type={plantType} idx={idx} daysGrown={daysGrown} />
      <label>
        {GenusName} {plantType}
      </label>
    </div>
  );
}
