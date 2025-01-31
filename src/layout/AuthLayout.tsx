import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full h-full">
      <div className="hidden xl:flex xl:flex-col w-[40%] h-screen justify-center items-center bg-customTealLight text-white ">
        <h1 className="text-6xl font-bold font-pds mb-10 tracking-widest">
          SEWLESEW
        </h1>
        <p className="text-3xl font-semibold">
          Happiness comes from your action
        </p>
      </div>
      <div className="w-full xl:w-[60%] h-screen flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
