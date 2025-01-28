import Button from "../components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
const Signin = () => {
  return (
    <div className="flex w-full h-full">
      <div className="hidden xl:flex xl:flex-col w-[40%] h-screen justify-center items-center bg-customTealDark text-white ">
        <h1 className="text-6xl font-bold font-pds mb-10 tracking-widest">
          SEWLESEW
        </h1>
        <p className="text-3xl font-semibold">Connect Beyond Words</p>
      </div>
      <div className="w-full xl:w-[60%] h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-6  px-12 py-16 rounded-2xl bg-gray-800">
          <h1 className="font-semibold text-4xl text-left">Get Started</h1>
          <Button
            onClick={() => {}}
            className="w-[400px] bg-transparent border border-red-400 flex items-center justify-center gap-4 bg-[#1f2429]"
          >
            <FcGoogle size={22} />
            Sign in with Google
          </Button>
          <Button
            onClick={() => {}}
            className="w-[400px] bg-transparent border border-red-400 flex items-center justify-center gap-4 bg-[#1f2429]"
          >
            <FaGithub size={22} />
            Sign in with Github
          </Button>
          <Button
            onClick={() => console.log("hey")}
            className="w-[400px] bg-transparent border border-red-400 flex items-center justify-center gap-4 bg-[#1f2429]"
          >
            <FaFacebook size={22} />
            Sign in with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
