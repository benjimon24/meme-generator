import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <Menu fixed="top" inverted style={{ position: "sticky" }}>
        <Container>
          <Menu.Item as="a" header>
            Meme Generator
          </Menu.Item>
          <Menu.Item href="/">Your Memes</Menu.Item>
          <Menu.Item href="/templates">Templates</Menu.Item>
          {/* <Menu.Item position="right">
            <Button inverted>Login</Button>
            <Button inverted style={{ marginLeft: "0.5em" }}>
              Sign Up
            </Button>
          </Menu.Item> */}
        </Container>
      </Menu>
    );
  }
}

export default Navbar;
