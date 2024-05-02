import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../ui/button";
import { useLogOutMutation } from "../../store/service/endpoints/auth.endpoints";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [logoutFun] = useLogOutMutation();

  const nav = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await logoutFun();
    nav("/");
    toast.success("Logout Successfully");
  };
  return (
    <nav className="w-full h-20 px-52 flex justify-center items-center border-b-gray shadow">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-serif font-bold text-2xl shadow-[#ddd] shadow-inner p-1">
          MK
        </h1>
        <div className="flex">
          <div className="mx-3">
            <Button
              variant="outline"
              className="rounded"
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
