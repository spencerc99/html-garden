import React from "react";

function jsxJoin(
  items: React.ReactNode[],
  separator: React.ReactNode
): React.ReactNode[] {
  return items.reduce<React.ReactNode[]>((acc, item, idx) => {
    if (idx === 0) {
      return [item];
    }
    return [...acc, separator, item];
  }, [] as React.ReactNode[]);
}

export function Marquee({
  items,
  separator,
}: {
  items: React.ReactNode[];
  separator: React.ReactNode;
}) {
  return (
    // @ts-ignore
    <div className="marquee">
      <div className="marqueeContent">
        {jsxJoin(
          [...items, ...items, ...items, ...items].map((item, idx) => (
            <span key={idx}>{item}</span>
          )),
          separator
        )}
      </div>
    </div>
  );
}
