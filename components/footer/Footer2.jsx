import Link from "next/link";
import React from "react";
import {ChevronRightIcon} from "@heroicons/react/24/outline"
import { BsTelegram } from "react-icons/bs";



const socials=[
  {
    name: 'Facebook',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/norahair_forest/',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]
const Footer = () => {
  return (
    <footer className="footer bg-black relative text-gray-200">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="py-[60px] px-0">
              <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                <div className="lg:col-span-4 md:col-span-12">
                  <a href="#" className=" focus:outline-none">
                    <img
                      src="/logo/Logo-full-white.svg"
                      className=" w-36"
                      alt=""
                    />
                  </a>
                  <p className="mt-2 mb-3 text-gray-300">
                  Norahairforest is a leading company that specializes in selling high-quality hair wigs and braids. 
            With a commitment to providing customers with the best possible products, 
            Norahairforest offers a wide variety of styles and colors to choose from. 
                  </p>
                  <div className="flex space-x-6 md:order-2">
              {socials.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-200 hover:text-gray-300">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
              <a href="https://t.me/+hUSmZWyqunI1Zjg8" className="text-gray-200 hover:text-gray-300"> <BsTelegram className="h-6 w-6" /></a>
             
            </div>
                </div>

                <div className="lg:col-span-2 md:col-span-4">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">
                    Categories
                  </h5>
                  <ul className="list-none footer-list mt-6">
                    <li>
                      <Link
                        href="/#about"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <ChevronRightIcon className="h-6 w-6"/> About us
                      </Link>
                    </li>
                    <li className="mt-[10px]">
                      <a
                        href="page-services.html"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <ChevronRightIcon className="h-6 w-6"/> Real
                        Estate
                      </a>
                    </li>
                    <li className="mt-[10px]">
                      <Link
                        href="/cryptocurrency"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <ChevronRightIcon className="h-6 w-6"/>{" "}
                        Cryptocurrency
                      </Link>
                    </li>
                    <li className="mt-[10px]">
                      <Link
                        href="/stocks"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <ChevronRightIcon className="h-6 w-6"/>{" "}
                        Stocks/Bonds
                      </Link>
                    </li>

                    <li className="mt-[10px]">
                      <Link
                        href="/login"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <ChevronRightIcon className="h-6 w-6"/> Login
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-3 md:col-span-4">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">
                    Usefull Links
                  </h5>
                  <ul className="list-none footer-list mt-6">
                    <li>
                      <a
                        href="#"
                        target={"_blank"}
                        rel="noreferrer"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <ChevronRightIcon className="h-6 w-6"/> Terms of
                        Services
                      </a>
                    </li>
                    <li className="mt-[10px]">
                      <a
                        href="#"
                        target={"_blank"}
                        rel="noreferrer"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <ChevronRightIcon className="h-6 w-6"/> Privacy
                        Policy
                      </a>
                    </li>
                    <li className="mt-[10px]">
                      <a
                        href="https://wa.me/234810006238"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <ChevronRightIcon className="h-6 w-6"/> Contact
                        Us on Whatsapp
                        <br />
                        (+234810006238)
                      </a>
                    </li>
                    {/* <li className="mt-[10px]">
                      <a
                        href="changelog.html"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i className="uil uil-angle-right-b me-1"></i> Changelog
                      </a>
                    </li>
                    <li className="mt-[10px]">
                      <a
                        href="widget.html"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"
                      >
                        <i className="uil uil-angle-right-b me-1"></i> Widget
                      </a>
                    </li> */}
                  </ul>
                </div>

                <div className="lg:col-span-3 md:col-span-4">
                  <h5 className="tracking-[1px] text-gray-100 font-semibold">
                    Newsletter
                  </h5>
                  <p className="mt-6">
                    Sign up and receive the latest tips via email.
                  </p>
                  <form>
                    <div className="grid grid-cols-1">
                      <div className="foot-subscribe my-3">
                        <label className="form-label">
                          Write your email{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <div className="form-icon relative mt-2">
                          <i
                            data-feather="mail"
                            className="w-4 h-4 absolute top-3 left-4"
                          ></i>
                          <input
                            type="email"
                            className="form-input bg-gray-800 border border-gray-800 text-gray-100 pl-12 focus:shadow-none"
                            placeholder="Email"
                            name="email"
                            required=""
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        id="submitsubscribe"
                        name="send"
                        className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-[30px] px-0 border-t border-slate-800">
        <div className="container text-center">
          <div className="grid md:grid-cols-2 items-center">
            <div className="md:text-left text-center">
              <p className="mb-0">
                All right reserved © {new Date().getFullYear()} NoraHairForest
                Technologies .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
