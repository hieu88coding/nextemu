"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "./logo";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useCartStore } from "@/hooks/useCartStore";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ShoppingCartIcon } from "lucide-react";
const Navbar05Page = () => {
  const { items, total } = useCartStore((state) => state);
  return (
    <div className=" bg-muted z-10">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-2 md:gap-6">
            <Logo className="shrink-0" />

            <div className="relative hidden md:block">
              <Search className="h-5 w-5 absolute inset-y-0 my-auto left-2.5" />
              <Input
                className="pl-10 flex-1 bg-slate-100/70 dark:bg-slate-800 border-none shadow-none w-[280px] rounded-full"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              className="bg-muted text-foreground hover:bg-accent shadow-none rounded-full md:hidden"
            >
              <Search className="!h-5 !w-5" />
            </Button>
            <div className="flex flex-row align-middle gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <ShoppingCartIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Giỏ hàng</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {items.length !== 0 &&
                    items.map((item) => (
                      <DropdownMenuItem
                        className="flex flex-row justify-between"
                        key={item.id}
                      >
                        <div className="flex flex-row justify-between items-center gap-6">
                          <Image
                            src={item.image}
                            alt="cart image"
                            width={50}
                            height={50}
                          />
                          <div className="break-all w-50">{item.title}</div>
                        </div>

                        {/* <div>
                    <FaMinusCircle onClick={() => minusQuantity(item.id)} />
                    <div>{item.quantity}</div>
                    <FaPlusCircle onClick={() => plusQuantity(item.id)} />
                  </div> */}

                        <div className="font-bold italic">
                          ${item.quantity * item.price}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  {items.length === 0 ? (
                    <div className="w-50 m-6 ">No Data</div>
                  ) : (
                    <div>
                      <DropdownMenuSeparator />
                      <div className="flex flex-row justify-between items-center m-2">
                        <Button onClick={() => redirect("/cart")}>
                          Xem giỏ hàng
                        </Button>
                        <div className="text-end font-bold">
                          Total: ${total}
                        </div>
                      </div>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <span>{items.length}</span>
            <Button
              variant="outline"
              className="hidden sm:inline-flex rounded-full"
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar05Page;
