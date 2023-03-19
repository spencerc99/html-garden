import type p5Type from "p5";

export const IS_DEBUGGING = false;

interface LSystemInit {
  p5: p5Type;
  axiom: string;
  angle: number;
  lineLength: number;
  lengthMod: number;
  iterations: number;
  maxIterations?: number;
}

type InstructionType = "M" | "+" | "-" | "[" | "]" | "F" | "D" | "G" | "B";

interface InstructionTypeInfo {
  isDrawing: boolean;
}

const InstructionTypeToInfo: Record<InstructionType, InstructionTypeInfo> = {
  M: { isDrawing: false },
  "+": { isDrawing: false },
  "-": { isDrawing: false },
  "[": { isDrawing: false },
  "]": { isDrawing: false },
  F: { isDrawing: true },
  D: { isDrawing: true },
  G: { isDrawing: true },
  B: { isDrawing: true },
};

interface Instruction {
  key: InstructionType;
  instruction: () => void;
}

class LSystemBase {
  p5: p5Type;
  axiom: string;
  angle: number;
  lineLength: number;
  lengthMod: number;
  iterations: number;
  rules: any;
  instructions: Partial<Record<InstructionType, () => void>>;
  sentence: string;
  color: any;
  texture: any;
  maxIterations: number;
  timesDrawn: number;
  a: number;
  x: number;
  y: number;
  stack: number[][];

