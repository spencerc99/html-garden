import { useEffect, useMemo, useState } from "react";
import { HtmlPlant } from "./HtmlPlant";
import seedrandom from "seedrandom";
import { HtmlPlantType, GenusName } from "../common/plants";

export function Garden() {
  useEffect(() => {}, []);

  // TODO: add max growth (ideally exponentially harder)
  // TODO: add threshold for each to "sprout" new plant
  // TODO: figure out seasons for each, some modulo based on the date or intervals where it's in season? or maybe like moon phases where it grows to a peak and then shrinks?

  // TODO: big season clock in the top right that simulates a real clock or day/night or moon, windchime? tools for watering?
  // TODO: some progress or indicator of seeds of other ones that aren't growing right now?

  return (
    <div id="garden">
      <PlantWrapper idx={0} plantType={HtmlPlantType.Linchinus} daysGrown={2} />
      <PlantWrapper idx={0} plantType={HtmlPlantType.Datum} daysGrown={4} />
      <PlantWrapper idx={0} plantType={HtmlPlantType.Botonus} daysGrown={3} />
      <PlantWrapper idx={0} plantType={HtmlPlantType.Chrono} daysGrown={2} />
      <PlantWrapper idx={0} plantType={HtmlPlantType.Separatus} daysGrown={3} />
      <PlantWrapper idx={0} plantType={HtmlPlantType.Lexus} daysGrown={2} />
    </div>
  );
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
    () => randomGenerator() * 0.4 + 0.3,
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
