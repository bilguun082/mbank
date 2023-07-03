import Head from "next/head";
import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";
import Cookies from "js-cookie";

const Layout = ({ children }) => {
  const [email, setEmail] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthentication = () => {
    Cookies.set("userEmail", email);
    setAuthenticated(true);
    console.log("setcookie ok");
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div>
      {authenticated ? (
        children
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-xs">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Custom Input Jishee
            </h2>
            <br />
            <InputComponent
              type={email}
              className="focus:border-green-800"
              value={email}
              onChange={handleChange}
            />
            <ButtonComponent
              className="hover:bg-green-700 mt-5 rounded"
              onClick={handleAuthentication}
              label="Submit"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Layout;
