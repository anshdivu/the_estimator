import React, { useState } from "react";
import LineItem from "./line-item";
import Item from "./core/line-item";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function Project() {
  const [items, setItems] = useState([new Item()]);

  const updateItem = (idx: number) => (update: Item) =>
    setItems(prev => {
      const newItems = [...prev];
      newItems[idx] = update;
      return newItems;
    });

  const addNewItem = () => setItems(prev => prev.concat([new Item()]));
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
      <table className="w-80 mw9 ba br--top" cellSpacing="0">
        <thead>
          <tr className="bg-light-gray">
            <th className="fw6 bb b--black-20 tc pb2 pt2 pl1"></th>
            <th className="fw6 bb b--black-20 tc pb2 pt2 pl1">Description</th>
            <th className="fw6 bb b--black-20 tc pb2 pt2 pl1">Optimistic</th>
            <th className="fw6 bb b--black-20 tc pb2 pt2 pl1">Likely</th>
            <th className="fw6 bb b--black-20 tc pb2 pt2 pl1">Pessimistic</th>
            <th className="fw6 bb b--black-20 tc pb2 pt2 pl1">Avg</th>
          </tr>
        </thead>
        <tbody className="lh-copy">
          {items.map((item, idx) => (
            <LineItem
              item={item}
              key={idx}
              onChange={updateItem(idx)}
              onDelete={items.length > 1 ? deleteItem(idx) : undefined}
              onLocationChange={items.length > 1 ? reorderItem(idx) : undefined}
            />
          ))}
          <tr className="bg-light-gray">
            <th colSpan={6}>
              <button onClick={addNewItem}>New Item</button>
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
