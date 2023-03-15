import { useEffect, useMemo, useState } from "react";
import { Plant } from "./Plant";

export function Garden() {
  useEffect(() => {}, []);

  return (
    <div id="garden">
      <Plant />
    </div>
  );
}
