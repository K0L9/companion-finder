import { Outlet } from "react-router";
import Header from "./header";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet></Outlet>
    </>
  );
};
export default DefaultLayout;
