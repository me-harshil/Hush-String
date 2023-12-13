import React from "react";
import OrderComponent from "./OrderComponent";
import connectDB from "@/app/middleware/connectDB";
import Order from "@/app/models/Order";

const OrderPage = async (request) => {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  const id = request.searchParams.id;

  let order = null;
  try {
    order = JSON.parse(JSON.stringify(await Order.findById(id).lean()));
    console.log(order);
  } catch (err) {}

  return <OrderComponent order={order} />;
};

export default OrderPage;
