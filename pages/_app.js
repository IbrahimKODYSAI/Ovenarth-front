import { ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";
import "../styles/globals.css";
import "../styles/field.scss";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer position="top-center" />
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
