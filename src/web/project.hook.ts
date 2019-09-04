import { useState } from "react";
import Item from "../domain/line-item";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default function useLineItems(initValues = [new Item()]) {
  const [items, setItems] = useState(initValues);

  const appendNewItem = () => setItems(prev => prev.concat([new Item()]));

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

  return { items, appendNewItem, updateItem, deleteItem, reorderItem };
}
