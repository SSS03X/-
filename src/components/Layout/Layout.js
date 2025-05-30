import React from 'react';
import PropTypes from 'prop-types';
import classes from './Layout.module.css';

const Layout = (props) => (
  <div className={classes.Layout}>
    <main className={classes.Content}>
      {props.children}
    </main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;