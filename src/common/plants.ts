import type p5Type from "p5";
import { allDaysGenerator, GardenGrowingDays } from "../pages";
import { DayRandomGenerator, HtmlLSystem } from "../plant_factory";
export const GenusName = "Elementum";
export const GenusNamePlural = "Elementi";
export const FrameRate = 30;

const referenceDate = new Date();
const dayOfYear = Math.floor(
  (referenceDate.getTime() -
    new Date(referenceDate.getFullYear(), 0, 0).getTime()) /
    1000 /
    60 /
    60 /
    24
);

// retrieve the current season based on equinox and solstice dates
export function currentSeason() {
  if (dayOfYear >= 79 && dayOfYear < 172) {
    return "spring";
  } else if (dayOfYear >= 172 && dayOfYear < 266) {
    return "summer";
  } else if (dayOfYear >= 266 && dayOfYear < 355) {
    return "fall";
  } else {
    return "winter";
  }
}

const time = new Date().toLocaleTimeString().split(" ")[0];

export enum HtmlPlantType {
  "Botonus" = "Botonus",
  "Chrono" = "Chrono",
  "Linchinus" = "Linchinus",
  "Espandre" = "Espandre",
  "Lexus" = "Lexus",
  "Basis" = "Basis",
  "Datum" = "Datum",
  "Pictus" = "Pictus",
  "Porros" = "Porros",
  "Separatus" = "Separatus",
  "Liste" = "Liste",
}

export interface HtmlPlantInfo {
  type: HtmlPlantType;
  getLSystem: (
    p5: p5Type,
    parentSelector: string,
    daysGrown: number,
    limitMaxElements?: boolean
  ) => HtmlLSystem;
  frameRate?: number;
  whereGrowsDescription: string;
  // returns an array corresponding to the number of active plants with a number representing how many iterations to render
  activePlants: () => number[];
}

// Use month to determine which plants are in season randomly
// every day of growing, a 50% chance for each plant to grow
// if a plant grows, it will grow for a random number of days logarithmically up to 5 days
const DefaultGetActivePlants = () => {
  const activePlants: number[] = Array.from(
    { length: GardenGrowingDays },
    (_, i) => GardenGrowingDays - i
  ).flatMap((day) =>
    allDaysGenerator[(day - GardenGrowingDays) * -1]() > 0.25 ? day : []
  );

  // add some entropy to the number of active plants
  return activePlants.map((day) => {
    // return Math.min(Math.floor(Math.log(day) / Math.log(2)), 5);
    if (day <= 2) {
      return 0;
    }
    if (day < 5) {
      return 1;
    }
    if (day <= 15) {
      return 2;
    }
    if (day <= 26) {
      return 3;
    }
    if (day <= 45) {
      return 4;
    }
    if (day >= 46) {
      return 5;
    }
  });
};

