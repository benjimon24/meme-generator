import React, { Component } from "react";
class Template extends Component {
  state = {
    create: false,
    newMeme: {
      template_id: this.props.id,
      text0: "",
      text1: "",
      username: "ga-memes",
      password: "memes101"
    }
  };

  toggleCreate = e => {
    this.setState({ create: !this.state.create });
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

  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <img
          onClick={this.toggleCreate}
          style={{ maxWidth: 200, maxHeight: 300 }}
          src={this.props.url}
          alt="template"
        />
        {this.state.create ? (
          <form onSubmit={this.handleSubmit}>
            <div>
              <div>
                <label htmlFor="text0">Top Text: </label>
                <input name="text0" type="text" onChange={this.handleChange} />
              </div>

              <div>
                <label htmlFor="text1">Bottom Text: </label>
                <input name="text1" type="text" onChange={this.handleChange} />
              </div>

              <div>
                <input type="submit" value="Create Meme" />
              </div>
            </div>
          </form>
        ) : null}
      </div>
    );
  }
}

export default Template;
