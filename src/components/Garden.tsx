/**
 * Applies an L-system to html elements
 *
 * REFERENCES:
 * - https://codepen.io/ada-lovecraft/pen/WxbRGM?editors=1010
 */

export function Garden() {
  return <></>;
}

function LSystem(axiom, angle, lineLength, lengthMod, iterations) {
  this.axiom = axiom;
  this.angle = parseFloat(angle);
  this._lineLength = lineLength;
  this.lineLength = this._lineLength;
  this.lengthMod = lengthMod;
  this.iterations = iterations;
  this.rules = {};
  this.instructions = {};
  this.color = color(255, 243, 217);
  this.texture = createGraphics(window.innerWidth, window.innerHeight);
  this.addInstruction("F", function () {
    line(0, 0, 0, -this.lineLength);
    translate(0, -this.lineLength);
  });
  this.addInstruction("+", function () {
    rotate(-this.angle);
  });
  this.addInstruction("-", function () {
    rotate(this.angle);
  });
  this.addInstruction("[", function () {
    push();
  });
  this.addInstruction("]", function () {
    pop();
  });
  this.sentence = this.axiom;
}
LSystem.prototype = {
  addRule: function (input, output, chance) {
    if (!chance) {
      chance = 1.0;
    }
    console.log("adding rule:", input, output, chance);
    this.rules[input] = {
      transform: output,
      chance: chance,
    };
  },
  addInstruction: function (char, callback, context) {
    if (!context) {
      context = this;
    }
    this.instructions[char] = callback.bind(context);
  },
  generate: function () {
    var s = "";
    var chars = this.getTokens();
    chars.forEach(function (c) {
      if (this.rules.hasOwnProperty(c)) {
        var rule = this.rules[c];
        var r = random();
        if (r <= rule.chance) {
          s += rule.transform;
        }
      } else {
        s += c;
      }
    }, this);
    this.sentence = s;
    this.lineLength *= this.lengthMod;
  },
  render: function () {},
  draw: function () {
    stroke(this.color);
    var chars = this.getTokens();
    chars.forEach(function (c) {
      if (this.instructions.hasOwnProperty(c)) {
        this.instructions[c]();
      }
    }, this);
  },
  getTokens: function () {
    return this.sentence.match(/./g);
  },
  run() {
    this.sentence = this.axiom;
    this.lineLength = this._lineLength;
    for (var i = 0; i < this.iterations; i++) {
      this.generate();
    }
  },
};
