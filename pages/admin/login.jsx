import { useState } from "react"
import {
  signIn,
} from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function AdminLogin() {
 const Router= useRouter()
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email:'',
    password:''
  })

  const handleChange=(e)=>{
        const {name,value}=e.target
        setUser(user=>({...user,[name]:value}))
  }


  const signInHandler = async (e) => {
    e.preventDefault()
    setLoading(true);
    let options = {
      redirect: false,
      email: user.email,
      password: user.password,
    };
    const res = await signIn("credentials", options);

    setLoading(false);
    if (res?.error) {
      setLoading(false);
     toast.error("error login in")
    } else {
      toast.success("login successful")
      return Router.push("/admin/dashboard");
    }
  };
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-16 w-auto"
              src="/logo/nora-logo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in As Admin
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={signInHandler} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    required
                    value={user.email}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm hover:underline">
                    <a href="#" className="font-semibold text-gray-600 hover:text-gray-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Sign in
                </button>
              </div>
            </form>
  
          </div>
        </div>
      </>
    )
  }
  