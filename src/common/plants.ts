import type p5Type from "p5";
import { HtmlLSystem, IS_DEBUGGING } from "../plant_factory";
export const GenusName = "Elementum";
export const GenusNamePlural = "Elementi";
export const FrameRate = 6;

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

export enum HtmlPlantType {
  "Linchinus" = "Linchinus",
  "Botonus" = "Botonus",
  "Datum" = "Datum",
  "Chrono" = "Chrono",
  "Separatus" = "Separatus",
  "Lexus" = "Lexus",
}

export interface HtmlPlantInfo {
  type: HtmlPlantType;
  getLSystem: (
    p5: p5Type,
    parentSelector: string,
    maxIterations: number
  ) => HtmlLSystem;
  frameRate?: number;
  // returns an array corresponding to the number of active plants with a number representing how many iterations to render
  activePlants: () => number[];
}

export const HtmlPlantTypeToSpecies = {
  [HtmlPlantType.Linchinus]: {
    type: HtmlPlantType.Linchinus,
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 39,
        lineLength: 15,
        lengthMod: 1,
        iterations: 3,
        parentSelector,
        tagInfos: [
          {
            tag: "a",
            innerValue: "link",
            extraProps: {
              href: "/about",
            },
          },
          {
            tag: "a",
            innerValue: "rgy✳️",
            extraProps: {
              href: "http://html.energy/",
            },
          },
          {
            tag: "a",
            innerValue: "rev🟪",
            extraProps: {
              href: "https://thehtml.review/",
            },
          },
        ],
        maxIterations,
      }).addRule("F", "G[+F]F[-F]G"),
    frameRate: 10,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [1, 2, 3, 0, 2, 0, 4, 2, 0, 0, 1, 2, 1, 1];
    },
  },
  [HtmlPlantType.Botonus]: {
    type: HtmlPlantType.Botonus,
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 11.7,
        lineLength: 25,
        lengthMod: 1,
        iterations: 2,
        tagInfos: [{ tag: "button", innerValue: "btn" }],
        parentSelector,
        maxIterations,
        renderVertically: true,
        useStrictDimensions: true,
      }).addRule("F", "F------M[----MF---MF]+++++M[+++MF----F]+"),
    frameRate: 6,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [1, 2, 3, 0, 2, 0, 4, 2, 0, 0, 1, 2, 1, 1];
    },
  },
  [HtmlPlantType.Datum]: {
    type: HtmlPlantType.Datum,
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 25.7,
        lineLength: 30,
        lengthMod: 0.85,
        iterations: 3,
        tagInfos: [{ tag: "input", extraProps: { value: "input" } }],
        parentSelector,
        maxIterations,
        useStrictDimensions: true,
      })
        .addRule("F", "DM[+B][--B]F")
        .addRule("B", "B[+F]B"),
    frameRate: FrameRate,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [1, 2, 3, 0, 2, 0, 4, 2, 0, 0, 1, 2, 1, 1];
    },
  },
  [HtmlPlantType.Chrono]: {
    type: HtmlPlantType.Chrono,
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) => {
      const time = new Date().toLocaleTimeString().split(" ")[0];
      return new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 23,
        lineLength: 30,
        lengthMod: 1,
        iterations: 2,
        tagInfos: [
          { tag: "time", innerValue: time, extraProps: { datetime: time } },
        ],
        parentSelector,
        maxIterations,
        useStrictWidth: true,
        renderVertically: true,
      }).addRule("F", "F-[F]-[F]-[F]-");
    },
    frameRate: FrameRate / 3,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [1, 2, 3, 0, 2, 0, 4, 2, 0, 0, 1, 2, 1, 1];
    },
  },
  [HtmlPlantType.Separatus]: {
    type: HtmlPlantType.Separatus,
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) => {
      return new HtmlLSystem({
        p5,
        axiom: "G",
        angle: 30,
        lineLength: 12,
        lengthMod: 1,
        iterations: 3,
        tagInfos: [{ tag: "hr", innerValue: "" }],
        parentSelector,
        maxIterations,
        useStrictWidth: true,
      }).addRule("G", "G[+G][-G]M[+G]");
    },
    frameRate: FrameRate * 3,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [1, 2, 3, 0, 2, 0, 4, 2, 0, 0, 1, 2, 1, 1];
    },
  },
  [HtmlPlantType.Lexus]: {
    type: HtmlPlantType.Lexus,
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) => {
      return new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 70,
        lineLength: 28,
        lengthMod: 1,
        iterations: 3,
        tagInfos: [
          { tag: "code" },
          { tag: "kbd", innerValue: "Cmd" },
          { tag: "samp" },
          { tag: "var" },
        ],
        parentSelector,
        maxIterations,
      }).addRule("F", "F[+F][-F]+[+F]");
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [1, 2, 3, 0, 2, 0, 4, 2, 0, 0, 1, 2, 1, 1];
    },
  },
} satisfies Record<HtmlPlantType, HtmlPlantInfo>;
