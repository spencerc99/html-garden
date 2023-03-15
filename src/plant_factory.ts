import type p5Type from "p5";
export function createHtmlPlantFactory() {}

function generateHtmlPlant({
  tag,
}: {
  iterations: number;
  tag: keyof HTMLElementTagNameMap;
}) {}

export class LSystem {
  p5: p5Type;
  axiom: string;
  angle: number;
  lineLength: number;
  lengthMod: number;
  iterations: number;
  rules: any;
  instructions: any;
  sentence: string;
  color: any;
  texture: any;
  maxIterations: number;
  timesDrawn: number;
  a: number;
  x: number;
  y: number;
  stack: number[][];

  constructor(
    p5: p5Type,
    axiom: string,
    angle: number,
    lineLength: number,
    lengthMod: number,
    iterations: number,
    tag: keyof HTMLElementTagNameMap = "input"
  ) {
    this.p5 = p5;
    this.axiom = axiom;
    this.angle = angle;
    this.lineLength = lineLength;
    this.lengthMod = lengthMod;
    this.iterations = iterations;
    this.rules = {};
    this.instructions = {};
    this.color = this.p5.color(255, 243, 217);
    this.texture = this.p5.createGraphics(
      window.innerWidth,
      window.innerHeight
    );
    this.timesDrawn = 0;
    this.maxIterations = 3;
    this.stack = [];
    this.x = 0;
    this.y = 0;
    this.a = 0;

    this.addInstruction("F", () => {
      this.p5.line(0, 0, 0, -this.lineLength);

      // TODO: REFACTOR ALL THE HTML STUFF OUT INTO A SEPARATE THING
      const child = document.createElement(tag);
      child.innerText = tag;
      child.value = tag;
      child.style = Object.entries({
        ...child.style,
        // fill in rotation to match with rotation of the line
        transform: `rotate(${this.a}deg)`,
        width: `${this.lineLength}px`,
        height: `${this.lineLength}px`,
        // TODO: need origin point here
        position: "absolute",
        left: `${-(
          this.x +
          0 * Math.cos(this.a) -
          -this.lineLength * Math.sin(this.a)
        )}px`,
        bottom: `${-(
          this.y +
          -this.lineLength * Math.cos(this.a) +
          0 * Math.sin(this.a)
        )}px`,
      })
        .map(([key, value]) => `${key}: ${value}`)
        .join(";");
      document.querySelector("#plant").appendChild(child);
      this.p5.translate(0, -this.lineLength);
      this.x += 0 * Math.cos(this.a) - -this.lineLength * Math.sin(this.a);
      this.y += -this.lineLength * Math.cos(this.a) + 0 * Math.sin(this.a);
    });
    this.addInstruction("B", () => {
      const distance = this.lineLength * 1.3;
      const thickness = this.lineLength * 2;
      this.p5.line(0, 0, 0, -distance);

      // TODO: REFACTOR ALL THE HTML STUFF OUT INTO A SEPARATE THING
      const child = document.createElement(tag);
      child.innerText = tag;
      child.value = tag;
      child.style = Object.entries({
        ...child.style,
        // fill in rotation to match with rotation of the line
        transform: `rotate(${this.a}deg)`,
        width: `${thickness}px`,
        height: `${this.lineLength}px`,
        // TODO: need origin point here
        position: "absolute",
        left: `${-(
          this.x +
          0 * Math.cos(this.a) -
          -distance * Math.sin(this.a)
        )}px`,
        bottom: `${-(
          this.y +
          -distance * Math.cos(this.a) +
          0 * Math.sin(this.a)
        )}px`,
      })
        .map(([key, value]) => `${key}: ${value}`)
        .join(";");
      document.querySelector("#plant").appendChild(child);
      this.p5.translate(0, -distance);
      this.x += 0 * Math.cos(this.a) - -distance * Math.sin(this.a);
      this.y += -distance * Math.cos(this.a) + 0 * Math.sin(this.a);
    });
    this.addInstruction("+", () => {
      this.p5.rotate(-this.angle);
      this.a += -this.angle;
    });
    this.addInstruction("-", () => {
      this.p5.rotate(this.angle);
      this.a += this.angle;
    });
    this.addInstruction("[", () => {
      this.p5.push();
      this.stack.push([this.x, this.y, this.a]);
    });
    this.addInstruction("]", () => {
      this.p5.pop();
      const [newX, newY, newA] = this.stack.pop();
      this.x = newX;
      this.y = newY;
      this.a = newA;
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
    if (this.timesDrawn >= this.maxIterations) {
      this.p5.noLoop();
      return;
    }

    this.p5.stroke(this.color);
    var chars = this.getTokens();
    chars.forEach((c) => {
      if (this.instructions.hasOwnProperty(c)) {
        this.instructions[c]();
      }
    });
    this.timesDrawn++;
  }
  getTokens() {
    return this.sentence.match(/./g);
  }
  run() {
    this.sentence = this.axiom;
    for (var i = 0; i < this.iterations; i++) {
      this.generate();
    }
  }
}

export class HtmlLSystem {
  rules: Record<string, InsertNodeData[]>;
  iterations: number;
  rootNode: Node;

  constructor(rules: Record<string, InsertNodeData[]>, rootNode: Node) {
    this.rules = rules;
    this.iterations = 0;
    this.rootNode = rootNode;
  }

  iterate() {
    const newChildren = this.rootNode.extend(this.rules);
    this.iterations++;
    return newChildren;
  }
}

interface NodeData {
  tag: keyof HTMLElementTagNameMap;
  x: number;
  y: number;
  style?: any;
}

type InsertNodeData = Omit<NodeData, "x" | "y"> &
  Partial<Pick<NodeData, "x" | "y">>;

const DefaultAngle = 30;
const DefaultLineLength = 5;

interface NodeOptions {
  angle?: number;
  lineLength?: number;
}

export class Node {
  value: NodeData;
  children: Node[];
  angle: number;
  lineLength: number;
  currentAngle: number;
  extended: boolean;

  constructor(
    value: NodeData,
    { angle = DefaultAngle, lineLength = DefaultLineLength }: NodeOptions = {}
  ) {
    this.value = value;
    this.children = [];
    this.currentAngle = 0;
    this.angle = angle;
    this.lineLength = lineLength;
    this.extended = true;
  }

  extend(rules: Record<string, InsertNodeData[]>) {
    if (!this.extended) {
      const newChildrenToInsert: InsertNodeData[] = rules[character];
      const { x, y } = this.value;
      const newChildren = [];
      for (const newChild of newChildrenToInsert) {
        const childX = x + Math.cos(this.currentAngle) * this.lineLength;
        const childY = y + Math.sin(this.currentAngle) * this.lineLength;

        newChildren.push(
          new Node({
            x: childX,
            y: childY,
            ...newChild,
          })
        );
        this.currentAngle += this.angle;
      }
      this.children.push(...newChildren);
      this.extended = true;
    } else {
    }
  }
}
