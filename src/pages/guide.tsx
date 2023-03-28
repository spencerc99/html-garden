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

    if (!info) {
      return null;
    }

    return (
      <tr>
        <td>
          {GenusName} {type}
        </td>
        {/* TODO: fix */}
        <td>{info.season}</td>
        <td>
          {/* TODO: show question mark until you have seen it */}
          <HtmlPlant
            type={type}
            idx={0}
            daysGrown={3}
            style={{ transform: "translate(80px, 90px) scale(0.8)" }}
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
