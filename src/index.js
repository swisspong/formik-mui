import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { extendedApiSlice } from './features/posts/postsSlice';
import { store } from "./store";
import { extendApiSlice } from "./features/categorySlice";
import { Provider } from "react-redux";
// import { usersApiSlice } from './features/users/usersSlice';

store.dispatch(extendApiSlice.endpoints.getCategories.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
