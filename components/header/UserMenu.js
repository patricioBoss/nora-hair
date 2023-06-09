import Link from "next/link";
import styles from "./styles.module.scss";
import { signOut, signIn } from "next-auth/react";
import { capitalCase } from "change-case";
export default function UserMenu({ session }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome</h4>
      {session ? (
        <div className={styles.flex}>
          <img
            src={session?.user?.image}
            alt=""
            className={styles.menu__img + " rounded-full"}
          />
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>{capitalCase(session?.user?.name)}</h3>
            <span onClick={() => signOut()}>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary} onClick={() => signIn()}>
            Register
          </button>
          <button
            className={styles.btn_outlined + " !border-black !border"}
            onClick={() => signIn()}
          >
            Login
          </button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
      </ul>
    </div>
  );
}
