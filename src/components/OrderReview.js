import React from "react";

class OrderReview extends React.Component {
  constructor() {
    super();

    this.state = {
      orderHistory: []
    };

    this.handleHistory = this.handleHistory.bind(this);
  }

  handleHistory() {
    fetch("/orders")
      .then(response => response.json())
      .then(data => this.setState({ orderHistory: Object.values(data) }));
    //console.log(orderHistory);
  }

  render() {
    return (
      <div>
        <form>
          <button className="menuItemList__button" onClick={this.handleHistory}>
            Order History
          </button>
        </form>
      </div>
    );
  }
}

export default OrderReview;
