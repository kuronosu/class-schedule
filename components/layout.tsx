import Header from "../components/header";
// import Footer from "../components/footer";
import { FC } from "react";

import styles from "./layout.module.css";

const Layout: FC = function ({ children }) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
