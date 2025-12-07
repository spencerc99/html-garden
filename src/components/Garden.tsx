import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HtmlPlant } from "./HtmlPlant";
import seedrandom from "seedrandom";
import {
  HtmlPlantType,
  GenusName,
  HtmlPlantTypeToSpecies,
} from "../common/plants";
import { StartDate } from "../pages";
import { isDevelopment, shuffleArray } from "../common/utils";

const MaxPlantsToDrawAtOnce = 40;
const ServerClientRandomGenerator = seedrandom(process.env.NODE_ENV);

function daysGrownToDate(daysGrown: number): Date {
  const date = new Date();
  date.setDate(StartDate.getDate() + daysGrown);
  return date;
}

export function Garden() {
  const ref = useRef<HTMLDivElement>();
  const [includedPlants, setIncludedPlants] = useState<Set<HtmlPlantType>>(
    // new Set(Object.values(HtmlPlantType))
    new Set([
      HtmlPlantType.Basis,
      HtmlPlantType.Espandre,
      HtmlPlantType.Iconos,
      HtmlPlantType.Porros,
      HtmlPlantType.Pictus,
      HtmlPlantType.Liste,
    ])
    // new Set([HtmlPlantType.Pictus])
  );
  const numPlants = useMemo(
    () =>
      Object.values(HtmlPlantTypeToSpecies).flatMap((species) =>
        species.activePlants()
      ).length,
    []
  );
  useEffect(() => {
    console.log(`${numPlants} active plants in the garden.`);
  }, [numPlants]);
  useEffect(() => {
    const headerHeight = document.querySelector("hgroup").clientHeight;
    ref.current.style.marginTop = `${headerHeight + 20 + 32}px`;
    setPlantsToRender(
      shuffleArray(
        Object.values(HtmlPlantTypeToSpecies)
          .filter((p) => includedPlants.has(p.type))
          .flatMap((species) =>
            species
              .activePlants()
              .map((daysGrown, idx) => (
                <PlantWrapper
                  key={`${species.type}-${idx}`}
                  idx={idx}
                  plantType={species.type}
                  daysGrown={daysGrown}
                  markFinishedGrowing={incrementPlantsEndIdx}
                />
              ))
          ),
        ServerClientRandomGenerator
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [plantsToRender, setPlantsToRender] = useState<any[]>([]);

  // TODO: add threshold for each to "sprout" new plant
  // TODO: figure out seasons for each, some modulo based on the date or intervals where it's in season? or maybe like moon phases where it grows to a peak and then shrinks?
  // contribute/cultivate your own plant?
  // - tamogotchi vibes lol
  // - pick from one of the species and you have to come back to water it.
  // or can you just adopt one (fake this by choosing a random one)
  // maybe by visiting the site many times, you earn the right to plant one.

  const [plantsEndIdx, setPlantsEndIdx] = useState(MaxPlantsToDrawAtOnce);
  const incrementPlantsEndIdx = useCallback(() => {
    // console.log(`incrementing ${plantsEndIdx} ${numPlants}`);
    if (plantsEndIdx >= numPlants) {
      return;
    }
    setPlantsEndIdx((endIdx) => endIdx + 1);
  }, [numPlants, plantsEndIdx]);

  // TODO: big season clock in the top right that simulates a real clock or day/night or moon, windchime? tools for watering? maybe make it out of datetime in a circle + a hand using progress bars or separatus
  // console.log(`${plantsEndIdx} plants rendered in the garden.`);

  return (
    <div id="garden" ref={ref}>
      {isDevelopment() && (
        <>
          <div id="debugActions"></div>
        </>
      )}
      {plantsToRender.slice(0, plantsEndIdx)}
    </div>
  );
}

const GardenWidth = 2400;
const GardenHeight = 2400;
function PlantWrapper({
  plantType,
  daysGrown,
  idx = 0,
  markFinishedGrowing,
}: {
  plantType: HtmlPlantType;
  daysGrown: number;
  idx: number;
  markFinishedGrowing: () => void;
}) {
  const plantId = useMemo(
    () =>
      `${plantType}-${idx}-${daysGrownToDate(daysGrown).toLocaleDateString()}`,
    [daysGrown, idx, plantType]
  );
  const randomGenerator = useMemo(() => seedrandom(plantId), [plantId]);
  // To make them appear in quadrants
  // const randomGenerator = DayRandomGenerator;
  // const numPlants = Object.keys(HtmlPlantType).length;
  // const typeIdx = Object.keys(HtmlPlantType).indexOf(plantType);
  // const inSecondHalf = typeIdx + 1 > numPlants / 2;
  // const basisBottom = inSecondHalf ? 50 : GardenHeight / 2 + 100;
  // const basisLeft =
  //   ((GardenWidth - 200) / (numPlants / 2)) * ((typeIdx + 1) % (numPlants / 2));
  // const bottom = useMemo(
  //   () => `${randomGenerator() * 150 - 75 + basisBottom}px`,
  //   [basisBottom, randomGenerator]
  // );
  // const left = useMemo(
  //   () => `${randomGenerator() * 200 + basisLeft}px`,
  //   [basisLeft, randomGenerator]
  // );

  const bottom = useMemo(
    () =>
      `${(Math.floor(randomGenerator() * 50) * (GardenHeight - 100)) / 50}px`,
    [randomGenerator]
  );
  const left = useMemo(
    () => `${randomGenerator() * (GardenWidth - 200) + 100}px`,
    [randomGenerator]
  );
  const randomRotation = useMemo(
    // TODO: normal distribution at 0, std dev of 30
    () => Math.floor(randomGenerator() * 6) * 10 - 30,
    [randomGenerator]
  );
  const randomScale = useMemo(
    () => Math.floor(randomGenerator() * 4) * 0.1 + 0.75,
    [randomGenerator]
  );

  const transform = `rotate(${randomRotation}deg) scale(${randomScale})`;

  return (
    <div
      className="plantWrapper"
      style={{
        bottom,
        left,
      }}
    >
      <HtmlPlant
        type={plantType}
        idx={idx}
        daysGrown={daysGrown}
        style={{
          transform,
        }}
        markFinishedGrowing={markFinishedGrowing}
      />
      <label>
        {GenusName} {plantType}
      </label>
    </div>
  );
}

export default Garden;
