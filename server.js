const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

const menu = {
  1: {
    id: 1,
    name: "Strawberry cheesecake",
    price: 6
  },
  2: {
    id: 2,
    name: "Long Island Iced Tea",
    price: 3
  },
  3: {
    id: 3,
    name: "Beans on Toast",
    price: 9
  },
  4: {
    id: 4,
    name: "Strawberry cheesecake",
    price: 6
  },
  5: {
    id: 5,
    name: "Long Island Iced Tea",
    price: 3
  },
  6: {
    id: 6,
    name: "Beans on Toast",
    price: 9
  },
  7: {
    id: 7,
    name: "Strawberry cheesecake",
    price: 6
  },
  8: {
    id: 8,
    name: "Long Island Iced Tea",
    price: 3
  }
};

const orders = {};

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/menu", function(req, res) {
  res.json(menu);
});

app.post("/orders", function(req, res) {
  // console.log("req.body", req.body);
  // orders.push(req.body);
  // console.log("orders", orders);
  const keys = Object.keys(orders);
  const id = keys.length ? +keys.pop() + 1 : 1;
  const order = { id, items: req.body };
  orders[id] = order;

  res.status(204).json({ order });
});

app.get("/orders", function(req, res) {
  res.json(orders);
});

app.delete("/orders", function(req, res) {
  delete orders[req.body.toDelete];
  res.json(orders);
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
