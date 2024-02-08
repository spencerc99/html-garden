import type { CanPlayElement as CanPlayElementType } from "@playhtml/react";
import dynamic from "next/dynamic";
const CanPlayElement = dynamic(
  () => import("@playhtml/react").then((c) => c.CanPlayElement),
  { ssr: false }
) as typeof CanPlayElementType;

export function VisitorCount() {
  return (
    <CanPlayElement
      defaultData={{}}
      myDefaultAwareness={true}
      id="visitorCount"
    >
      {({ awareness }) => {
        console.log(awareness);
        return <div className="visitorCount">{awareness.length} here</div>;
      }}
    </CanPlayElement>
  );
}
