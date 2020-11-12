import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "redux-bundler-react";
import { getNavHelper } from "internal-nav-helper";
import getStore from "./app-bundles";
import cache from "./cache";

import App from "./App";

cache.getAll().then((initialData) => {
  const store = getStore(initialData);

  // @ts-ignore
  if (process.env.NODE_ENV === "development") window.store = store;

  ReactDOM.render(
    <Provider store={store}>
      <div onClick={getNavHelper(store.doUpdateUrl)}>
        <App />
      </div>
    </Provider>,
    document.getElementById("root")
  );
});
