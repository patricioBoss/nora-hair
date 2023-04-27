import styles from "./styles.module.scss";
import { menuArray } from "../../../data/home";
import Link from "next/link";
//-------
import {
  GiLargeDress,
  GiClothes,
  GiWatch,
  GiHeadphones,
  GiHealthCapsule,
} from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { HiOutlineHome } from "react-icons/hi";

//-------
export default function Menu() {
  return (
    <div className={styles.menu +" border-r-2 font-normal px-6"}>
      <ul>
        <li className=" w-full">
          <a className={styles.menu__header}>
            {/* <BiCategory /> */}
            <b>Categories</b>
          </a>
        </li>
        <div className={styles.menu__list+ " flex flex-col gap-[14px] items-start"}>
          {menuArray.map((item, i) => (
            <li key={item.name} className="w-full">
              <Link href={item.link} className="">
                <a>
                  <span>{item.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
