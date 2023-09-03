"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import type { Database } from "@/lib/supabase.types";
import type { SupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

export const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    supabase.auth.getSession().then((res) => {
      if(!res.data.session){
        setIsOpen(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase }}>
      <>
      <Toaster  />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="text-center p-6">
          <h3 className="text-xl font-semibold text-blue-900/70 my-1">Быстрая регистрация</h3>
          <form onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);

            const {data, error} = await supabase.from("profiles").select().eq("username", username.trim());

            if(data && data?.length > 0) {
              return toast.error("Этот телефон уже используеться.");
            }

            const {data:sUpData, error:sUpErr} = await supabase.auth.signInWithOtp({
              email: email.trim(),
              options: {
                data: {
                  username,
                  full_name: fullName
                }
              }
            });

            if(sUpErr) {
              return toast.error(sUpErr.message);
            }

            toast.success("Проверьте свою почту");

            setIsLoading(false);
          }}>
            <Input
              className="mt-6"
              value={email}
              type="email"
              placeholder="e-mail"
              onChange={e=>setEmail(e.target.value)}
            />
            <Input
              className="mt-3"
              value={username}
              type="tel"
              placeholder="Моб. телефон"
              onChange={e=>setUsername(e.target.value)}
            />
            <Input
              className="mt-3"
              value={fullName}
              type="text"
              placeholder="Ваше имя"
              onChange={e=>setFullName(e.target.value)}
            />
            <Dialog>
              <DialogTrigger asChild>
              <button 
                onClick={()=>{}}
              className="text-sm my-2 mt-4 cursor-pointer mr-14 hover:text-blue-400 text-blue-700 underline">
              {`Что такое "Быстрая регистрация"`}
            </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>О быстрой регистрации</DialogTitle>
                  <DialogDescription>
                  Вам не имейл придет ссылка, перейдя по которой можно быстро войти в свой профиль на нашем сайте.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button
              disabled={isLoading}
              className="bg-blue-600/70 transition duration-200 hover:bg-blue-400">
              Подтвердить
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <>{children}</>
      </>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};
