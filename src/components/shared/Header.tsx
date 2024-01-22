import React from 'react';

const Header = () => {
  return (
    <>
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a
            className="navbar-item"
            href="https://andres-hernandez.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/img/andres.png"
              width="30"
              alt="andres logo"
              title="andres logo"
            />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
