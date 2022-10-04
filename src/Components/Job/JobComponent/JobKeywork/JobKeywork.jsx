import React from "react";

const JobKeywork = () => {
  return (
    <div className="box-keyword-job">
      <h3>Ngành nghề</h3>
      <div className="keyword">
        <span>
          <a
            href="https://www.topcv.vn/tim-viec-lam-marketing-truyen-thong-quang-cao-c10029"
            className="btn btn-sm btn-default text-dark-gray"
            target="_blank"
            rel="noreferrer"
          >
            Marketing / Truyền thông / Quảng cáo
          </a>
        </span>
        <span>
          <a
            href="https://www.topcv.vn/tim-viec-lam-bao-chi-truyen-hinh-c10004"
            className="btn btn-sm btn-default text-dark-gray"
            target="_blank"
            rel="noreferrer"
          >
            Báo chí / Truyền hình
          </a>
        </span>
      </div>
      <h3>Khu vực</h3>
      <div className="area">
        <span>
          <a
            className="btn btn-sm btn-default text-dark-gray"
            href="https://www.topcv.vn/tim-viec-lam-nhan-vien-marketing-tai-ho-chi-minh-kl2"
            target="_blank"
            rel="noreferrer"
            title="Tìm việc làm nhân viên marketing tại Hồ Chí Minh"
          >
            Hồ Chí Minh
          </a>
        </span>
        <span>
          <a
            className="btn btn-sm btn-default text-dark-gray"
            href="https://www.topcv.vn/tim-viec-lam-nhan-vien-marketing"
            target="_blank"
            rel="noreferrer"
            title="Tìm việc làm nhân viên marketing tại Quận 7"
          >
            Quận 7
          </a>
        </span>
      </div>
    </div>
  );
};

export default JobKeywork;
