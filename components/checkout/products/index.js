import { FaStaylinked } from "react-icons/fa";
import styles from "./styles.module.scss";
import { fCurrency } from "../../../utils/formatNumber";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function Products({ cart }) {
  return (
    <div className={styles.products}>
      <div className={styles.products__header}>
        <h1>Cart</h1>
        <span>
          {cart.products.length == 1
            ? "1 item"
            : `${cart.products.length} items`}
        </span>
      </div>
      <div className={styles.products__wrap}>
        <ul
          role="list"
          className="divide-y divide-gray-200 border-t border-b border-gray-200"
        >
          {cart.products.map((product) => (
            <li key={product.id} className="flex py-6">
              <div className="flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                <div className=" w-full">
                  <div className="flex justify-between">
                    <h4 className="text-sm">
                      <span className="font-medium text-gray-700">
                        {product.name}
                      </span>
                    </h4>
                    <p className="ml-4 text-sm text-gray-900 font-bold">
                      {fCurrency((product.price * product.qty).toFixed(2))}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    <span className=" font-semibold"> size :</span>{" "}
                    <span> {product.size}&quot;</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    <span className=" font-semibold"> quantity :</span>{" "}
                    <span> {product.qty}</span>
                  </p>
                </div>

                <div className="mt-4 flex flex-1 items-end w-full">
                  <p className="flex items-center space-x-2 text-sm text-gray-700">
                    {product.inStock && (
                      <CheckIcon
                        className="h-5 w-5 flex-shrink-0 text-green-500"
                        aria-hidden="true"
                      />
                    )}

                    <span>
                      {product.inStock ? "In stock" : `Not Available`}
                    </span>
                  </p>
                  <div className="ml-4"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* {cart.products.map((product, index) => (
          <div key={index} className={styles.product}>
            <div className={styles.product__img}>
              <img src={product.image} alt="" />
              <div className={styles.product__infos}>
                <img src={product.color.image} alt="" />
                <span>{product.size}</span>
                <span>x{product.qty}</span>
              </div>
            </div>
            <div className={styles.product__name}>
              {product.name.length > 18
                ? `${product.name.substring(0, 18)}...`
                : product.name}
            </div>
            <div className={styles.product__price}>
              {fCurrency((product.price * product.qty).toFixed(2))}
            </div>
          </div>
        ))} */}
      </div>
      <div className={styles.products__total}>
        Subtotal : <b>{fCurrency(cart.cartTotal)}</b>
      </div>
    </div>
  );
}
