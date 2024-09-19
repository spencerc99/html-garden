import dynamic from "next/dynamic";
import SinglePlant from "../components/SinglePlant";

const PlantComponent = dynamic(() => import("../components/SinglePlant"), {
  ssr: false,
});

export default function Plant() {
  return <PlantComponent />;
}

// ... existing code ...
