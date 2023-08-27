import { Button } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/Hooks";
import { logoutUser } from "src/Redux/Auth/AuthSlice";

export const UserInfor = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.auth.account);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <div>
      <img
        src={userData?.photoURL as string}
        alt="avatar"
        className="w-[30px] rounded-[100%] relative border-solid border-[2px] border-white
        hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {!isOpen ? (
        ""
      ) : (
        <>
          <div
            className="w-full h-full bg-transparent absolute top-0 right-0"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-2 top-[45px]">
            <div className="flex flex-col w-[100px] h-[300px] bg-white 
            justify-center items-center rounded-sm shadow-md">
              <Button danger type="primary" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
