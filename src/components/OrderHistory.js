import React from "react";

class OrderHistory extends React.Component {
  constructor() {
    super();

    this.state = {
      orderHistory: {}
    };

    this.handleHistory = this.handleHistory.bind(this);
    this.displayOrderHistory = this.displayOrderHistory.bind(this);
  }

  handleHistory(e) {
    e.preventDefault(e);
    fetch("/orders")
      .then(response => response.json())
      .then(data => this.setState({ orderHistory: data }));
  }

  displayOrderHistory() {
    const history = this.state.orderHistory;
    return Object.keys(history).map(id => {
      const order = history[id];
      return (
        <div key={order.id}>
          <p>{order.id}</p>
          {Object.entries(order.items).map(([id, quantity]) => {
            console.log(id, quantity, this.props.menu[id]);
            // const {id, name, price} = this.props.menu[id]
            const menuItem = this.props.menu[id];
            const name = menuItem.name;
            const price = menuItem.price;
            return (
              <p key={menuItem.id}>
                {name}: {quantity * price}
              </p>
            );
          })}
        </div>
      );
    });
  }

  render() {
    console.log("this.state.orderHistory", this.state.orderHistory);
    return (
      <div>
        <form>
          <button className="menuItemList__button" onClick={this.handleHistory}>
            Order History
          </button>
        </form>
        <div>{this.displayOrderHistory()}</div>
      </div>
    );
  }
}

export default OrderHistory;
