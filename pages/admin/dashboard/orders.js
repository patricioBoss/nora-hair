import Layout from "../../../components/admin/layout";
import CollapsibleTable from "../../../components/admin/orders/table";
import { useRouter } from "next/dist/client/router";
import db from "../../../utils/db";
import Order from "../../../models/Order";
import User from "../../../models/User";
import { useState } from "react";
import { Pagination, Typography } from "@mui/material";
export default function Orders({ orders, paginationCount }) {
  const router = useRouter();
  console.log(router.query);
  const [search, setsearch] = useState(router.query?.id ?? "");
  const textChange = (e) => {
    const { value } = e.target;
    setsearch(value);
  };
  const handleSearch = () => {
    const currentPath = router.pathname;
    router.push({
      pathname: currentPath,
      query: {
        ...router.query,
        id: search,
      },
    });
  };
  const pageHandler = (e, page) => {
    const currentPath = router.pathname;
    router.push({
      pathname: currentPath,
      query: {
        ...router.query,
        page,
      },
    });
  };
  return (
    <Layout>
      <>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          paddingX="5px"
          id="tableTitle"
          component="div"
        >
          Orders
        </Typography>
        <div className=" flex items-stretch my-6">
          <div className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black w-8/12">
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-900"
            >
              Search by order ID
            </label>
            <input
              type="text"
              name="name"
              value={search}
              onChange={textChange}
              className="block w-full focus:outline-0 !border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Enter Order Id"
            />
          </div>
          <button
            type="button"
            className={`inline-flex justify-center items-center rounded-md border border-transparent bg-black px-8 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:text-sm
                    `}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <CollapsibleTable rows={orders} />
        <Pagination
          count={paginationCount}
          defaultPage={Number(router.query.page) || 1}
          onChange={pageHandler}
          variant="outlined"
          color="primary"
        />
      </>
    </Layout>
  );
}
Orders.auth = {
  role: "Admin",
};

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const page = query.page || 1;
  const pageSize = 15;
  const searchId = query?.id?.trim() || "";
  await db.connectDb();
  if (searchId) {
    const order = await Order.findById(searchId)
      .lean()
      .populate({ path: "user", model: User, select: "name email image" })
      .sort({ createdAt: -1 })
      .lean();
    return {
      props: {
        orders: JSON.parse(JSON.stringify([order])),
      },
    };
  } else {
    const totalOrders = await Order.count();
    const orders = await Order.find({})
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .populate({ path: "user", model: User, select: "name email image" })
      .sort({ createdAt: -1, paid: -1 })
      .lean();
    return {
      props: {
        paginationCount: Math.ceil(totalOrders / pageSize),
        orders: JSON.parse(JSON.stringify(orders)),
      },
    };
  }
}
