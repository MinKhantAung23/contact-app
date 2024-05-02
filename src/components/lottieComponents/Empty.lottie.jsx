import React from "react";
import Lottie from "lottie-react";
import EmptyJson from "../../assets/empty_list.json";

const EmptyLottie = () => {
  return (
    <div className="w-56 h-56">
      <Lottie animationData={EmptyJson} loop size={50} />
    </div>
  );
};

export default EmptyLottie;
