import Image from "next/image";
import LoginForm from "app/_components/login-form/login-form";
import LandingImage from "assets/images/landing-image.png";
import HiWEBLogo from "public/hiweb-logo.png";

const LoginPage = async () => {
  return (
    <main className="h-screen flex flex-row">
      <div className="w-1/2 flex justify-center items-center">
        <Image
          className="w-auto h-auto"
          src={LandingImage}
          alt="Landing Image"
        />
      </div>
      <div className="w-1/2 flex flex-col items-center gap-4 py-28">
        <Image className="flex-none" src={HiWEBLogo} alt="HiWeb's logo" />
        <div className="w-full flex flex-1 justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
