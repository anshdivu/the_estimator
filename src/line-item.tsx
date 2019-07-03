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
    <tr className="bb">
      <th className="fw6 bb b--black-20 tc pb2 pt2 pl1">
        <button
          disabled={!onLocationChange}
          onClick={() => onLocationChange && onLocationChange("up")}
        >
          <span role="img" aria-label="Delete">
            ↑
          </span>
        </button>
        <button
          disabled={!onLocationChange}
          onClick={() => onLocationChange && onLocationChange("down")}
        >
          <span role="img" aria-label="Delete">
            ↓
          </span>
        </button>
        <button disabled={!onDelete} onClick={() => onDelete && onDelete(item)}>
          <span role="img" aria-label="Delete">
            ❌
          </span>
        </button>
      </th>
      <th className="fw6 bb b--black-20 tc pb2 pt2 pl1">
        <input
          className="w-90"
          type="text"
          value={item.description}
          onChange={e => updateItem({ description: e.target.value }, onChange)}
        />
      </th>
      <th className="fw6 bb b--black-20 tc pb2 pt2 pl1">
        <input
          className="w-90"
          type="number"
          value={item.optimistic}
          onChange={e => updateItem({ optimistic: +e.target.value }, onChange)}
        />
      </th>
      <th className="fw6 bb b--black-20 tc pb2 pt2 pl1">
        <input
          className="w-90"
          type="number"
          value={item.likely}
          onChange={e => updateItem({ likely: +e.target.value }, onChange)}
        />
      </th>
      <th className="fw6 bb b--black-20 tc pb2 pt2 pl1">
        <input
          className="w-90"
          type="number"
          value={item.pessimistic}
          onChange={e => updateItem({ pessimistic: +e.target.value }, onChange)}
        />
      </th>
      <th className="fw6 bb b--black-20 tc pb2 pt2 pl1">
        <span className="w-90">{item.weightedAvg()}</span>
      </th>
    </tr>
  );
}
