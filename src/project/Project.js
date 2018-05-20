import React from 'react';
import LineItemsModel from '../lib/LineItems';
import LineItems from './LineItems';
import Results from './Results';

import { Container, Header, Grid } from 'semantic-ui-react';

export default class Project extends React.Component {
  state = {
    items: LineItemsModel.convert([
      {
        description: 'Description 1',
        optimistic: 1,
        likely: 1,
        pessimistic: 1
      },
      {
        description: 'Description 2',
        optimistic: 2,
        likely: 2,
        pessimistic: 2
      }
    ])
  };

  handleChange = items => {
    console.log(items);
    this.setState({ items });
  };

  render() {
    const { items } = this.state;

    return (
      <Container>
        <Header size="huge" textAlign="left">
          PROJECT
        </Header>
        <Grid columns={2}>
          <Grid.Column floated="left" width={10}>
            <LineItems items={items} onUpdate={this.handleChange} />
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Results items={items} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
