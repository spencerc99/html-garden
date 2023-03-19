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
      {/* TODO: just show label on hover? */}
      <div className="plantWrapper" style={{ bottom: "50%", left: "50%" }}>
        <HtmlPlant type={HtmlPlantType.Linchinus} idx={0} daysGrown={2} />
        <label>
          {GenusName} {HtmlPlantType.Linchinus}
        </label>
      </div>
      <div className="plantWrapper" style={{ bottom: "20%", left: "33%" }}>
        <HtmlPlant type={HtmlPlantType.Datum} idx={0} daysGrown={4} />
        <label>
          {GenusName} {HtmlPlantType.Datum}
        </label>
      </div>
      <div className="plantWrapper" style={{ bottom: "40%", left: "77%" }}>
        <HtmlPlant type={HtmlPlantType.Botonus} idx={0} daysGrown={3} />
        <label>
          {GenusName} {HtmlPlantType.Botonus}
        </label>
      </div>
      <div className="plantWrapper" style={{ bottom: "22%", left: "63%" }}>
        <HtmlPlant type={HtmlPlantType.Chrono} idx={0} daysGrown={1} />
        <label>
          {GenusName} {HtmlPlantType.Chrono}
        </label>
      </div>
      <div className="plantWrapper" style={{ bottom: "63%", left: "10%" }}>
        <HtmlPlant type={HtmlPlantType.Separatus} idx={0} daysGrown={3} />
        <label>
          {GenusName} {HtmlPlantType.Separatus}
        </label>
      </div>
      <div className="plantWrapper" style={{ bottom: "22%", left: "13%" }}>
        <HtmlPlant type={HtmlPlantType.Lexus} idx={0} daysGrown={2} />
        <label>
          {GenusName} {HtmlPlantType.Lexus}
        </label>
      </div>
    </div>
  );
}

function PlantWrapper() {}
