/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useProfileQuery } from "../../store/service/endpoints/auth.endpoints";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ check, token, children, path = "/" }) => {
  // console.log("auth ", check);
  const nav = useNavigate();
  const { data, isError, isLoading } = useProfileQuery();

  useEffect(() => {
    if (check) {
      localStorage.setItem("token", JSON.stringify(token));
    } else if (isError && !data) {
      nav(path);
    } else if (data) {
      nav("/home");
    }
  }, [data, isError, check]);
  return <>{isLoading ? <Loading /> : <>{children}</>}</>;
};

export default AuthGuard;
