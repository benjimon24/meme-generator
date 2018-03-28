import React, { Component } from "react";
import Template from "./template";

class Templates extends Component {
  state = {
    templates: [],
    pagination: 0
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ templates: nextProps.templates.slice(0, 10) });
    this.setState({ pagination: 0 });
  }

  searchTemplates = event => {
    let filteredResults = this.props.templates
      .filter(meme => {
        return meme.name.toLowerCase().search(event.target.value.toLowerCase()) > -1;
      })
      .slice(0, 10);
    this.setState({ templates: filteredResults });
  };

  resetPagination = event => {
    if (event.target.value == "") {
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
      <div>
        <h1>Templates</h1>
        <input
          type="text"
          placeholder="Search Template "
          onChange={this.searchTemplates}
          onBlur={this.resetPagination}
        />
        <div>
          {this.state.templates.map(meme => {
            // setting the key here is very important!
            return <Template {...meme} key={meme.id} url={meme.url} createMeme={this.props.createMeme} />;
          })}
        </div>

        <div>
          {this.state.pagination === 0 ? null : <button onClick={this.decrementPagination}>Previous</button>}
          {paginators.map((paginator, index) => {
            return paginator !== this.state.pagination + 1 ? (
              <button key={index} onClick={this.handlePagination}>
                {paginator}
              </button>
            ) : (
              paginator
            );
          })}
          {this.state.pagination === 9 ? null : <button onClick={this.incrementPagination}>Next</button>}
        </div>
      </div>
    );
  }
}

export default Templates;
