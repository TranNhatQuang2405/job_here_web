import React from "react";
import "./JobShare.css";
import { IconSquare } from "Components/Icon";

const JobShare = ({
  url = "https://www.topcv.vn/viec-lam/nhan-vien-marketing-tai-q7-hcm/827799.html",
}) => {
  const copyURLToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="JobShare__container">
      <h3>Chia sẻ tin tuyển dụng</h3>
      <p>Sao chép đường dẫn</p>
      <div className="JobShare__box-copy">
        <div className="JobShare__url-copy">{url}</div>
        <div className="JobShare__btn-copy">
          <button className="" onclick={copyURLToClipboard}>
            <i className="bi bi-clipboard-check" />
          </button>
        </div>
      </div>
      <p>Chia sẻ qua mạng xã hội</p>
      <div className="JobShare__box-share d-flex">
        <a
          href="http://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.topcv.vn%2Fviec-lam%2Fnhan-vien-marketing-tai-q7-hcm%2F827799.html"
          target="_blank"
          rel="noreferrer"
        >
          <IconSquare name={"facebook"} style={{ marginRight: "20px" }} />
        </a>
        <a
          href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.topcv.vn%2Fviec-lam%2Fnhan-vien-marketing-tai-q7-hcm%2F827799.html"
          target="_blank"
          rel="noreferrer"
        >
          <IconSquare name={"twitter"} style={{ marginRight: "20px" }} />
        </a>
        <a
          href="https://www.linkedin.com/cws/share?url=https%3A%2F%2Fwww.topcv.vn%2Fviec-lam%2Fnhan-vien-marketing-tai-q7-hcm%2F827799.html"
          target="_blank"
          rel="noreferrer"
        >
          <IconSquare name={"linkedin"} style={{ marginRight: "20px" }} />
        </a>
      </div>
    </div>
  );
};

export default JobShare;
