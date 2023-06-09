import Layout from "../../../components/admin/layout";
import styles from "../../../styles/dashboard.module.scss";
import User from "../../../models/User";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Dropdown from "../../../components/admin/dashboard/dropdown";
import Notifications from "../../../components/admin/dashboard/notifications";
import { TbUsers } from "react-icons/tb";
import { SlHandbag, SlEye } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
import Link from "next/link";
import { fCurrency } from "../../../utils/formatNumber";
export default function Dashboard({
  users,
  orders,
  productsCount,
  ordersCount,
  usersCount,
  totalUnpaidOrders,
  totalPaidOrders,
}) {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Norahairforest - Admin Dashboard</title>
      </Head>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" placeholder="Search here..." />
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={session?.user?.image} />
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>
            <div className={styles.card__infos}>
              <h4>+{usersCount}</h4>
              <span>Users</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>
            <div className={styles.card__infos}>
              <h4>+{ordersCount}</h4>
              <span>Orders</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card__infos}>
              <h4>+{productsCount}</h4>
              <span>Products</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.card__infos}>
              <h4>+{fCurrency(totalPaidOrders)}</h4>
              <h5>
                -{fCurrency(totalUnpaidOrders)}
                Unpaid yet.
              </h5>
              <span>Total Earnings</span>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={styles.heading}>
              <h2>Recent Orders</h2>
              <Link href="/admin/dashboard/orders">View All</Link>
            </div>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Total</td>
                  <td>Payment</td>
                  <td>Status</td>
                  <td>View</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user.name}</td>
                    <td>{fCurrency(order.total)}</td>
                    <td>
                      {order.isPaid ? (
                        <img src="../../../images/verified.webp" alt="" />
                      ) : (
                        <img src="../../../images/unverified1.png" alt="" />
                      )}
                    </td>
                    <td>
                      <div
                        className={`${styles.status} ${
                          order.status == "Not Processed"
                            ? styles.not_processed
                            : order.status == "Processing"
                            ? styles.processing
                            : order.status == "Dispatched"
                            ? styles.dispatched
                            : order.status == "Cancelled"
                            ? styles.cancelled
                            : order.status == "Completed"
                            ? styles.completed
                            : ""
                        }`}
                      >
                        {order.status}
                      </div>
                    </td>
                    <td>
                      <Link href={`/order/${order._id}`}>
                        <SlEye />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.users}>
            <div className={styles.heading}>
              <h2>Recent Users</h2>
              <Link href="/admin/dashboard/users">View All</Link>
            </div>
            <table>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className={styles.user}>
                      <div className={styles.user__img}>
                        <img src={user.image} alt="" />
                      </div>
                      <td>
                        <h4>{user.name}</h4>
                        <span>{user.email}</span>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

Dashboard.auth = {
  role: "admin",
};

export async function getServerSideProps({ req }) {
  const users = await User.find().limit(8).lean();
  const orders = await Order.find()
    .populate({ path: "user", model: User })
    .sort({ updatedAt: -1 })
    .limit(10)
    .lean();
  const totalPaidOrders = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, totalPrice: { $sum: "$total" } } },
  ]);

  const totalUnpaidOrders = await Order.aggregate([
    { $match: { isPaid: false } },
    { $group: { _id: null, totalPrice: { $sum: "$total" } } },
  ]);
  console.log({ totalPaidOrders, totalUnpaidOrders });
  const products = await Product.count().lean();
  const ordersCount = await Order.count().lean();
  const usersCount = await User.count().lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
      totalPaidOrders: totalPaidOrders[0]?.totalPrice ?? 0,
      totalUnpaidOrders: totalUnpaidOrders[0]?.totalPrice ?? 0,
      productsCount: products,
      ordersCount: ordersCount,
      usersCount: usersCount,
    },
  };
}
