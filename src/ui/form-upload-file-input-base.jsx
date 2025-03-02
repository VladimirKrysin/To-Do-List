import { FilePond, registerPlugin } from "react-filepond";
import { useController } from "react-hook-form";
import { useState } from "react";
import "./filePond.css";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const FormUploadFileInputBase = ({
  control,
  name,
  setUploadFilePath,
}) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { errors },
  } = useController({
    name,
    control,
  });
  const [files, setFiles] = useState([]);
  return (
    <div className="filePondWrapper">
      <h2 className="filePondTitle">Вложение</h2>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={3}
        server={{
          process: {
            url: "http://localhost:3000/files/upload",
            onload: (response) => {
              const uploadedPaths = JSON.parse(response);
              console.log(uploadedPaths);

              setUploadFilePath(uploadedPaths);
              field.onChange(uploadedPaths);
            },
          },
        }}
        name="files"
        labelIdle='Перетащите файл сюда или <span class="filepond--label-action">Выберите файл</span>'
      />
    </div>
  );
};
