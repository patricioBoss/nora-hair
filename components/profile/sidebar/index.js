import { Dialog, Transition } from "@headlessui/react";
import { sidebarData } from "../../../data/profile";
import Item from "./Item";
import styles from "./styles.module.scss";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, Fragment } from "react";

export default function Sidebar({ data }) {
  const [open, setOpen] = useState(false);
  const toggleFlyer = () => setOpen((x) => !x);
  console.log(data);
  return (
    <>
      <div
        className="fixed top-[15rem] -translate-x-4 block sm:hidden z-[2000] bg-black text-white p-4 cursor-pointer"
        onClick={toggleFlyer}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
          />
        </svg>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebar__container + " !hidden md:!flex"}>
          <img src={data.image} alt="" />
          <span className={styles.sidebar__name}>{data.name}</span>
          <ul>
            {sidebarData.map((item, i) => (
              <Item
                key={i}
                item={item}
                visible={data.tab == i.toString()}
                index={i.toString()}
              />
            ))}
          </ul>
        </div>

        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-[2000]"
            onClose={() => setOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                          <button
                            type="button"
                            className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </Transition.Child>
                      <div className="flex h-screen flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="relative mt-6 flex-1 px-4 sm:px-6 w-full">
                          <div className={styles.sidebar__container}>
                            <img src={data.image} alt="" />
                            <span className={styles.sidebar__name}>
                              {data.name}
                            </span>
                            <ul className=" w-full">
                              {sidebarData.map((item, i) => (
                                <Item
                                  key={i}
                                  item={item}
                                  visible={data.tab == i.toString()}
                                  index={i.toString()}
                                />
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}
