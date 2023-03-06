import dynamic from "next/dynamic";
import { useEffect } from "react";

/**
 * Applies an L-system to html elements
 *
 * REFERENCES:
 * - https://codepen.io/ada-lovecraft/pen/WxbRGM?editors=1010
 */
export function Garden() {
  useEffect(() => {
    async function setupSketch() {
      const P5 = (await import("p5")).default;
      new P5((p5: any) => {
        /**
         * Branching Systems
         **/
        let systems = [];
        // A
        var a = new LSystem(p5, "F", 25.7, 75, 0.5, 5);
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
        const system = systems[0];
        console.log("system rules:", system.rules);
        system.run();
        console.log("system:", system);
        // const gui = new dat.GUI();
        // let newC = gui.add(this, "preset", [0, 1, 2, 3, 4, 5]);
        // newC.onFinishChange(loadPreset);

        p5.setup = () => {
          const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
          canvas.parent("garden");
          p5.background(51);
          p5.angleMode(p5.DEGREES);
        };

        // The sketch draw method
        p5.draw = () => {
          p5.background(51);
          p5.strokeWeight(1);
          p5.noFill();
          p5.push();
          p5.translate(p5.width * 0.5, p5.height);
          system.draw();
          p5.pop();
        };
      });
    }
    setupSketch();
  }, []);

  return <div id="garden"></div>;
}

// function loadPreset(x) {
//   console.log("loading preset:", x);
//   system = systems[x];
//   system.run();
// }

class LSystem {
  p5: P5;
  axiom: string;
  angle: number;
  _lineLength: number;
  lineLength: number;
  lengthMod: number;
  iterations: number;
  rules: any;
  instructions: any;
  sentence: string;
  color: any;
  texture: any;

  constructor(p5: P5, axiom, angle, lineLength, lengthMod, iterations) {
    this.p5 = p5;
    this.axiom = axiom;
    this.angle = parseFloat(angle);
    this._lineLength = lineLength;
    this.lineLength = this._lineLength;
    this.lengthMod = lengthMod;
    this.iterations = iterations;
    this.rules = {};
    this.instructions = {};
    this.color = this.p5.color(255, 243, 217);
    this.texture = this.p5.createGraphics(
      window.innerWidth,
      window.innerHeight
    );
    this.addInstruction("F", () => {
      this.p5.line(0, 0, 0, -this.lineLength);
      this.p5.translate(0, -this.lineLength);
    });
    this.addInstruction("+", () => {
      this.p5.rotate(-this.angle);
    });
    this.addInstruction("-", () => {
      this.p5.rotate(this.angle);
    });
    this.addInstruction("[", () => {
      this.p5.push();
    });
    this.addInstruction("]", () => {
      this.p5.pop();
    });
    this.sentence = this.axiom;
  }

  addRule(input: string, output: string, chance: number = 1.0) {
    this.rules[input] = {
      transform: output,
      chance: chance,
    };
  }
  addInstruction(char, callback) {
    this.instructions[char] = callback.bind(this);
  }
  generate() {
    var s = "";
    var chars = this.getTokens();
    chars.forEach((c) => {
      if (this.rules.hasOwnProperty(c)) {
        var rule = this.rules[c];
        var r = this.p5.random();
        if (r <= rule.chance) {
          s += rule.transform;
        }
      } else {
        s += c;
      }
    });
    this.sentence = s;
    this.lineLength *= this.lengthMod;
  }
  render() {}
  draw() {
    this.p5.stroke(this.color);
    var chars = this.getTokens();
    chars.forEach((c) => {
      if (this.instructions.hasOwnProperty(c)) {
        this.instructions[c]();
      }
    });
  }
  getTokens() {
    return this.sentence.match(/./g);
  }
  run() {
    this.sentence = this.axiom;
    this.lineLength = this._lineLength;
    for (var i = 0; i < this.iterations; i++) {
      this.generate();
    }
  }
}
