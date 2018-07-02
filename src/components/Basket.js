import React from "react";

class Basket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="basket">{this.props.currentOrder}</div>;
  }
}

export default Basket;
