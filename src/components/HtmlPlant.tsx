import { useEffect, useMemo, useRef } from "react";
import { HtmlLSystem, IS_DEBUGGING } from "../plant_factory";
import type p5Type from "p5";
import dynamic from "next/dynamic";

const Sketch = dynamic(import("react-p5"), { ssr: false });
const FrameRate = 0.5;
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
        angle: 25.7,
        lineLength: 50,
        lengthMod: 0.5,
        iterations: 1,
        tag: "a",
        parentSelector,
        innerValue: "link",
        extraProps: {
          href: "#",
        },
        maxIterations,
      }).addRule("F", "G[+F][-F]G"),
    frameRate: 1.5,
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
      }).addRule("F", "F------M[----F---F]+++++M[+++F----F]+"),
    frameRate: FrameRate,
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
        lineLength: 75,
        lengthMod: 0.6,
        iterations: 3,
        tag: "input",
        parentSelector,
        maxIterations,
        useStrictDimensions: true,
      })
        .addRule("F", "F[+B][--F]F")
        .addRule("B", "B[+F]B[-F]B"),
    frameRate: 1,
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
    frameRate: 2,
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
    frameRate: 2,
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
