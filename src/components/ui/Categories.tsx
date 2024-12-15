import Button from "./Button";
import { categories } from "@/data/data";
import { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import CategoriesModal from "./CategoriesModal";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="space-x-5">
      <div className="hidden md:block space-x-2 space-y-2 mb-8">
        {categories.map((category) => {
          return <Button variant="secondary">{category}</Button>;
        })}
      </div>
      <div className="block md:hidden text-customTealDark hover:text-customTeal">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsModalOpen(true)}
        >
          <IoFilterOutline size={22} />
        </Button>
        <CategoriesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Categories;
