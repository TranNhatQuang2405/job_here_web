import React, { useState, createRef } from "react";
import "./JobApply.css";
import { Row, Col } from "react-bootstrap";
import {
  JobCompanyInfo,
  JobHeader,
  JobInfo,
  JobKeywork,
  JobReport,
  JobShare,
  JobSearchBar,
} from "Components/Job";
import { ButtonPrimary } from "Components/Button";

const JobApply = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  let cv_ref = createRef();

  const onBack = () => {};

  const onApply = () => {};

  return (
    <div className="JobApply__container jh-container">
      <JobSearchBar />
      <div className="JobApply__header-detail">
        <a
          href="https://www.topcv.vn/viec-lam"
          className="JobApply__text-highlight JobApply__bold"
        >
          Trang chủ
        </a>
        <i className="bi bi-chevron-right" />
        <a
          href="https://www.topcv.vn/tim-viec-lam-nhan-vien-marketing"
          className="JobApply__text-highlight JobApply__bold"
        >
          Tìm việc làm nhân viên marketing
        </a>
        <i className="bi bi-chevron-right" />
        <span className="">Tuyển Nhân Viên Marketing Tại Q7-HCM</span>
      </div>
      <div className="JobApply__body p-4 jh-box-item">
        <div>
          <div className="form-group">
            <div className="">
              <strong className="input-label text-dark-gray">
                Tải lên CV từ máy tính
              </strong>
              <br />
              <span className="text-gray text-small">
                File doc, docx, pdf. Tối đa 5MB.
              </span>
            </div>
          </div>
          <div className="form-group mt-2">
            <div className="">
              <input
                ref={cv_ref}
                type="file"
                name="cv_file"
                id="filer_input"
                accept="doc, docx, pdf"
              />
            </div>
          </div>
          <div className="form-group mt-3">
            <label>
              Họ và tên<span className="text-danger">*</span> :
            </label>
            <input
              type="text"
              value=""
              placeholder="Họ tên hiển thị với Nhà tuyển dụng"
              name="fullname"
              className="form-control jh-box-input"
            />
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div className="JobApply__input mt-3">
              <div className="form-group">
                <label>
                  Email<span className="text-danger">*</span> :
                </label>
                <input
                  type="text"
                  value=""
                  placeholder="Email hiển thị với Nhà tuyển dụng"
                  name="email"
                  className="form-control jh-box-input"
                />
              </div>
            </div>
            <div className="JobApply__input mt-3">
              <div className="form-group">
                <label>
                  Số điện thoại<span className="text-danger">*</span> :
                </label>
                <input
                  type="text"
                  value=""
                  placeholder="Số điện thoại hiển thị với Nhà tuyển dụng"
                  name="phone"
                  className="form-control jh-box-input"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <label>Thư giới thiệu: </label>
          <textarea
            name="letter"
            className="form-control jh-box-input JobApply__description"
            rows="3"
            placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do làm việc tại công ty này. Đây là cách gây ấn tượng với nhà tuyển dụng nếu bạn có chưa có kinh nghiệm làm việc (hoặc CV không tốt)."
          ></textarea>
        </div>
      </div>
      <div className="JobApply__footer d-flex justify-content-end p-4">
        <ButtonPrimary secondary onClick={onBack} style={{ marginRight: "10px" }}>
          Quay lại
        </ButtonPrimary>
        <ButtonPrimary onClick={onApply}>Ứng tuyển</ButtonPrimary>
      </div>
    </div>
  );
};

export default JobApply;
