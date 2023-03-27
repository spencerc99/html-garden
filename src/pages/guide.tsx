import Link from "next/link";
import {
  GenusName,
  HtmlPlantType,
  HtmlPlantTypeToSpecies,
} from "../common/plants";
import { HtmlPlant } from "../components/HtmlPlant";

export default function Guide() {
  function renderPlantRow(type: HtmlPlantType) {
    const info = HtmlPlantTypeToSpecies[type];

    return (
      <tr>
        <td>
          {GenusName} {type}
        </td>
        {/* TODO: fix */}
        <td>{info.activePlants}</td>
        <td>
          <HtmlPlant
            type={type}
            idx={0}
            daysGrown={3}
            style={{ transform: "translate(100px, 60px)" }}
          />
        </td>
      </tr>
    );
  }

  return (
    <div className="fieldGuide">
      <h1>The HTML Leaf Book</h1>
      <table className="fieldGuideTable">
        <thead>
          <tr>
            <th>Species</th>
            <th>Season</th>
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
