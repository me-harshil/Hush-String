import React from "react";
import Image from "next/image";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Image src="/home.jpg" priority alt="home" fill />
    </div>
  );
};

export default Index;
