import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./i18n";
import Main from "./pages/Main";

import IncomeTree from "./pages/IncomeTree";
import NewIncome from "./pages/NewIncome";
import NewSowing from "./pages/NewSowing";
import SowingList from "./pages/SowingList";
import NewTransplanting from "./pages/NewTransplanting";
import BlockList from "./pages/BlockList";
import BarcodeCreator from "./pages/BarcodeCreator";
import NewUser from "./pages/NewUser";
import ListUser from "./pages/ListUser";
import NewAsset from "./pages/NewAsset";
import ListAsset from "./pages/ListAsset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/eff179b5-a575-4046-99f3-ca0dc465af3e"
          element={<Main children={<NewAsset />} />}
        />
        <Route
          path="/ed4599ce-5808-462c-b10f-3eee0df54dd1"
          element={<Main children={<ListAsset />} />}
        />
        <Route
          path="/0f55998a-7b77-426d-880d-3c6fd7ef4654"
          element={<Main children={<NewUser />} />}
        />
        <Route
          path="/a7e05d80-6fa2-452c-b3c7-f4177fad2534"
          element={<Main children={<ListUser />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
