import Link from "next/link";
import { useEffect } from "react";
import {
  GenusName,
  HtmlPlantType,
  HtmlPlantTypeToSpecies,
} from "../common/plants";
import { useStickyState } from "../common/utils";
import { HtmlPlant } from "../components/HtmlPlant";
import "../styles/guide.module.scss";

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
      <p>
        This garden was planted by{" "}
        <a href="https://www.spencerchang.me/">Spencer Chang</a> for the 2nd
        issue of <a href="http://html.review/">thehtml.review</a>
      </p>
      <table className="fieldGuideTable">
        <thead>
          <tr>
            <th>Species</th>
            <th>Where Found</th>
            <th>Sample</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(HtmlPlantType).map((type) =>
            renderPlantRow(type as HtmlPlantType)
          )}
        </tbody>
      </table>
      <Link href="/">
        <span className="pageLink">🌿</span>
      </Link>
    </div>
  );
}
