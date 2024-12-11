import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface FAQItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  questions: FAQItem[];
}

const Accordion: React.FC<AccordionProps> = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-2">
      {questions.map((item, index) => (
        <div
          key={index}
          className="border rounded-lg overflow-hidden shadow-sm"
        >
          {/* Header */}
          <button
            onClick={() => toggleAccordion(index)}
            className={`w-full px-4 py-3 text-left flex justify-between items-center text-lg font-medium transition-colors duration-300 ${
              openIndex === index
                ? "bg-customTealDark text-white"
                : "bg-teal-50 text-teal-800 rounded-none border-b-2 border-b-customTealDark"
            }`}
          >
            <span>{item.question}</span>
            <FiChevronDown
              className={`transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
              size={20}
            />
          </button>

          {/* Content */}
          {openIndex === index && (
            <div className="bg-white px-4 py-3 text-gray-700">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
