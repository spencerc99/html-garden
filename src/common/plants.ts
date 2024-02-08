import type p5Type from "p5";
import { allDaysGenerator, GardenGrowingDays } from "../pages";
import { DayRandomGenerator, HtmlLSystem } from "../plant_factory";
import { randomChoice } from "./utils";
export const GenusName = "Elementum";
export const GenusNamePlural = "Elementi";
export const FrameRate = 15;

const referenceDate = new Date();
const dayOfYear = Math.floor(
  (referenceDate.getTime() -
    new Date(referenceDate.getFullYear(), 0, 0).getTime()) /
    1000 /
    60 /
    60 /
    24
);

// retrieve the current season based on equinox and solstice dates
export function currentSeason() {
  if (dayOfYear >= 79 && dayOfYear < 172) {
    return "spring";
  } else if (dayOfYear >= 172 && dayOfYear < 266) {
    return "summer";
  } else if (dayOfYear >= 266 && dayOfYear < 355) {
    return "fall";
  } else {
    return "winter";
  }
}

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}
// const contrastColor = (color) => {
//   const lum = [0.299 /*red*/, 0.587 /*green*/, 0.114 /*blue*/].reduce(
//     (result, value, index) => {
//       // with reduce() we can convert an array of numbers into a single number
//       // result = previous result returned by this function
//       // value = https://www.w3.org/TR/AERT/#color-contrast
//       // index = current position index in the array
//       // num = decimal number of Red, Green or Blue color
//       const num = parseInt(color.substr(index * 2 + 1, 2), 16);
//       return num * value + result;
//     },
//     0 /* result = 0 */
//   );

//   const isDark = lum < 128;
//   const index = ~~isDark; // convert boolean into 0 or 1
//   return ["#000", "#fff"][index];
// };

const time = new Date().toLocaleTimeString().split(" ")[0];

export enum HtmlPlantType {
  "Botonus" = "Botonus",
  "Chrono" = "Chrono",
  "Linchinus" = "Linchinus",
  "Espandre" = "Espandre",
  "Lexus" = "Lexus",
  "Basis" = "Basis",
  "Datum" = "Datum",
  "Pictus" = "Pictus",
  "Porros" = "Porros",
  "Separatus" = "Separatus",
  "Liste" = "Liste",
  "Iconos" = "Iconos",
}

export interface HtmlPlantInfo {
  type: HtmlPlantType;
  getLSystem: (
    p5: p5Type,
    parentSelector: string,
    daysGrown: number,
    limitMaxElements?: boolean
  ) => HtmlLSystem;
  frameRate?: number;
  whereGrowsDescription: string;
  htmlTags: (keyof HTMLElementTagNameMap)[];
  // returns an array corresponding to the number of active plants with a number representing how many iterations to render
  activePlants: () => number[];
}

// Use month to determine which plants are in season randomly
// every day of growing, a 50% chance for each plant to grow
// if a plant grows, it will grow for a random number of days logarithmically up to 5 days
const DefaultGetActivePlants = () => {
  const activePlants: number[] = Array.from(
    { length: GardenGrowingDays },
    (_, i) => GardenGrowingDays - i
  ).flatMap((day) =>
    allDaysGenerator[(day - GardenGrowingDays) * -1]() > 0.25 ? day : []
  );

  // add some entropy to the number of active plants
  return activePlants.map((day) => {
    // return Math.min(Math.floor(Math.log(day) / Math.log(2)), 5);
    if (day <= 2) {
      return 0;
    }
    if (day < 5) {
      return 1;
    }
    if (day <= 15) {
      return 2;
    }
    if (day <= 26) {
      return 3;
    }
    if (day <= 45) {
      return 4;
    }
    if (day >= 46) {
      return 5;
    }
  });
};

