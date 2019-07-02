import React, { useState } from "react";
import LineItem from "./line-item";
import Item from "./core/line-item";

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

  console.log(JSON.stringify(items));

  return (
    <>
      {items.map((item, idx) => (
        <div key={idx} className="bt b--black-50">
          <LineItem
            item={item}
            key={idx}
            onChange={updateItem(idx)}
            onDelete={items.length > 1 ? deleteItem(idx) : undefined}
          />
        </div>
      ))}
      <button onClick={addNewItem}>New Item</button>
    </>
  );
}
