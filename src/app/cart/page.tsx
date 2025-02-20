"use client";
import { useCartStore } from "@/hooks/useCartStore";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { redirect } from "next/navigation";
const Cart = () => {
  const { items, total, plusQuantity, minusQuantity, removeItem } =
    useCartStore((state) => state);
  return (
    <div className="w-3/4 mx-auto mt-40 grid ">
      <div className="">
        <Button className="mb-8" onClick={() => redirect("/")}>
          Back
        </Button>
      </div>
      <div className="grid grid-cols-6 gap 4 mb-8">
        <div className="col-span-3 font-bold">Product</div>
        <div className="text-center font-bold">Quantity</div>
        <div className="text-end font-bold">Total</div>
        <div className="text-end font-bold">Actions</div>
      </div>

      {items.length !== 0 &&
        items.map((item) => (
          <div
            className=" items-center grid grid-cols-6 gap 4 mb-8"
            key={item.id}
          >
            <div className="col-span-3 flex flex-row items-center gap-6 ">
              <Image src={item.image} alt="cart image" width={50} height={50} />
              <div className="break-all w-50">{item.title}</div>
            </div>

            <div className="flex flex-row gap-2 items-center justify-center">
              <FaMinusCircle onClick={() => minusQuantity(item.id)} />
              <div>{item.quantity}</div>
              <FaPlusCircle onClick={() => plusQuantity(item.id)} />
            </div>

            <div className="font-bold italic text-end">
              ${item.quantity * item.price}
            </div>
            <div className="text-end">
              <Button
                onClick={() => removeItem(item.id)}
                variant={"destructive"}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}

      <div>
        <div />
        <div className="grid grid-cols-6 gap-4 items-center">
          <div className="col-start-5 text-end font-bold">Total: ${total}</div>
          <div className="text-end col-start-6">
            <Button
              disabled={items.length === 0}
              onClick={() => redirect("/checkout")}
            >
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
