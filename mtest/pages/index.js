import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import App from "../components/Table";

export default function Home() {
  return (
    <Navbar>
      {" "}
      <h2>Hi!</h2>;
    </Navbar>
  );
}
