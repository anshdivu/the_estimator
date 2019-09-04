import React, { useState } from "react";
import Item from "../domain/line-item";
import LineItem from "./line-item";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function Project() {
  const [items, setItems] = useState([new Item()]);

  const addNewItem = () => setItems(prev => prev.concat([new Item()]));

  const updateItem = (idx: number) => (update: Item) =>
    setItems(prev => {
      const newItems = [...prev];
      newItems[idx] = update;
      return newItems;
    });

  const deleteItem = (idx: number) => () =>
    setItems(prev => {
      const newItems = [...prev];
      newItems.splice(idx, 1);
      return newItems;
    });

  const reorderItem = (currentIndex: number) => (move: "up" | "down") => {
    switch (move) {
      case "up":
        return setItems(prev => reorder(prev, currentIndex, currentIndex - 1));

      case "down":
        return setItems(prev => reorder(prev, currentIndex, currentIndex + 1));
    }
  };

  console.log(JSON.stringify(items));

  return (
    <>
      <div className="dt w-75 mw9 ba br--top lh-copy">
        <div className="bg-light-gray dt-row">
          <div className="dtc fl w-10 fw6 pa2"></div>
          <div className="dtc fl w-50 fw6 pa2">Description</div>
          <div className="dtc fl w-10 fw6 pa2">Optimistic</div>
          <div className="dtc fl w-10 fw6 pa2">Likely</div>
          <div className="dtc fl w-10 fw6 pa2">Pessimistic</div>
          <div className="dtc fl w-10 fw6 pa2">Avg</div>
        </div>
        {items.map((item, idx) => (
          <LineItem
            item={item}
            key={idx}
            onChange={updateItem(idx)}
            onDelete={items.length > 1 ? deleteItem(idx) : undefined}
            onLocationChange={items.length > 1 ? reorderItem(idx) : undefined}
          />
        ))}
        <div className="dt-row bg-light-gray w-100">
          <div className="dtc pa2 tc">
            <button onClick={addNewItem}>New Item</button>
          </div>
        </div>
      </div>
    </>
  );
}
