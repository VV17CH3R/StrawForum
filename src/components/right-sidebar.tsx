import React from 'react'
import { FcSearch } from 'react-icons/fc'

const RightSidebar = () => {
  return (
    <section className="lg:flex max-w-[250px] top-2 min-w-[255px] flex-col m-2 items-stretch h-screen hidden">
          <div className="sticky top-2">
            <div className="w-full h-full relative">
              <input 
                id="searchBox"
                type="text" 
                placeholder="Искать..." 
                className="outline-none py-2 border peer focus:border-blue-500 bg-white/85 pl-11 w-full h-full rounded-xl px-4" 
              />
              <label htmlFor="searchBox" className="absolute cursor-pointer ml-2 top-0 h-full flex items-center justify-center">
                <FcSearch size={25}/>
              </label>
            </div>
          </div>
          <div className="flex flex-col mt-3 rounded-xl bg-blue-400/75">
            <h3 className="text-2xl mt-3 font-bold cursor-default text-black/50 mb-3 text-center">Свежие новости</h3>
            <div>
              {Array.from({length:5}).map((_,i)=>{
                  return (
                    <div key={i} className="hover:bg-blue-500/25 rounded-xl transition duration-100 cursor-pointer p-4">
                      <div className="font-bold text-lg">#Trenning item №{i}</div>
                      <div className="text-xs text-gray-700">35.4k</div>
                    </div>
                  )
                })}
            </div>
            <div className="p-3 text-blue-700 cursor-pointer">
              Показать еще...
            </div>
          </div>
          
          <div className="flex flex-col mt-3 rounded-xl bg-blue-400/75">
            <h3 className="text-2xl mt-3 font-bold cursor-default text-black/50 mb-3 text-center">Рекомендации</h3>
            <div>
              {Array.from({length:3}).map((_,i)=>{
                  return (
                    <div key={i} className="p-4 hover:bg-blue-500/25 rounded-xl transition duration-100 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="w-10 h-10 rounded-full bg-neutral-600"></div>
                        <div className="flex  flex-col">
                          <div>Эксперт из Коломны</div>
                          <div className="text-sm font-bold">@user21321</div>
                        </div>
                      </div>
                      <div className="flex mt-3 items-center justify-center">
                        <button className="rounded-full hover:text-white transition duration-300 hover:bg-black px-6 py-2 bg-white">
                          Отслеживать
                        </button>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="p-3 text-blue-700 cursor-pointer">
              Показать еще...
            </div>
          </div>
        </section>
  )
}

export default RightSidebar
