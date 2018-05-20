import React from 'react';
import LineItemsModel from '../lib/LineItems';
import LineItems from './LineItems';
import Results from './Results';

import { Container, Header, Grid } from 'semantic-ui-react';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitState();
  }

  getInitState = () => {
    const projectData =
      (window.localStorage && window.localStorage.getItem('items')) || '[]';
    return { items: LineItemsModel.convert(JSON.parse(projectData)) };
  };

  handleChange = items => {
    this.setState({ items }, () => {
      window.localStorage &&
        window.localStorage.setItem('items', JSON.stringify(items.items));
    });
  };

  render() {
    const { items } = this.state;

    return (
      <Container>
        <Header size="huge" textAlign="left">
          PROJECT
        </Header>
        <Grid columns={2}>
          <Grid.Column floated="left" width={14}>
            <LineItems items={items} onUpdate={this.handleChange} />
          </Grid.Column>
          <Grid.Column floated="right" width={2}>
            <Results items={items} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
