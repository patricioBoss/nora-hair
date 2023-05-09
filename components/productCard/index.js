import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import ProductSwiper from "./ProductSwiper";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { fCurrency } from "../../utils/formatNumber";
import axios from "axios";
import { toast } from "react-toastify";
import { addToCart, updateCart } from "../../store/cartSlice";

export default function ProductCard({ product }) {
  const qty = 1;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => ({ ...state }));
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );
  const [styless, setStyless] = useState(
    product.subProducts.map((p) => {
      return p.color;
    })
  );

  const addToCartHandler = async () => {
    // if (!router.query.size) {
    //   setError("Please Select a size");
    //   return;
    // }
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${0}&size=${router.query.size || 0}`
    );
    if (qty > data.quantity) {
      toast.error(
        "The Quantity you have choosed is more than in stock. Try and lower the Qty"
      );
    } else if (data.quantity < 1) {
      toast.error("This Product is out of stock.");
      return;
    } else {
      let _uid = `${data._id}_${product.style}_${router.query.size || 0}`;
      let exist = cart.cartItems.find((p) => p._uid === _uid);
      if (exist) {
        let newCart = cart.cartItems.map((p) => {
          if (p._uid == exist._uid) {
            return { ...p, qty: qty };
          }
          return p;
        });
        dispatch(updateCart(newCart));
      } else {
        dispatch(
          addToCart({
            ...data,
            qty,
            size: data.size,
            _uid,
          })
        );
      }
    }
  };

  useEffect(() => {
    setImages(product.subProducts[active].images);
    setPrices(
      product.subProducts[active]?.sizes
        .map((s) => {
          return s.price;
        })
        .sort((a, b) => {
          return a - b;
        })
    );
  }, [active, product]);
  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <div>
          <ProductSwiper
            slug={product.slug}
            active={active}
            images={images}
            addToCartHandler={addToCartHandler}
          />
        </div>

        {product.subProducts[active].discount ? (
          <div className={styles.product__discount}>
            -{product.subProducts[active].discount}%
          </div>
        ) : (
          ""
        )}
        <div className={styles.product__infos}>
          <h1 className=" !font-medium !text-base !text-ellipsis !overflow-hidden">
            {product.name.length > 40
              ? `${product.name.substring(0, 40)}...`
              : product.name}
          </h1>
          <span className=" !font-semibold !text-lg md:!text-2xl !text-black">
            {prices.length === 1
              ? `${fCurrency(prices[0])}`
              : `${fCurrency(prices[0])}-${fCurrency(
                  prices[prices.length - 1]
                )}`}
          </span>
          <div className={styles.product__colors}>
            {styless &&
              styless.map((style, i) =>
                style.image ? (
                  <img
                    key={i}
                    src={style.image}
                    className={i == active && styles.active}
                    onMouseOver={() => {
                      setImages(product.subProducts[i].images);
                      setActive(i);
                    }}
                    alt=""
                  />
                ) : (
                  <span
                    key={i}
                    style={{ backgroundColor: `${style.color}` }}
                    onMouseOver={() => {
                      setImages(product.subProducts[i].images);
                      setActive(i);
                    }}
                  ></span>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
