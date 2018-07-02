import React from "react";

class MenuItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
      quantity: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmitAdd(e) {
    e.preventDefault();
    const quantity = this.state.value;
    this.setState({
      quantity
    });
    this.props.receiveUpdateOrder(this.props.item.id, quantity);
  }

  handleSubmitClear(e) {
    e.target.value = 0;
  }

  render() {
    return (
      <div className="menuCard">
        <p>Item: {this.props.item.name} </p>{" "}
        <p>Price: ${this.props.item.price} </p>
        <div className="menuCard__inputs">
          <label className="menuCard__label">Quantity</label>
          <input
            type="number"
            step="1"
            className="menuItemList__input"
            min={0}
            max={10}
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button
            className="menuItemList__button"
            onClick={this.handleSubmitAdd}
          >
            Add to basket
          </button>
          <button
            className="menuItemList__button"
            onClick={this.handleSubmitClear}
          >
            Clear basket
          </button>
        </div>
      </div>
    );
  }
}

export default MenuItems;
