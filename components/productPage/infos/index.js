import styles from "./styles.module.scss";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useRouter } from "next/router";
import { HeartIcon, PlusIcon } from '@heroicons/react/24/outline'
import Link from "next/Link";
import { TbPlus, TbMinus } from "react-icons/tb";
import { useEffect } from "react";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import Share from "./share";
import Accordian from "./Accordian";
import SimillarSwiper from "./SimillarSwiper";
import axios from "axios";
import DialogModal from "../../dialogModal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../../store/cartSlice";
import { hideDialog, showDialog } from "../../../store/DialogSlice";
import { signIn, useSession } from "next-auth/react";
import { Disclosure, RadioGroup } from "@headlessui/react";
import { capitalCase} from "change-case";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Infos({ product, setActiveImg }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [size, setSize] = useState(router.query?.size?.trim()??0);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { cart } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    dispatch(hideDialog());
  }, []);
  useEffect(() => {
    setSize("");
    setQty(1);
  }, [router.query.style]);
  useEffect(() => {
    if (qty > product.quantity) {
      setQty(product.quantity);
    }
  }, [router.query.size]);
  const addToCartHandler = async () => {
    if (!router.query.size) {
      setError("Please Select a size");
      return;
    }
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
    );
    if (qty > data.quantity) {
      setError(
        "The Quantity you have choosed is more than in stock. Try and lower the Qty"
      );
    } else if (data.quantity < 1) {
      setError("This Product is out of stock.");
      return;
    } else {
      let _uid = `${data._id}_${product.style}_${router.query.size}`;
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
  ///---------------------------------
  const handleWishlist = async () => {
    try {
      if (!session) {
        return signIn();
      }
      const { data } = await axios.put("/api/user/wishlist", {
        product_id: product._id,
        style: product.style,
      });
      dispatch(
        showDialog({
          header: "Product Added to Whishlist Successfully",
          msgs: [
            {
              msg: data.message,
              type: "success",
            },
          ],
        })
      );
    } catch (error) {
      dispatch(
        showDialog({
          header: "Whishlist Error",
          msgs: [
            {
              msg: error.response.data.message,
              type: "error",
            },
          ],
        })
      );
    }
  };
  return (
    <div className={styles.infos}>
      <DialogModal />
      <div className={styles.infos__container}>
        {/* <h1 className={styles.infos__name}>{product.name}</h1> */}
        {/* <h2 className={styles.infos__sku}>{product.sku}</h2> */}




        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{capitalCase(product.name) }</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">₦{product.price}</p>
              <p className="text-sm my-3">  <span className="line-through">₦{product.priceBefore}</span> <span className=" p-1 bg-gray-300 font-medium rounded text-gray-900">-{product.discount}%</span></p>
            </div>
        
        <p className=" text-xs">
          {product.shipping
            ? `+${product.shipping}$ Shipping fee`
            : "Free Shipping"}
        </p>

            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
             <div className={styles.infos__rating}>
                <Rating
                  name="half-rating-read"
                  defaultValue={product.rating}
                  precision={0.5}
                  readOnly
                  style={{ color: "#FACF19" }}
                />
                ({product.numReviews}
                {product.numReviews == 1 ? " review" : " reviews"})
              </div>
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>
        <p className=" text-xs text-red-600 mt-3">
          {size
            ? product.quantity
            : product.sizes.reduce((start, next) => start + next.qty, 0)}{" "}
          pieces available.
        </p>
            {/* <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-900">Description</h2>

              <div
                className="space-y-6 text-sm text-gray-500"
                dangerouslySetInnerHTML={{ __html: "this is where the data suppose to be" }}
              />
            </div> */}
            
            <h3 className="text-sm text-gray-600 mt-6">Select a size :</h3>
            <RadioGroup value={product.sizes[router.query.size]??product.sizes[0]}  className="mt-2">
                    <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {product.sizes.map((size,i) => (
                        <Link 
                        href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
                        key={size.size}>
                        <RadioGroup.Option
                          value={size}
                          className={({ active, checked }) =>
                            classNames(
                              (!size?.inStock) ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                              active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                              checked
                                ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                              'border rounded-md py-1 px-1 flex items-center justify-center text-xs font-medium uppercase sm:flex-1'
                            )
                          }
                          // disabled={!size.inStock}
                        >
                          <RadioGroup.Label as="span">{size.size}</RadioGroup.Label>
                        </RadioGroup.Option>                        
                        </Link>

                      ))}
                    </div>
                  </RadioGroup>
            <div className="mt-6">
              {/* Colors */}     
         <h3 className="text-sm text-gray-600">Select Style :</h3>
        <div className={styles.infos__colors}>
          {product.colors &&
            product.colors.map((color, i) => (
              <span key={i}
                className={i == router.query.style ? styles.active_color : ""}
                onMouseOver={() =>
                  setActiveImg(product.subProducts[i].images[0].url)
                }
                onMouseLeave={() => setActiveImg("")}
              >
                <Link  href={`/product/${product.slug}?style=${i}`}>
                  <img src={color.image??color.color} alt="" />
                </Link>
              </span>
            ))}
        </div>
            </div>

          </div>
        <div className={styles.infos__qty +" !mt-0"}>
          <button className=" bg-gray-200 p-1 hover:bg-gray-300" onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
            <TbMinus />
          </button>
          <span>{qty}</span>
          <button className=" bg-gray-200 p-1 hover:bg-gray-300"
            onClick={() => qty < product.quantity && setQty((prev) => prev + 1)}
          >
            <TbPlus />
          </button>
        </div>
        <div className={styles.infos__actions}>
          <button
            disabled={product.quantity < 1}
            style={{ cursor: `${product.quantity < 1 ? "not-allowed" : ""}` }}
            onClick={() => addToCartHandler()}
            className="relative inline-block px-4 py-2 font-medium group"
          >
<span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
<span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
<span className="relative text-black group-hover:text-white">Add To Cart</span>
          </button>
          <button onClick={() => handleWishlist()}>
            <BsHeart />
            WISHLIST
          </button>
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {success && <span className={styles.success}>{success}</span>}
        <Share />
        <Accordian details={[product.description, ...product.details]} />
        {/* <SimillarSwiper /> */}
      </div>
    </div>
  );
}
