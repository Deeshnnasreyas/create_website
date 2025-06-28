import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import navIcon1 from "../../public/assets/navicon1.svg";
import navIcon2 from "../../public/assets/navicon2.svg";
import navIcon3 from "../../public/assets/navicon3.svg";
import navIcon4 from "../../public/assets/navicon4.svg";
import logoImg from "../../public/assets/logo.svg";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import useNavigationStore from "@/store/navigationStore";

type NavLink = {
  href: string;
  label: string;
};
type NavIcon = {
  href: string;
  icons: string;
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // const [activeLink, setActiveLink] = useState<string>("/marketplace");
  const { activeLink, setActiveLink } = useNavigationStore();
  const navLinks: NavLink[] = [
    { href: "/marketplace", label: "Marketplace" },
    { href: "/mywebsite", label: "My websites" },
    { href: "/myorder", label: "My orders" },
    { href: "/projects", label: "My projects" },
    { href: "/orders", label: "Recieved orders" },
  ];
  const navIcons: NavIcon[] = [
    { href: "#", icons: navIcon1 },
    { href: "#", icons: navIcon2 },
    { href: "#", icons: navIcon3 },
    { href: "#", icons: navIcon4 },
  ];

  return (
    <motion.nav
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="sticky top-0 px-4
       bg-[#FEFEFF] z-50 border-b border-[#EAEAEA] h-[58px]"
    >
      <div className="container_header flex justify-between items-center">
        {/* Logo */}
        <motion.div
          variants={fadeIn("right", 0.3)}
          className="flex items-center gap-1 cursor-pointer"
        >
          <figure className="max-w-[150px] ">
            <img src={logoImg} className="object-cover h-full w-full" alt="" />
          </figure>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          variants={fadeIn("left", 0.3)}
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </motion.button>

        {/* Navigation Links - Desktop */}
        <motion.div
          variants={fadeIn("down", 0.3)}
          className="hidden lg:flex items-center gap-[9px]"
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              variants={fadeIn("down", 0.1 * (index + 1))}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink(link.href);
                window.location.href = link.href;
              }}
              className={`dm-sans-heading relative px-[10px] py-[17px] text-[#0F0C1B] text-[16px] font-medium
                after:absolute after:bottom-0 after:left-0
                 after:h-0.5 after:w-0 hover:after:w-full active:after:w-full
                  after:bg-[#613FDD] after:transition-all
              ${
                activeLink === link.href
                  ? "text-[#613FDD] bg-[#613FDD12] opacity-[7%] after:w-full "
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
        <motion.div
          variants={fadeIn("down", 0.3)}
          className="hidden lg:flex items-center gap-[9px]"
        >
          {navIcons.map((link, index) => (
            <motion.a
              key={index}
              variants={fadeIn("down", 0.1 * (index + 1))}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`dm-sans-heading relative w-[44px] h-[44px] text-[#0F0C1B] text-[16px] font-medium
                after:absolute after:bottom-0 after:left-0
                 after:h-0.5 after:w-0 hover:after:w-full
                  after:bg-[#613FDD] after:transition-all
           `}
            >
              <img src={`${link?.icons}`} alt="navicons" className="" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          className="md:hidden bg-white border-t border-gray-100 py-4"
        >
          <motion.div
            variants={fadeIn("down", 0.3)}
            className="container mx-auto px-4 space-y-4"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                variants={fadeIn("right", 0.1 * (index + 1))}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(link.href);
                  window.location.href = link.href;
                  setIsMenuOpen(false);
                }}
                className={`block text-[#0F0C1B] text-[16px] dm-sans-heading font-medium py-2 ${
                  activeLink === link.href
                    ? "text-[#613FDD]  bg-[#613FDD12] opacity-[7%]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
