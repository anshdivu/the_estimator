import React, { useState } from 'react';
import Item from './core/line-item';

type OnChangeProp = (item: Item) => void;

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
  onChange
}: {
  item: Item;
  onChange?: OnChangeProp;
}) {
  const [item, updateItem] = useLineItem(initialValue);

  return (
    <div className="bt b--black-50">
      <label className="fl w-10">
        Delete
        <button>
          <span
            role="img"
            aria-label="Delete"
            onClick={() => alert('finish delete feature')}
          >
            ❌
          </span>
        </button>
      </label>
      <label className="fl w-30">
        Description:
        <input
          type="text"
          value={item.description}
          onChange={e => updateItem({ description: e.target.value }, onChange)}
        />
      </label>
      <label className="fl w-20">
        Optimistic:
        <input
          type="number"
          value={item.optimistic}
          onChange={e => updateItem({ optimistic: +e.target.value }, onChange)}
        />
      </label>
      <label className="fl w-20">
        Likely:
        <input
          type="number"
          value={item.likely}
          onChange={e => updateItem({ likely: +e.target.value }, onChange)}
        />
      </label>
      <label className="fl w-20">
        Pessimistic:
        <input
          type="number"
          value={item.pessimistic}
          onChange={e => updateItem({ pessimistic: +e.target.value }, onChange)}
        />
      </label>
    </div>
  );
}
