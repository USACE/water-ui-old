import React from "react";
import { connect } from 'redux-bundler-react';
import Header from '../app-common/Header';
import Footer from '../app-common/Footer';
import "./layout.scss";

export default connect('selectRoute', ({ route: Route }) => {
  return (
    <>
      <Header />
      <main>
        <Route />
      </main>
      <Footer />
    </>
  );
});
