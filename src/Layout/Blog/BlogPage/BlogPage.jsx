import React from 'react'
import "./BlogPage.css"
import { PathTree } from 'Components/Path'
import { useState } from 'react'
import { BlogSection, BlogMenu } from 'Components/Blog'



function BlogPage({ blogId }) {
    const [mainContent, setMainContent] = useState("Flutter hiện nay đang là một hướng phát triển nghề nghiệp đầy tiềm năng dành cho các lập trình viên ứng dụng mobile. Là một framework hỗ trợ build ứng dụng cross-platform cùng với sự hỗ trợ từ ông lớn Google, Flutter đang dần trở thành ưu tiên lựa chọn của các nhà phát hành sản phẩm. Cũng vì thế mà vị trí lập trình viên Flutter cũng đang được tuyển dụng nhiều hơn với các đãi ngộ hấp dẫn. Để chuẩn bị cho buổi phỏng vấn sắp tới, hôm nay chúng ta cùng nhau tìm hiểu top 10 câu hỏi dành cho Flutter Developer thường gặp nhé.")
    
    const [sections, setSections] = useState([
        {
            "sectionName": "Giới thiệu",
            "sectionData" : [
                {
                    "type": "TEXT",
                    "content": "Stateless Widget là những Widget tĩnh và không thể tự thay đổi được những gì mà nó hiển thị sau khi đã được render xong, hay nói cách khác thì Stateless Widget sẽ không chứa các biến state cho việc quản lý trạng thái của UI. Ngược lại thì Stateful Widget là một Widget động, chứa state và sẽ chủ động render lại khi state thay đổi."+
                    "Stateless Widget thường được sử dụng trong trường hợp hiển thị dữ liệu cứng như AppBar, Title (tiêu đề) màn hình,… còn Stateful Widget được sử dụng rộng rãi hơn ở những phần UI mà tương tác với người dùng. Stateless Widget nhờ việc không chứa state nên việc render UI của nó nhanh và nhẹ hơn nhiều, giúp tối ưu hiệu năng chương trình của bạn.",
                    "image": "",

                },
                {
                    "type": "IMAGE",
                    "content": "Hello World",
                    "image": "https://topdev.vn/blog/wp-content/uploads/2023/04/statelesswidget-vs-statefulwidget-2048x1641.webp",
                },
                {
                    "type": "TEXT",
                    "content": "Stateless Widget là những Widget tĩnh và không thể tự thay đổi được những gì mà nó hiển thị sau khi đã được render xong, hay nói cách khác thì Stateless Widget sẽ không chứa các biến state cho việc quản lý trạng thái của UI. Ngược lại thì Stateful Widget là một Widget động, chứa state và sẽ chủ động render lại khi state thay đổi."+
                    "Stateless Widget thường được sử dụng trong trường hợp hiển thị dữ liệu cứng như AppBar, Title (tiêu đề) màn hình,… còn Stateful Widget được sử dụng rộng rãi hơn ở những phần UI mà tương tác với người dùng. Stateless Widget nhờ việc không chứa state nên việc render UI của nó nhanh và nhẹ hơn nhiều, giúp tối ưu hiệu năng chương trình của bạn.",
                    "image": "",

                },
                {
                    "type": "SIDE_BY_SIDE",
                    "content": "Stateless Widget là những Widget tĩnh và không thể tự thay đổi được những gì mà nó hiển thị sau khi đã được render xong, hay nói cách khác thì Stateless Widget sẽ không chứa các biến state cho việc quản lý trạng thái của UI. Ngược lại thì Stateful Widget là một Widget động, chứa state và sẽ chủ động render lại khi state thay đổi."+
                    "Stateless Widget thường được sử dụng trong trường hợp hiển thị dữ liệu cứng như AppBar, Title (tiêu đề) màn hình,… còn Stateful Widget được sử dụng rộng rãi hơn ở những phần UI mà tương tác với người dùng. Stateless Widget nhờ việc không chứa state nên việc render UI của nó nhanh và nhẹ hơn nhiều, giúp tối ưu hiệu năng chương trình của bạn.",
                    "image": "https://topdev.vn/blog/wp-content/uploads/2023/04/statelesswidget-vs-statefulwidget-2048x1641.webp",
                },
                
            ]
        },
        {
            "sectionName": "Mô tả",
            "sectionData" : []
        },
        {
            "sectionName": "Kết luận",
            "sectionData" : []
        }
    ])

    const getSectionName = () => {
        return sections.map(section => section.sectionName)
    }

    return (
        <div className="BlogPage__box jh-box-item">
            <PathTree lastPath="Làm sao để thu hút nhà tuyển dụng" />
            <h1 className="my-3">Làm sao để thu hút nhà tuyển dụng</h1>
            <BlogMenu sections={getSectionName()}/>
            <div className="BlogPage__mainContent">{mainContent}</div>
            {
                sections.map((section, index) => 
                    <BlogSection key={index} index={index + 1} section={section}/>
                )
            }
        </div>
    )
}

export default BlogPage