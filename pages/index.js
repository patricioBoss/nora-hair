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
export default function Home({ country, products,categories }) {
 const [filterProducts, setFilterProducts] = useState(products)
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  const [loading, setLoading] = useState(false)
 const handleChange=(e)=>{
  const {value}=e.target
  if(value){
  axios
  .get("/api/product",{ params: { category: value, } })
  .then((res) => {
    setLoading(false);
    setFilterProducts(res.data.data.products)
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


 }

  return (
    <>
   <Header country={country} />
     <Main />
      <div className={styles.home}>
       <Container>
          <LandingCategories/>
            <Filter categories={categories} handleChange={handleChange} />
          <div className={styles.products}>
            {filterProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
       </Container>
        </div>
      <Footer />
    </>
  );
}
export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      //country: { name: data.name, flag: data.flag.emojitwo },
      categories: serializeFields(categories) ,
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
