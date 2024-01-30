import React, { useEffect, useRef, useState } from "react";
import { ContentTitle } from "../commonstyles/Title";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  notification,
} from "antd";
import "dayjs/locale/ko";
import locale from "antd/es/date-picker/locale/ko_KR";
import dayjs from "dayjs";
import { generateUUID } from "../functions";
import { Timestamp } from "firebase/firestore";
import { useFirestoreAddData } from "../hooks/useFirestore";

const NewAsset = () => {
  const formRef = useRef();
  const assetAdd = useFirestoreAddData();
  const [assetInputs, setAssetInputs] = useState([]);
  const [assetCodes, setAssetCodes] = useState([]);
  const [assetCount, setAssetCount] = useState(0);
  const [assetVendor, setAssetVendor] = useState("");
  const [assetModel, setAssetModel] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    apiType,
    title,
    message,
    placement,
    duration,
    maxCount
  ) => {
    api[apiType]({
      message: title,
      description: message,
      placement,
      duration,
      maxCount,
    });
  };

  const handleFinish = (values) => {
    // userEnteringDate를 Date 객체로 변환한 후 Firestore Timestamp로 변환
    const assetPurchasedDate = values.assetPurchasedDate
      ? Timestamp.fromDate(values.assetPurchasedDate.toDate())
      : "";

    const createdAtValue = values.createdAt
      ? Timestamp.fromDate(values.createdAt.toDate())
      : Timestamp.fromDate(new Date());

    // value 객체의 각 필드를 확인하고 undefined인 경우 빈 문자열로 대체
    const newValue = Object.keys(values).reduce((acc, key) => {
      acc[key] = values[key] === undefined ? "" : values[key];
      return acc;
    }, {});

    // userEnteringDate와 createdAt 필드 추가
    newValue.assetPurchasedDate = assetPurchasedDate;
    newValue.createdAt = createdAtValue;
    newValue.location = "출고대기";
    newValue.userInfo = "미배정";
    delete newValue.assetCount;

    if (assetCodes.length > 0) {
      assetCodes.map(async (code, cIdx) => {
        const codeWithValue = { assetCode: code, ...newValue };
        try {
          await assetAdd.addData("assets", { ...codeWithValue }, (data) => {
            openNotification(
              "success",
              "추가 성공",
              `${data?.assetName}을 추가했습니다.`,
              "topRight",
              3,
              5
            );
          });
        } catch (error) {
          console.log(error);
        }
      });
    }
    initFormValue(formRef);
  };

  const initFormValue = (ref) => {
    ref?.current.resetFields();
    ref?.current.setFieldsValue({
      ...ref?.current.getFieldsValue(),
      assetPurchasedDate: dayjs(),
      createdAt: dayjs(), // 현재 날짜를 dayjs 객체로 설정
    });
    setAssetCount(0);
    setAssetCodes([]);
  };

  const handleAssetName = (vendor, model, ref) => {
    const assetName = `${vendor} ${model}`.trim();
    console.log(assetName);
    if (ref?.current) {
      ref?.current.setFieldsValue({
        ...ref?.current.getFieldsValue(),
        assetName,
      });
    }
  };

  // const handleAssetInputs = (count = 0) => {
  //   setAssetCount(count);

  //   // 새로운 UUID를 생성하여 배열에 추가
  //   const newAssetCodes = Array.from({ length: count }, generateUUID);
  //   setAssetCodes((prevCodes) => [...prevCodes, ...newAssetCodes]);

  //   // 입력 필드 렌더링 함수를 저장
  //   const renderInput = (codeUUID, index) => (
  //     <Input
  //       key={codeUUID} // 고유한 key 추가
  //       defaultValue={codeUUID}
  //       style={{ width: "90%" }}
  //       onChange={(e) => {
  //         // handleAssetCode 함수 내부에서 최신 상태를 사용
  //         setAssetCodes((currentCodes) => {
  //           const updatedCodes = [...currentCodes];
  //           updatedCodes[index] = e.target.value;
  //           return updatedCodes;
  //         });
  //       }}
  //     />
  //   );

  //   // 입력 필드 렌더링 함수 배열 생성
  //   const inputs = newAssetCodes.map(renderInput);
  //   setAssetInputs(inputs);
  // };

  const handleAssetInputs = (count = 0) => {
    if (count !== assetCount) {
      setAssetCount(count);

      // 새로운 UUID를 생성하여 배열에 추가
      const newAssetCodes = Array.from({ length: count }, generateUUID);
      setAssetCodes(newAssetCodes);

      // 입력 필드 렌더링 함수를 저장
      const renderInput = (codeUUID, index) => (
        <Input
          key={codeUUID} // 고유한 key 추가
          defaultValue={codeUUID}
          style={{ width: "90%" }}
          onChange={(e) => {
            setAssetCodes((currentCodes) => {
              const updatedCodes = [...currentCodes];
              updatedCodes[index] = e.target.value;
              return updatedCodes;
            });
          }}
        />
      );

      // 입력 필드 렌더링 함수 배열 생성
      const inputs = newAssetCodes.map(renderInput);
      setAssetInputs(inputs);
    }
  };

  useEffect(() => {
    initFormValue(formRef);
  }, []);

  return (
    <div
      className="flex w-full h-full flex-col rounded-lg"
      style={{
        backgroundColor: "#fff",
        minHeight: "100%",
      }}
    >
      <div className="flex w-full ">
        <ContentTitle title="자산추가" />
      </div>
      <div className="flex w-full">
        <div className="flex w-full lg:w-1/2 justify-center items-center px-5 ">
          <div
            className="flex border w-full h-full rounded-lg p-5 "
            style={{ minHeight: "150px" }}
          >
            <Form
              labelCol={{
                span: 4,
              }}
              style={{
                width: "100%",
              }}
              labelAlign="right"
              ref={formRef}
              onFinish={handleFinish}
              autoComplete="off"
            >
              <Form.Item name="assetCategory" label="종류">
                <Input style={{ width: "90%" }} />
              </Form.Item>
              <Form.Item name="assetVendor" label="제조사">
                <Input
                  style={{ width: "90%" }}
                  onChange={(e) => setAssetVendor(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="assetModel" label="모델명">
                <Input
                  style={{ width: "90%" }}
                  onChange={(e) => setAssetModel(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="assetName" label="자산명">
                <Input
                  style={{ width: "90%" }}
                  onFocus={() =>
                    handleAssetName(
                      formRef?.current.getFieldsValue()?.assetVendor,
                      formRef?.current.getFieldsValue()?.assetModel,
                      formRef
                    )
                  }
                />
              </Form.Item>
              <Form.Item name="assetPurchaseName" label="매입처">
                <Input style={{ width: "90%" }} />
              </Form.Item>{" "}
              <Form.Item name="assetCount" label="수량">
                <InputNumber onChange={handleAssetInputs} />
              </Form.Item>
              <Form.Item name="assetPurchasedDate" label="입고일자">
                <DatePicker
                  locale={locale}
                  defaultValue={dayjs()} // 현재 날짜로 설정
                  format="YYYY-MM-DD" // 필요에 따라 형식 지정
                />
              </Form.Item>
              <Form.Item name="createdAt" label="등록일자">
                <DatePicker
                  locale={locale}
                  defaultValue={dayjs()} // 현재 날짜로 설정
                  format="YYYY-MM-DD" // 필요에 따라 형식 지정
                />
              </Form.Item>
              <Card title="자산코드">
                <div className="flex w-full justify-start items-center flex-col gap-y-2">
                  {assetInputs.length > 0 &&
                    assetInputs.map((input, iIdx) => {
                      return (
                        <div className="flex w-full h-10">
                          <div
                            className="flex justify-center items-center"
                            style={{ width: "50px" }}
                          >
                            {iIdx + 1}
                          </div>
                          <div className="flex w-full">{input}</div>
                        </div>
                      );
                    })}
                </div>
              </Card>
              <div className="flex w-full justify-end items-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500"
                >
                  저장
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default NewAsset;
