var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var admin = {
  username: "test",
  password: "1234",
};

router.get("/", function (req, res, next) {
  let html = "<html>";
  html += "<body>";
  html += "<form action='/Admin' method='post'>";
  html += "Admin Username:";
  html += "<input type='text' id='username' name='username'>";
  html += "<br></br>";
  html += "Admin Password:";
  html += "<input type='password'id='password' name='password'>";
  html += "<br></br>";
  html += "<button type='submit'>Login</button>";
  html += "<form/>";
  html += "<body/>";
  html += "<html/>";
  res.send(html);
});

router.post("/", function (req, res) {
  if (
    req.body.username === admin.username &&
    req.body.password === admin.password
  ) {
    let currentUsers;
    var emails = [];
    fs.readFile("Users.json", (err, data) => {
      if (err) throw err;
      currentUsers = JSON.parse(data);
      const email = currentUsers.filter(function (event) {
        return event.newsletter === true;
      });
      email.forEach((element) => {
        emails.push(element.email);
      });
      //console.log(emails);
      let html = "";
      html += "<html>";
      html += "<body>";

      currentUsers.forEach((user) => {
        html += "<br><div>";
        html += "<li>";
        html += "<l>";
        html += user.username;
        html += "</l>";
        html += "</li>";
        html += "</div>";
      });
      html += "<br><br>" + emails;
      html += "</body>";
      html += "</html>";
      res.send(html);
    });
  } else res.send("Invalid Login");
});

module.exports = router;
