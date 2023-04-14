import React, { useState }  from 'react'
import { BlogChild } from 'Components/Blog'
import { PaginationCustom } from 'Components/Page'
import { useTranslation } from 'react-i18next'
import "./AllBlogPage.css"
import { ButtonPrimary } from 'Components/Button'

function AllBlogPage() {

    const {t} = useTranslation()

    const [page, setPage] = useState({
        totalPage: 10,
        currentPage: 0
    })

    const onChangePage = (currentPage) => () => {
        if (currentPage >= 0 && currentPage < page.totalPage) {
            setPage({
                ...page,
                currentPage: currentPage
            })
        }
      };

    return (
        <div>
            <div className="AllBlogPage__search-box">
                <div className="JobSearch__input-data JobSearch__search-input">
                    <input
                        className="form-control JobSearch__input jh-box-input"
                        placeholder={t("blog.search.placeholder")}
                        autoComplete="off"
                    />
                </div>
                <ButtonPrimary className="ms-3">{t("blog.search.btn")}</ButtonPrimary>
            </div>
            <hr/>   
            <BlogChild />
            <BlogChild />
            <BlogChild />
            <BlogChild />
            <PaginationCustom 
                totalPage={page.totalPage} 
                currentPage={page.currentPage}
                onChangePage={onChangePage}
            />
        </div>
    )
}

export default AllBlogPage