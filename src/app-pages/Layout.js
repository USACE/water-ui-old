import React from "react";
import { connect } from 'redux-bundler-react';
import Navbar from '../app-common/Navbar';
import Footer from '../app-common/Footer';
import "./layout.scss";

export default connect('selectRoute', ({ route: Route }) => {
  return (
    <div>
      <Navbar />
      <main>
        <Route />
      </main>
      <Footer />
      </div>
  );
});
