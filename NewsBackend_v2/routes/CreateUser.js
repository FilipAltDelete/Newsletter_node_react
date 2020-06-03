var express = require("express");
var fs = require("fs");
var app = express();
const bcrypt = require("bcrypt");
var salt = 10;

app.post("/", function (request, response) {
  response.send(request.body);

  var newUsername = request.body.user.username;
  var newPassword = request.body.user.password;
  var newEmail = request.body.user.email;
  var password_confirmation = request.body.user.password_confirmation;

  console.log(newUsername);
  console.log(newEmail);
  console.log(newPassword);
  console.log(password_confirmation);

  if (newPassword === password_confirmation) {
    console.log("Password Match!!");
    bcrypt.hash(newPassword, salt, (err, encrypted) => {
      newPassword = encrypted;
      fs.readFile("Users.json", (err, data) => {
        var userExist = false;

        if (err) throw err;
        var users = JSON.parse(data);

        users.forEach((usersFromFile) => {
          if (usersFromFile.username === newUsername) userExist = true;
        });

        if (userExist === false) {
          let userId = 0;
          users.forEach((element) => {
            userId++;
          });
          newUser = {
            id: userId + 1,
            username: newUsername,
            password: newPassword,
            email: newEmail,
            newsletter: false,
          };
          users.push(newUser);
          var saveUser = JSON.stringify(users, null, 2);
          fs.writeFile("Users.json", saveUser, (err, data) => {
            if (err) throw err;
          });
        } else {
          console.log("User Alredy Exists!");
        }
      });
    });
  } else console.log("Password did not match.....");
});

// fråga mig inte varför
app.listen(9001);

module.exports = app;
