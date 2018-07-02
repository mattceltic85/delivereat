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

const orders = [];

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/menu", function(req, res) {
  res.json(menu);
});

app.post("/order", function(req, res) {
  console.log("req.body", req.body);
  orders.push(req.body);
  res.json({ orders: orders });
});

app.get("/orders", function(req, res) {
  const person = { name: "matt", age: 39, food: "meat" };
  // [{1: 2}, {}]
  const stringifiedOrders = orders.map(order => JSON.stringify(order));
  res.render("order-history", { orders: stringifiedOrders });
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
