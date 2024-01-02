"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setEmail(localStorage.getItem("email"));
    const fetchUser = async (token) => {
      let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      let res = await data.json();
      setName(res.name);
      setAddress(res.address);
      setPhone(res.phone);
      setPincode(res.pincode);
    };
    if (!token) {
      router.push("/login");
    } else {
      fetchUser(token);
    }
    // eslint-disable-next-line
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [pincode, setPincode] = useState("");

  const handleChange = async (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "pincode":
        setPincode(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "newpassword":
        setNewpassword(value);
        break;
      default:
        break;
    }
  };

  const updateUser = async () => {
    let data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, address, phone, pincode }),
    });

    let res = await data.json();
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (res.success === false) {
      toast.error(res.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setPassword("");
    setNewpassword("");
  };

  const updatePassword = async () => {
    let data = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updatePassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, newpassword, token }),
      }
    );

    let res = await data.json();
    if (res.success) {
      toast.success(res.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (res.success === false) {
      toast.error(res.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="min-h-screen mx-auto my-10 md:px-24 px-2">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1 className="text-3xl font-bold text-center">Update Your Account</h1>
      <h2 className="font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              name="name"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email (cannot be changed)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              readOnly
              name="email"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <div className="px-2 w-full">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">
          Address
        </label>

        <textarea
          name="address"
          id="address"
          cols="30"
          rows="3"
          value={address}
          onChange={handleChange}
          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        ></textarea>
      </div>
      <div className="mx-auto flex mt-2">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              maxLength="10"
              placeholder="Enter 10 digit phone number"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
              type="text"
              value={pincode}
              onChange={handleChange}
              id="pincode"
              maxLength="6"
              name="pincode"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <button
        className="ml-4 disabled:bg-blue-400 flex mt-2 text-white bg-blue-600 border-0 p-2 focus:outline-none hover:bg-blue-700 rounded text-sm"
        onClick={() => {
          updateUser();
        }}
      >
        Update Details
      </button>
      <h2 className="font-semibold text-xl mt-4">2. Change Password</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Current Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              name="password"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label
              htmlFor="newpassword"
              className="leading-7 text-sm text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              id="newpassword"
              value={newpassword}
              onChange={handleChange}
              name="newpassword"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <button
        className="ml-4 disabled:bg-blue-400 flex mt-2 text-white bg-blue-600 border-0 p-2 focus:outline-none hover:bg-blue-700 rounded text-sm"
        onClick={updatePassword}
      >
        Update Password
      </button>
    </div>
  );
};

export default MyAccount;
