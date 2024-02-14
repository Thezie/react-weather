import React from "react";
import "./Wallpaper.scss";
import wallpaper from "../../assets/img/wallpaper.jpg";
export const Wallpaper = () => {
  return (
    <>
      <div className=" wallpaper-container position-fixed d-flex top-0 bottom-0 end-0 start-0">
        <img className="wallpaper" src={wallpaper} alt="walpaper" />
      </div>
    </>
  );
};
