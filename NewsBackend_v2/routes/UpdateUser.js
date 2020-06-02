var express = require("express");
var router = express.Router();
var fs = require("fs");

router.put("/:id", (req, res) => {
  let userId = req.body.userPut.id;
  console.log("Put request below______");
  console.log(req.body.userPut);

  fs.readFile("Users.json", (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data);

    var loggedInUserData = users.find((u) => u.id == userId);

    loggedInUserData.newsletter = req.body.userPut.newsletter;

    let usersToSave = JSON.stringify(users, null, 2);

    fs.writeFile("./Users.json", usersToSave, (err) => {
      if (err) throw err;
    });

    res.send("Newsletter changed!!");
  });
});

module.exports = router;