export const HtmlPlantTypeToSpecies = {
  [HtmlPlantType.Linchinus]: {
    type: HtmlPlantType.Linchinus,
    whereGrowsDescription:
      "all the time, everywhere, in the corners and cracks of websites",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 39,
        lineLength: 15,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        parentSelector,
        tagInfos: [
          {
            tag: "a",
            innerValue: "link",
            extraProps: {
              href: "/guide",
            },
          },
          {
            tag: "a",
            innerValue: "rgy",
            extraProps: {
              href: "http://html.energy/",
            },
          },
          {
            tag: "a",
            innerValue: "rev",
            extraProps: {
              href: "https://thehtml.review/",
            },
          },
        ],
      })
        .addRule("F", "F[+F]G[-F]F")
        .addRule("G", "G[+F]F[-F]"),
    frameRate: FrameRate,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Botonus]: {
    type: HtmlPlantType.Botonus,
    whereGrowsDescription:
      "when fun is in the air and play is to be had and desire yearns for effect",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 33,
        lineLength: 20,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [
          {
            tag: "button",
            innerValue: "btn",
            extraProps: {
              onclick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.attributes["flatten"] =
                  (e.currentTarget.attributes["flatten"] ?? 0) % 90 === 60
                    ? (e.currentTarget.attributes["flatten"] + 60) % 180
                    : (e.currentTarget.attributes["flatten"] ?? 0) + 30;
                const nonSkewTransform =
                  e.currentTarget.style.transform.replace(/\s*skew.*/g, "");
                e.currentTarget.style.transform = `${nonSkewTransform} skew(${e.currentTarget.attributes["flatten"]}deg)`;
              },
            },
          },
        ],
        parentSelector,
        useStrictWidth: true,
        renderVertically: true,
      })
        .addRule("F", "F[+G]F[-G]")
        .addRule("G", "G[-G]M[+F]"),
    frameRate: FrameRate,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Datum]: {
    type: HtmlPlantType.Datum,
    whereGrowsDescription:
      "whenever the earth has energy to receive the energy seeping off its inhabitants",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 25.7,
        lineLength: 30,
        lengthMod: 0.85,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [{ tag: "input", extraProps: { value: "input" } }],
        parentSelector,
        useStrictDimensions: true,
      })
        .addRule("F", "F[+B]F[+B][-F]")
        .addRule("B", "B[+F]B[-F]"),
    // .addRule("F", "+DM[+B][--B]F")
    // .addRule("B", "B[+F]B"),
    frameRate: FrameRate,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Chrono]: {
    type: HtmlPlantType.Chrono,
    whereGrowsDescription:
      "where seconds grow up and minutes learn of the world and hours go to rest",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      return new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 23,
        lineLength: 30,
        lengthMod: 1,
        limitMaxElements,
        markFinishedGrowing,
        iterations: daysGrown,
        tagInfos: [
          { tag: "time", innerValue: time, extraProps: { datetime: time } },
        ],
        parentSelector,
        useStrictWidth: true,
        renderVertically: true,
      }).addRule("F", "F-[F]-[F]-[F]-");
    },
    frameRate: FrameRate,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Separatus]: {
    type: HtmlPlantType.Separatus,
    whereGrowsDescription:
      "where words grow like weeds beyond maintenance and meaning, when division is natural",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: 30,
        lineLength: 12,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [{ tag: "hr" }],
        parentSelector,
        useStrictWidth: true,
      })
        .addRule("S", "G[+G][++F]G[--F][-G]M")
        .addRule("G", "G[+G][++F]G[--F][-G]M");
    },
    frameRate: FrameRate * 3,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Lexus]: {
    type: HtmlPlantType.Lexus,
    whereGrowsDescription:
      "in dark places under moonlight, when bright colors contrast with grey backgrounds",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: 70,
        lineLength: 28,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [
          { tag: "code" },
          { tag: "kbd", innerValue: "Cmd" },
          { tag: "samp" },
          { tag: "var" },
        ],
        parentSelector,
      })
        .addRule("S", "F[+F][-F]+[-F]")
        .addRule("F", "F[+F][-F]+", 0.8);
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Espandre]: {
    type: HtmlPlantType.Espandre,
    whereGrowsDescription: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      //   @ts-ignore
      return new HtmlLSystem({ p5 });
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [];
    },
  },
  [HtmlPlantType.Basis]: {
    type: HtmlPlantType.Basis,
    whereGrowsDescription: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      //   @ts-ignore
      return new HtmlLSystem({ p5 });
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [];
    },
  },
  [HtmlPlantType.Pictus]: {
    type: HtmlPlantType.Pictus,
    whereGrowsDescription: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      //   @ts-ignore
      return new HtmlLSystem({ p5 });
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [];
    },
  },
  [HtmlPlantType.Porros]: {
    type: HtmlPlantType.Porros,
    whereGrowsDescription: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      //   @ts-ignore
      return new HtmlLSystem({ p5 });
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [];
    },
  },
  [HtmlPlantType.Liste]: {
    type: HtmlPlantType.Liste,
    whereGrowsDescription: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      //   @ts-ignore
      return new HtmlLSystem({ p5 });
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [];
    },
  },
} satisfies Record<HtmlPlantType, HtmlPlantInfo>;
