import type { CanPlayElement as CanPlayElementType } from "@playhtml/react";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
const CanPlayElement = dynamic(
  () => import("@playhtml/react").then((c) => c.CanPlayElement),
  { ssr: false }
) as typeof CanPlayElementType;

export function ActiveVisitorCount() {
  return (
    <CanPlayElement
      defaultData={{}}
      myDefaultAwareness={true}
      id="visitorCount"
    >
      {({ awareness }) => {
        return <div className="visitorCount">{awareness.length} 🧑‍🌾</div>;
      }}
    </CanPlayElement>
  );
}

export function ClickCount() {
  return (
    <CanPlayElement
      defaultData={{ clicks: 0 }}
      myDefaultAwareness={true}
      id="clicks"
      additionalSetup={({ getData, setData }) => {
        const onClick = () => {
          setData({ clicks: getData().clicks + 1 });
        };

        document.addEventListener("click", onClick);
      }}
    >
      {({ data, setData }) => {
        const { clicks } = data;

        return <div id="clickCount">{clicks} 💦</div>;
      }}
    </CanPlayElement>
  );
}

// export const ClickCount = withSharedState(
//   { defaultData: { clicks: 0 } },
//   ({ data, setData }) => {
//     const { hasSynced } = useContext(PlayContext);
//     useEffect(() => {
//       const onClick = () => {
//         if (!hasSynced) {
//           return;
//         }

//         setData({ clicks: data.clicks + 1 });
//       };

//       document.addEventListener("click", onClick);

//       return () => {
//         document.removeEventListener("click", onClick);
//       };
//     }, []);

//     return <div id="clickCount">{data.clicks}</div>;
//   }
// );
