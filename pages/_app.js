import { ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";
import "../styles/globals.css";
import "../styles/field.scss";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../contexts/AuthContext";
import { UserProvider } from "../contexts/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ToastContainer position="top-center" />
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp;
