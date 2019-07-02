import React, { useState } from "react";
import Item from "./core/line-item";

export default function Project() {
  let [items, setItems] = useState([new Item()]);

  const updateItem = (idx: number, update: Partial<Item>) =>
    setItems(prev => {
      const newItems = [...prev];
      newItems[idx] = new Item({ ...newItems[idx], ...update });
      return newItems;
    });

  const addNewItem = () => setItems(prev => prev.concat([new Item()]));
  const deleteItem = (idx: number) => () =>
    setItems(prev => {
      const newItems = [...prev];
      newItems.splice(idx, 1);
      return newItems;
    });

  return (
    <>
      {items.map((item, idx) => (
        <div key={idx} className="bt b--black-50">
          <label className="fl w-10">
            Delete
            <button>
              <span role="img" aria-label="Delete" onClick={deleteItem(idx)}>
                ❌
              </span>
            </button>
          </label>
          <label className="fl w-30">
            Description:
            <input
              type="text"
              value={item.description}
              onChange={e => updateItem(idx, { description: e.target.value })}
            />
          </label>
          <label className="fl w-20">
            Optimistic:
            <input
              type="number"
              value={item.optimistic}
              onChange={e => updateItem(idx, { optimistic: +e.target.value })}
            />
          </label>
          <label className="fl w-20">
            Likely:
            <input
              type="number"
              value={item.likely}
              onChange={e => updateItem(idx, { likely: +e.target.value })}
            />
          </label>
          <label className="fl w-20">
            Pessimistic:
            <input
              type="number"
              value={item.pessimistic}
              onChange={e => updateItem(idx, { pessimistic: +e.target.value })}
            />
          </label>
        </div>
      ))}
      <button onClick={addNewItem}>New Item</button>
    </>
  );
}
