import { useState } from "react";

const useCheckFile = () => {
  const checkUrlIsImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  const checkUrlIsDocx = (url) => {
    console.log(url.includes(".docx"));
    return url.includes(".docx");
  };
  return {
    checkUrlIsImage: checkUrlIsImage,
    checkUrlIsDocx: checkUrlIsDocx,
  };
};

export default useCheckFile;
