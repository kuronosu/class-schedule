import { FC } from "react";
import styled from "styled-components";
import Header from "../components/header";

const Layout: FC = function ({ children }) {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default Layout;
