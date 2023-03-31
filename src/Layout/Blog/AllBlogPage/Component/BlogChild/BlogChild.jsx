import { CompanyLogo } from 'Components/Company'
import React from 'react'
import "./BlogChild.css"

function BlogChild() {
    return (
        <div className="BlogChild__bound">
            <CompanyLogo size={200} className="BlogChild__avatar" />
            <div className="BlogChild__content">
                <div className="BlogChild__content-title">Hướng dẫn phỏng vấn</div>
                <div className="BlogChild__content-date">Tháng Chín 25, 2020</div>
                <div className="BlogChild__content-summary">Hướng dẫn xóa logs docker, giới hạn file log docker. 1. Xóa log của docker Nếu bạn cài docker, sau một thời gian sẽ thấy ổ cứng rất nhanh bị đầy (nhất là các server chạy nhiều docker container và ghi log liên tục). Trong khi kiểm tra thì docker images và docker container ko
                    Hướng dẫn xóa logs docker, giới hạn file log docker. 1. Xóa log của docker Nếu bạn cài docker, sau một thời gian sẽ thấy ổ cứng rất nhanh bị đầy (nhất là các server chạy nhiều docker container và ghi log liên tục). Trong khi kiểm tra thì docker images và docker container ko
                </div>
                <div className="BlogChild__content-author">Trần Nhất Quang</div>
            </div>
        </div>
    )
}

export default BlogChild