import { Outlet } from "react-router";
import Header from "./header";
import BackgroundVideo from "./backgroundVideo";
import BackgroundImage from "./backgroundImage";

const DefaultLayout = () => {
  return (
    <>
      <BackgroundVideo />
      {/* <BackgroundImage /> */}
      <Header />
      <Outlet></Outlet>
    </>
  );
};
export default DefaultLayout;
