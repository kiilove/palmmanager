import { Form, Input } from "antd";
import Password from "antd/es/input/Password";
import React from "react";
import { TermServiceText } from "../components/TermServiceV202402";

const Register = () => {
  const sectionHeader = ({ title }) => (
    <div
      className="flex w-full h-full justify-center items-center mb-10"
      style={{ borderBottom: "1px solid" }}
    >
      <span
        className="flex justify-start w-full text-gray-700 font-semibold"
        style={{
          fontSize: "18px",
        }}
      >
        {title}
      </span>
    </div>
  );
  return (
    <div className="flex w-full h-full flex-col justify-start items-center bg-gray-100 my-5">
      <div
        className="flex gap-y-1 w-full h-screen flex-col justify-start items-center bg-white "
        style={{ maxWidth: "1000px" }}
      >
        <div className="flex h-14 justify-center items-center w-full px-5">
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "5px",
            }}
          >
            회원가입
          </span>
        </div>

        <div className="flex h-14 justify-center items-center w-full px-5">
          {sectionHeader({ title: "로그인 정보" })}
        </div>
        <div className="flex  justify-center items-center w-full px-5 ">
          <Form
            labelCol={{
              span: 6,
            }}
            style={{
              width: "100%",
            }}
            size="large"
            labelAlign="right"
          >
            <Form.Item name="userId" label="아이디" required>
              <Input
                className=" rounded"
                style={{ height: "50px" }}
                placeholder="아이디(이메일) 입력(필수)"
              />
            </Form.Item>
            <Form.Item name="userPassword" label="비밀번호" required>
              <Password
                className=" rounded"
                style={{ height: "50px" }}
                placeholder="6이상 영문과 숫자 조합"
                visibilityToggle={false}
              />
            </Form.Item>
            <Form.Item name="userPasswordVerify" label="비밀번호 확인" required>
              <Password
                className=" rounded "
                style={{ height: "50px" }}
                placeholder="비밀번호 확인"
                visibilityToggle={false}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="flex h-14 justify-center items-center w-full px-5">
          {sectionHeader({ title: "회사(개인) 정보" })}
        </div>
        <div className="flex  justify-center items-center w-full px-5 ">
          <Form
            labelCol={{
              span: 6,
            }}
            style={{
              width: "100%",
            }}
            size="large"
            labelAlign="right"
          >
            <Form.Item name="companyName" label="회사명(이름)" required>
              <Input
                className=" rounded"
                style={{ height: "50px" }}
                placeholder="회사명(개인이름) 입력(필수)"
              />
            </Form.Item>
            <Form.Item name="companyTel" label="전화번호" required>
              <Input
                className=" rounded"
                style={{ height: "50px" }}
                placeholder="대표전화(휴대전화), 숫자만 입력"
                required
              />
            </Form.Item>
            <Form.Item name="companyEmail" label="관리자 이메일" required>
              <Input
                className=" rounded"
                style={{ height: "50px" }}
                placeholder="비밀번호 찾기 위해 정확한 이메일 입력"
                required
              />
            </Form.Item>
          </Form>
        </div>
        <div className="flex h-14 justify-center items-center w-full px-5">
          {sectionHeader({ title: "선택 정보" })}
        </div>
        <div className="flex  justify-center items-center w-full px-5 ">
          <Form
            labelCol={{
              span: 6,
            }}
            style={{
              width: "100%",
            }}
            size="large"
            labelAlign="right"
          >
            <Form.Item name="companyAddress" label="주소">
              <Input
                className=" rounded"
                style={{ height: "50px" }}
                placeholder="회사명(개인이름) 입력(필수)"
              />
            </Form.Item>
            <Form.Item name="companyTelExtra" label="추가 전화번호">
              <Input
                className=" rounded"
                style={{ height: "50px" }}
                placeholder="숫자만 입력"
                required
              />
            </Form.Item>
          </Form>
        </div>
        <div className="flex h-14 justify-start items-center w-full px-5">
          <span className="text-sm">
            이용약관 동의<span>(필수)</span>
          </span>
        </div>
        <div className="flex px-5 flex-wrap" style={{ height: "150px" }}>
          <div
            className="flex bg-gray-100 rounded p-2 overflow-y-auto flex-wrap"
            style={{ fontSize: "10px", maxHeight: "140px" }}
          >
            <TermServiceText />
          </div>
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
              onClick={() => {}}
            >
              <span className="text-gray-800" style={{ letterSpacing: "14px" }}>
                회원가입
              </span>
            </button>
          </div>
        </div>
        <div
          className="flex w-full  justify-center items-center my-10"
          style={{
            maxWidth: "500px",
            height: "10px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Register;
