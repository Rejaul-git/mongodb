const express = require("express");
const path = require("path");
const { v4: uuid } = require("uuid");
var methodOverride = require("method-override");
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const user = [
  {
    id: uuid(),
    name: "karim",
    comment: "be happy what you have",
  },
  {
    id: uuid(),
    name: "rahim",
    comment: "we are having fun",
  },
  {
    id: uuid(),
    name: "sobuj",
    comment: "that was just wow",
  },
  {
    id: uuid(),
    name: "plabon",
    comment: "it was so funny",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/view.ejs", { user });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new.ejs");
});

app.get("/comments/:id", (req, res) => {
  let userPost = user.find(e => e.id === req.params.id);
  res.render("comments/user.ejs", { userPost });
  console.log(req.body);
});
app.post("/comments", (req, res) => {
  user.push(req.body);
  req.body.id = uuid();
  res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  let commen = user.find(e => e.id === req.params.id);
  res.render("comments/edit.ejs", { commen });
});

app.patch("/comments/:id", (req, res) => {
  const data = req.body.comment;
  let upda = user.find(e => e.id === req.params.id);
  upda.comment = data;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  let userdelete = user.find(e => e.id === req.params.id);
  let indexnum = user.indexOf(userdelete);
  user.splice(indexnum, 1);
  res.redirect("/comments");
});
app.use("*", (req, res) => {
  res.send("URL not found.....");
});
app.listen(3000, (req, res) => {
  console.log("server is running.....");
});
