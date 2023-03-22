import { useEffect, useMemo, useState } from "react";
import { HtmlPlant } from "./HtmlPlant";
import seedrandom from "seedrandom";
import {
  HtmlPlantType,
  GenusName,
  HtmlPlantTypeToSpecies,
} from "../common/plants";

export function Garden() {
  useEffect(() => {}, []);

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

  return <div id="garden">{plants}</div>;
}

function PlantWrapper({
  plantType,
  daysGrown,
  idx = 0,
}: {
  plantType: HtmlPlantType;
  daysGrown: number;
  idx: number;
}) {
  /* TODO: just show label on hover? */
  const plantId = useMemo(() => `${plantType}-${idx}`, [idx, plantType]);
  const randomGenerator = useMemo(() => seedrandom(plantId), [plantId]);
  const bottom = useMemo(() => `${randomGenerator() * 80}%`, [randomGenerator]);
  const left = useMemo(
    () => `${randomGenerator() * 80 + 10}%`,
    [randomGenerator]
  );
  const randomRotation = useMemo(
    () => randomGenerator() * 60 - 30,
    [randomGenerator]
  );
  const randomScale = useMemo(
    () => Math.floor(randomGenerator() * 6) * 0.1 + 0.3,
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
