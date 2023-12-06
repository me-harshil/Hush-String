"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const MyAccount = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  return <div>MyAccount</div>;
};

export default MyAccount;
