import React from "react";
import useProject from "../project/project.hook";
import LineItem from "./line-item";

export default function Project() {
  const { project, ...state } = useProject();

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
        {project.items.map((item, idx) => (
          <LineItem
            item={item}
            key={idx}
            onChange={state.updateItem(idx)}
            onDelete={
              project.items.length > 1 ? state.deleteItem(idx) : undefined
            }
            onLocationChange={
              project.items.length > 1 ? state.reorderItem(idx) : undefined
            }
          />
        ))}
        <div className="dt-row bg-light-gray w-100">
          <div className="dtc pa2 tc">
            <button onClick={state.appendNewItem}>New Item</button>
          </div>
        </div>
      </div>
    </>
  );
}
