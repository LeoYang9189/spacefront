"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@heroui/avatar";
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useStore from "@/store/useStore";
import { tryCatch } from "@/utils/util";
import { getUserInfo } from "@/api/user";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const { token, setUser } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getUser = async () => {
    console.log(token);
    if (!token) return;
    const [err, res] = await tryCatch(getUserInfo, { token });
    if (err) return;
    console.log(res);
    setUserInfo(res);
  };

  useEffect(() => {
    getUser();
  }, [token]);

  const menuItems = [
    { title: "首页", href: "/" },
    { title: "设计严选库", href: "/products/lighting" },
    { title: "家具全球购", href: "/global-furniture" },
    { title: "ZSPACEPLUS", href: "/z-space-plus" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 bg-white shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Z Space plus Logo"
              width={160}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <motion.div
                  key={item.title}
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                >
                  <a
                    href={item.href}
                    className="text-brand-700 group-hover:text-brand-900 group-hover:font-bold px-3 py-2 text-sm transition-all duration-300 relative"
                  >
                    {item.title}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full shadow-lg"></span>
                  </a>
                </motion.div>
              ))}
            </div>
            {/* Login/Register Button */}
            <motion.div
              className="ml-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* <Link
                href="/auth"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-10 py-2.5"
              >
                <span className="absolute inset-0 bg-[#235A5A] transition-all duration-300 group-hover:bg-[#1d4747]"></span>
                <span className="absolute inset-0 rounded-md border border-white/20"></span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute -left-[10%] aspect-square w-[20%] translate-x-[0%] rotate-0 bg-white/20 blur-xl transition-all duration-500 group-hover:translate-x-[500%] group-hover:rotate-180"></span>
                <span className="relative text-sm font-medium text-white tracking-wide transition-all duration-300 group-hover:tracking-wider">
                  登录/注册
                </span>
              </Link> */}
              <Avatar
                showFallback
                src={userInfo?.avatar}
                classNames={{
                  icon: "text-[#1C4848]",
                }}
              />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-700 hover:text-brand-900 focus:outline-none"
            >
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faBars}
                className="h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-64 bg-brand-600/90 backdrop-blur-lg transform transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col p-8">
          <button
            className="self-end text-white mb-8"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-white hover:text-brand-200 transition-colors"
              >
                {item.title}
              </Link>
            ))}
            <Link
              href="/auth"
              className="px-6 py-2 text-brand-600 bg-white hover:bg-brand-50 rounded-full transition-colors text-center shadow-lg"
            >
              登录/注册
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
