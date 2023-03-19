import { useEffect, useMemo, useRef } from "react";
import { HtmlLSystem, IS_DEBUGGING } from "../plant_factory";
import type p5Type from "p5";
import dynamic from "next/dynamic";

const Sketch = dynamic(import("react-p5"), { ssr: false });
const FrameRate = 6;
interface Props {
  type: HtmlPlantType;
  idx: number;
  daysGrown: number;
}

export const GenusName = "Elementum";

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
  tags: Array<keyof HTMLElementTagNameMap>;
  getLSystem: (
    p5: p5Type,
    parentSelector: string,
    maxIterations: number
  ) => HtmlLSystem;
  frameRate: number;
}

export const HtmlPlantTypeToSpecies = {
  [HtmlPlantType.Linchinus]: {
    type: HtmlPlantType.Linchinus,
    tags: ["a"],
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 39,
        lineLength: 15,
        lengthMod: 1,
        iterations: 3,
        tag: "a",
        parentSelector,
        innerValue: "link",
        extraProps: {
          href: "#",
        },
        maxIterations,
      }).addRule("F", "G[+F]F[-F]G"),
    frameRate: 10,
  },
  [HtmlPlantType.Botonus]: {
    type: HtmlPlantType.Botonus,
    tags: ["button"],
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 11.7,
        lineLength: 25,
        lengthMod: 1,
        iterations: 2,
        tag: "button",
        parentSelector,
        innerValue: "btn",
        maxIterations,
        renderVertically: true,
        useStrictDimensions: true,
      }).addRule("F", "F------M[----MF---MF]+++++M[+++MF----F]+"),
    frameRate: 6,
  },
  [HtmlPlantType.Datum]: {
    type: HtmlPlantType.Datum,
    // TODO: supoprt multiple tags and randomly pick between them?
    tags: ["input"],
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 25.7,
        lineLength: 30,
        lengthMod: 0.75,
        iterations: 2,
        tag: "input",
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
    tags: ["time"],
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) => {
      const time = new Date().toLocaleTimeString().split(" ")[0];
      return new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 23,
        lineLength: 30,
        lengthMod: 1,
        iterations: 2,
        tag: "time",
        parentSelector,
        maxIterations,
        useStrictWidth: true,
        innerValue: time,
        extraProps: { datetime: time },
        renderVertically: true,
      }).addRule("F", "F-[F]-[F]-[F]-");
    },
    frameRate: FrameRate / 3,
  },
  [HtmlPlantType.Separatus]: {
    type: HtmlPlantType.Separatus,
    tags: ["hr"],
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) => {
      return new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 30,
        lineLength: 12,
        lengthMod: 1,
        iterations: 3,
        tag: "hr",
        parentSelector,
        maxIterations,
        innerValue: "",
        useStrictWidth: true,
        renderVertically: true,
      }).addRule("F", "F[+F][-F][+F]");
    },
    frameRate: FrameRate,
  },
  [HtmlPlantType.Lexus]: {
    type: HtmlPlantType.Lexus,
    tags: ["code", "kbd", "samp", "var"],
    getLSystem: (p5: p5Type, parentSelector: string, maxIterations: number) => {
      return new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 70,
        lineLength: 28,
        lengthMod: 1,
        iterations: 3,
        tag: "code",
        parentSelector,
        maxIterations,
      }).addRule("F", "F[+F][-F][+F]");
    },
    frameRate: FrameRate * 2,
  },
} satisfies Record<HtmlPlantType, HtmlPlantInfo>;

export function HtmlPlant({ type, idx, daysGrown }: Props) {
  const info = useMemo(() => HtmlPlantTypeToSpecies[type], [type]);
  const system = useRef(null);

  const setup = (p5: p5Type) => {
    p5.noCanvas();
    p5.angleMode(p5.DEGREES);
    p5.frameRate(IS_DEBUGGING ? 30 : info.frameRate);
    /**
     * Branching Systems
     **/

    const newSystem = info.getLSystem(p5, `.${info.tags[0]}-${idx}`, daysGrown);
    system.current = newSystem;
    newSystem.run();
  };

  // The sketch draw method
  const draw = (p5: p5Type) => {
    if (!system.current) {
      return;
    }
    p5.push();
    p5.translate(p5.width * 0.5, p5.height);
    system.current.draw();
    p5.pop();
  };

  return (
    <div className={`${info.tags[0]}-${idx} htmlPlant`}>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}
