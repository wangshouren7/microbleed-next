"use client";
import React, { useCallback, useRef } from "react";
import cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader";
import { Enums, RenderingEngine, volumeLoader } from "@cornerstonejs/core";
import { init as csRenderInit } from "@cornerstonejs/core";
import { init as csToolsInit } from "@cornerstonejs/tools";
import { init as dicomImageLoaderInit } from "@cornerstonejs/dicom-image-loader";

interface ILocalDicomsProps {}

export const LocalDicoms: React.FC<ILocalDicomsProps> = (props) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !elementRef.current) return;

      await csRenderInit();
      await csToolsInit();

      // next code will throw error:
      /**
       * 
       * 
       * 
        ./node_modules/.pnpm/@cornerstonejs+codec-libjpeg-turbo-8bit@1.2.2/node_modules/@cornerstonejs/codec-libjpeg-turbo-8bit/dist/libjpegturbowasm_decode.js:9:951
        Module not found: Can't resolve 'fs'
          7 |   libjpegturbowasm_decode = libjpegturbowasm_decode || {};
       * 
       */
      await dicomImageLoaderInit({ maxWebWorkers: 1 });
    },
    []
  );

  return (
    <div className="flex flex-col gap-4">
      <input className="input" type="file" onChange={onChange} />

      <div
        ref={elementRef}
        style={{
          width: "512px",
          height: "512px",
          backgroundColor: "#000",
        }}
      ></div>
    </div>
  );
};

export default LocalDicoms;
