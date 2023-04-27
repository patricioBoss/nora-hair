import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Spin from './spin'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


const processList= ["Not Processed", "Processing", "Dispatched",
  "Cancelled",
  "Completed",
]

export default function UpdateOrder({open,setOpen,order}) {
  const [loading, setLoading] = useState(false)
  const [process, setProcess] = useState("")
const route =useRouter()
const handleChange=(e)=>{
const {value}=e.target
setProcess(value)
}

const UpdateStatus=()=>{
  setLoading(true);
  axios
    .put(`/api/order/${order._id}`,{status:process})
    .then((res) => {
      setLoading(false);
      route.push("/admin/dashboard/orders")
      toast.success(res.data.message);
    })
    .catch((err) => {
      // console.log(err.response?.data.message);
      setLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
        
      } else {
        toast.error(err.message);
      }
    });
}





  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end  justify-center p-4 text-center sm:items-start sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Update Order Status
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Update order status to enable buyers track orders
                      </p>
                      <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
     <span className=' font-bold'>order Id: </span>   {order._id}
      </label>
      <select
        id="status"
        name="status"
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-500 py-2 pl-3 pr-10 text-base focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
        defaultValue={order.status}
      >
       {processList.map(process=><option key={process} value={process}>{process}</option>) }

      </select>
    </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    
                    disabled={loading}
                    className={`inline-flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:text-sm ${loading?" opacity-70":""}`}
                    onClick={UpdateStatus}
                  >{
                     loading && <Spin width={"w-5"} height={"h-5"} />
                  }
                    
                    Update Status
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
