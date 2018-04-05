import React, { Component } from "react";
import Template from "./template";
import { Header, Grid, Container, Button, Input, Divider } from "semantic-ui-react";

class Templates extends Component {
  state = {
    templates: [],
    pagination: 0
  };

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ templates: nextProps.templates.slice(0, 10) });
  //   this.setState({ pagination: 0 });
  // }

  searchTemplates = event => {
    let filteredResults = this.props.templates
      .filter(meme => {
        return meme.name.toLowerCase().search(event.target.value.toLowerCase()) > -1;
      })
      .slice(0, 10);
    this.setState({ templates: filteredResults });
  };

  resetPagination = event => {
    if (event.target.value === "") {
      this.paginateTemplates();
    }
  };

  handlePagination = e => {
    e.preventDefault();
    this.setState({ pagination: e.target.innerHTML - 1 }, () => {
      this.paginateTemplates();
    });
  };

  paginateTemplates = () => {
    let paginatedTemplates = [...this.props.templates];
    let startPaginate = this.state.pagination * 10;
    let endPaginate = this.state.pagination * 10 + 10;
    this.setState({ templates: paginatedTemplates.slice(startPaginate, endPaginate) });
  };

  incrementPagination = e => {
    e.preventDefault();
    this.setState({ pagination: this.state.pagination + 1 }, () => {
      this.paginateTemplates();
    });
  };

  decrementPagination = e => {
    e.preventDefault();
    this.setState({ pagination: this.state.pagination - 1 }, () => {
      this.paginateTemplates();
    });
  };

  render() {
    let paginators = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <Container>
        <Header as="h1">Only the Spiciest of Memes</Header>
        <Input
          type="text"
          placeholder="Search Templates"
          onChange={this.searchTemplates}
          onBlur={this.resetPagination}
        />

        <Divider hidden />

        <Container>
          {this.state.pagination === 0 ? (
            <Button disabled>Previous</Button>
          ) : (
            <Button onClick={this.decrementPagination}>Previous</Button>
          )}
          {paginators.map((paginator, index) => {
            return paginator !== this.state.pagination + 1 ? (
              <Button key={index} onClick={this.handlePagination}>
                {paginator}
              </Button>
            ) : (
              <Button key={index} disabled>
                {paginator}
              </Button>
            );
          })}
          {this.state.pagination === 9 ? (
            <Button disabled>Next</Button>
          ) : (
            <Button onClick={this.incrementPagination}>Next</Button>
          )}
        </Container>

        <Divider hidden />

        <Container>
          <Grid>
            {this.state.templates.map(meme => {
              return (
                <Template
                  {...meme}
                  key={meme.id}
                  url={meme.url}
                  createMeme={this.props.createMeme}
                  setModal={this.props.setModal}
                />
              );
            })}
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default Templates;
