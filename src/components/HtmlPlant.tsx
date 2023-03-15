import { useEffect, useMemo, useRef } from "react";
import { HtmlLSystem } from "../plant_factory";

interface Props {
  type: HtmlPlantType;
}

export enum HtmlPlantType {
  "ElementumLinchinus" = "ElementumLinchinus",
}

export interface HtmlPlantInfo {
  type: HtmlPlantType;
  name: string;
  tags: Array<keyof HTMLElementTagNameMap>;
}

export const HtmlPlantTypeToSpecies = {
  [HtmlPlantType.ElementumLinchinus]: {
    type: HtmlPlantType.ElementumLinchinus,
    name: "Elementum Linchinus",
    tags: ["a"],
  },
} satisfies Record<HtmlPlantType, HtmlPlantInfo>;

export function HtmlPlant({ type }: Props) {
  const info = useMemo(() => HtmlPlantTypeToSpecies[type], [type]);
  const root = useRef<HTMLDivElement>(null);
  const system = useMemo(() => new HtmlLSystem(new Node({})), []);

  useEffect(() => {
    const interval = setInterval(() => {
      const element = document.createElement(info.tags[0]);
      element.textContent = info.tags[0];
      root.current?.appendChild(element);
    }, 3000);

    return () => clearInterval(interval);
  }, [info.tags]);

  return <div ref={root}></div>;
}
