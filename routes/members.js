const express = require('express');
const members = require(`../members`);

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: "Member App",
    members
  });
});

module.exports = router;