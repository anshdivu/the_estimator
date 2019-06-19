import React, { useState } from 'react';
import LineItem from './line-item';
import Item from './core/line-item';

export default function Project() {
  let [items, setItems] = useState([new Item()]);

  const updateItem = (idx: number) => (updatedItem: Item) =>
    setItems(prev => {
      const newItems = [...prev];
      newItems[idx] = updatedItem;
      return newItems;
    });

  const addNewItem = () => setItems(prev => prev.concat([new Item()]));

  return (
    <>
      {items.map((item, idx) => (
        <LineItem item={item} key={idx} onChange={updateItem(idx)} />
      ))}
      <button onClick={addNewItem}>New Item</button>
    </>
  );
}
