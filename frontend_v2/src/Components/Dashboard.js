import React, { Component } from "react";
import axios from "axios";

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { username, email, password, password_confirmation } = this.state;

    axios
      .post("http://localhost:9000/CreateUser", {
        user: {
          username: username,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        },
      })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      });
    //this.props.registerNewUser(false);
    //this.setState({ registerNewUser: false });
    event.preventDefault();
  }

  render() {
    //var user = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var putNews;

    const handleNewsletter = () => {
      if (this.props.userNewsletter === false) {
        putNews = true;
      } else {
        putNews = false;
      }
      //console.log(this.props.newsletter)
      axios.put(
        "http://localhost:9000/UpdateUser/" + this.props.currentUserId,
        {
          userPut: {
            id: this.props.currentUserId,
            username: this.props.loggedInUsername,
            //password: user.password,
            newsletter: putNews,
          },
        }
      );
    };

    var hasNews;
    var subscribeButtonValue;
    if (this.props.userNewsletter) {
      hasNews = "You subscribe to our newsletter!";
      subscribeButtonValue = "Unsubscribe";
    } else {
      hasNews = "You dont subscribe to our news letter!";
      subscribeButtonValue = "Subscribe";
    }
    if (this.props.registerNewUser === true) {
      const formStyle = {
        color: "#282c34",
        textAlign: "left",
        padding: "100px",
      };
      return (
        <div>
          <div>
            <form style={formStyle} onSubmit={this.handleSubmit}>
              <br></br>
              <br></br>
              New User: <br></br>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                required
              ></input>
              <br></br>
              <br></br>
              New Email: <br></br>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              ></input>
              <br></br>
              <br></br>
              Password: <br></br>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              ></input>
              <br></br>
              <br></br>
              Confirm : <br></br>
              <input
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
              ></input>
              <br></br>
              <br></br>
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      );
    }
    if (this.props.userLogedIn === false) {
      return (
        <div>
          <h4>Please sign in or register!</h4>
        </div>
      );
    } else if (
      this.props.userLogedIn === true ||
      (this.props.userLoggedIn === true && this.props.registerNewUser === true)
    ) {
      return (
        <div>
          <h3>Welcome {this.props.loggedInUsername}!!</h3>
          <br></br>
          <h4>{hasNews}</h4>
          <input
            type="button"
            onClick={handleNewsletter}
            value={subscribeButtonValue}
          ></input>

          <div></div>
        </div>
      );
    }
  }
}

export default Dashboard;
