import { CSSProperties, useMemo, useRef } from "react";
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
}

export function HtmlPlant({ type, idx, daysGrown, style = {} }: Props) {
  const plantId = useMemo(() => `${type}-${idx}`, [idx, type]);

  const info = useMemo(() => HtmlPlantTypeToSpecies[type], [type]);
  const system = useRef(null);
  const setup = (p5: p5Type) => {
    p5.angleMode(p5.DEGREES);
    p5.frameRate(IS_DEBUGGING ? 30 : info.frameRate ?? FrameRate);
    /**
     * Branching Systems
     **/

    const newSystem = info.getLSystem(p5, `.${plantId}`, daysGrown);
    system.current = newSystem;
    newSystem.run();
    p5.noCanvas();
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
    <div className={`${plantId} htmlPlant`} style={style}>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}
