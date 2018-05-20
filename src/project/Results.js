import React from 'react';
import { Button, Table } from 'semantic-ui-react';

import LineItemModel from '../lib/LineItem';
// import LineItem from './LineItem';

export default function Results({ items, onUpdate }) {
  const handleChange = idx => item => {
    const updatedItems = items.update(idx, item);
    onUpdate(updatedItems);
  };

  return (
    <Table>
      <Table.Header>
        <LineItemTitle />
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell />
        </Table.Row>
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
  return null;
  return (
    <Table.Row>
      <Table.HeaderCell>
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
      <Table.HeaderCell>Results</Table.HeaderCell>
    </Table.Row>
  );
}
