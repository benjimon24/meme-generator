import React, { Component } from "react";
import Meme from "./meme";
import { Grid, Container, Header } from "semantic-ui-react";

class Memes extends Component {
  render() {
    return (
      <Container>
        <Header as="h1"> Your Memes </Header>
        <Grid container stackable>
          {this.props.memes.map((meme, index) => {
            return (
              <Meme
                {...meme}
                key={index}
                index={index}
                deleteMeme={this.props.deleteMeme}
                setModal={this.props.setModal}
              />
            );
          })}
        </Grid>
      </Container>
    );
  }
}

export default Memes;
