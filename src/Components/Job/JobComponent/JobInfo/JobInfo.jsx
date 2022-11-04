import React from "react";
import _ from "underscore";
import "./JobInfo.css";
import { IconCircle } from "Components/Icon";
import { ButtonPrimary } from "Components/Button";

const JobInfo = () => {
  let boxData = [
    {
      label: "Mức lương",
      value: "8-15 triệu",
      icon: "salary",
    },
    {
      label: "Số lượng tuyển",
      value: "2 người",
      icon: "group",
    },
    {
      label: "Hình thức làm việc",
      value: "Fulltime",
      icon: "work",
    },
    {
      label: "Cấp bậc",
      value: "Nhân viên",
      icon: "level",
    },
    {
      label: "Giới tính",
      value: "Không yêu cầu",
      icon: "gender",
    },
    {
      label: "Kinh nghiệm",
      value: "1 năm",
      icon: "experience",
    },
  ];

  return (
    <div className="JobInfo__container">
      <div className="JobInfo__box-info">
        <p>Thông tin chung</p>
        <div className="JobInfo__box-main">
          {_.map(boxData, (item, index) => (
            <div key={index} className="JobInfo__box-item">
              <IconCircle
                name={item.icon}
                style={{ marginRight: "16px", marginTop: "5px" }}
              />
              <div>
                <strong>{item.label} </strong> <br />
                <span>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="JobInfo__box-address">
        <p>Địa điểm làm việc</p>
        <div>
          <div>- Hồ Chí Minh: 31 Lê Văn Thiêm, Phường Tân Phong, Quận 7</div>
        </div>
      </div>
      <div className="JobInfo__job-data">
        <h3>Mô tả công việc</h3>
        <div className="JobInfo__content-tab">
          <p>
            - Yêu cầu nội dung và duyệt các thiết kế từ nhân viên viên thiết kế đồ họa.
          </p>
          <p>
            - Đề xuất, viết nội dung và đăng trên website, fanpage của công ty (Nếu được
            giám đốc yêu cầu do cty có đối tác về content, quảng cáo facbook riêng)
          </p>
          <p>
            -Chăm sóc và đẩy mạnh quảng bá trên các kênh truyền thông, xây dựng hình ảnh
            thương hiệu trên thị trường.
          </p>
          <p>
            -Chăm sóc khách hàng và đối tác nhượng quyền hiện tại (Hotline, page facebook)
            , giải đáp thắc mắc và xử lý tình huống (nếu có) và chuyển thông tin về cho
            admin các chi nhánh chăm sóc.
          </p>
          <p>
            - Lên ý tưởng, tổ chức và tham gia các event của công ty ở các Mall, trung tâm
            thương mại hoặc các cuộc thi do cty tổ chức
          </p>
          <p>- Các công việc khác từ cấp trên giao</p>
          <p>
            <b>
              Địa chỉ làm việc : 31 Lê Văn Thiêm, Phường Tân Phong, Quận 7, TP Hồ Chí Minh
            </b>
          </p>
          <p>
            <b>
              Thời gian: Thứ 3 đến chủ nhật 8h00-17h00 (Nghỉ trưa 12h-14h, nghỉ thứ 2 và
              các ngày lễ)
            </b>
          </p>
        </div>
        <h3>Yêu cầu ứng viên</h3>
        <div className="JobInfo__content-tab">
          <p>- Ưu tiên Nam/Nữ</p>
          <p>
            - Ứng viên đã tốt nghiệp ngành Marketing, Quản trị kinh doanh,.. các ngành
            kinh tế ở các trường Trung cấp, CĐ, ĐH.
          </p>
          <p>
            - Kinh nghiệm: 1-2 năm trở lên trong ngành giáo dục/ nhượng quyền thương hiệu/
            marketing/tổ chức sự kiện
          </p>
          <p>- Đam mê nghệ thuật, yêu trẻ em.</p>
          <p>
            - Có tinh thần hợp tác, cầu tiến và định hướng gắn bó lâu dài trong công việc.
          </p>
          <p>-Có kỹ năng giao tiếp tốt, kỹ năng vi tính văn phòng</p>
        </div>
        <h3>Quyền lợi</h3>
        <div className="JobInfo__content-tab">
          <p>
            <b>
              - Thu nhập 8.000.000đ - 15.000.000đ hoặc cao hơn: Lương cơ bản + phụ cấp +
              thưởng
            </b>
          </p>
          <p>- Chế độ lương, thưởng tương xứng với hiệu quả công việc</p>
          <p>
            - Được làm việc trong môi trường năng động, sáng tạo và chuyên nghiệp (Được
            đào tạo, học hỏi trong lĩnh vực marketing, truyền thông, tổ chức sự kiện...)
          </p>
          <p>
            - Được tham gia đầy đủ chế độ bảo hiểm, hoạt động vui chơi, du lịch của công
            ty,...
          </p>
          <p>- Công việc lâu dài, ổn định và phát triển.</p>
          <p>- Định kỳ tăng lương vào tháng 3 hàng năm</p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
