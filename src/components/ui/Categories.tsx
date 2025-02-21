import Button from "./Button";
import { IoFilterOutline } from "react-icons/io5";
import CategoriesModal from "./CategoriesModal";
import { categories } from "@/data/data";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Categories = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(selectedCategory === id ? "" : id);
  };

  return (
    <div className="space-x-5">
      {/* Desktop View */}
      <div className="hidden md:block space-x-2 space-y-2 mb-8">
        {categories.slice(0, 6).map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "primary" : "secondary"}
            onClick={(e) => {
              handleSelectCategory(category.id);
            }}
          >
            {category.label}
            {selectedCategory === category.id ? (
              <FaTimes className="ml-2 text-red-600" />
            ) : (
              ""
            )}
          </Button>
        ))}
        {categories.length > 5 && (
          <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
            More
          </Button>
        )}
      </div>

      {/* Mobile View */}
      <div className="block md:hidden text-customTealDark hover:text-customTeal">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsModalOpen(true)}
        >
          <IoFilterOutline size={22} />
        </Button>
      </div>

      {/* Modal */}
      <CategoriesModal
        isOpen={isModalOpen}
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
export default Categories;
