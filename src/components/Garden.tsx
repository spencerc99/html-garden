import { useEffect, useMemo, useState } from "react";
import { GenusName, HtmlPlant, HtmlPlantType } from "./HtmlPlant";

export function Garden() {
  useEffect(() => {}, []);

  // TODO: add max growth (ideally exponentially harder)
  // TODO: add threshold for each to "sprout" new plant
  // TODO: figure out seasons for each, some modulo based on the date or intervals where it's in season? or maybe like moon phases where it grows to a peak and then shrinks?

  // TODO: big season clock in the top right that simulates a real clock or day/night or moon, windchime? tools for watering?
  // TODO: some progress or indicator of seeds of other ones that aren't growing right now?

  return (
    <div id="garden">
      <PlantWrapper
        bottom={"50%"}
        left={"50%"}
        plantType={HtmlPlantType.Linchinus}
        daysGrown={2}
      />
      <PlantWrapper
        bottom={"20%"}
        left={"33%"}
        plantType={HtmlPlantType.Datum}
        daysGrown={4}
      />
      <PlantWrapper
        bottom={"40%"}
        left={"77%"}
        plantType={HtmlPlantType.Botonus}
        daysGrown={3}
      />
      <PlantWrapper
        bottom={"22%"}
        left={"63%"}
        plantType={HtmlPlantType.Chrono}
        daysGrown={2}
      />
      <PlantWrapper
        bottom={"53%"}
        left={"14%"}
        plantType={HtmlPlantType.Separatus}
        daysGrown={3}
        rotationDegs={13}
      />
      <PlantWrapper
        bottom={"22%"}
        left={"13%"}
        plantType={HtmlPlantType.Lexus}
        daysGrown={2}
      />
    </div>
  );
}

function PlantWrapper({
  bottom,
  left,
  plantType,
  daysGrown,
  rotationDegs,
}: {
  bottom: string;
  left: string;
  plantType: HtmlPlantType;
  daysGrown: number;
  rotationDegs?: number;
}) {
  /* TODO: just show label on hover? */
  return (
    <div
      className="plantWrapper"
      style={{
        bottom,
        left,
        transform: rotationDegs ? `rotate(${rotationDegs}deg)` : "",
      }}
    >
      <HtmlPlant type={plantType} idx={0} daysGrown={daysGrown} />
      {/* <label>
        {GenusName} {plantType}
      </label> */}
    </div>
  );
}
