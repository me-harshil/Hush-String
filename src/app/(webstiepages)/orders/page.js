import Order from "@/app/models/Order";
import connectDB from "@/app/middleware/connectDB";
import Orders from "./Orders";

const page = async () => {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  let orders = await Order.find({}).lean();
  return <Orders orders={orders} />;
};

export default page;
