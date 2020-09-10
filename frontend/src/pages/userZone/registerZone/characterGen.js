import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useRoute } from "react-router5";
import UserProfile from "../../../service/UserProfile";
import { UploadProfileImg } from "../../../service/Register";
import { Navbar, Body, TextBox, Button } from "../../../component";
const PageBody = styled(Body)`
  padding-left: 15px;
  padding-right: 15px;
`;

const NextButton = styled(Button)`
  margin-left: auto;
`;
export default (props) => {
  const { router } = useRoute();
  const file = useRef();
  const [displayName, setDisplayName] = useState("");

  const [fileUploading, setFileUploading] = useState(false);

  return (
    <>
      <Navbar pageName="สร้างตัวละคร" />
      <PageBody>
        <div className="row mt-1">
          <div className="col-lg-2 col-md-3 pt-2">ชื่อ:</div>
          <div className="col">
            <TextBox
              className="form-control"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-lg-2 col-md-3 pt-2">รูปโปรไฟล์:</div>
          <div className="col">
            <input
              ref={file}
              onChange={async (e) => {
                setFileUploading(true);
                await UploadProfileImg(file.current.files[0]);
                setFileUploading(false);
              }}
              type="file"
            />
          </div>
        </div>

        <NextButton
          style={{ marginLeft: "auto" }}
          text={fileUploading ? "กำลังอัพโหลดไฟล์..." : "ถัดไป >"}
          onClick={async () => {
            if (displayName === "") {
              alert("กรุณาตั้งชื่อ");
            }
            if (!fileUploading && displayName !== "") {
              await new UserProfile().setUsername(displayName);
              window.location = "character_edit";
            }
          }}></NextButton>
      </PageBody>
    </>
  );
};
