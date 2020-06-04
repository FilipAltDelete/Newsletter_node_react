import React, { Component } from "react";
import axios from "axios";

export class MainHeader extends Component {
  constructor(props) {
    super(props);

    /*
    var logedInUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));

    if (logedInUser !== null) {
      this.state = {
        id: logedInUser.id,
        username: logedInUser.username,
        newsletter: logedInUser.newsletter,
        isLoggedIn: true,
      };
    } else {
      this.state = {
        id: "",
        username: "",
        password: "",
        newsletter: false,
        isLoggedIn: false,
      };
    }
    */

    this.state = {
      id: "",
      username: "",
      password: "",
      newsletter: false,
      isLoggedIn: false,
    };

    this.handleSingIn = this.handleSingIn.bind(this);
    this.handleSingOut = this.handleSingOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSingOut(event) {
    event.preventDefault();
    localStorage.clear();
    window.location.href = "/";
    this.props.callFromParent(false);
  }
  handleSingIn(event) {
    const { username, password } = this.state;

    axios
      .post("http://localhost:9000/users", {
        user: {
          username: username,
          password: password,
        },
      })
      .then((response) => {
        console.log(response);

        if (response.data === "invalid") {
          console.log("Error!!");
        } else {
          var loggedInUser = {
            id: response.data.id,
            username: response.data.username,
            newsletter: response.data.newsletter,
          };
          this.setState({
            isLoggedIn: true,
            newsletter: response.data.newsletter,
            id: response.data.id,
          });
          this.props.callFromParent(
            true,
            this.state.username,
            this.state.newsletter,
            this.state.id
          );
          localStorage.setItem(
            "currentLoggedInUser",
            JSON.stringify(loggedInUser)
          );
        }
      });
    event.preventDefault();
  }
  handleRegister(event) {
    event.preventDefault();
    this.props.registerUser(true);
  }

  render() {
    const textStyle = {
      color: "#fff",
      textAlign: "center",
    };
    const headerStyle = {
      background: "#5e438d",
      height: "130px",
      padding: "10px",
    };
    const formStyle = {
      color: "#fff",
      textAlign: "left",
    };

    const buttonStyle = {
      width: "100px",
    };

    const registerButtonStyle = {
      width: "100px",
      float: "right",
    };
    const left = {
      float: "left",
    };
    const right = {
      float: "lright",
    };

    if (this.state.isLoggedIn === false) {
      return (
        <div>
          <header style={headerStyle}>
            <h1 style={textStyle}>Newsletter</h1>
            <div style={left}>
              <form onSubmit={this.handleSingIn} style={formStyle}>
                Username{" "}
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                ></input>{" "}
                Password{" "}
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                ></input>{" "}
                <button
                  //onClick={this.childFunction.bind(this)}
                  //style={buttonStyle}
                  type="submit"
                >
                  Login
                </button>
              </form>
            </div>
            <div syle={right}>
              <button onClick={this.handleRegister} style={registerButtonStyle}>
                Register
              </button>
            </div>
          </header>
        </div>
      );
    } else if (this.state.isLoggedIn === true) {
      return (
        <div>
          <header style={headerStyle}>
            <h1 style={textStyle}>Newsletter</h1>
            <form onSubmit={this.handleSingOut} style={formStyle}>
              <button style={buttonStyle} type="submit">
                Sign Out
              </button>
            </form>
          </header>
        </div>
      );
    }
  }
}

export default MainHeader;
