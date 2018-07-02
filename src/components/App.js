import React from "react";
import MenuItems from "./MenuItems";
import Header from "./Header";
import Basket from "./Basket";
import OrderReview from "./OrderReview";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menu: [],
      currentOrder: {},
      orderReview: []
    };

    // this.onMenuUpdate = this.onMenuUpdate.bind(this)
    this.receiveUpdateOrder = this.receiveUpdateOrder.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }

  componentDidMount() {
    fetch("/menu")
      .then(response => response.json())
      .then(data => this.setState({ menu: Object.values(data) }))
      .catch(function(error) {
        console.log(error);
      });
  }

  receiveUpdateOrder(id, quantity) {
    const newOrder = { [id]: +quantity };
    const currentOrder = Object.assign({}, this.state.currentOrder, newOrder);

    this.setState({ currentOrder });
  }

  displayCurrentOrderQuantity() {
    //if not empty object
    const order = this.state.currentOrder;
    const menuItems = this.state.menu;
    const orderedItems = Object.keys(order); // [3,2]

    if (orderedItems.length !== 0) {
      const basketItems = menuItems.filter(menuItem =>
        orderedItems.includes(menuItem.id.toString())
      );

      basketItems.forEach(basketItem => {
        //basketItem = {id: 1, item: 'chicken soup', price: 6}
        //order = {1:2, 3:1} => {id: quantity}
        // basketItem.quantity == basketItem["quantity"]
        basketItem.quantity = order[basketItem.id];
        basketItem.totalPrice = basketItem.quantity * basketItem.price;
      });
      //basketItems = [{"id":3,"name":"Beans on Toast","price":9,"quantity":1,"totalPrice":9}]
      // return <div>{JSON.stringify(basketItems)}</div>;
      const basketItemsDisplay = basketItems.map(basketItem => {
        return (
          <tr key={basketItem.id}>
            <td>{basketItem.name}</td>
            <td className="basket__numberAlign">${basketItem.price}</td>
            <td className="basket__numberAlign">{basketItem.quantity}</td>
            <td className="basket__numberAlign">${basketItem.totalPrice}</td>
          </tr>
        );
      });

      const basketTotal = basketItems.reduce((total, basketItem) => {
        return total + basketItem.totalPrice;
      }, 0);
      return (
        <div className="basket__items">
          <table className="basket__item">
            <thead>
              <tr>
                <th>Item</th>
                <th className="basket__tableWidth">Unit price </th>
                <th className="basket__tableWidth">Quantity </th>
                <th className="basket__tableWidth">Total </th>
              </tr>
            </thead>
            <tbody>
              {basketItemsDisplay}
              <tr>
                <th>Total basket price:</th>
                <th />
                <th />
                <th className="basket__tableWidth">${basketTotal}</th>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div className="basket__default">Nothing in basket</div>;
    }
  }

  displayCurrentOrderItems() {
    if (Object.keys(this.state.currentOrder).length !== 0) {
    }
  }

  handleOrder(e) {
    e.preventDefault();
    fetch("/order", {
      method: "POST",
      body: JSON.stringify(this.state.currentOrder),
      headers: {
        "content-type": "application/json"
      }
    });
  }

  render() {
    return (
      <div>
        <Header currentOrder={this.props.currentOrder} />
        <div>{this.displayCurrentOrderQuantity()}</div>
        <ul className="menuItemList">
          <form className="menuItemList__form">
            {this.state.menu.map(item => (
              <MenuItems
                key={item.id}
                item={item}
                receiveUpdateOrder={this.receiveUpdateOrder}
              />
            ))}

            <div>
              <button
                className="menuItemList__button"
                onClick={this.handleOrder}
              >
                Submit
              </button>
              <button
                className="menuItemList__button"
                onClick={this.handleReview}
              >
                Review order
              </button>
            </div>
          </form>
        </ul>
        <OrderReview />
      </div>
    );
  }
}

export default App;
