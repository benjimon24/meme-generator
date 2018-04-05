import React, { Component } from "react";
import { Container, Grid, Segment, Button } from "semantic-ui-react";

class Meme extends Component {
  state = {
    showURL: false,
    showButtons: false
  };

  handleDelete = e => {
    e.preventDefault();
    this.props.deleteMeme(this.props.id, this.props.index);
  };

  handleShare = e => {
    this.setState({ showURL: !this.state.showURL });
  };

  handleExpand = e => {
    this.props.setModal(this.props.url);
  };

  showButtons = e => {
    this.setState({ showButtons: true });
  };

  hideButtons = e => {
    this.setState({ showButtons: false, showURL: false });
  };

  render() {
    var memeStyle = {
      backgroundImage: "url(" + this.props.url + ")",
      backgroundSize: "cover",
      height: 300,
      width: 200,
      padding: 0,
      margin: 5
    };

    var deleteStyle = {
      position: "absolute",
      right: 5,
      top: 5
    };

    var linkStyle = {
      position: "absolute",
      left: 5,
      bottom: 5
    };

    var expandStyle = {
      position: "absolute",
      right: 5,
      bottom: 5
    };

    return (
      <Grid.Column
        className="meme-image"
        computer={3}
        tablet={5}
        mobile={16}
        style={memeStyle}
        onMouseEnter={this.showButtons}
        onMouseLeave={this.hideButtons}
      >
        {this.state.showButtons ? (
          <Container>
            <Button color="black" style={deleteStyle} icon="close" onClick={this.handleDelete} />
            <Button color="black" style={linkStyle} icon="linkify" onClick={this.handleShare} />
            <Button color="black" style={expandStyle} icon="expand" onClick={this.handleExpand} />
            {this.state.showURL ? <Segment style={{ top: 50 }}>{this.props.url}</Segment> : null}
          </Container>
        ) : null}
      </Grid.Column>
    );
  }
}

export default Meme;
