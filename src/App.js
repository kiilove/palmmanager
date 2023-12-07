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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/newsowing" element={<Main children={<NewSowing />} />} />
        <Route
          path="/sowinglist"
          element={<Main children={<SowingList />} />}
        />
        <Route
          path="/newtransplanting"
          element={<Main children={<NewTransplanting />} />}
        />
        <Route path="/blocklist" element={<Main children={<BlockList />} />} />
        <Route
          path="/barcodecreator"
          element={<Main children={<BarcodeCreator />} />}
        />

        {/* <Route path="/test" element={<Main children={<AntdTest />} />} />
        <Route
          path="/customerlist"
          element={<Main children={<CustomerList />} />}
        />
        <Route
          path="/customernew"
          element={<Main children={<CustomerNew />} />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
