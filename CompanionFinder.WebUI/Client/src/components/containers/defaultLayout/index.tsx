import { Outlet } from "react-router";
import Header from "./header";
import BackgroundVideo from "./backgroundVideo";

const DefaultLayout = () => {
  return (
    <>
      <BackgroundVideo />
      <Header />
      <Outlet></Outlet>
    </>
  );
};
export default DefaultLayout;
