import express from "express";
import bodyParser from "body-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT ||3001;

// Set EJS as view engine
app.set("view engine", "ejs");

// Serve static files (CSS, JS, images inside /public)


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs"); // looks for views/index.ejs
});

app.get("/login", (req, res) => {
  res.render("LoginPage"); // looks for views/LoginPage.ejs
});

app.post("/submit", (req, res) => {
  const { email, password } = req.body;

  if (email === password) {
    res.send(`<h1>mt kr bhai</h1>`);
  } else {
    res.sendFile(path.join(__dirname, "public", "homePage.html"));
  }
});

// Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
