import { FaArrowCircleRight } from "react-icons/fa";

type CardProps = {
  title: string;
  description: string;
  onClick: () => void;
  icon: JSX.Element; // Added an icon prop to pass the icon
};

export function CampaignTypeCard({
  title,
  description,
  onClick,
  icon,
}: CardProps) {
  return (
    <div
      className="p-12 group border border-customTeal rounded-xl cursor-pointer bg-white text-center text-black hover:shadow-lg hover:p-13 transition-all"
      onClick={onClick}
    >
      {/* Icon section */}
      <div className="mb-6 flex justify-center">
        <div className="text-4xl text-customTeal group-hover:text-5xl duration-200">
          {icon}
        </div>
      </div>

      {/* Title and Description */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 group-hover:text-customTeal">
        {title}
      </h2>
      <p className="text-md">{description}</p>

      {/* Arrow icon animation */}
      <div className="flex justify-end mt-4">
        <FaArrowCircleRight className="text-customTeal hidden group-hover:block text-2xl  duration-200 transform translate-x-[-20px] group-hover:translate-x-0 ease-out" />
      </div>
    </div>
  );
}
