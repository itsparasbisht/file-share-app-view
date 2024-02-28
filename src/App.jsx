import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DownloadPage from "./DownloadPage";
import UploadPage from "./UploadPage";
import { globalObj } from "./utils/globalObj";

function App() {
  async function apiInit() {
    let res = await axios.get(globalObj.apiUrl);
    console.log(res);
  }

  useEffect(() => {
    apiInit();
  }, []);

  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/:fileID" element={<DownloadPage />} />
      </Routes>
    </div>
  );
}

export default App;
