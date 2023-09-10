"use client";

import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GiStrawberry } from "react-icons/gi";
import { GrHome } from "react-icons/gr";
import { TiNews } from "react-icons/ti";
import { GiShop } from "react-icons/gi";
import { TiMessages } from "react-icons/ti";
import { BsBookmarkStar, BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";

const NAVIGATION_ITEMS = [
  {
    title: "Главная",
    icon: GrHome,
    link: "/",
  },
  {
    title: "Новости",
    icon: TiNews,
    link: "news",
  },
  {
    title: "Магазин",
    icon: GiShop,
    link: "shop",
  },
  {
    title: "Сообщения",
    icon: TiMessages,
    link: "messages",
  },
  {
    title: "Закладки",
    icon: BsBookmarkStar,
    link: "bookmarks",
  },
  {
    title: "Профиль",
    icon: CgProfile,
    link: "profile",
  },
  {
    title: "Настройки",
    icon: MdOutlineSettingsSuggest,
    link: "settings",
  },
  {
    title: "Поддержка",
    icon: BiSupport,
    link: "support",
  },
];

const BurgerDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <RxHamburgerMenu
          onClick={() => {}}
          className="cursor-pointer"
          size={55}
          color="white"
        />
      </DialogTrigger>
      <DialogContent className="bg-blue-200/50 overflow-y-scroll max-h-full">
        <>
          <h1 className="text-3xl lg:text-5xl justify-center flex text-center backdrop-blur text-blue-500/50 rounded-2xl w-[80%] mb-6 sticky p-5 font-bold cursor-default ">
            Клубничный салют 
          </h1>
        </>
        <div className="flex w-[360px] justify-center items-stretch flex-col space-y-4">
          {NAVIGATION_ITEMS.map((el) => {
            return (
              <Link
                className="hover:bg-blue-300 m-auto hover:scale-105 transform transition duration-300 
                      flex items-center justify-start w-56 text-lg
                    bg-blue-500/50 px-4 space-x-4 rounded-3xl p-2"
                href={
                  el.title === "Магазин"
                    ? `https://klubnichnysalut.ru`
                    : `/${el.link}`
                }
                key={el.title}
              >
                <div>
                  <el.icon size={30} />
                </div>
                <div>{el.title}</div>
              </Link>
            );
          })}
        </div>
        <button
          className=" bg-white/25 border-2 border-black hover:bg-gray-200/70
                      flex items-center justify-center text-[1.25em]  text-black
                      space-x-4 mt-4 w-32 ml-[25%] mb-6 rounded-3xl font-semibold p-2"
        >
          Выйти
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default BurgerDialog;
