"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchOrders = async () => {
      let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      let res = await data.json();
      setOrders(res);
    };

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchOrders();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="mx-auto min-h-screen">
      <h1 className="font-semibold text-2xl p-8 text-center">My Orders</h1>
      <div className="overflow-x-auto sm:mx-6 lg:mx-8 py-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 my-2">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                #Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              return (
                <tr key={index} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    #{item.orderId}
                  </th>
                  <td className="px-6 py-4">  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</td>
                  <td className="px-6 py-4">₹{item.amount}</td>

                  <td className="px-6 py-4">
                    <Link href={`/order?id=${item._id}`}>Details </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
