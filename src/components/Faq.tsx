import { faqData } from "@/data/data";
import Accordion from "./ui/Accordion";
import mobApp from "../assets/kenalib-mob-app.jpg";

const Faq = () => {
  return (
    <div>
      <p className="font-light text-gray-700 text-xs my-4">
        MODERN CROUDFUNDING PLATFORM
      </p>

      <h1 className="text-3xl font-bold leading-12 w-[450px]">
        Distribute aid <span className="text-customTeal">easily</span>,{" "}
        <span className="text-customTeal">quickly</span> and{" "}
        <span className="text-customTeal">transparently</span>.
      </h1>

      <div className="w-full flex justify-between">
        <div className="w-2/5 bg-customTealDark">
          <div className="flex items-center justify-center min-h-screen bg-[#f8fefc]">
            <div className="relative w-[300px] h-[760px] ">
              {/* Enlarged teal backgrond strip */}
              <div className="absolute left-[-60px] top-[-40px] w-[200px] h-full bg-customTealLight rounded-md"></div>

              {/* Phone container */}
              <div className="relative bg-white rounded-xl shadow-3xl overflow-hidden">
                {/* Phone app image */}
                <img
                  src={mobApp}
                  alt="Phone app screenshot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5 pt-20  px-20">
          <p className="text-gray-500 italic text-sm mb-6">
            Empowering change, one campaign at a time. Our platform connects
            passionate individuals and communities with donors to bring
            meaningful projects to life. Whether you're raising funds for
            education, health, community development, or any cause close to your
            heart, we're here to support you every step of the way.
          </p>
          <h1 className="font-bold text-2xl">Frequently Asked Questions</h1>
          <Accordion questions={faqData} />
        </div>
      </div>
    </div>
  );
};

export default Faq;
