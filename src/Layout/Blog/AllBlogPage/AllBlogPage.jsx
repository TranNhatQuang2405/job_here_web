import React, { useState, useEffect } from 'react'
import { BlogChild } from 'Components/Blog'
import { PaginationCustom } from 'Components/Page'
import { useTranslation } from 'react-i18next'
import { blogBusiness, dropdownBusiness } from 'Business'
import "./AllBlogPage.css"
import { ButtonPrimary } from 'Components/Button'
import { Spinner } from 'react-bootstrap'
import { Select } from 'antd'

function AllBlogPage() {

    const { t } = useTranslation()
    const [pending, setPending] = useState(false)
    const [industries, setIndustries] = useState([])
    const [data, setData] = useState({
        totalPage: 0,
        page: 0,
        totalRecord: 0,
        pageData: []
    })
    const [params, setParams] = useState({
        keySearch: "",
        industryId: null,
        page: 0,
        size: 10
    })

    const handleChangeParams = (e) => {
        setParams(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const onChangePage = (currentPage) => () => {
        if (currentPage >= 0 && currentPage < data.totalPage) {
            setParams(prev => ({
                ...prev,
                page: currentPage
            }))
        }
    };

    const handleSearch = async () => {
        setPending(true)
        let paramsNew = {
            ...params,
            page: 0
        }
        let result = await blogBusiness.blogSearch(paramsNew)
        if (result.data.httpCode === 200) {
            setData(prev => ({
                ...prev,
                ...result.data.objectData
            }))
        }
        setPending(false)
    }

    const fetchData = async () => {
        setPending(true)
        let prepare = []
        prepare.push(blogBusiness.blogSearch(params))
        prepare.push(dropdownBusiness.IndustryDropdown());
        let results = await Promise.all(prepare);
        if (!results.find((x) => x.data.httpCode !== 200)) {
            setData(prev => ({
                ...prev,
                ...results[0].data.objectData
            }))
            let industryTmp = results[1].data.objectData.map((item) => ({
                value: item.industryId,
                label: item.industryName,
            }));
            industryTmp.push({ value: "", label: " " + t("All industry") });
            setIndustries(industryTmp)
        }
        setPending(false)
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.page])

    const onChangeIndustryField = (e) => {
        setParams(prev => ({
            ...prev,
            industryId: e || null
        }))
    }

    const _filterOption = (input, option) =>
        (option?.label?.toLowerCase() ?? "").includes(input?.toLowerCase());

    const _filterSort = (optionA, optionB) =>
        (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase());

    return (
        <div>
            <div className="AllBlogPage__search-box">
                <div className="JobSearch__input-data me-3">
                    <span className="JobSearch__input-icon">
                        <i className="bi bi-briefcase-fill" />
                    </span>
                    <Select
                        showSearch
                        defaultValue={""}
                        className="form-control AllBlogPage__select JobSearch__input jh-box-input"
                        placeholder=""
                        optionFilterProp="children"
                        filterOption={_filterOption}
                        filterSort={_filterSort}
                        onSelect={onChangeIndustryField}
                        options={industries}
                    />
                </div>
                <div className="JobSearch__input-data JobSearch__search-input">
                    <input
                        id="keySearch"
                        value={params.keySearch}
                        onChange={handleChangeParams}
                        className="form-control JobSearch__input jh-box-input"
                        placeholder={t("blog.search.placeholder")}
                        autoComplete="off"
                    />
                </div>
                <ButtonPrimary onClick={handleSearch} className="ms-3">{t("blog.search.btn")}</ButtonPrimary>
            </div>
            <hr />
            {
                pending ? <div className='d-flex w-100'><Spinner animation='border' variant="danger" className='m-auto' /></div> :
                    <>
                        {
                            data.pageData.map(blog => (
                                <BlogChild blog={blog} key={blog.blogId} />
                            ))
                        }
                        <PaginationCustom
                            totalPage={data.totalPage}
                            currentPage={data.page}
                            onChangePage={onChangePage}
                        />
                    </>
            }
        </div>
    )
}

export default AllBlogPage