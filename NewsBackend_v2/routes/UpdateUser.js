var express = require("express");
var router = express.Router();
var fs = require("fs");

router.put("/:id", (req, res) => {
  let userId = req.body.userPut.id;

  fs.readFile("Users.json", (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data);

    var userFromDB = users.find((u) => u.id == userId);

    userFromDB.newsletter = req.body.userPut.newsletter;

    let updateUser = JSON.stringify(users, null, 2);

    fs.writeFile("./Users.json", updateUser, (err) => {
      if (err) throw err;
    });

    res.send("Newsletter Updated!");
  });
});

module.exports = router;
