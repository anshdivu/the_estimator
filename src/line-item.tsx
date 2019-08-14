import React, { useState, useEffect } from "react";
import Item from "./core/line-item";

type OnChangeProp = (item: Item) => void;
type OnLocationChangeProp = (move: "up" | "down") => void;

function useLineItem(initialItem = new Item()) {
  const [item, setItem] = useState(initialItem);

  const updateItem = (update: Partial<Item>, onChange?: OnChangeProp) =>
    setItem(prev => {
      const updatedItem = new Item({ ...prev, ...update });
      onChange && onChange(updatedItem);
      return updatedItem;
    });

  return [item, updateItem] as const;
}

export default function LineItem({
  item: initialValue,
  onChange,
  onDelete,
  onLocationChange
}: {
  item: Item;
  onChange?: OnChangeProp;
  onDelete?: OnChangeProp;
  onLocationChange?: OnLocationChangeProp;
}) {
  const [item, updateItem] = useLineItem(initialValue);

  // eslint-disable-next-line
  useEffect(() => updateItem(initialValue), [initialValue]);

  return (
    <div className="dt-row bb ">
      {/* <div className="dtc fl w-20 */}
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
          onChange={e => updateItem({ description: e.target.value }, onChange)}
        />
      </div>
      <div className="dtc fl pa2 w-10">
        <input
          className="mw lh-copy"
          type="number"
          value={item.optimistic}
          onChange={e => updateItem({ optimistic: +e.target.value }, onChange)}
        />
      </div>
      <div className="dtc fl pa2 w-10">
        <input
          className="mw lh-copy"
          type="number"
          value={item.likely}
          onChange={e => updateItem({ likely: +e.target.value }, onChange)}
        />
      </div>
      <div className="dtc fl pa2 w-10">
        <input
          className="mw lh-copy"
          type="number"
          value={item.pessimistic}
          onChange={e => updateItem({ pessimistic: +e.target.value }, onChange)}
        />
      </div>
      <div className="dtc fl fw6 pa2 w-10">
        <span className="mw lh-copy">{item.weightedAvg()}</span>
      </div>
    </div>
  );
}
