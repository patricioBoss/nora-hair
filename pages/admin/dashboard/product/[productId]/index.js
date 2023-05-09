import styles from "../../../../../styles/products.module.scss";
import Layout from "../../../../../components/admin/layout";
import db from "../../../../../utils/db";
import Product from "../../../../../models/Product";
import Category from "../../../../../models/Category";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import SingularSelect from "../../../../../components/selects/SingularSelect";
import MultipleSelect from "../../../../../components/selects/MultipleSelect";
import AdminInput from "../../../../../components/inputs/adminInput";
import DialogModal from "../../../../../components/dialogModal";
import { useDispatch } from "react-redux";
import { showDialog } from "../../../../../store/DialogSlice";
import Images from "../../../../../components/admin/createProduct/images";
import Colors from "../../../../../components/admin/createProduct/colors";
import Style from "../../../../../components/admin/createProduct/style";
import Sizes from "../../../../../components/admin/createProduct/clickToAdd/Sizes";
import Details from "../../../../../components/admin/createProduct/clickToAdd/Details";
import Questions from "../../../../../components/admin/createProduct/clickToAdd/Questions";
import { validateCreateProduct } from "../../../../../utils/validation";
import dataURItoBlob from "../../../../../utils/dataURItoBlob";
import { uploadImages } from "../../../../../requests/upload";
const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: {
    color: "",
    image: "",
  },
  sizes: [
    {
      size: "",
      qty: "",
      price: "",
    },
  ],
  details: [
    {
      name: "",
      value: "",
    },
  ],
  questions: [
    {
      question: "",
      answer: "",
    },
  ],
  shippingFee: "",
};
export default function Create({ parents, categories, productInfo }) {
  const [product, setProduct] = useState({
    name: productInfo.name,
    description: productInfo.description,
    brand: productInfo.brand,
    sku: productInfo.subProducts[0].sku,
    discount: productInfo.subProducts[0].discount,
    images: productInfo.subProducts[0].images.map((image) => image.url),
    description_images: productInfo.subProducts[0].description_images,
    parent: "",
    category: productInfo.category,
    subCategories: productInfo.subCategories,
    color: productInfo.subProducts[0].color,
    sizes: productInfo.subProducts[0].sizes,
    details: productInfo.details,
    questions: productInfo.questions,
    shippingFee: productInfo.shipping,
  });
  const [subs, setSubs] = useState(productInfo.subCategories);
  const [colorImage, setColorImage] = useState("");
  const [images, setImages] = useState(
    productInfo.subProducts[0].images.map((image) => image.url)
  );
  console.log(productInfo);
  console.log(images, "these are the images");
  const [description_images, setDescription_images] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(product);

  useEffect(() => {
    async function getSubs() {
      const { data } = await axios.get("/api/admin/subCategory", {
        params: {
          category: product.category,
        },
      });
      console.log(data);
      setSubs(data);
    }
    getSubs();
  }, [product.category]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Please add a name")
      .min(5, "Product name must bewteen 5 and 300 characters.")
      .max(300, "Product name must bewteen 5 and 300 characters."),
    brand: Yup.string(),
    category: Yup.string().required("Please select a category."),
    /*
    subCategories: Yup.array().min(
      1,
      "Please select atleast one sub Category."
    ),
   */
    sku: Yup.string().required("Please add a sku/number"),
    color: Yup.string().required("Please add a color"),
    description: Yup.string().required("Please add a description"),
  });
  const createProduct = async () => {
    let test = validateCreateProduct(product, images);
    if (test == "valid") {
      updateProductHandler();
    } else {
      dispatch(
        showDialog({
          header: "Please follow our instructions.",
          msgs: test,
        })
      );
    }
  };
  let uploaded_images = [];
  let style_img = "";
  const updateProductHandler = async () => {
    setLoading(true);
    let urlImages = images.filter((img) => !img.startsWith("data"));
    let unloadedImages = images.filter((img) => img.startsWith("data"));
    if (unloadedImages.length) {
      let temp = images
        .filter((img) => img.startsWith("data"))
        .map((img) => {
          return dataURItoBlob(img);
        });
      const path = "product images";
      let formData = new FormData();
      formData.append("path", path);
      temp.forEach((image) => {
        formData.append("file", image);
      });
      uploaded_images = await uploadImages(formData);
    }
    if (product.color.image && product.color.image.startsWith("data")) {
      let temp = dataURItoBlob(product.color.image);
      let path = "product style images";
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", temp);
      let cloudinary_style_img = await uploadImages(formData);
      style_img = cloudinary_style_img[0].url;
    } else {
      style_img = product.color.image;
    }
    try {
      const { data } = await axios.put(
        `/api/admin/product/${productInfo._id}`,
        {
          ...product,
          images: [...uploaded_images, ...urlImages],
          color: {
            image: style_img,
            color: product.color.color,
          },
        }
      );
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout>
      <div className={styles.header}>Create Product</div>

      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          subCategories: product.subCategories,
          parent: product.parent,
          sku: product.sku,
          discount: product.discount,
          color: product.color.color,
          imageInputFile: "",
          styleInout: "",
        }}
        validationSchema={validate}
        onSubmit={() => {
          createProduct();
        }}
      >
        {(formik) => (
          <Form>
            <Images
              name="imageInputFile"
              header="Product Carousel Images"
              text="Add images"
              images={images}
              setImages={setImages}
              setColorImage={setColorImage}
            />
            <div className={styles.flex}>
              {product.color.image && (
                <img
                  src={product.color.image}
                  className={styles.image_span}
                  alt=""
                />
              )}
              {product.color.color && (
                <span
                  className={styles.color_span}
                  style={{ background: `${product.color.color}` }}
                ></span>
              )}
            </div>
            <Colors
              name="color"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            />
            <Style
              name="styleInput"
              product={product}
              setProduct={setProduct}
              colorImage={colorImage}
            />
            <SingularSelect
              name="category"
              value={product.category}
              placeholder="Category"
              data={categories}
              header="Select a Category"
              handleChange={handleChange}
              disabled={product.parent}
            />
            {product.category && (
              <MultipleSelect
                value={product.subCategories}
                data={subs}
                header="Select SubCategories"
                name="subCategories"
                disabled={product.parent}
                handleChange={handleChange}
              />
            )}
            <div className={styles.header}>Basic Infos</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placholder="Product name"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Description"
              name="description"
              placholder="Product description"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Brand"
              name="brand"
              placholder="Product brand"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Sku"
              name="sku"
              placholder="Product sku/ number"
              onChange={handleChange}
            />
            <AdminInput
              type="text"
              label="Discount"
              name="discount"
              placholder="Product discount"
              onChange={handleChange}
            />
            <Sizes
              sizes={product.sizes}
              product={product}
              setProduct={setProduct}
            />
            <Details
              details={product.details}
              product={product}
              setProduct={setProduct}
            />
            <Questions
              questions={product.questions}
              product={product}
              setProduct={setProduct}
            />
            {/*
            <Images
              name="imageDescInputFile"
              header="Product Description Images"
              text="Add images"
              images={description_images}
              setImages={setDescriptionImages}
              setColorImage={setColorImage}
            />
           
       
          
            */}
            <button
              className={`${styles.btn} ${styles.btn__primary} ${styles.submit_btn}`}
              type="submit"
            >
              Edit Product
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  db.connectDb();
  const productId = ctx.params?.productId;
  const product = await Product.findById(productId).lean();
  const results = await Product.find().select("name subProducts").lean();
  const categories = await Category.find().lean();
  console.log(product);
  db.disconnectDb();
  return {
    props: {
      productInfo: JSON.parse(JSON.stringify(product)),
      parents: JSON.parse(JSON.stringify(results)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
