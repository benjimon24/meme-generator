import React, { Component } from "react";

class Meme extends Component {
  state = {
    showURL: false
  };

  handleDelete = e => {
    e.preventDefault();
    this.props.deleteMeme(this.props.id, this.props.index);
  };

  handleShare = e => {
    this.setState({ showURL: !this.state.showURL });
  };

  render() {
    return (
      <div>
        <img style={{ maxWidth: 200, maxHeight: 300 }} src={this.props.url} alt={this.props.id} />
        <button onClick={this.handleDelete}>Delete</button>
        <button onClick={this.handleShare}>Share</button>
        {this.state.showURL ? <div>{this.props.url}</div> : null}
      </div>
    );
  }
}

export default Meme;
