import { Button, Checkbox, Form, Input, Space } from "antd";
import Password from "antd/es/input/Password";
import React, { useRef, useState } from "react";
import { TermServiceText } from "../components/TermServiceV202402";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Timestamp } from "firebase/firestore";

const initApplys = {
  serviceApply: false,
  serviceApplyAt: undefined,
  serviceVersion: "20240201",
  personalApply: false,
  personalApplyAt: undefined,
  personalVersion: "20240201",
  marketingApply: false,
  marketingApplyAt: "",
  marketingVersion: "20240201",
  marketingEmail: false,
  marketingSMS: false,
};

const allApplysTrue = {
  serviceApply: true,
  serviceApplyAt: Timestamp.fromDate(new Date()),
  serviceVersion: "20240201",
  personalApply: true,
  personalApplyAt: Timestamp.fromDate(new Date()),
  personalVersion: "20240201",
  marketingApply: true,
  marketingApplyAt: Timestamp.fromDate(new Date()),
  marketingVersion: "20240201",
  marketingEmail: true,
  marketingSMS: true,
};
const Register = () => {
  const loginRef = useRef();
  const companyRef = useRef();
  const extraRef = useRef();
  const allApplyRef = useRef();
  const serviceApplyRef = useRef();
  const personalApplyRef = useRef();
  const marketingApplyRef = useRef();
  const marketingEmailRef = useRef();
  const marketingSMSRef = useRef();

  const [applys, setApplys] = useState({ ...initApplys });

  const scriptUrl =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(scriptUrl);

  const handleAddressComplete = (data) => {
    console.log(data.zonecode);
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    if (fullAddress !== "") {
      loginRef?.current.setFieldsValue({
        ...loginRef?.current.getFieldsValue(),
        companyZoneCode: data.zonecode,
        companyFullAddress: fullAddress,
        // compantExtraAddress:
        //   extraRef?.current.getFieldsValue().compantExtraAddress || "",
      });

      console.log(loginRef?.current.getFieldsValue());
    }
  };

  const handleZoneCodeSearch = () => {
    open({ onComplete: handleAddressComplete });
  };

  const handleRegisterFinished = (value) => {
    const newValue = { ...value, ...applys };
    console.log(newValue);
  };

  const sectionHeader = ({ title, context = null }) => (
    <div
      className="flex w-full h-full justify-center items-center mb-10 flex-col"
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
      <span
        className="flex justify-start w-full text-gray-700 "
        style={{
          fontSize: "10px",
        }}
      >
        {context}
      </span>
    </div>
  );
  return (
    <div className="flex w-full h-full flex-col justify-start items-center bg-gray-100 my-3">
      <div
        className="flex gap-y-1 w-full h-full flex-col justify-start items-center bg-white "
        style={{ maxWidth: "1000px" }}
      >
        <div className="flex h-14 justify-center items-center w-full">
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "5px",
            }}
          >
            회원가입
          </span>
        </div>

        <Form
          labelCol={{
            span: 6,
          }}
          style={{
            maxWidth: "90%",
          }}
          size="large"
          labelAlign="right"
          ref={loginRef}
          onFinish={handleRegisterFinished}
        >
          <div className="flex h-14 justify-center items-center w-full">
            {sectionHeader({ title: "로그인 정보" })}
          </div>
          <Form.Item name="userId" label="아이디" required>
            <Input
              className=" rounded"
              placeholder="아이디(이메일) 입력(필수)"
            />
          </Form.Item>
          <Form.Item name="userPassword" label="비밀번호" required>
            <Password
              className=" rounded"
              placeholder="6이상 영문과 숫자 조합"
              visibilityToggle={false}
            />
          </Form.Item>
          <Form.Item name="userPasswordVerify" label="비밀번호 확인" required>
            <Password
              className=" rounded "
              placeholder="비밀번호 확인"
              visibilityToggle={false}
            />
          </Form.Item>
          <div className="flex h-14 justify-center items-center w-full">
            {sectionHeader({ title: "회사(개인) 정보" })}
          </div>
          <Form.Item name="companyName" label="회사명(이름)" required>
            <Input
              className=" rounded"
              placeholder="회사명(개인이름) 입력(필수)"
            />
          </Form.Item>
          <Form.Item name="companyTel" label="전화번호" required>
            <Input
              className=" rounded"
              placeholder="대표전화(휴대전화), 숫자만 입력"
              required
            />
          </Form.Item>
          <Form.Item name="companyEmail" label="관리자 이메일" required>
            <Input
              className=" rounded"
              placeholder="비밀번호 찾기 위해 정확한 이메일 입력"
              required
            />
          </Form.Item>
          <div className="flex h-14 justify-center items-center w-full">
            {sectionHeader({ title: "선택 정보" })}
          </div>
          <Form.Item label="우편번호">
            <Space.Compact>
              <Form.Item label="우편번호" name="companyZoneCode" noStyle>
                <Input
                  className=" rounded"
                  style={{ width: "100px" }}
                  placeholder="우편번호"
                />
              </Form.Item>
              <Button
                type="primary"
                className="bg-blue-500 rounded"
                onClick={() => handleZoneCodeSearch()}
              >
                검색
              </Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item label="주소" name="companyFullAddress">
            <Input className=" rounded" placeholder="주소" />
          </Form.Item>
          <Form.Item label="나머지 주소" name="companyExtraAddress">
            <Input className=" rounded" placeholder="나머지주소" />
          </Form.Item>
          <Form.Item name="companyTelExtra" label="추가 전화번호">
            <Input className=" rounded" placeholder="숫자만 입력" />
          </Form.Item>
          <div className="flex h-20 justify-center items-center w-full">
            {sectionHeader({
              title: (
                <div className="flex w-full gap-x-4 mb-1">
                  <input
                    type="checkbox"
                    name="allApply"
                    id="allApply"
                    ref={allApplyRef}
                    checked={
                      applys.serviceApply &&
                      applys.personalApply &&
                      applys.marketingApply
                    }
                    onClick={(e) => {
                      e.target.checked
                        ? setApplys(() => ({ ...allApplysTrue }))
                        : setApplys(() => ({ ...initApplys }));
                    }}
                    className=" ring-0 focus:outline-none"
                    label="전체 동의"
                  />
                  <label htmlFor="allApply">
                    <span
                      className="flex justify-start w-full text-gray-700 font-semibold"
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      전체 동의
                    </span>
                  </label>
                </div>
              ),
              context: (
                <div className="flex w-full">
                  서비스 이용약관, 개인정보 수집 및 이용, 마케팅 수신(선택)에
                  모두 동의합니다.
                  <br />
                  선택항목 동의를 거부하셔도 서비스 이용이 가능합니다.
                </div>
              ),
            })}
          </div>
          <div className="flex h-auto justify-start items-center w-full gap-x-2">
            <input
              type="checkbox"
              name="serviceApply"
              id="serviceApply"
              ref={serviceApplyRef}
              checked={applys.serviceApply}
              onClick={(e) => {
                setApplys(() => ({
                  ...applys,
                  serviceApply: e.target.checked,
                  serviceApplyAt: e.target.checked
                    ? Timestamp.fromDate(new Date())
                    : undefined,
                }));
              }}
            />
            <label htmlFor="serviceApply">
              <span className="text-sm">
                서비스 이용약관 동의<span>(필수)</span>
              </span>
            </label>
          </div>
          <div className="flex flex-wrap " style={{ height: "110px" }}>
            <div
              className="flex bg-gray-100 rounded p-2 overflow-y-auto flex-wrap"
              style={{ fontSize: "10px", maxHeight: "100px" }}
            >
              <TermServiceText />
            </div>
          </div>
          <div className="flex h-auto justify-start items-center w-full gap-x-2 mt-2">
            <input
              type="checkbox"
              name="personalApply"
              id="personalApply"
              ref={personalApplyRef}
              checked={applys.personalApply}
              onClick={(e) => {
                setApplys(() => ({
                  ...applys,
                  personalApply: e.target.checked,
                  personalApplyAt: e.target.checked
                    ? Timestamp.fromDate(new Date())
                    : undefined,
                }));
              }}
            />
            <label htmlFor="personalApply">
              <span className="text-sm">
                개인정보 수집 및 이용 동의<span>(필수)</span>
              </span>
            </label>
          </div>
          <div className="flex flex-wrap" style={{ height: "110px" }}>
            <div
              className="flex bg-gray-100 rounded p-2 overflow-y-auto flex-wrap"
              style={{ fontSize: "10px", maxHeight: "100px" }}
            >
              <TermServiceText />
            </div>
          </div>
          <div className="flex h-auto justify-start items-center w-full gap-x-2 mt-2">
            <input
              type="checkbox"
              name="marketingApply"
              id="marketingApply"
              ref={marketingApplyRef}
              checked={applys.marketingApply}
              onClick={(e) => {
                setApplys(() => ({
                  ...applys,
                  marketingApply: e.target.checked,
                  marketingApplyAt: e.target.checked
                    ? Timestamp.fromDate(new Date())
                    : "",
                  marketingEmail: e.target.checked ? true : false,
                  marketingSMS: e.target.checked ? true : false,
                }));
              }}
            />
            <label htmlFor="marketingApply">
              <span className="text-sm">
                마케팅 수신 동의<span>(선택)</span>
              </span>
            </label>
          </div>
          <div className="flex w-full px-7 flex-wrap gap-x-2 text-xs justify-start items-center">
            <input
              type="checkbox"
              name="marketingEmail"
              id="marketingEmail"
              ref={marketingEmailRef}
              checked={applys.marketingEmail}
              disabled={!applys.marketingApply}
              onClick={(e) => {
                setApplys(() => ({
                  ...applys,
                  marketingEmail: e.target.checked,
                }));
              }}
            />
            <label htmlFor="marketingEmail">이메일</label>
            <input
              type="checkbox"
              name="marketingSMS"
              id="marketingSMS"
              ref={marketingSMSRef}
              checked={applys.marketingSMS}
              disabled={!applys.marketingApply}
              onClick={(e) => {
                setApplys(() => ({
                  ...applys,
                  marketingSMS: e.target.checked,
                }));
              }}
            />
            <label htmlFor="marketingSMS">SMS</label>
          </div>{" "}
          <div
            className="flex w-full  justify-center items-center my-10"
            style={{
              height: "50px",
            }}
          >
            <div className="flex w-full h-full md:px-0">
              <Button
                className=" bg-gray-700 w-full h-full rounded"
                style={{ border: "1px solid", height: "50px" }}
                htmlType="submit"
                disabled={!applys.serviceApply || !applys.personalApply}
              >
                {!applys.serviceApply || !applys.personalApply ? (
                  <span
                    className="text-gray-800"
                    style={{ letterSpacing: "1px" }}
                  >
                    약관 동의가 필요합니다.
                  </span>
                ) : (
                  <span
                    className="text-white"
                    style={{ letterSpacing: "14px" }}
                  >
                    회원가입
                  </span>
                )}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
