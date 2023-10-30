import React from "react";
import Image from "next/image";

const Index = () => {
  return (
    <div>
      <Image src="/home.jpg" priority alt="home" width={672} height={448}/>
    </div>
  );
};

export default Index;
