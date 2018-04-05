import React, { Component } from "react";
import { Image } from "semantic-ui-react";

class Modal extends Component {
  render() {
    return (
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          zIndex: 1
        }}
        onClick={this.props.hideModal}
      >
        <Image style={{ maxWidth: "80%", maxHeight: "80%", margin: "auto" }} src={this.props.url} />
      </div>
    );
  }
}

export default Modal;
