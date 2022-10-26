import { useState } from "react";

const useCheckFile = () => {
  const checkUrlIsImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };
  return {
    checkUrlIsImage: checkUrlIsImage,
  };
};

export default useCheckFile;
