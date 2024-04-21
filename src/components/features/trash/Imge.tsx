import { Image } from "lucide-react";
import React, { ChangeEvent } from "react";

export default function Imge({
  handleFile,
}: {
  handleFile: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label
        htmlFor="file"
        className="rounded-full  cursor-pointer w-full h-[100px] overflow-hidden"
      >
        <Image size={200} className="text-gray-700 w-full" />
      </label>
      <input
        type="file"
        name="file"
        id="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </>
  );
}
