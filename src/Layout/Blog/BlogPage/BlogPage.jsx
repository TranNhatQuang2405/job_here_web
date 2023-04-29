import React from 'react'
import "./BlogPage.css"
import { PathTree } from 'Components/Path'
import { useState } from 'react'
import { BlogSection, BlogMenu } from 'Components/Blog'



function BlogPage({ blogId }) {
    const [blogData, setBlogData] = useState({
        blogTitle: "Làm sao để thu hút nhà tuyển dụng",
        content: "Flutter hiện nay đang là một hướng phát triển nghề nghiệp đầy tiềm năng dành cho các lập trình viên ứng dụng mobile. Là một framework hỗ trợ build ứng dụng cross-platform cùng với sự hỗ trợ từ ông lớn Google, Flutter đang dần trở thành ưu tiên lựa chọn của các nhà phát hành sản phẩm. Cũng vì thế mà vị trí lập trình viên Flutter cũng đang được tuyển dụng nhiều hơn với các đãi ngộ hấp dẫn. Để chuẩn bị cho buổi phỏng vấn sắp tới, hôm nay chúng ta cùng nhau tìm hiểu top 10 câu hỏi dành cho Flutter Developer thường gặp nhé."

    })
    return (
        <>
            <div className="BlogPage__box jh-box-item">
                <PathTree lastPath={blogData.blogTitle} />
                <h1 className="my-3">{blogData.blogTitle}</h1>
                <div dangerouslySetInnerHTML={{ __html: blogData.content || "" }}></div>

            </div>
            <div className="mt-2 jh-box-item">

            </div>
        </>
    )
}

export default BlogPage