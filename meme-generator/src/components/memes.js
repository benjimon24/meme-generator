import React, { Component } from "react";
import Meme from "./meme";

class Memes extends Component {
  render() {
    return (
      <div>
        <h1>Your Memes</h1>
        {this.props.memes.map((meme, index) => {
          return <Meme {...meme} key={index} index={index} deleteMeme={this.props.deleteMeme} />;
        })}
      </div>
    );
  }
}

export default Memes;
