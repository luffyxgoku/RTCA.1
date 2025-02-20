const express = require("express");
const db = require("../db.js");
const router = express.Router();

router.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  const sql = "INSERT INTO comments (username, comment) VALUES (?, ?)";
  db.query(sql, [username, comment], (err, result) => {
    if (err) return res.status(500).send(err);

    const io = req.app.get("socketio");
    const newComment = {
      id: result.insertId,
      username,
      comment,
      timestamp: new Date(),
    };
    io.emit("newComment", newComment);
    res.status(200).json(newComment);
  });
});

router.get("/comments", (req, res) => {
  const sql = "SELECT * FROM comments ORDER BY timestamp DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

module.exports = router;
