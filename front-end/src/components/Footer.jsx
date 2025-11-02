import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 bg-gray-100 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <p className="flex text-center text-xs sm:text-sm">
          {" "}
          © 2025 Project-Airbnb, Inc. Privacidade - Informações da empresa
        </p>
        <div className="flex justify-end gap-1 sm:gap-2 md:h-full md:w-full">
          <a href="https://www.facebook.com/AirbnbBrasil" target="_blank">
            <img
              src="https://img.icons8.com/?size=24&id=118489&format=png"
              alt="facebook"
            />
          </a>
          <a href="https://x.com/airbnb_br" target="_blank">
            <img
              src="https://img.icons8.com/?size=24&id=67wT7JDbFWZa&format=png"
              alt="X"
            />
          </a>
          <a href="https://www.instagram.com/airbnb/" target="_blank">
            <img
              src="https://img.icons8.com/?size=24&id=97E7Dm8qCE2w&format=gif&color=f7f7f7"
              alt="instagram"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
