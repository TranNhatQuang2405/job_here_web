import React, { useEffect, useState } from "react";
import "./CompanyListPage.css";
import _ from "underscore";
import { Row, Col } from "react-bootstrap";
import { CompanyItem } from "Components/Company";
import { PathTree } from "Components/Path";
import { LoadingSpinner } from "Components/Loading";
import { ButtonPrimary } from "Components/Button";
import { useTranslation } from "react-i18next";
import { companyBusiness } from "Business";
import Pagination from "react-bootstrap/Pagination";

const CompanyList = () => {
	const { t } = useTranslation();
	const [companyList, setCompanyList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activePage, setActivePage] = useState(0);
	const [totalPage, setTotalPage] = useState(0);
	const [companyName, setCompanyName] = useState("")
	const pageSize = 12;

	async function getData() {
		setLoading(true)
		let results = await companyBusiness.GetListCompany(activePage, pageSize, companyName);
		if (results.data.httpCode === 200) {
			let companyListData = results.data?.objectData?.pageData ?? [];
			if (totalPage !== results.data.objectData.totalPage) {
				let newTotalPage = results.data.objectData.totalPage;
				setTotalPage(newTotalPage);
			}
			setCompanyList(companyListData);
		}
		setLoading(false);
	}

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activePage])

	const onChangeCompanyName = (e) => {
		setCompanyName(e.target.value)
	}

	const onChangePage = (page) => {
		if (page >= 0 && page < totalPage) {
			setActivePage(page)
		}
	};

	const handleSearch = async () => {
		if (activePage === 0) {
			setLoading(true)
			await getData()
			setLoading(false)
		} else
			setActivePage(0)
	}

	return (
		<div className="jh-container align-items-center">
			<PathTree />
			<div className="jh-box-item mt-3 mb-3 p-3 CompanyListPage__searchBox">
				<div className="JobSearch__input-data JobSearch__search-input">
					<input
						id="keySearch"
						value={companyName}
						onChange={onChangeCompanyName}
						className="form-control JobSearch__input jh-box-input"
						placeholder={t("companyListPage.search.placeholder")}
						autoComplete="off"
					/>
				</div>
				<ButtonPrimary onClick={handleSearch} className="ms-3">{t("blog.search.btn")}</ButtonPrimary>
			</div>
			<div className="jh-box-item mt-3 mb-3 p-3">

				<h4>{t("List All Company")}</h4>
				{loading ? (
					<LoadingSpinner />
				) : (
					<div>
						<div>
							<Row>
								{_.map(companyList, (companyItem) => (
									<Col md={4} sm={6} key={companyItem.companyId}>
										<CompanyItem companyData={companyItem} />
									</Col>
								))}
							</Row>
						</div>
						<div className="d-flex justify-content-center align-items-center">
							{totalPage > 0 && (
								<Pagination>
									<Pagination.First onClick={() => onChangePage(0)} />
									<Pagination.Prev onClick={() => onChangePage(activePage - 1)} />
									{_.map([...Array(totalPage)], (item, index) => (
										<Pagination.Item
											key={index}
											active={index === activePage}
											onClick={() => onChangePage(index)}
										>
											{index + 1}
										</Pagination.Item>
									))}
									<Pagination.Next onClick={() => onChangePage(activePage + 1)} />
									<Pagination.Last onClick={() => onChangePage(totalPage - 1)} />
								</Pagination>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CompanyList;
