import React, { Component } from "react";
import { Header, Grid, Form, Button, Input } from "semantic-ui-react";

class Template extends Component {
  state = {
    create: false,
    showExpand: false,
    newMeme: {
      template_id: this.props.id,
      text0: "",
      text1: "",
      username: "ga-memes",
      password: "memes101"
    }
  };

  openCreate = e => {
    this.setState({ create: true });
  };

  closeCreate = e => {
    this.setState({ create: false });
  };

  handleChange = e => {
    const updatedNewMeme = { ...this.state.newMeme };
    updatedNewMeme[e.target.name] = e.target.value;
    this.setState({ newMeme: updatedNewMeme });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createMeme(this.state.newMeme);
    this.setState({ create: !this.state.create });
  };

  handleExpand = e => {
    this.props.setModal(this.props.url);
    this.setState({ showExpand: false });
  };

  showExpand = e => {
    this.setState({ showExpand: true });
  };

  hideExpand = e => {
    this.setState({ showExpand: false });
  };

  render() {
    var templateStyle = {
      backgroundImage: "url(" + this.props.url + ")",
      backgroundSize: "cover",
      height: 300,
      width: 200,
      padding: 0,
      margin: 5
    };

    var closeStyle = {
      position: "absolute",
      right: 5,
      top: 5
    };

    var expandStyle = {
      position: "absolute",
      right: 5,
      bottom: 5,
      zIndex: 1
    };

    return (
      <Grid.Column
        className="meme-image"
        computer={3}
        tablet={5}
        mobile={16}
        style={templateStyle}
        onMouseEnter={this.showExpand}
        onMouseLeave={this.hideExpand}
      >
        <Header
          as="h3"
          style={{
            position: "absolute",
            color: "white",
            top: 5,
            fontFamily: "Impact",
            textTransform: "uppercase",
            textShadowColor: "black"
          }}
        >
          {this.props.name}
        </Header>
        {this.state.showExpand ? (
          <Button color="black" style={expandStyle} icon="expand" onClick={this.handleExpand} />
        ) : null}
        <div style={{ position: "absolute", width: "100%", height: "100%" }} onClick={this.openCreate} />

        {this.state.create ? (
          <div style={{ position: "absolute", backgroundColor: "black", width: "100%", height: "100%", opacity: 0.8 }}>
            <Form style={{ top: 50 }} onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input name="text0" type="text" placeholder="Top Text" onChange={this.handleChange} />
              </Form.Field>

              <Form.Field>
                <Input name="text1" type="text" placeholder="Bottom Text" onChange={this.handleChange} />
              </Form.Field>

              <Form.Field>
                <Button type="submit" value="Create Meme">
                  {" "}
                  Submit
                </Button>
              </Form.Field>
            </Form>
            <Button color="black" style={closeStyle} icon="close" onClick={this.closeCreate} />
          </div>
        ) : null}
      </Grid.Column>
    );
  }
}

export default Template;