export const HtmlPlantTypeToSpecies = {
  [HtmlPlantType.Linchinus]: {
    type: HtmlPlantType.Linchinus,
    whereGrowsDescription:
      "all the time, everywhere, in the corners and cracks of websites",
    htmlTags: ["a"],
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 39,
        lineLength: 15,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        parentSelector,
        tagInfos: [
          {
            tag: "a",
            innerValue: "link",
            extraProps: {
              href: "/",
            },
          },
          {
            tag: "a",
            innerValue: "rev",
            extraProps: {
              href: "https://thehtml.review/",
            },
          },
        ],
      })
        .addRule("F", "F[+F]G[-F]F")
        .addRule("G", "G[+F]F[-F]"),
    frameRate: FrameRate,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Botonus]: {
    type: HtmlPlantType.Botonus,
    htmlTags: ["button"],
    whereGrowsDescription:
      "where fun is in the air and play is to be had and desire yearns for effect",
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 33,
        lineLength: 20,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [
          {
            tag: "button",
            innerValue: "btn",
            extraProps: {
              onclick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.attributes["flatten"] =
                  (e.currentTarget.attributes["flatten"] ?? 0) % 90 === 60
                    ? (e.currentTarget.attributes["flatten"] + 60) % 180
                    : (e.currentTarget.attributes["flatten"] ?? 0) + 30;
                const nonSkewTransform =
                  e.currentTarget.style.transform.replace(/\s*skew.*/g, "");
                e.currentTarget.style.transform = `${nonSkewTransform} skew(${e.currentTarget.attributes["flatten"]}deg)`;
              },
            },
          },
        ],
        parentSelector,
        useStrictWidth: true,
        renderVertically: true,
      })
        .addRule("F", "F[+G]F[-G]")
        .addRule("G", "G[-G]M[+F]"),
    frameRate: FrameRate,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Datum]: {
    type: HtmlPlantType.Datum,
    whereGrowsDescription:
      "wherever the earth has energy to receive the energy seeping off its inhabitants",
    htmlTags: ["input"],
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) =>
      new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 25.7,
        lineLength: 30,
        lengthMod: 0.85,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [{ tag: "input", extraProps: { value: "input" } }],
        parentSelector,
        useStrictDimensions: true,
      })
        .addRule("F", "F[+B]F[+B][-F]")
        .addRule("B", "B[+F]B[-F]"),
    // .addRule("F", "+DM[+B][--B]F")
    // .addRule("B", "B[+F]B"),
    frameRate: FrameRate,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Chrono]: {
    type: HtmlPlantType.Chrono,
    whereGrowsDescription:
      "where seconds grow up and minutes learn of the world and hours go to rest",
    htmlTags: ["time"],
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      return new HtmlLSystem({
        p5,
        axiom: "F",
        angle: 23,
        lineLength: 30,
        lengthMod: 1,
        limitMaxElements,
        markFinishedGrowing,
        iterations: daysGrown,
        tagInfos: [
          { tag: "time", innerValue: time, extraProps: { datetime: time } },
        ],
        parentSelector,
        useStrictWidth: true,
        renderVertically: true,
      }).addRule("F", "F-[F]-[F]-[F]-");
    },
    frameRate: FrameRate,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Separatus]: {
    type: HtmlPlantType.Separatus,
    whereGrowsDescription:
      "where words grow like weeds beyond maintenance and meaning, when division is natural",
    htmlTags: ["hr"],
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: 30,
        lineLength: 12,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [{ tag: "hr", innerValue: "" }],
        parentSelector,
        useStrictWidth: true,
      })
        .addRule("S", "G[+G][++F]G[--F][-G]M")
        .addRule("G", "G[+G][++F]G[--F][-G]M");
    },
    frameRate: FrameRate * 3,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Lexus]: {
    type: HtmlPlantType.Lexus,
    whereGrowsDescription:
      "in dark places under moonlight, when bright colors contrast with grey backgrounds",
    htmlTags: ["code", "kbd", "samp", "var"],
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: 70,
        lineLength: 28,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [
          { tag: "code" },
          { tag: "kbd", innerValue: "Cmd" },
          { tag: "samp" },
          { tag: "var" },
        ],
        parentSelector,
      })
        .addRule("S", "F[+F][-F]+[-F]")
        .addRule("F", "F[+F][-F]+", 0.8);
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Espandre]: {
    type: HtmlPlantType.Espandre,
    whereGrowsDescription:
      "where letters are scattered and  words become prayer",
    htmlTags: ["span"],
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      //   @ts-ignore
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: 15,
        lineLength: 24,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [
          {
            tag: "span",
            innerValue: "span",
            style: () => ({
              "font-family": randomChoice([
                "Times New Roman",
                "EB Garamond",
                "Cabin",
                "Inter",
              ]),
              "font-style": randomChoice(["normal", "italic"]),
              color: "DarkOliveGreen",
            }),
          },
        ],
        parentSelector,
      })
        .addRule("S", "G[+G]M[+F]")
        .addRule("G", "G[-F]MF[+S]");
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Basis]: {
    type: HtmlPlantType.Basis,
    whereGrowsDescription: "where websites bloom and boxes must be set",
    htmlTags: ["div"],
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      //   @ts-ignore
      const color = randomColor();
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: 70,
        lineLength: 28,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [
          {
            tag: "div",
            innerValue: "div",
            style: {
              background: color,
              // "mix-blend-mode": "difference",
            },
          },
        ],
        parentSelector,
      })
        .addRule("S", "G[+G]+[-G]")
        .addRule("G", "[+G][-G]+S");
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Pictus]: {
    type: HtmlPlantType.Pictus,
    whereGrowsDescription:
      "when expression yearns for something more and creation is born",
    htmlTags: ["img"],
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      //   @ts-ignore
      const imageSource = "/yarrow.png";
      const lineLength = 40;
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: randomChoice([13, 113, 233]),
        lineLength,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [
          {
            tag: "img",
            extraProps: {
              src: imageSource,
              alt: "a transparent image of a yellow yarrow from https://petaljet.com/products/golden-prairie-yarrow-achileas",
              width: lineLength,
              height: lineLength,
            },
          },
        ],
        parentSelector,
      })
        .addRule("S", "F[+F]+F[-F]G")
        .addRule("G", "F[+F]+G[-F]+F");
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Porros]: {
    type: HtmlPlantType.Porros,
    whereGrowsDescription:
      "where one must wait, in-between the cracks, where the light lingers",
    htmlTags: ["progress"],
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      const lineLength = 25;
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: randomChoice([120, 240, 360]),
        lineLength,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [
          {
            tag: "progress",
            extraProps: () => ({
              max: 25,
              value: randomChoice([0, 5, 10, 15, 20, 25]),
            }),
            style: {
              width: `${lineLength}px`,
            },
          },
        ],
        parentSelector,
      })
        .addRule("S", "F[+F]+G")
        .addRule("G", "F[+R]+F[-R]")
        .addRule("R", "F[-G]S");
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Iconos]: {
    type: HtmlPlantType.Iconos,
    whereGrowsDescription:
      "where symbols are invented, when identification becomes paramount, when we are charged with a name",
    htmlTags: ["i"],
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      //   @ts-ignore
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: 150,
        lineLength: 17,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [
          {
            tag: "i",
            innerValue: "🌱",
          },
          {
            tag: "i",
            innerValue: "🍀",
          },
          {
            tag: "i",
            innerValue: "🌷",
          },
          {
            tag: "i",
            innerValue: "🍄",
          },
          {
            tag: "i",
            innerValue: "🎋",
          },
        ],
        parentSelector,
      })
        .addRule("S", "F+[+G]MF[-R]")
        .addRule("G", "F[-S]RMF[+S]")
        .addRule("R", "M[+G]MR[-G]M");
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return DefaultGetActivePlants();
    },
  },
  [HtmlPlantType.Liste]: {
    type: HtmlPlantType.Liste,
    whereGrowsDescription:
      "where order is demanded, when counting begins, on the edge of infinity",
    htmlTags: ["li"],
    getLSystem: (
      p5: p5Type,
      parentSelector: string,
      daysGrown: number,
      limitMaxElements?: boolean,
      markFinishedGrowing?: () => void
    ) => {
      //   @ts-ignore
      return new HtmlLSystem({
        p5,
        axiom: "S",
        angle: 2,
        lineLength: 33,
        lengthMod: 1,
        iterations: daysGrown,
        limitMaxElements,
        markFinishedGrowing,
        tagInfos: [
          {
            tag: "li",
            innerValue: "",
            // @ts-ignore
            style: { "list-style-type": "square" },
          },
          {
            tag: "li",
            innerValue: "",
            // @ts-ignore
            style: { "list-style-type": "disc" },
          },
          {
            tag: "li",
            innerValue: "",
            // @ts-ignore
            style: { "list-style-type": "circle" },
          },
          {
            tag: "li",
            innerValue: "",
            // @ts-ignore
            style: { "list-style-type": "decimal" },
          },
          {
            tag: "li",
            innerValue: "",
            // @ts-ignore
            style: { "list-style-type": "georgian" },
          },
          {
            tag: "li",
            innerValue: "",
            // @ts-ignore
            style: { "list-style-type": "trad-chinese-informal" },
          },
          {
            tag: "li",
            innerValue: "",
            // @ts-ignore
            style: { "list-style-type": "kanada" },
          },
        ],
        parentSelector,
      })
        .addRule("S", "F+[+FG][-FG]F")
        .addRule("G", "F[-R][+R]MS")
        .addRule("R", "G", 0.5);
    },
    frameRate: FrameRate * 2,
    activePlants: () => {
      // based on reference date, return how many numbers of plants should be active based on the season it is active in
      // get day of the year from referenceDate
      return DefaultGetActivePlants();
    },
  },
} satisfies Record<HtmlPlantType, HtmlPlantInfo>;
