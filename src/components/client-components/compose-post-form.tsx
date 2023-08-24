"use client";

import { PostgrestError } from "@supabase/supabase-js";
import React, { useRef } from "react";
import { toast } from "sonner";

type ComposePostFormProps = {
  serverAction: any
};

const ComposePostForm = ({ serverAction }: ComposePostFormProps) => {

  const resetRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (data: any) => {
    try {
      const res = await serverAction(data);

      if (res?.error) {
        return toast.error(`Ошибка! Подробнее: ${res.error.message}`);
      }

      toast.success("Пост размещен");
      resetRef.current?.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action={handleSubmit} className="border-b min-h-[195px] w-full mb-5">
      <div className=" mt-2 flex text-base items-center justify-around border-white">
        <div className="bg-white/50 cursor-pointer w-52 text-center p-3 rounded-t-md ">
          На свою страницу
        </div>
        <div className="cursor-pointer w-52 text-center p-3 rounded-t-md bg-white/20">
          На форум
        </div>
      </div>
      <div className="flex items-center pb-4 bg-white/50 justify-start space-x-2">
        <div className="m-5 mb-auto  bg-slate-400 w-14 h-14"></div>
        <div className="flex w-[80%] flex-col">
          <div className="border-b-[0.5px] border-black mr-6 mt-4">
            <textarea
              className="placeholder:text-xl 
              w-full p-4 outline-none border-none bg-transparent min-h-full"
              placeholder="Введите текст поста..."
              maxLength={155}
              name="postBody"
            />
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex  w-full space-x-8 items-center justify-start">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
            <div>
              <button
                type="submit"
                className="text-white  bg-blue-500/75 hover:bg-blue-400/75
                      flex items-center justify-center text-sm hover:text-black
                     space-x-4 px-6 mt-2 rounded-3xl p-2 mx-6 "
              >
                Разместить
              </button>
              <button className="invisible" type="reset" ref={resetRef}/>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ComposePostForm;
