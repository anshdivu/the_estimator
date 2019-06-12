import React, { useState } from 'react';
import Item from './core/line-item';

type OnChangeFn = (item: Item) => void;

function useLineItem(initialItem = new Item()) {
  const [item, setItem] = useState(initialItem);

  const updateItem = (update: Partial<Item>) =>
    setItem(new Item({ ...item, ...update }));

  return [item, updateItem] as const;
}

export default function LineItem({ onChange }: { onChange?: OnChangeFn }) {
  const [item, updateItem] = useLineItem();
  onChange && onChange(item);

  return (
    <div className="bt b--black-50">
      <label className="fl w-25">
        Description:
        <input
          type="text"
          value={item.description}
          onChange={e => updateItem({ description: e.target.value })}
        />
      </label>
      <label className="fl w-25">
        Optimistic:
        <input
          type="number"
          value={item.optimistic}
          onChange={e => updateItem({ optimistic: +e.target.value })}
        />
      </label>
      <label className="fl w-25">
        Likely:
        <input
          type="number"
          value={item.likely}
          onChange={e => updateItem({ likely: +e.target.value })}
        />
      </label>
      <label className="fl w-25">
        Pessimistic:
        <input
          type="number"
          value={item.pessimistic}
          onChange={e => updateItem({ pessimistic: +e.target.value })}
        />
      </label>
    </div>
  );
}
