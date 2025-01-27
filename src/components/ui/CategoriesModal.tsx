import { categories } from "@/data/data";
import React, { useRef, useEffect } from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  selectedCategory: string;
  handleSelectCategory: (id: string) => void;
  onClose: () => void;
};

const CategoriesModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  handleSelectCategory,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="bg-white w-11/12 sm:w-2/3 lg:w-1/3 p-6 rounded-lg shadow-lg relative"
      >
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-4 right-4"
          shape="rounded"
          onClick={onClose}
        >
          <IoClose size={22} />
        </Button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
        <ul className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={
                selectedCategory === category.id ? "primary" : "secondary"
              }
              onClick={() => handleSelectCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesModal;
