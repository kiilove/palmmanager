import React from "react";
import { sideMenuItems } from "../const/MenuArray";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const MainSide = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const menuItems = sideMenuItems.map((menu, mIdx) => {
    const { key, labelKey, icon, children } = menu;
    let newChildren = [];
    let newMenuItem = {};
    if (children?.length > 0) {
      newChildren = children.map((child, cIdx) => {
        const { key, labelKey, link } = child;
        return {
          key,
          label: t(labelKey),
          onClick: () => {
            navigate(link);
          },
        };
      });
      newMenuItem = {
        key,
        label: t(labelKey),
        icon,
        children: newChildren,
      };
    } else {
      newMenuItem = {
        key,
        label: t(labelKey),
        icon,
      };
    }

    return newMenuItem;
  });
  console.log(menuItems);
  return (
    <Menu
      theme="dark"
      mode="inline"
      className="text-base font-semibold "
      defaultSelectedKeys={["1"]}
      items={[...menuItems]}
    ></Menu>
  );
};

export default MainSide;
