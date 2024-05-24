import { useEffect } from "react";
import {
  GenusName,
  HtmlPlantType,
  HtmlPlantTypeToSpecies,
} from "../common/plants";
import { useStickyState } from "../common/utils";
import { HtmlPlant } from "../components/HtmlPlant";
import "../styles/guide.module.scss";
import { jsxJoin } from "../components/Marquee";
import Link from "next/link";

export default function Guide() {
  const [seenPlants] = useStickyState("seenPlants", []);

  useEffect(() => {
    document.querySelector("body").classList.add("guide");
    return () => {
      document.querySelector("body").classList.remove("guide");
    };
  });

  function renderPlantRow(type: HtmlPlantType) {
    const info = HtmlPlantTypeToSpecies[type];
    const seenBefore = seenPlants.includes(type);

    return (
      <tr key={type}>
        <td>
          {GenusName} {type}
        </td>
        <td>{info.whereGrowsDescription}</td>
        <td>
          {jsxJoin(
            info.htmlTags.map((tag) => (
              <a
                href={`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${tag}`}
                key={tag}
              >
                {tag}
              </a>
            )),
            ", "
          )}
        </td>
        <td>
          {seenBefore ? (
            <HtmlPlant
              type={type}
              idx={0}
              daysGrown={3}
              style={{ transform: "translate(80px, 100px) scale(0.8)" }}
            />
          ) : (
            "???"
          )}
        </td>
      </tr>
    );
  }

  return (
    <div className="fieldGuide">
      <h1>The HTML Leaf Book</h1>
      <p>
        As you see specimen in the wild, this field guide will automatically
        fill with samples. Visit on different days to find all the species.
      </p>
      <details>
        <summary>
          <b>about</b>
        </summary>
        <p>
          This garden was planted by{" "}
          <a href="https://www.spencerchang.me/">Spencer Chang</a> for the 2nd
          issue of <a href="http://html.review/">thehtml.review</a> in Spring
          2023.
        </p>
        <p>
          <em>html garden</em> is an attempt to imagine what a &quot;seasonal
          website&quot; looks like, one that rewards visitors for coming back
          and&nbsp;<em>noticing</em>, a very different and radical act from the
          way large platforms force interface changes. Visitors are encouraged
          to take a stroll through and use their inherent browser mechanisms to
          zoom in and take a closer peek at the plants that call to them.
        </p>
        <p>
          <em>html garden</em> is composed of digitally-native plants, formed
          from HTML elements that simulate the growth patterns of real plants
          (backed by a grammar that means you could create your own plant!).
          Returning repeatedly will reward you with the sights of growth in each
          plant along with budding offspring, and you might just find new
          species as you come to become a regular at this neighborhood garden.
          The slow growth of the website day-to-day invites returning to the
          same place on the internet and bearing witness to its change.
        </p>
        <p>
          This was such a joy (and at times an absolute struggle) to create,
          play with, and learn from, from not only creating a poetic website,
          with all the interactions and details that delight, but also creating
          a system on top of p5js to &quot;draw&quot; with html elements rather
          than lines using the logic of l-systems.
        </p>
        <p>
          This project wouldn&apos;t have come into being without the
          inspiration and learnings from Robert Irwin&apos;s{" "}
          <a
            aria-label="https://www.youtube.com/watch?v=WYIhekz_swA&t=13s"
            href="https://www.youtube.com/watch?v=WYIhekz_swA&t=13s"
          >
            Central&nbsp;Garden
          </a>{" "}
          design, Bhavik Singh&apos;s work on&nbsp;
          <a aria-label="https://lsystem.club/" href="https://lsystem.club/">
            l-systems
          </a>
          , and the open-source <a href="https://p5js.org/">p5js</a> community.
        </p>
        <p>
          A <Link href="/timelapse">timelapse</Link> showed at the{" "}
          <a href="https://deyoungopen2023.artcall.org/submissions/qr-view/424024">
            de Young Museum
          </a>{" "}
          from October 2023-January 2024.
        </p>
      </details>
      <br />
      <table className="fieldGuideTable">
        <thead>
          <tr>
            <th>Species</th>
            <th>Location</th>
            <th>HTML Tags</th>
            <th>Sample</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(HtmlPlantType).map((type) =>
            renderPlantRow(type as HtmlPlantType)
          )}
        </tbody>
      </table>
      <button
        onClick={() => {
          if (window.location.href.includes("guide")) {
            window.location.href = "/";
          } else {
            document.querySelector(".guideContainer").classList.add("hidden");
          }
        }}
      >
        <span className="pageLink">🌿</span>
      </button>
    </div>
  );
}
