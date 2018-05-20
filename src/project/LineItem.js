import React from 'react';
import { Table, Input } from 'semantic-ui-react';

const updateItem = (item, onChange) => key => (_, data) => {
  const value = data.type === 'number' ? +data.value : data.value;
  const updatedItem = item.update({ [key]: value });

  onChange(updatedItem);
};

export default function LineItem({ item, onChange }) {
  const handleChange = updateItem(item, onChange);

  return (
    <Table.Row>
      <Table.Cell width={8}>
        <Input
          fluid
          placeholder="Description"
          value={item.description}
          onChange={handleChange('description')}
        />
      </Table.Cell>
      <Table.Cell width={1}>
        <Input
          fluid
          type="number"
          placeholder="Optimistic"
          value={item.optimistic}
          onChange={handleChange('optimistic')}
        />
      </Table.Cell>
      <Table.Cell width={1}>
        <Input
          fluid
          style={{ minWidth: '4em' }}
          type="number"
          placeholder="Likely"
          value={item.likely}
          onChange={handleChange('likely')}
        />
      </Table.Cell>
      <Table.Cell width={1}>
        <Input
          fluid
          type="number"
          placeholder="Pessimistic"
          value={item.pessimistic}
          onChange={handleChange('pessimistic')}
        />
      </Table.Cell>
      <Table.Cell width={1}>{item.weightedAvg()}</Table.Cell>
    </Table.Row>
  );
}
