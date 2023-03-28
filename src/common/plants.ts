import type p5Type from "p5";
import { HtmlLSystem, IS_DEBUGGING } from "../plant_factory";
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
  // returns an array corresponding to the number of active plants with a number representing how many iterations to render
  season: string;
  activePlants: () => number[];
}

export const HtmlPlantTypeToSpecies = {
  [HtmlPlantType.Linchinus]: {
    type: HtmlPlantType.Linchinus,
    season: "all the time, everywhere",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 39,
        lineLength: 15,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
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
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [3, 4, 2, 1, 0];
    },
  },
  [HtmlPlantType.Botonus]: {
    type: HtmlPlantType.Botonus,
    season: "when fun is in the air",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 33,
        lineLength: 20,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
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
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [1, 2, 3];
    },
  },
  [HtmlPlantType.Datum]: {
    type: HtmlPlantType.Datum,
    season: "whenever the earth has energy to give",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 25.7,
        lineLength: 30,
        lengthMod: 0.85,
        iterations: daysGrown,
        limitMaxElements,
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
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [1, 2, 3];
    },
  },
  [HtmlPlantType.Chrono]: {
    type: HtmlPlantType.Chrono,
    season: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean
    ) => {
      return new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 23,
        lineLength: 30,
        lengthMod: 1,
        limitMaxElements,
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
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [1, 2, 3];
    },
  },
  [HtmlPlantType.Separatus]: {
    type: HtmlPlantType.Separatus,
    season: "separating",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean
    ) => {
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: 30,
        lineLength: 12,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        tagInfos: [{ tag: "hr", innerValue: "" }],
        parentSelector,
        useStrictWidth: true,
      })
        .addRule("S", "G[+G][++F]G[--F][-G]M")
        .addRule("G", "G[+G][++F]G[--F][-G]M");
    },
    frameRate: FrameRate * 3,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [1, 2, 3];
    },
  },
  [HtmlPlantType.Lexus]: {
    type: HtmlPlantType.Lexus,
    season: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean
    ) => {
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: 70,
        lineLength: 28,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
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
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [1, 2, 3];
    },
  },
  [HtmlPlantType.Espandre]: {
    type: HtmlPlantType.Espandre,
    season: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean
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
    season: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean
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
    season: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean
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
    season: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean
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
    season: "",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean
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
