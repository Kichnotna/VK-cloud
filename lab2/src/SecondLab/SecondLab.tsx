import { Anchor, Button, Form, Space, Upload } from "antd";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadUrl, getFiles, uploadFile } from "../http";
import { RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";
import { FileModel } from "../types";

import s from "./SecondLab.module.scss";

function SecondLab() {
  const [files, setFiles] = useState<FileModel[]>([]);

  const navigate = useNavigate();

  const getFilesRequest = useCallback(
    () =>
      getFiles().then((response) => {
        const { data } = response;

        const updatedFiles: FileModel[] = data.map((fileName) => ({
          fileName,
          id: uuidv4(),
        }));

        setFiles(updatedFiles);
      }),
    []
  );

  useEffect(() => {
    getFilesRequest();
  }, [getFilesRequest]);

  const uploadImageToS3 = async (file: RcFile): Promise<string> => {
    await uploadFile(file).then(getFilesRequest);

    return "";
  };

  return (
    <div className={s["second-container"]}>
      <h1 className={s["second-container__title"]}>Работа с S3</h1>
      <Form>
        <h1 className={s["second-container__text"]}>Файлы из хранилища</h1>
        {files.map(({ fileName, id }) => {
          const hrefToDownload = getDownloadUrl(fileName);

          return (
            <Form.Item key={id}>
              <Anchor.Link
                title={fileName}
                href={hrefToDownload}
                className={s["second-container__file-name"]}
              />
            </Form.Item>
          );
        })}
        <Space className={s["second-container__buttons"]}>
          <Upload multiple={false} action={uploadImageToS3}>
            <Button>Загрузить новый</Button>
          </Upload>
          <Button onClick={() => navigate("/")}>Вернуться к лабам</Button>
        </Space>
      </Form>
    </div>
  );
}

export default SecondLab;
