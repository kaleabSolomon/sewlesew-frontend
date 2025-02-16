import tg from "../assets/tg.svg";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <a
              href="#"
              className="flex items-center text-white text-lg font-bold"
            >
              SewleSew
            </a>
            <p className="text-sm text-gray-400">
              Happieness Comes from Your Actions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm">
            <a href="#about" className="hover:text-white">
              About Us
            </a>
            <a href="#services" className="hover:text-white">
              Services
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
            <a href="#privacy" className="hover:text-white">
              Privacy Policy
            </a>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://t.me/KaleabSolomon"
              className="text-gray-400 hover:text-white"
            >
              <img className="w-5" src={tg} alt="tg" />
            </a>
            <a
              href="https://www.linkedin.com/in/kaleab-solomon-abebe/"
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 2.2v19.6c0 .61-.49 1.2-1.2 1.2H3.2c-.61 0-1.2-.49-1.2-1.2V2.2C2 1.59 2.59 1 3.2 1h17.6c.61 0 1.2.59 1.2 1.2zM8.71 19.28h2.29v-7.32H8.71v7.32zm1.18-8.51c.89 0 1.46-.58 1.46-1.31-.02-.74-.58-1.31-1.45-1.31-.87 0-1.46.57-1.46 1.31 0 .73.59 1.31 1.46 1.31zm8.65 8.51h2.29v-3.94c0-2.36-1.27-3.46-2.96-3.46-1.36 0-1.97.75-2.32 1.28v-1.1h-2.29c.03.72 0 7.32 0 7.32h2.29v-4.08c0-.22.02-.43.08-.61.19-.44.64-.91 1.39-.91.98 0 1.37.69 1.37 1.7v3.9h.02z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; 2025 Kaleab Solomon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
