import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "./Alert";
import eyeCloseIcon from "./assets/eye-close.png";
import eyeOpenIcon from "./assets/eye-open.png";
import { globalObj } from "./utils/globalObj";

export default function DownloadPage() {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const { fileID } = useParams();

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  async function handleDownloadFile() {
    setIsLoading(true);
    try {
      let res = await axios.get(`${globalObj.apiUrl}/file/${fileID}`);

      const fileName = res.data.fileName;

      res = await axios.post(`${globalObj.apiUrl}/file/${fileID}`, {
        password,
      });

      const blob = new Blob([res.data], {
        type: "application/octet-stream",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message;
      setHasError(true);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center mx-auto max-w-xs">
        <h1 className="mb-1 block text-xl font-bold text-black self-start">
          Download file
        </h1>
        <div className="flex flex-col w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 p-2 rounded-md mt-2 focus:outline-none border-gray-200 pr-10"
            placeholder="Enter password"
            autoComplete="new-password"
          />
          <img
            onClick={handleTogglePassword}
            src={showPassword ? eyeOpenIcon : eyeCloseIcon}
            width={20}
            className="absolute top-11 right-9 cursor-pointer"
          />
          <button
            disabled={isLoading}
            onClick={handleDownloadFile}
            type="button"
            className="w-full bg-gray-900 rounded-md p-2 text-gray-100 font-bold mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Downloading..." : "Download file"}
          </button>
        </div>
      </div>
      <Alert open={hasError} setOpen={setHasError} message={errorMessage} />
    </>
  );
}