  constructor({
    p5,
    axiom,
    angle,
    lineLength,
    lengthMod,
    iterations,
    maxIterations = 3,
  }: LSystemInit) {
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
    this.maxIterations = maxIterations;
    this.stack = [];
    this.x = 0;
    this.y = 0;
    this.a = 0;
    this.sentence = this.axiom;

    this.addInstruction("M", () => {
      this.updatePosition();
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
  }

  updatePosition(distance: number = this.lineLength) {
    this.p5.translate(0, -distance);
    this.x += 0 * Math.cos(this.a) - -distance * Math.sin(this.a);
    this.y += -distance * Math.cos(this.a) + 0 * Math.sin(this.a);
  }
  addRule(input: string, output: string, chance: number = 1.0): this {
    this.rules[input] = {
      transform: output,
      chance: chance,
    };
    return this;
  }
  addInstruction(char: InstructionType, callback: () => void): this {
    this.instructions[char] = callback.bind(this);
    return this;
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
  draw() {
    if (this.timesDrawn >= this.maxIterations) {
      this.p5.noLoop();
      return;
    }

    this.p5.stroke(this.color);
    var chars = this.getTokens();
    chars.forEach((c) => {
      if (!this.instructions.hasOwnProperty(c)) {
        console.warn(`${c} instruction not handled`);
      }
      this.instructions[c]?.();
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

export class LSystem extends LSystemBase {
  constructor(props: LSystemInit) {
    super(props);
    this.addInstruction("F", () => {
      this.p5.line(0, 0, 0, -this.lineLength);
      this.updatePosition();
    });
  }
}

export class HtmlLSystem extends LSystemBase {
  tag: keyof HTMLElementTagNameMap;
  parentSelector: string;
  innerValue: string;
  extraProps: Record<string, string>;
  elementsDrawn: number;
  useStrictDimensions: boolean;
  useStrictWidth: boolean;
  renderVertically: boolean;
  drawingStack: Array<Instruction>;

  constructor(
    props: LSystemInit & {
      tag: keyof HTMLElementTagNameMap;
      parentSelector: string;
      innerValue?: string;
      extraProps?: Record<string, string>;
      useStrictDimensions?: boolean;
      useStrictWidth?: boolean;
      renderVertically?: boolean;
    }
  ) {
    super(props);
    this.tag = props.tag;
    this.parentSelector = props.parentSelector;
    this.innerValue = props.innerValue ?? this.tag;
    this.extraProps = props.extraProps || {};
    this.elementsDrawn = 0;
    this.useStrictDimensions = props.useStrictDimensions ?? false;
    this.useStrictWidth = props.useStrictWidth ?? false;
    this.renderVertically = props.renderVertically ?? false;
    this.a = this.renderVertically ? 270 : this.a;
    this.drawingStack = [];

    // same as F but rotate 90deg.
    this.addInstruction("G", () => {
      this.drawElement({ rotation: this.a + 270 });
      this.updatePosition();
    });
    // same as F but don't update position
    this.addInstruction("D", () => {
      this.drawElement();
    });
    this.addInstruction("F", () => {
      this.drawElement();
      this.updatePosition();
    });
    this.addInstruction("B", () => {
      const distance = this.lineLength * 1.3;
      const thickness = this.lineLength * 2;
      this.drawElement({ distance, width: thickness });
      this.updatePosition(distance);
    });
  }

  override draw() {
    if (this.timesDrawn >= this.maxIterations) {
      this.p5.noLoop();
      return;
    }

    if (this.drawingStack.length === 0) {
      // Add all the iterations of current tokens to the stack
      var chars = this.getTokens();
      // TODO: would be nice to eagerly look at "startswith" to handle multi-character instructions
      // let idx = 0;
      // while (idx < chars.length) {
      //   const toProcess = chars.slice(idx).join("");
      //   // sort by longest first, check matches against toProcess
      //   const [[_key, handler]] = Object.entries(this.instructions)
      //     .sort(([a], [b]) => b.length - a.length)
      //     .filter(([key]) => toProcess.startsWith(key));
      //   this.drawingStack.push({ key: _key as any, instruction: handler });
      //   idx += _key.length;
      // }
      chars.forEach((char) => {
        if (this.instructions.hasOwnProperty(char)) {
          this.drawingStack.push({
            key: char as any,
            instruction: this.instructions[char],
          });
        }
      });
    }

    // TODO: handle non-drawing instructions to execute immediately.
    let hasDrawn = false;
    while (this.drawingStack.length > 0 && !hasDrawn) {
      const { key, instruction } = this.drawingStack.shift();
      instruction();
      hasDrawn = InstructionTypeToInfo[key].isDrawing;
    }
    if (this.drawingStack.length === 0) {
      this.timesDrawn++;
    }
  }

  drawElement({
    width = this.lineLength,
    height = this.lineLength,
    distance = this.lineLength,
    rotation = this.a,
  }: {
    width?: number;
    height?: number;
    distance?: number;
    rotation?: number;
  } = {}) {
    const child = document.createElement(this.tag);
    child.innerText = IS_DEBUGGING
      ? `${this.innerValue}-${this.elementsDrawn}`
      : this.innerValue;
    if ("value" in child) {
      child.value = this.innerValue;
    }
    for (const [prop, val] of Object.entries(this.extraProps)) {
      child[prop] = val;
    }

    // @ts-ignore
    child.style = Object.entries({
      ...child.style,
      // fill in rotation to match with rotation of the line
      transform: `rotate(${rotation}deg)`,
      ...(this.useStrictDimensions
        ? {
            width: `${width}px`,
            height: `${height}px`,
          }
        : { maxWidth: `${width}px`, maxHeight: `${height}px` }),
      ...(this.useStrictWidth ? { width: `${width}px` } : {}),
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
      ...(IS_DEBUGGING
        ? {
            // add background where background is yellow in scaling brightness based on the number of elements drawn. The color should get lighter the greater numElementsDrawn is
            background: `hsl(60, 100%, ${Math.min(
              50,
              this.elementsDrawn * 10
            )}%)`,
          }
        : {}),
    })
      .map(([key, value]) => `${key}: ${value}`)
      .join(";");
    document.querySelector(this.parentSelector).appendChild(child);
    this.elementsDrawn++;
  }
}

// WIP data structure version
// export class HtmlLSystem {
//   rules: Record<string, InsertNodeData[]>;
//   iterations: number;
//   rootNode: Node;

//   constructor(rules: Record<string, InsertNodeData[]>, rootNode: Node) {
//     this.rules = rules;
//     this.iterations = 0;
//     this.rootNode = rootNode;
//   }

//   iterate() {
//     const newChildren = this.rootNode.extend(this.rules);
//     this.iterations++;
//     return newChildren;
//   }
// }

// interface NodeData {
//   tag: keyof HTMLElementTagNameMap;
//   x: number;
//   y: number;
//   style?: any;
// }

// type InsertNodeData = Omit<NodeData, "x" | "y"> &
//   Partial<Pick<NodeData, "x" | "y">>;

// const DefaultAngle = 30;
// const DefaultLineLength = 5;

// interface NodeOptions {
//   angle?: number;
//   lineLength?: number;
// }

// export class Node {
//   value: NodeData;
//   children: Node[];
//   angle: number;
//   lineLength: number;
//   currentAngle: number;
//   extended: boolean;

//   constructor(
//     value: NodeData,
//     { angle = DefaultAngle, lineLength = DefaultLineLength }: NodeOptions = {}
//   ) {
//     this.value = value;
//     this.children = [];
//     this.currentAngle = 0;
//     this.angle = angle;
//     this.lineLength = lineLength;
//     this.extended = true;
//   }

//   extend(rules: Record<string, InsertNodeData[]>) {
//     if (!this.extended) {
//       const newChildrenToInsert: InsertNodeData[] = rules[character];
//       const { x, y } = this.value;
//       const newChildren = [];
//       for (const newChild of newChildrenToInsert) {
//         const childX = x + Math.cos(this.currentAngle) * this.lineLength;
//         const childY = y + Math.sin(this.currentAngle) * this.lineLength;

//         newChildren.push(
//           new Node({
//             x: childX,
//             y: childY,
//             ...newChild,
//           })
//         );
//         this.currentAngle += this.angle;
//       }
//       this.children.push(...newChildren);
//       this.extended = true;
//     } else {
//     }
//   }
// }
