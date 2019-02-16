const express = require("express");
// mergeParams allows us to get access to id inside this router
const router = express.Router({ mergeParams: true });

const { createMessage } = require("../handlers/messages");

// prefix - /api/users/:id/messages
// router.route, all routes start with "/"
router.route("/").post(createMessage);

module.exports = router;