interface statProps {
  amount: string;
  description: string;
}

const Stat = ({ amount, description }: statProps) => {
  return (
    <div className=" group p-6 bg-white shadow-md rounded-lg  hover:bg-customTealLight transition-colors">
      <h3 className="text-4xl font-bold text-customTeal group-hover:text-white">
        {amount}
      </h3>
      <p className="mt-2 text-gray-700 group-hover:text-white">{description}</p>
    </div>
  );
};

export default Stat;
