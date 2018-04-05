import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Templates from "./components/templates";
import Memes from "./components/memes";
import Modal from "./components/modal";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";

class App extends Component {
  state = {
    templates: [],
    memes: [],
    modalUrl: "",
    showModal: false
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      const getTemplates = response.data.data.memes;
      this.setState({ templates: getTemplates });
    } catch (error) {
      console.log("Error retrieving memes!");
      console.log(error);
    }

    try {
      const response = await axios.get("/memes");
      const getMemes = response.data;
      this.setState({ memes: getMemes });
    } catch (error) {
      console.log("Error retrieving your memes!");
      console.log(error);
    }
  };

  deleteMeme = async (memeID, index) => {
    try {
      await axios.delete(`/memes/${memeID}`);
      const updatedMemeList = [...this.state.memes];
      updatedMemeList.splice(index, 1);
      this.setState({ memes: updatedMemeList });
    } catch (error) {
      console.log(`Error deleting Idea with ID of ${memeID}`);
      console.log(error);
    }
  };

  createMeme = async newMeme => {
    try {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      };

      var data = new FormData();
      data.append("template_id", newMeme.template_id);
      data.append("text0", newMeme.text0);
      data.append("text1", newMeme.text1);
      data.append("username", newMeme.username);
      data.append("password", newMeme.password);

      const response = await axios.post("https://api.imgflip.com/caption_image", data, axiosConfig);

      try {
        const localResponse = await axios.post("/memes", { url: response.data.data.url });
        const updatedMemes = [...this.state.memes];
        updatedMemes.push(localResponse.data);
        this.setState({ memes: updatedMemes });
      } catch (error) {
        console.log("Error saving meme");
        console.log(error);
      }
    } catch (error) {
      console.log("Error creating meme");
      console.log(error);
    }
  };

  setModal = url => {
    console.log(url);
    this.setState({ modalUrl: url, showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        {this.state.showModal ? <Modal url={this.state.modalUrl} hideModal={this.hideModal} /> : null}

        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Memes setModal={this.setModal} memes={this.state.memes} deleteMeme={this.deleteMeme} />}
            />
            <Route
              path="/templates"
              render={() => (
                <Templates setModal={this.setModal} templates={this.state.templates} createMeme={this.createMeme} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
