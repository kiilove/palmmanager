import React, { useState } from "react";
import { ContentTitle } from "../commonstyles/Title";

import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Card,
  Form,
  Input,
  Space,
  Switch,
  Table,
  Upload,
} from "antd";
import useImageUpload from "../hooks/useFireStorage";
import { generateFileName, generateUUID } from "../functions";
import "./AutoComplete.css";

const ServiceSetting = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [isCompanyChildren, setIsCompanyChildren] = useState(false);
  const [companyChildrenEditMode, setCompanyChildrenEditMode] = useState(false);
  const [companyChildrenList, setCompanyChildrenList] = useState([]);
  const [companyLogoFile, setCompanyLogoFile] = useState([]);
  const companyLogoUpload = useImageUpload();

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        업로드
      </div>
    </div>
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCompanyLogoFileAdd = (newFile) => {
    setCompanyLogoFile([...companyLogoFile, newFile]);
  };

  const handleCompanyLogoFileRemove = async (file) => {
    await companyLogoUpload.deleteFileFromStorage(`/companyLogos/${file.name}`);

    const newFileList = companyLogoFile.filter((item) => item.uid !== file.uid);
    setCompanyLogoFile(newFileList);
  };

  const handleCompanyLogoUploadAdd = async ({ file, onSuccess, onError }) => {
    const newFileName = generateFileName(file.name, generateUUID());

    try {
      const result = await companyLogoUpload.uploadImage(
        "/companyLogos/",
        file,
        newFileName
      );
      handleCompanyLogoFileAdd({
        uid: result.filename,
        name: newFileName,
        url: result.downloadUrl,
      });
      onSuccess();
    } catch (error) {
      console.error(error);
      onError(error);
    }
  };

  const renderTitle = (title) => (
    <span>
      {title}
      <a
        style={{
          float: "right",
        }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );
  const renderItem = (title, count) => ({
    value: title,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        <span>
          <UserOutlined /> {count}
        </span>
      </div>
    ),
  });
  const options = [
    {
      label: renderTitle("Libraries"),
      options: [
        renderItem("AntDesign", 10000),
        renderItem("AntDesign UI", 10600),
      ],
    },
    {
      label: renderTitle("Solutions"),
      options: [
        renderItem("AntDesign UI FAQ", 60100),
        renderItem("AntDesign FAQ", 30010),
      ],
    },
    {
      label: renderTitle("Articles"),
      options: [renderItem("AntDesign design language", 100000)],
    },
  ];

  return (
    <div
      className="flex w-full h-full flex-col rounded-lg"
      style={{
        backgroundColor: "#fff",
        minHeight: "100%",
      }}
    >
      <div className="flex w-full ">
        <ContentTitle title="환경설정" />
      </div>
      <div className="flex w-full h-full flex-wrap gap-2 p-4">
        <div className="flex w-full md:w-1/2 lg:w-1/3">
          <Card
            title="회사정보"
            size="small"
            className="w-full "
            headStyle={{ backgroundColor: "#9bc8fc", color: "#000000" }}
          >
            <Form
              labelCol={{
                span: 6,
              }}
              style={{
                width: "100%",
              }}
              labelAlign="right"
            >
              <Form.Item name="companyLogo" label="회사로고">
                <Upload
                  listType="picture-card"
                  fileList={companyLogoFile}
                  onPreview={handlePreview}
                  onRemove={handleCompanyLogoFileRemove}
                  customRequest={handleCompanyLogoUploadAdd}
                >
                  {companyLogoFile.length >= 2 ? null : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item name="companyName" label="회사명">
                <Input />
              </Form.Item>
              <Form.Item name="isCompanyChildren" label="자회사보유">
                <Switch
                  defaultChecked={false}
                  onChange={setIsCompanyChildren}
                />
              </Form.Item>
              {isCompanyChildren && (
                <Form.Item label="자회사관리">
                  {companyChildrenEditMode ? (
                    <Form.Item noStyle name="companyChildredName">
                      <Space.Compact>
                        <Input placeholder="회사명" />
                        <Button>m</Button>
                        <Button>수정</Button>
                      </Space.Compact>
                    </Form.Item>
                  ) : (
                    <Form.Item noStyle name="companyChildredName">
                      <Space.Compact>
                        <AutoComplete
                          popupClassName="certain-category-search-dropdown"
                          popupMatchSelectWidth={500}
                          style={{
                            width: 250,
                          }}
                          options={options}
                        >
                          <Input.Search placeholder="회사명" />
                        </AutoComplete>
                      </Space.Compact>
                    </Form.Item>
                  )}
                </Form.Item>
              )}
            </Form>
          </Card>
        </div>
        <div className="flex w-full md:w-1/2 lg:w-1/3">
          <Card
            title="구성원설정"
            size="small"
            className="w-full "
            headStyle={{ backgroundColor: "#cd9bfc", color: "#000000" }}
          ></Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceSetting;
