import React from 'react';
import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react';

import LineItemsModel from '../lib/LineItems';
import LineItems from './LineItems';
import Results from './Results';

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

  resetState = () => {
    this.setState({ items: LineItemsModel.convert([]) }, () => {
      window.localStorage &&
        window.localStorage.setItem('items', JSON.stringify([]));
    });
  };

  render() {
    const { items } = this.state;

    return (
      <Container>
        <Segment clearing>
          <Header size="huge" floated="left">
            Project
          </Header>
          <Header floated="right">
            <Button basic color="black" onClick={this.resetState}>
              Reset
            </Button>
          </Header>
        </Segment>
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
