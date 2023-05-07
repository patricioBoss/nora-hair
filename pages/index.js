import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/header";
import Footer from "../components/footer/Footer3";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "../components/home/main";
import FlashDeals from "../components/home/flashDeals";
import db from "../utils/db";
import { useMediaQuery } from "react-responsive";
import Product from "../models/Product";
import ProductCard from "../components/productCard";
import LandingCategories from "../components/landingCategory";
import { Container } from "../components/Container";
import Filter from "../components/filter";
import serializeFields from "../utils/serialize";
import Category from "../models/Category";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import Spin from "../components/spin";
import { useEffect } from "react";
import { useRef } from "react";
export default function Home({
  country,
  products,
  categories,
  paginationCount,
}) {
  console.log({
    country,
    products,
    categories,
    paginationCount,
  });
  const [page, setpage] = useState(1);
  const [pagination, setpagination] = useState(paginationCount);
  const firstMounted = useRef(true);
  const [category, setCategory] = useState();
  const [filterProducts, setFilterProducts] = useState(products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!firstMounted.current && page > 1) {
      console.log("this is called");
      axios
        .get("/api/product", { params: { category: category ?? "", page } })
        .then((res) => {
          setLoading(false);
          setpagination(res.data.data.paginationCount);

          setFilterProducts((x) => [...x, ...res.data.data.products]);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            toast.error(err.response.data.message);
          } else {
            toast.error(err.message);
          }
        });
    }
    firstMounted.current = false;

    return () => {};
  }, [page]);

  const handleChange = (e) => {
    const { value } = e.target;
    setCategory(value);
    if (value) {
      axios
        .get("/api/product", { params: { category: value, page } })
        .then((res) => {
          setLoading(false);
          setFilterProducts(res.data.data.products);
          setpagination(res.data.data.paginationCount);
          setpage(1);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            toast.error(err.response.data.message);
          } else {
            toast.error(err.message);
          }
        });
    }
  };

  return (
    <>
      <Header country={country} />
      <Main />
      <div className={styles.home}>
        <Container>
          <LandingCategories />
          <Filter categories={categories} handleChange={handleChange} />
          <div className={styles.products}>
            {filterProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
          <div className=" flex justify-center items-center py-10">
            <button
              type="button"
              disabled={loading}
              className={`inline-flex justify-center rounded-md border border-transparent bg-black px-8 py-4 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:text-base ${
                loading ? " opacity-70" : ""
              }`}
              onClick={() => (pagination > page ? setpage((x) => x++) : null)}
            >
              {loading && <Spin width={"w-5"} height={"h-5"} />}
              LOAD MORE
            </button>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
export async function getServerSideProps() {
  const pageSize = 40;
  db.connectDb();
  let products = await Product.find()
    .skip(0)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .lean();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  let totalProducts = await Product.countDocuments({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      //country: { name: data.name, flag: data.flag.emojitwo },
      categories: serializeFields(categories),
      paginationCount: Math.ceil(totalProducts / pageSize),
      total: totalProducts,
      country: {
        name: "Nigeria",
        flag: "https://flagcdn.com/w40/ng.png",
      },
    },
  };
}
/*
            <ProductsSwiper
            products={gamingSwiper}
            header="For Gamers"
            bg="#2f82ff"
          />
          <ProductsSwiper
            products={homeImprovSwiper}
            header="House Improvements"
            bg="#5a31f4"
          />
            */
