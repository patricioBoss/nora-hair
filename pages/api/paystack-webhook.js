import nc from "next-connect";
import crypto from "crypto";
import Order from "../../models/Order";
import db from "../../utils/db";

const handler = nc();

handler.post(async (req, res) => {
  // await NextCors(req, res, {
  //     // Options
  //     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE','OPTION'],
  //     origin: '*',
  //     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  //  });

  const hash = crypto
    .createHmac("sha512", "sk_test_36178364c6cf8f1cf2260282803d9df543995887")
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash != req.headers["x-paystack-signature"]) {
    return res.status(400).send("no data");
  }

  await db.connectDb();
  const event = req.body;
  console.log("this is the event", req.body);
  const { event: eventType, data } = event;

  if (eventType === "charge.success") {
    const {
      reference,
      status,
      amount,
      metadata: { value },
      customer: { email },
    } = data;
    console.log(
      `Payment received. Reference: ${reference}. Amount: ${amount}. Email: ${email}`
    );

    const order = await Order.findById(value);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: reference,
        status: status,
        email_address: email,
      };
      const newOrder = await order.save();
      await db.disconnectDb();
      res.status(200).json({ message: "Order is paid.", order: newOrder });
    } else {
      await db.disconnectDb();
      res.status(404).json({ message: "Order is not found." });
    }
    // TODO: add your payment processing logic here

    res
      .status(200)
      .send({ status: "success", message: "Payment processed successfully" });
  } else {
    console.log(`Invalid event type: ${eventType}`);
    res.status(400).send({ status: "error", message: "Invalid event type" });
  }

  // res.status(200).send({ status: 'success', message: 'Payment processed successfully' });
});

export default handler;
