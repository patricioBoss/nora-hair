import nc from "next-connect";
import auth from "../../../../middleware/auth";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  console.log("hello from api",req.params,req.query);
  await db.connectDb();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.status=req.body.status
    const newOrder = await order.save();
    await db.disconnectDb();
    res.json({ message: "Order is updated.", order: newOrder });
  } else {
    await db.disconnectDb();
    res.status(404).json({ message: "Order is not found." });
  }
});

export default handler;