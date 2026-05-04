import { createRoot } from "react-dom/client";
import "./index.css";

import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRoutes />

    <ToastContainer
      position="top-right"
      autoClose={1500}
      theme="dark"
      draggable
    />
  </Provider>
);
