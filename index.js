import express from "express";
import bodyParser from "body-parser";
import path, {
  dirname
} from "path";
import {
  fileURLToPath
} from "url";
import session from "express-session";

const app = express();
const __dirname = dirname(fileURLToPath(
  import.meta.url));
const port = process.env.PORT || 10533;

// View engine
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

// Session middleware (stores `k`)
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60
    },
  })
);

// Routes
app.get("/", (req, res) => {
  // default: no selection
  const k = req.session.k || 0;
  res.render("index", {
    k
  });
});


// Role switching route
app.get("/setRole/:role", (req, res) => {
  const {
    role
  } = req.params;

  if (role === "owner") req.session.k = 1;
  else if (role === "tenant") req.session.k = 2;
  else if (role === "reset") req.session.k = 0;

  // After setting k, just redirect to /pricing
  res.redirect("/pricing");
});

app.get("/login", (req, res) => {
  res.render("LoginPage"); // views/LoginPage.ejs
});

app.get("/pricing", (req, res) => {
  const k = req.session.k || 0;
  res.render("Pricing.ejs", {
    k
  });
});

app.post("/submit", (req, res) => {
  const {
    email,
    password
  } = req.body;

  if (email === password) {
    res.send("<h1>mt kr bhai</h1>");
  } else {
    res.sendFile(path.join(__dirname, "public", "homePage.html"));
  }
});

// Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});