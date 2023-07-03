import axios from "axios";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordAgain] = useState("");
  const router = useRouter();

  const handleNameChanges = (e) => {
    setName(e.target.value);
  };

  const handleBirthdayChanges = (e) => {
    setBirthday(e.target.value);
  };

  const handleEmailChanges = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChanges = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordAgainChanges = (e) => {
    setPasswordAgain(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUser();
  };
  const createUser = async () => {
    if (password === passwordagain) {
      try {
        const res = await axios.post("http://localhost:8000/user/create", {
          name: name,
          email: email,
          birthday: birthday,
          password: password,
        });
        console.log(res);
        setShowMessage(true);
        if (res.statusText === "OK") {
          setIsSuccess(true);
          router.push("/signin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {showMessage && (
          <>
            {isSuccess ? (
              <div className="bg-green-200 text-green-800 p-4 mb-4 rounded">
                Signup successful!
              </div>
            ) : (
              <div className="bg-red-200 text-red-800 p-4 mb-4 rounded">
                Check your info, try again!
              </div>
            )}
          </>
        )}
        <form
          method="POST"
          className="bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-4">
            <label
              htmlFor="name"
              className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
            >
              Name
            </label>
            <InputComponent
              type="text"
              className="focus:border-green-800"
              value={name}
              onChange={handleNameChanges}
            />

            <label
              htmlFor="email"
              className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
            >
              E-mail
            </label>
            <InputComponent
              type="email"
              className="focus:border-green-800"
              value={email}
              onChange={handleEmailChanges}
            />
            <label
              htmlFor="birthday"
              className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
            >
              Birthdate
            </label>
            <InputComponent
              type="date"
              className="focus:border-green-800"
              value={birthday}
              onChange={handleBirthdayChanges}
            />

            <label
              htmlFor="password"
              className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
            >
              Password
            </label>
            <InputComponent
              type="password"
              className="focus:border-green-800"
              value={password}
              onChange={handlePasswordChanges}
              placeholder="********"
            />
            <label
              htmlFor="passwordagain"
              className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4"
            >
              Password again
            </label>
            <InputComponent
              type="password"
              className="focus:border-green-800"
              value={passwordagain}
              onChange={handlePasswordAgainChanges}
              placeholder="********"
            />
          </div>
          <ButtonComponent
            className="hover:bg-green-700 mt-5 rounded"
            onClick={handleSubmit}
            label="Sign Up"
          />
          <a
            className=" font-bold text-sm text-green-800 ml-16 hover:text-green-700"
            href="/signup"
          >
            Have an account?
          </a>
        </form>
      </div>
    </div>
  );
}
