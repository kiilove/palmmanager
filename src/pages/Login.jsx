import React from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import Logo1 from "../assets/logo/jam_blank.png";
import { Avatar, Divider, Switch } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full h-screen flex-col justify-start items-center bg-gray-100">
      <div
        className="flex gap-y-1 w-full h-screen flex-col justify-start items-center bg-white"
        style={{ maxWidth: "1000px" }}
      >
        <div
          className="flex h-14 justify-end items-center w-full px-5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            <LiaTimesSolid />
          </span>
        </div>
        <div
          className="flex w-full justify-center items-center"
          style={{ height: "110px" }}
        >
          <img src={Logo1} alt="" style={{ width: "80px" }} />
        </div>
        <div className="flex w-full justify-center items-center px-5">
          <div
            className="flex w-full rounded px-6"
            style={{
              border: "1px solid #cacaca",
              maxWidth: "500px",
              height: "50px",
            }}
          >
            <input
              type="text"
              className="outline-none border-none  placeholder:text-sm placeholder:text-gray-300"
              placeholder="아이디(이메일)를 입력해주세요."
            />
          </div>
        </div>
        <div className="flex w-full justify-center items-center px-5">
          <div
            className="flex w-full rounded px-6"
            style={{
              border: "1px solid #cacaca",
              maxWidth: "500px",
              height: "50px",
            }}
          >
            <input
              type="password"
              className="outline-none border-none placeholder:text-sm placeholder:text-gray-300"
              placeholder="비밀번호 입력해주세요"
            />
          </div>
        </div>
        <div
          className="flex w-full justify-center items-center"
          style={{ height: "50px", maxWidth: "500px" }}
        >
          <div className="flex w-full h-full px-5 md:px-0">
            <div className="flex justify-start items-center gap-x-4 w-1/2">
              <span className="text-gray-500 text-sm">자동로그인</span>
              <Switch />
            </div>
            <div className="flex justify-end items-center w-1/2">
              <span className="text-gray-500 text-sm">
                아이디(이메일)/비밀번호 찾기
              </span>
            </div>
          </div>
        </div>
        <div
          className="flex w-full  justify-center items-center"
          style={{
            maxWidth: "500px",
            height: "50px",
          }}
        >
          <div className="flex w-full h-full px-5 md:px-0">
            <button className=" bg-gray-700 w-full h-full rounded">
              <span className="text-gray-100" style={{ letterSpacing: "20px" }}>
                로그인
              </span>
            </button>
          </div>
        </div>
        <div
          className="flex w-full  justify-center items-center"
          style={{
            maxWidth: "500px",
            height: "100px",
          }}
        >
          <div className="flex w-full h-full px-5 md:px-0">
            <Divider>
              <span className="text-gray-500 font-normal text-base">
                간편 로그인
              </span>
            </Divider>
          </div>
        </div>
        <div
          className="flex w-full  justify-center items-center"
          style={{
            maxWidth: "500px",
            height: "50px",
          }}
        >
          <button
            className="bg-white w-14 h-14  rounded-full flex justify-center items-center"
            style={{ border: "1px solid #cacaca" }}
          >
            <FcGoogle className="text-2xl" />
          </button>
        </div>
        <div
          className="flex w-full  justify-center items-center my-10"
          style={{
            maxWidth: "500px",
            height: "50px",
          }}
        >
          <div className="flex w-full h-full px-5 md:px-0">
            <button
              className=" bg-white w-full h-full rounded"
              style={{ border: "1px solid" }}
              onClick={() => {
                navigate("/register");
              }}
            >
              <span className="text-gray-800" style={{ letterSpacing: "14px" }}>
                회원가입
              </span>
            </button>
          </div>
        </div>
        <div
          className="flex w-full  justify-center items-center"
          style={{
            maxWidth: "500px",
            height: "10px",
          }}
        >
          <div className="flex w-full h-full justify-center items-start px-5 md:px-0">
            <span className="text-gray-400 text-xs ">문의 info@jncore.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
