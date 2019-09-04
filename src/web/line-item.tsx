import React from "react";
import Item from "../domain/line-item";

type OnChangeProp = (update: Partial<Item>) => void;
type OnLocationChangeProp = (move: "up" | "down") => void;

export default function LineItem({
  item,
  onChange = () => {},
  onDelete,
  onLocationChange
}: {
  item: Item;
  onChange?: OnChangeProp;
  onDelete?: OnChangeProp;
  onLocationChange?: OnLocationChangeProp;
}) {
  return (
    <div className="dt-row bb ">
      <div className="dtc fl pa2 w-10">
        <button
          className="lh-copy"
          disabled={!onLocationChange}
          onClick={() => onLocationChange && onLocationChange("up")}
        >
          <span role="img" aria-label="Delete">
            ↑
          </span>
        </button>
        <button
          className="lh-copy"
          disabled={!onLocationChange}
          onClick={() => onLocationChange && onLocationChange("down")}
        >
          <span role="img" aria-label="Delete">
            ↓
          </span>
        </button>
        <button
          className="lh-copy"
          disabled={!onDelete}
          onClick={() => onDelete && onDelete(item)}
        >
          <span role="img" aria-label="Delete">
            ❌
          </span>
        </button>
      </div>
      <div className="dtc fl pa2 w-50">
        <input
          className="w-90 lh-copy"
          type="text"
          value={item.description}
          onChange={e => onChange({ description: e.target.value })}
        />
      </div>
      <div className="dtc fl pa2 w-10">
        <input
          className="mw lh-copy"
          type="number"
          value={item.optimistic}
          onChange={e => onChange({ optimistic: +e.target.value })}
        />
      </div>
      <div className="dtc fl pa2 w-10">
        <input
          className="mw lh-copy"
          type="number"
          value={item.likely}
          onChange={e => onChange({ likely: +e.target.value })}
        />
      </div>
      <div className="dtc fl pa2 w-10">
        <input
          className="mw lh-copy"
          type="number"
          value={item.pessimistic}
          onChange={e => onChange({ pessimistic: +e.target.value })}
        />
      </div>
      <div className="dtc fl fw6 pa2 w-10">
        <span className="mw lh-copy">{item.weightedAvg()}</span>
      </div>
    </div>
  );
}
