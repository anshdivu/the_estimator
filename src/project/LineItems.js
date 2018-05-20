import React from 'react';
import { Button, Table } from 'semantic-ui-react';

import LineItemModel from '../lib/LineItem';
import LineItem from './LineItem';

export default function LineItems({ items, onUpdate }) {
  const handleChange = idx => item => {
    const updatedItems = items.update(idx, item);
    onUpdate(updatedItems);
  };

  return (
    <Table width={8}>
      <Table.Header>
        <LineItemTitle />
      </Table.Header>

      <Table.Body>
        {items.items.map((item, idx) => (
          <LineItem item={item} key={idx} onChange={handleChange(idx)} />
        ))}
      </Table.Body>
      <Table.Footer fullWidth>
        <AddNewLineItem onClick={handleChange(items.length)} />
      </Table.Footer>
    </Table>
  );
}

function AddNewLineItem({ onClick }) {
  const createNewItem = () => {
    const emptyItem = new LineItemModel();
    onClick(emptyItem);
  };

  return (
    <Table.Row>
      <Table.HeaderCell />
      <Table.HeaderCell colSpan="4">
        <Button
          floated="right"
          icon
          primary
          size="small"
          onClick={createNewItem}
        >
          Add Line Item
        </Button>
      </Table.HeaderCell>
    </Table.Row>
  );
}

function LineItemTitle() {
  return (
    <Table.Row>
      <Table.HeaderCell width={5}>Description</Table.HeaderCell>
      <Table.HeaderCell width={1}>Optimistic</Table.HeaderCell>
      <Table.HeaderCell width={1}>Likely</Table.HeaderCell>
      <Table.HeaderCell width={1}>Pessimistic</Table.HeaderCell>
    </Table.Row>
  );
}
