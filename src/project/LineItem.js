import React from 'react';
import { Table, Input } from 'semantic-ui-react';

const updateItem = (item, onChange) => key => event => {
  const updatedItem = item.update({ [key]: event.target.value });
  onChange(updatedItem);
};

export default function LineItem({ item, onChange }) {
  const handleChange = updateItem(item, onChange);

  return (
    <Table.Row>
      <Table.Cell width={10}>
        <Input
          fluid
          placeholder="Description"
          value={item.description}
          onChange={handleChange('description')}
        />
      </Table.Cell>
      <Table.Cell width={2}>
        <Input
          placeholder="Optimistic"
          value={item.optimistic}
          onChange={handleChange('optimistic')}
        />
      </Table.Cell>
      <Table.Cell width={2}>
        <Input
          placeholder="Likely"
          value={item.likely}
          onChange={handleChange('likely')}
        />
      </Table.Cell>
      <Table.Cell width={2}>
        <Input
          placeholder="Pessimistic"
          value={item.pessimistic}
          onChange={handleChange('pessimistic')}
        />
      </Table.Cell>
    </Table.Row>
  );
}
