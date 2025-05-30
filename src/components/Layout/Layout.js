import React from 'react';
import PropTypes from 'prop-types';
import classes from './Layout.module.css';
import Toolbar from './Toolbar/Toolbar';

const Layout = (props) => (
  <div className={classes.Layout}>
    <Toolbar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;