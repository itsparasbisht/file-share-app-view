import React, { useState } from "react";
import { useRef } from "react";
import eyeCloseIcon from "./assets/eye-close.png";
import eyeOpenIcon from "./assets/eye-open.png";

export default function UploadPage() {
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex h-screen items-center">
      <form className="mx-auto max-w-xs" autoComplete="off">
        <label
          htmlFor="file-input"
          className="mb-1 block text-xl font-bold text-black"
        >
          Upload your file
        </label>
        <label
          className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-blue-700"
          htmlFor="file-input"
        >
          <div className="space-y-1 text-center">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </div>
            <div className="text-black">
              <b className="font-bold">Click to upload</b> or drag and drop
            </div>
            <p className="text-sm text-gray-500">PNG, JPG, MP3, MP4 or PDF</p>
          </div>
          <input id="file-input" type="file" className="sr-only" />
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border-2 p-2 rounded-md mt-2 focus:outline-none border-gray-200"
            placeholder="Protect with password"
            autoComplete="new-password"
          />
          <img
            onClick={handleTogglePassword}
            src={showPassword ? eyeOpenIcon : eyeCloseIcon}
            width={20}
            className="absolute top-5 right-3 cursor-pointer"
          />
        </div>
        <button
          type="button"
          className="w-full bg-gray-900 rounded-md p-2 text-gray-100 font-bold mt-2"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
