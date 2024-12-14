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
              <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
              Sewasew
            </a>
            <p className="text-sm text-gray-400">
              Connecting people with services.
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
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6c-.77.35-1.59.59-2.46.69A4.47 4.47 0 0 0 21.85 4a9 9 0 0 1-2.85 1.1A4.48 4.48 0 0 0 16 2c-2.48 0-4.5 2-4.5 4.5 0 .35.04.7.12 1.03C8.56 7.34 5.65 5.93 3.67 3.69A4.48 4.48 0 0 0 3 6.77c0 1.56.79 2.94 2 3.75a4.5 4.5 0 0 1-2-.56v.06c0 2.19 1.56 4.02 3.63 4.44a4.5 4.5 0 0 1-2 .07 4.5 4.5 0 0 0 4.2 3.12A9.03 9.03 0 0 1 2 19.54a12.77 12.77 0 0 0 6.92 2c8.3 0 12.86-6.87 12.86-12.86 0-.2 0-.4-.02-.61a9.2 9.2 0 0 0 2.26-2.35"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 2.2v19.6c0 .61-.49 1.2-1.2 1.2H3.2c-.61 0-1.2-.49-1.2-1.2V2.2C2 1.59 2.59 1 3.2 1h17.6c.61 0 1.2.59 1.2 1.2zM8.71 19.28h2.29v-7.32H8.71v7.32zm1.18-8.51c.89 0 1.46-.58 1.46-1.31-.02-.74-.58-1.31-1.45-1.31-.87 0-1.46.57-1.46 1.31 0 .73.59 1.31 1.46 1.31zm8.65 8.51h2.29v-3.94c0-2.36-1.27-3.46-2.96-3.46-1.36 0-1.97.75-2.32 1.28v-1.1h-2.29c.03.72 0 7.32 0 7.32h2.29v-4.08c0-.22.02-.43.08-.61.19-.44.64-.91 1.39-.91.98 0 1.37.69 1.37 1.7v3.9h.02z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.04c-5.52 0-10 4.47-10 10 0 4.42 3.66 8.06 8.44 8.94v-6.31h-2.54v-2.63h2.54v-2c0-2.51 1.48-3.89 3.75-3.89 1.09 0 2.23.2 2.23.2v2.48h-1.25c-1.24 0-1.62.77-1.62 1.56v1.86h2.77l-.44 2.63h-2.33V21c4.78-.88 8.44-4.52 8.44-8.94 0-5.53-4.48-10-10-10z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; 2024 Sewasew. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
