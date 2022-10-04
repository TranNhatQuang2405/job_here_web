import React, { useState } from "react";
import "./JobReport.css";
import { ButtonPrimary } from "Components/Button";

const JobReport = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="JobReport__container mt-3">
      <h3>Báo cáo tin tuyển dụng</h3>
      <p>
        Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có một trong các dấu hiệu lừa
        đảo như: thông tin thiếu minh bạch, yêu cầu đặt cọc trước... hãy phản ánh với
        chúng tôi.
      </p>
      <ButtonPrimary secondary style={{ width: "100%" }}>
        Báo cáo tin tuyển dụng
      </ButtonPrimary>
    </div>
  );
};

export default JobReport;
