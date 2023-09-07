import { BrowserRouter } from "react-router-dom";

import { Router } from "./routes/index.routes";
import { AuthProvider } from "./context/Auth";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.global.css";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}
