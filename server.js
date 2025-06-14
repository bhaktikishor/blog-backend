const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/api/post", (req, res) => {
  db.query("SELECT * FROM blogs ORDER BY created_at DESC", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post("/api/post", (req, res) => {
  const { title, content, author, quote, review, novel } = req.body;

  console.log("Received POST data:", req.body);

  const query = `INSERT INTO blogs (blog_title, blog_content, blog_novel, blog_novelauthor, blog_quote, blog_review) VALUES (?, ?, ?, ?, ? ,?)`;

  const values = [title, content, author, quote, review, novel];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    res.status(201).json({ message: "Blog post added successfully" });
  });
});

app.get("/api/post/:id", (req, res) => {
  const blogId = req.params.id;

  db.query("SELECT * FROM blogs WHERE blog_id = ?", [blogId], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0)
      return res.status(404).json({ error: "Blog not found" });

    res.json(result[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at  http://localhost:${PORT}`);
});
