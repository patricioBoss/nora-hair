import Link from "next/link";
import styles from "./styles.module.scss";
import { RiSearch2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { toggleSlider } from "../../store/cartSlice";
export default function Main({ searchHandler }) {
  const router = useRouter();
  const dispatch=useDispatch()
  const [query, setQuery] = useState(router.query.search || "");
  const { cart } = useSelector((state) => ({ ...state }));
  const handleSearch = (e) => {
    e.preventDefault();
    if (router.pathname !== "/browse") {
      if (query.length > 1) {
        router.push(`/browse?search=${query}`);
      }
    } else {
      searchHandler(query);
    }
  };
  return (
    <div className={styles.main + " !sticky top-0 z-[1000] bg-white"}>
      <div className={styles.main__container}>
        <Link href="/">
            <img src="/logo/nora-logo.png"  className="w-14" alt="" />

        </Link>
        <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </form>
        
          <span className={styles.cart+ " cursor-pointer"} onClick={()=>dispatch(toggleSlider())}>
          <ShoppingBagIcon
                      className="h-8 w-8 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
          {!!cart.cartItems.length && <span>{cart.cartItems.length}</span>}
          </span>
      </div>
    </div>
  );
}
