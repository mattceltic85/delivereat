import React from "react";
import BasketItems from "./BasketItems";

class Basket extends React.Component {
  constructor(props) {
    super(props);
  }

  // displayCurrentOrderQuantity() {
  //   const order = this.props.currentOrder;
  //   const menuItems = this.props.menu;
  //   const orderedItems = Object.keys(order); // [3,2]
  //
  //   if (orderedItems.length !== 0) {
  //     const basketItems = Object.values(menuItems).filter(menuItem =>
  //       orderedItems.includes(menuItem.id.toString())
  //     );
  //
  //     basketItems.forEach(basketItem => {
  //       basketItem.quantity = order[basketItem.id];
  //       basketItem.totalPrice = basketItem.quantity * basketItem.price;
  //     });
  //
  //     const basketItemsDisplay = basketItems.map(basketItem => {
  //       return (
  //         <tr key={basketItem.id}>
  //           <td>{basketItem.name}</td>
  //           <td className="basket__numberAlign">${basketItem.price}</td>
  //           <td className="basket__numberAlign">{basketItem.quantity}</td>
  //           <td className="basket__numberAlign">${basketItem.totalPrice}</td>
  //         </tr>
  //       );
  //     });

  render() {
    const order = this.props.currentOrder;
    const menuItems = this.props.menu;
    const orderedItems = Object.keys(order);

    if (orderedItems.length !== 0) {
      const basketItems = Object.values(menuItems).filter(menuItem =>
        orderedItems.includes(menuItem.id.toString())
      );
      basketItems.forEach(basketItem => {
        basketItem.quantity = order[basketItem.id];
        basketItem.totalPrice = basketItem.quantity * basketItem.price;
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
              <BasketItems basketItems={basketItems} />
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
}

export default Basket;
