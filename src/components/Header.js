import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1 className="header__title">Can&#39;t be arsed to Cook</h1>
          <h2 className="header__footer">
            Lukewarm food delivered to your door
          </h2>
        </div>
        <div>
          <h3 className="header__basket">
            Basket header with page options to add
          </h3>
        </div>
      </div>
    );
  }
}

export default Header;
