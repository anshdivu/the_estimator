import { useState } from "react";
import LineItem from "./line-item";
import Project from "./project";

export default function useProject(
  initValue = new Project("Project", [new LineItem()])
) {
  const [project, setProject] = useState(initValue);

  const appendNewItem = () => setProject(prev => prev.addItem(new LineItem()));

  const updateItem = (index: number) => (update: Partial<LineItem>) =>
    setProject(prev => {
      const updatedItem = new LineItem({ ...prev.items[index], ...update });
      return prev.updateItem(index, updatedItem);
    });

  const deleteItem = (index: number) => () =>
    setProject(prev => prev.deleteItem(index));

  const reorderItem = (currentIndex: number) => (move: "up" | "down") => {
    switch (move) {
      case "up":
        return setProject(prev => {
          const items = reorder(prev.items, currentIndex, currentIndex - 1);
          return prev.update(items);
        });

      case "down":
        return setProject(prev => {
          const items = reorder(prev.items, currentIndex, currentIndex + 1);
          return prev.update(items);
        });
    }
  };

  return { project, appendNewItem, updateItem, deleteItem, reorderItem };
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
