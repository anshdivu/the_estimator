import React from 'react';
import { Table } from 'semantic-ui-react';

export default function Results({ items, onUpdate }) {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Total Effort</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <InWeeks effort={items.effortInWeeks()} />
        <InDays effort={items.effortInDays()} />
        <InHours effort={items.totalEffort()} />
      </Table.Body>
    </Table>
  );
}

function InHours({ effort }) {
  return (
    <Table.Row>
      <Table.Cell>In Hours</Table.Cell>
      <Table.Cell>{effort}</Table.Cell>
    </Table.Row>
  );
}

function InDays({ effort }) {
  if (effort < 1) {
    return null;
  }

  return (
    <Table.Row>
      <Table.Cell>In Days</Table.Cell>
      <Table.Cell>{effort}</Table.Cell>
    </Table.Row>
  );
}

function InWeeks({ effort }) {
  if (effort < 1) {
    return null;
  }

  return (
    <Table.Row>
      <Table.Cell>In Weeks</Table.Cell>
      <Table.Cell>{effort}</Table.Cell>
    </Table.Row>
  );
}
