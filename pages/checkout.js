import { useState, useEffect } from "react";
import styles from "../styles/checkout.module.scss";
import { getSession } from "next-auth/react";
import { Container } from "../components/Container";
import User from "../models/User";
import Cart from "../models/Cart";
import db from "../utils/db";
import Header from "../components/cart/header";
import Shipping from "../components/checkout/shipping";
import AddShipping from "../components/AddShipping";
import Products from "../components/checkout/products";
import Payment from "../components/checkout/payment";
import Summary from "../components/checkout/summary";
export default function Checkout({ cart, user }) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [location, setLocation] = useState();
  const [state, setState] = useState();
  useEffect(() => {
    let check = addresses.find((ad) => ad.active == true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress("");
    }
  }, [addresses]);
  return (
    <>
      <Header />
      <Container className={` ${styles.checkout} md:grid `}>
        <div className={styles.checkout__side}>
          <Shipping
            user={user}
            addresses={addresses}
            setAddresses={setAddresses}
          />
          <Products cart={cart} />
        </div>
        <div className={styles.checkout__side}>
          <Payment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <AddShipping setState={setState} setLocation={setLocation} />
          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={user}
            cart={cart}
            shippingLocation={
              state?.value && location?.value
                ? `${state?.value}, ${location?.label.split(",")[0]}`
                : null
            }
            shippingPrice={location?.value}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
          />
        </div>
      </Container>
    </>
  );
}
export async function getServerSideProps(context) {
  db.connectDb();
  const session = await getSession(context);
  console.log("this is the session", session);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }
  const user = await User.findById(session?.user.id);
  // console.log("this is user", user);
  const cart = await Cart.findOne({ user: user._id })
    .populate("products.product")
    .lean();

  const updatedCart = {
    ...cart,
    products: cart.products.map((x) => ({
      ...x,
      product: x.product._id,
      quantity: x.product.subProducts[0].sizes.find(
        (size) => size.size === x.size
      ).qty,
      inStock:
        Number(
          x.product.subProducts[0].sizes.find((size) => size.size === x.size)
            .qty
        ) > x.qty,
    })),
  };

  console.log(JSON.stringify(updatedCart, null, 2));
  db.disconnectDb();
  if (!cart) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(updatedCart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
