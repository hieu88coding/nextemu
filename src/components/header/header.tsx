" use client";
import { FaShoppingCart, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useCartStore } from "@/hooks/useCartStore";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { Button } from "../ui/button";
const Header = () => {
  const { items, total } = useCartStore((state) => state);
  return (
    <div className="flex justify-between m-2">
      <div>Nextemu</div>
      <div className="flex flex-row align-middle gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaShoppingCart />
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
                  <div className="text-end font-bold">Total: ${total}</div>
                </div>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <span>{items.length}</span>
      </div>
    </div>
  );
};

export default Header;
