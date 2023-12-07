import React, { useRef } from "react";
import { ContentTitle } from "../commonstyles/Title";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import "dayjs/locale/ko";
import locale from "antd/es/date-picker/locale/ko_KR";
import dayjs from "dayjs";
import { getToday } from "../functions";

const NewIncome = () => {
  const formRef = useRef();

  const initFormValue = () => {
    const today = getToday();
    formRef?.current.setFieldsValue({
      ...formRef?.current.getFieldsValue(),
      treeScientificName: "Elaeis guineensis",
      treeNormalName: "Palm",
      treeCreatedDate: today,
    });
  };
  return (
    <div
      className="flex w-full h-full flex-col rounded-lg"
      style={{
        backgroundColor: "#fff",
        minHeight: "100%",
      }}
    >
      <div className="flex w-full ">
        <ContentTitle title="신규파종" />
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
            >
              <Form.Item name="treeScientificName" label="학명">
                <Input
                  defaultValue="Elaeis guineensis"
                  style={{ width: 500 }}
                />
              </Form.Item>
              <Form.Item name="treeNormalName" label="유통명">
                <Input defaultValue="Palm" style={{ width: 500 }} />
              </Form.Item>
              <Form.Item
                name="treeCreatedDate"
                label="등록일자"
                rules={[{ required: true, message: "등록일자를 선택해주세요" }]}
              >
                <DatePicker locale={locale} defaultValue={dayjs(new Date())} />
              </Form.Item>

              <Form.Item name="treeCount" label="수량">
                <Space>
                  <InputNumber
                    decimalSeparator="."
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    style={{ textAlign: "right", width: 150 }}
                  />
                  {/* <Button style={{ width: "70px" }}>+10M</Button>
                <Button style={{ width: "70px" }}>+1M</Button>
                <Button style={{ width: "70px" }}>+1K</Button>
                <Button style={{ width: "70px" }}>0</Button> */}
                </Space>
              </Form.Item>
              <div className="flex w-full justify-start items-center">
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
        <div className="flex w-full lg:w-1/2 justify-center items-center px-5 ">
          <div
            className="flex border w-full h-full rounded-lg p-5 "
            style={{ minHeight: "150px" }}
          >
            QR
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIncome;
