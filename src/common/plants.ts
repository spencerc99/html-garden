import type p5Type from "p5";
import { HtmlLSystem, IS_DEBUGGING } from "../plant_factory";
export const GenusName = "Elementum";
export const GenusNamePlural = "Elementi";
export const FrameRate = 15;

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
  "Espandre" = "Espandre",
  "Basis" = "Basis",
  "Pictus" = "Pictus",
  "Porros" = "Porros",
  "Liste" = "Liste",
}

export interface HtmlPlantInfo {
  type: HtmlPlantType;
  getLSystem: (
    p5: p5Type,
    parentSelector: string,
    maxIterations: number,
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
      maxIterations: number,
      limitMaxElements?: boolean
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 39,
        lineLength: 15,
        lengthMod: 1,
        iterations: 3,
        limitMaxElements,
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
        maxIterations,
      })
        .addRule("F", "F[+F]G[-F]F")
        .addRule("G", "G[+F]F[-F]"),
    frameRate: 10,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [3, 4, 3, 2, 1, 0];
    },
  },
  [HtmlPlantType.Botonus]: {
    type: HtmlPlantType.Botonus,
    season: "when fun is in the air",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      maxIterations: number,
      limitMaxElements?: boolean
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 11.7,
        lineLength: 25,
        lengthMod: 1,
        iterations: 2,
        limitMaxElements,
        tagInfos: [
          {
            tag: "button",
            innerValue: "btn",
            extraProps: {
              onclick: (e: React.MouseEvent<HTMLButtonElement>) => {
                debugger;
                e.currentTarget.attributes["flatten"] =
                  (e.currentTarget.attributes["flatten"] ?? 0) % 90 === 60
                    ? (e.currentTarget.attributes["flatten"] + 50) % 180
                    : (e.currentTarget.attributes["flatten"] ?? 0) + 10;
                const nonSkewTransform =
                  e.currentTarget.style.transform.replace(/\s*skew.*/g, "");
                e.currentTarget.style.transform = `${nonSkewTransform} skew(${e.currentTarget.attributes["flatten"]}deg)`;
              },
            },
          },
        ],
        parentSelector,
        maxIterations,
        renderVertically: true,
        useStrictDimensions: true,
      }).addRule("F", "F------M[----MF---MF]+++++M[+++MF----F]+"),
    frameRate: FrameRate,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [3, 4, 5, 2, 1, 0];
    },
  },
  [HtmlPlantType.Datum]: {
    type: HtmlPlantType.Datum,
    season: "whenever the earth has energy to give",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      maxIterations: number,
      limitMaxElements?: boolean
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 25.7,
        lineLength: 30,
        lengthMod: 0.85,
        iterations: 3,
        limitMaxElements,
        tagInfos: [{ tag: "input", extraProps: { value: "input" } }],
        parentSelector,
        maxIterations,
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
      return [3, 4, 5, 2, 1, 0];
    },
  },
  [HtmlPlantType.Chrono]: {
    type: HtmlPlantType.Chrono,
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      maxIterations: number,
      limitMaxElements?: boolean
    ) => {
      const time = new Date().toLocaleTimeString().split(" ")[0];
      return new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 23,
        lineLength: 30,
        lengthMod: 1,
        limitMaxElements,
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
      return [3, 4, 5, 2, 1, 0];
    },
  },
  [HtmlPlantType.Separatus]: {
    type: HtmlPlantType.Separatus,
    season: "separating",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      maxIterations: number,
      limitMaxElements?: boolean
    ) => {
      return new HtmlLSystem({
        p5,
        axiom: "G",
        angle: 30,
        lineLength: 12,
        lengthMod: 1,
        iterations: 3,
        limitMaxElements,
        tagInfos: [{ tag: "hr", innerValue: "" }],
        parentSelector,
        maxIterations,
        useStrictWidth: true,
      }).addRule("G", "G[+G]GM[+G][-G]");
    },
    frameRate: FrameRate * 3,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return [3, 4, 5, 2, 1, 0];
    },
  },
  [HtmlPlantType.Lexus]: {
    type: HtmlPlantType.Lexus,
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      maxIterations: number,
      limitMaxElements?: boolean
    ) => {
      return new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 70,
        lineLength: 28,
        lengthMod: 1,
        iterations: 3,
        limitMaxElements,
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
      return [3, 4, 5, 2, 1, 0];
    },
  },
} satisfies Record<HtmlPlantType, HtmlPlantInfo>;
