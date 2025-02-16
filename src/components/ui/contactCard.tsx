import hands from "../../assets/hands.png";

const ContactCard = () => {
  return (
    <div className="flex items-center  justify-between rounded-lg bg-gradient-to-r from-[#13adb7] to-[#57ffcf] p-[46px] shadow-lg relative">
      <div className="flex items-center md:flex-col md:items-start gap-2 text-white">
        <div>
          <p className="text-sm uppercase font-semibold">Call Center</p>
          <p className="text-md sm:text-xl font-bold">(+251)9-4210-2626</p>
        </div>
        <div>
          <p className="text-sm uppercase font-semibold">Email</p>
          <p className=" text-md sm:text-xl font-bold">contact@sewlesew.com</p>
        </div>
      </div>

      <div className=" hidden md:block md:absolute md:right-0  md:bottom-0 md:w-1/2 md:max-w-xs md:pointer-events-none">
        <img src={hands} alt="Hands" className="h-full object-cover " />
      </div>
    </div>
  );
};

export default ContactCard;
