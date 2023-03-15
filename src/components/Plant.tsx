import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type p5Type from "p5";
import { LSystem } from "../plant_factory";

const Sketch = dynamic(import("react-p5"), { ssr: false });

/**
 * Applies an L-system to html elements
 *
 * REFERENCES:
 * - https://codepen.io/ada-lovecraft/pen/WxbRGM?editors=1010
 */
export function Plant() {
  const getSystems = useMemo(() => {
    return (p5: p5Type) => {
      let systems = [];
      // A
      var a = new LSystem(p5, "F", 25.7, 75, 0.5, 6);
      a.color = p5.color(255, 243, 217);
      a.addRule("F", "F[+F]F[-F]F");

      // B
      var b = new LSystem(p5, "F", 20.0, 290, 0.5, 5);
      b.color = p5.color(198, 228, 255);
      b.addRule("F", "F[+F]F[-F][F]");

      //C
      var c = new LSystem(p5, "F", 22.5, 150, 0.5, 4);
      c.color = p5.color(194, 207, 207);
      c.addRule("F", "FF-[-F+F+F]+[+F-F-F]");

      //D
      var d = new LSystem(p5, "X", 20, 300, 0.5, 7);
      d.color = p5.color(125, 138, 102);
      d.addRule("X", "F[+X]F[-X]+X");
      d.addRule("F", "FF");

      // E
      var e = new LSystem(p5, "X", 25.7, 295, 0.5, 7);
      e.color = p5.color(219, 255, 175);
      e.addRule("X", "F[+X][-X]FX");
      e.addRule("F", "FF");

      // F
      var f = new LSystem(p5, "X", 22.5, 225, 0.5, 5);
      f.color = p5.color(255, 212, 206);
      f.addRule("X", "F-[[X]+X]+F[+FX]-X");
      f.addRule("F", "FF");

      systems.push(a, b, c, d, e, f);
      return systems;
    };
  }, []);
  const [system, setSystem] = useState(undefined);
  const setup = (p5: p5Type) => {
    p5.createCanvas(400, 400);
    p5.background(51);
    p5.angleMode(p5.DEGREES);
    /**
     * Branching Systems
     **/

    const newSystem = getSystems(p5)[0];
    setSystem(newSystem);
    console.log("system rules:", newSystem.rules);
    newSystem.run();
    console.log("system:", newSystem);
  };

  // The sketch draw method
  const draw = (p5: p5Type) => {
    p5.background(51);
    p5.strokeWeight(1);
    p5.noFill();
    p5.push();
    p5.translate(p5.width * 0.5, p5.height);
    system.draw();
    p5.pop();
  };
  return <Sketch setup={setup} draw={draw} />;
}
