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

  downloadExcel = items => {
    items.toExcel();
  };

  downloadCsv = items => {
    const a = document.createElement('a');
    const blob = new Blob([items.toCsv()], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    a.href = url;
    a.setAttribute('download', 'project.csv');
    a.setAttribute('target', '_blank');
    a.click();
    return false;
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
            <Button
              basic
              color="black"
              onClick={() => this.downloadCsv(this.state.items)}
            >
              Download CSV
            </Button>
            <Button
              basic
              color="black"
              onClick={() => this.downloadExcel(this.state.items)}
            >
              Download Excel
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
