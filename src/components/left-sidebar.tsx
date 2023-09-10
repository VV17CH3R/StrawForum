import React from "react";
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

const LeftSidebar = () => {
  return (
    <section className="sticky top-0 min-w-[255px] hidden lg:flex justify-between items-stretch flex-col h-[820px] bg-blue-100/50 rounded-3xl">
          <div className="flex items-stretch flex-col space-y-4">
            <Link
              href="/"
              className="hover:scale-110 mt-4 flex items-center justify-start transform transition duration-1000 "
            >
              <GiStrawberry size={105} color="green" />
              <h2 className="text-green-900 text-sm font-bold">Клубничный <br/> салют</h2>
            </Link>
            {NAVIGATION_ITEMS.map((el) => {
              return (
                <Link
                  className="hover:bg-blue-300 hover:scale-105 transform transition duration-300 
                      flex items-center justify-start mx-6 text-lg
                    bg-blue-500/50 px-4 space-x-4 rounded-3xl p-2"
                  href={el.title === "Магазин" ? `https://klubnichnysalut.ru` :`/${el.link}`}
                  key={el.title}
                >
                  <div>
                    <el.icon size={30} />
                  </div>
                  <div>{el.title}</div>
                </Link>
              );
            })}
            <button
              className="text-white bg-blue-500/75 hover:bg-blue-400/75
                      flex items-center justify-center text-2xl hover:text-black
                     space-x-4 mx-2 rounded-3xl p-4"
            >
              Оставить пост
            </button>
          </div>
          <button
            className=" bg-white/25 border-2 border-black
                      flex items-center justify-between text-[0.75em] text-black
                      space-x-4 mt-4 mx-2 mb-2 rounded-3xl font-semibold p-2"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="rounded-full bg-slate-400 w-16 h-16"></div>
              <div className="text-left">
                <div className="text-base">Username</div>
                <div>@email</div>
              </div>
            </div>
            <div>
              <BsThreeDots size={20} />
            </div>
          </button>
        </section>
  )
}

export default LeftSidebar
