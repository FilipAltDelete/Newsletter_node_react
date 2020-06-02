var express = require("express");
var router = express.Router();
var fs = require("fs");
const bcrypt = require("bcrypt");

router.post("/", function (req, res) {
  var loginSucess = undefined;
  var user = req.body.user.username;
  var passw = req.body.user.password;

  fs.readFile("Users.json", (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data);
    users.forEach((userFromFile) => {
      if (user === userFromFile.username) {
        bcrypt.compare(req.body.user.password, userFromFile.password, function (
          err,
          result
        ) {
          if (result === true) {
            userLoggedin = {
              id: userFromFile.id,
              username: userFromFile.username,
              email: userFromFile.email,
              newsletter: userFromFile.newsletter,
            };
            console.log("SUCCESSS!!!!");
            loginSucess = userLoggedin;
            res.send(loginSucess);
          } else {
            console.log("ERRRRORRRR");
            loginSucess = "invalid";
            res.send(loginSucess);
          }
        });
      }
    });
  });
});

module.exports = router;
