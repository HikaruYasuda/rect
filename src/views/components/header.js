import React from 'react';

const Header = ({authenticated, onSignOut}) => {
  return (
    <header className="header">
      <div className="g-row">
        <div className="g-col">
          <h1 className="header__title">Todo React Redux</h1>

          <ul className="header__actions">
            {authenticated ? <li><button className="btn" onClick={onSignOut}>Sign out</button></li> : null}
            <li><a className="link link--github" href="https://github.com/r-park/todo-react-redux"/></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authenticated: React.PropTypes.bool.isRequired,
  onSignOut: React.PropTypes.func.isRequired
};

export default Header;
