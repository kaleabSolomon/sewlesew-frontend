import hands from "../../assets/hands.png";

const ContactCard = () => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-[#13adb7] to-[#57ffcf] p-[46px] shadow-lg relative">
      <div className="text-white space-y-2">
        <div>
          <p className="text-sm uppercase font-semibold">Call Center</p>
          <p className="text-xl font-bold">(+251)9-4210-2626</p>
        </div>
        <div>
          <p className="text-sm uppercase font-semibold">Email</p>
          <p className="text-xl font-bold">contact@sewasew.com</p>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 w-1/2 max-w-xs pointer-events-none">
        <img src={hands} alt="Hands" className="h-full object-cover " />
      </div>
    </div>
  );
};

export default ContactCard;
