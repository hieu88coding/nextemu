"use client"; // Client component

import { useState, useEffect } from "react";
import Image from "next/image";
import { IProduct } from "@/types/products";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/header/header";
import { useCartStore } from "@/hooks/useCartStore";
import Hero06 from "@/components/hero-06/hero-06";
import Footer04Page from "@/components/footer-04/footer-04";
export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("");
  const { items, total, addItem, removeItem, updateQuantity, clearCart } =
    useCartStore((state) => state);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=5")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // if (!filter) return; // Nếu filter rỗng, không gọi API
    let url = `https://fakestoreapi.com/products/category/${filter}`;
    if (filter === "") url = "https://fakestoreapi.com/products?limit=5";
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [filter]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header />
      <Hero06 />
      <div className="w-1/2 flex row justify-between m-2 relative">
        <Button
          onClick={() => setFilter("")}
          variant={filter === "" ? "outline" : "default"}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter(`men's clothing`)}
          variant={filter === `men's clothing` ? "outline" : "default"}
        >
          Men's Clothing
        </Button>
        <Button
          onClick={() => setFilter(`jewelery`)}
          variant={filter === `jewelery` ? "outline" : "default"}
        >
          Jewelery
        </Button>
        <Button
          onClick={() => setFilter(`electronics`)}
          variant={filter === `electronics` ? "outline" : "default"}
        >
          Electronics
        </Button>
        <Button
          onClick={() => setFilter(`women's clothing`)}
          variant={filter === `woman's clothing` ? "outline" : "default"}
        >
          Woman's Clothing
        </Button>
      </div>
      <div className="w-full flex row flex-wrap">
        {products.map((p: IProduct) => (
          <Card key={p.id} className="w-1/4 m-2 flex col justify-between">
            <CardHeader>
              <CardTitle className="h-6 ">{p.title}</CardTitle>
              <CardDescription className="text-xl">${p.price}</CardDescription>
              <CardContent className="my-6 flex-grow">
                <div className="relative w-full min-h-[300px] ">
                  <Image
                    className="my-6 z-0"
                    layout="fill"
                    objectFit="contain"
                    src={p.image}
                    alt={p.title}
                  />
                </div>
                {/* <div className="mt-12">{p.description}</div> */}
                <div className="text-yellow-400 font-bold mt-12">
                  Đánh giá {p.rating.rate}
                </div>
                <div className="mt-2">Sản phẩm có sẵn: {p.rating.count}</div>
              </CardContent>
              <CardFooter className=" w-full flex justify-between gap-4">
                <Button onClick={() => addItem(p)} variant="outline">
                  Thêm vào giỏ hàng
                </Button>
                <Button>Xem chi tiết</Button>
              </CardFooter>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Footer04Page />
    </div>
  );
}
