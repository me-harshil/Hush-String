import React from "react";
import OrderComponent from "./OrderComponent";
import connectDB from "@/app/middleware/connectDB";
import Order from "@/app/models/Order";

const OrderPage = async (request) => {
  const mongoDB = await connectDB();
  console.log(mongoDB);

  let order = null;
  try {
    const id = request.searchParams.id;
    if (!id) return <div className="text-center text-3xl font-semibold py-4 min-h-screen">Order not found</div>;
    order = JSON.parse(JSON.stringify(await Order.findById(id).lean()));

    return <OrderComponent order={order} />;
  } catch (err) {
    return <div className="text-center text-3xl font-semibold py-4 min-h-screen">Order not found</div>;
  }
};

export default OrderPage;
