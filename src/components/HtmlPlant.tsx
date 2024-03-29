import { CSSProperties, useEffect, useMemo, useRef } from "react";
import { IS_DEBUGGING } from "../plant_factory";
import type p5Type from "p5";
import dynamic from "next/dynamic";
import {
  FrameRate,
  HtmlPlantType,
  HtmlPlantTypeToSpecies,
} from "../common/plants";

const Sketch = dynamic(import("react-p5"), { ssr: false });
interface Props {
  type: HtmlPlantType;
  idx: number;
  daysGrown: number;
  style?: CSSProperties;
  limitMaxElements?: boolean;
  markFinishedGrowing?: () => void;
}

export function HtmlPlant({
  type,
  idx,
  daysGrown,
  style = {},
  limitMaxElements,
  markFinishedGrowing,
}: Props) {
  const plantId = useMemo(() => `${type}-${idx}`, [idx, type]);

  const info = useMemo(() => HtmlPlantTypeToSpecies[type], [type]);
  const system = useRef(null);
  const setup = (p5: p5Type) => {
    p5.angleMode(p5.DEGREES);
    p5.frameRate(IS_DEBUGGING ? 30 : info.frameRate ?? FrameRate);
    /**
     * Branching Systems
     **/

    const newSystem = info.getLSystem(
      p5,
      `.${plantId}`,
      daysGrown,
      limitMaxElements,
      markFinishedGrowing
    );
    system.current = newSystem;
    newSystem.run();
    p5.noCanvas();
    // see this issue for
    // https://stackoverflow.com/questions/52532614/total-canvas-memory-use-exceeds-the-maximum-limit-safari-12#comment102082116_52586606
    document.querySelectorAll("canvas").forEach((e) => {
      e.height = 0;
      e.width = 0;
    });
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

  useEffect(() => {
    return () =>
      document.querySelectorAll("canvas").forEach((e) => {
        e.height = 0;
        e.width = 0;
      });
  });

  return (
    <div className={`${plantId} htmlPlant`} style={style}>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}
