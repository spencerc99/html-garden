import type p5Type from "p5";
import { HtmlLSystem, IS_DEBUGGING } from "../plant_factory";
export const GenusName = "Elementum";
export const FrameRate = 6;

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
  },
} satisfies Record<HtmlPlantType, HtmlPlantInfo>;