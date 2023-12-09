import Image from "next/image";
import LoginForm from "app/_components/login-form/login-form";
import LandingImage from "assets/images/landing-image.png";
import HiWEBLogo from "public/hiweb-logo.png";

const LoginPage = async () => {
  return (
    <main className="h-screen flex flex-row">
      <div className="w-1/2 flex justify-center items-center">
        <Image
          className="w-full h-full"
          src={LandingImage}
          alt="Landing Image"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-between items-center gap-4 py-28">
        <Image
          className="w-[136px] h-[91px] flex-none"
          src={HiWEBLogo}
          alt="HiWeb's logo"
        />
        {/* <div className="w-[386px] h-[321px] flex flex-1 justify-center items-center"> */}
        <LoginForm />
        {/* </div> */}
      </div>
    </main>
  );
};

export default LoginPage;
