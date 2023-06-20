import React, { useState, useEffect } from "react";
import "./JobSearch.css";
import _ from "underscore";
import { ButtonPrimary } from "Components/Button";
import { JobList } from "Components/Job";
import { dropdownBusiness, userBusiness } from "Business";
import { useTranslation } from "react-i18next";
import Pagination from "react-bootstrap/Pagination";
import { LoadingSpinner } from "Components/Loading";
import { useSearchParams } from "react-router-dom";
import { ValidateTextAndNum } from "Config/Validate";
import { Select } from "antd";

const JobSearch = () => {
	const [data, setData] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const [totalRecord, setTotalRecord] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPage, setTotalPage] = useState(0);

	const validateQueryString = (key) => {
		let q = searchParams.get(key) || ""
		q = q.replace(/[^a-zA-Z0-9 ]/gi, '');
		q = q.replace(/\s+/g, ' ').trim();
		return q
	}

	const validateQueryNumber = (key) => {
		let q = searchParams.get(key) || ""
		q = q.replace(/[^0-9 ]/gi, '');
		q = q.replace(/\s+/g, ' ').trim();
		return q * 1 || ""
	}

	const [searchData, setSearchData] = useState({
		text: validateQueryString("q"),
		industryField: validateQueryNumber("industryId"),
		skillField: validateQueryNumber("skillId"),
		cityField: validateQueryNumber("cityId"),
	});
	const [dropdownData, setDropdownData] = useState({
		industry: [],
		skill: [],
		city: [],
	});
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();
	const size = 10;

	useEffect(() => {
		const getDropdownData = async () => {
			let prepare = [];
			prepare.push(dropdownBusiness.IndustryDropdown());
			prepare.push(dropdownBusiness.AllSkillDropdown());
			prepare.push(dropdownBusiness.CityDropdown());
			let results = await Promise.all(prepare);
			if (!results.find((x) => x.data.httpCode !== 200)) {
				// Industry Dropdown
				let _industry = _.map(results[0].data.objectData, (item) => ({
					value: item.industryId,
					label: item.industryName,
				}));
				_industry.push({ value: "", label: " " + t("All industry") });

				// Skill Dropdown
				let _skill = _.map(results[1].data.objectData, (item) => ({
					value: item.skillId,
					label: item.skillName,
				}));
				_skill.push({ value: "", label: " " + t("All skill") });

				// City Dropdown
				let _city = _.map(results[2].data.objectData, (item) => ({
					value: item.cityId,
					label: item.cityName,
				}));
				_city.push({ value: "", label: " " + t("All location") });

				setDropdownData({ industry: _industry, skill: _skill, city: _city });
			}
		};
		getDropdownData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	const getData = async () => {
		setLoading(true);
		let { text, industryField, skillField, cityField } = searchData;
		searchParams.set("q", text)
		searchParams.set("industryId", industryField)
		searchParams.set("skillId", skillField)
		searchParams.set("cityId", cityField)
		setSearchParams(searchParams)
		let result = await userBusiness.FindJob(
			currentPage,
			size,
			text,
			skillField,
			cityField,
			industryField
		);
		if (result.data.httpCode === 200) {
			if (totalRecord !== result.data.objectData.totalRecord) {
				setTotalRecord(result.data.objectData.totalRecord);
			}
			if (totalPage !== result.data.objectData.totalPage) {
				let newTotalPage = result.data.objectData.totalPage;
				setTotalPage(newTotalPage);
			}
			let listJob = result.data?.objectData?.pageData ?? [];
			let _unitname = await dropdownBusiness.UnitDropdown();
			if (_unitname.data.httpCode === 200) {
				for (let i = 0; i < listJob.length; i++) {
					listJob[i].unitName = _unitname.data.objectData.find(
						(x) => x.unit === listJob[i].unit
					).unitName;
				}
			}
			setData(listJob);
		}
		setLoading(false);
	};

	const onChangeTextSearch = (e) => {
		if (ValidateTextAndNum(e.target.value))
			setSearchData({
				...searchData,
				text: e.target.value,
			});
	};

	const onChangeIndustryField = (value) => {
		setSearchData({
			...searchData,
			industryField: value,
		});
	};

	const onChangeSkillField = (value) => {
		setSearchData({
			...searchData,
			skillField: value,
		});
	};

	const onChangeCityField = (value) => {
		setSearchData({
			...searchData,
			cityField: value,
		});
	};

	const onSearch = (e) => {
		e.preventDefault();
		getData();
	};

	const onChangePage = (page) => () => {
		if (page >= 0 && page < totalPage) {
			setCurrentPage(page);
		}
	};

	const _filterOption = (input, option) =>
		(option?.label?.toLowerCase() ?? "").includes(input?.toLowerCase());

	const _filterSort = (optionA, optionB) =>
		(optionA?.label ?? "")
			.toLowerCase()
			.localeCompare((optionB?.label ?? "").toLowerCase());

	return (
		<div className="JobSearch__container">
			<div className="jh-container">
				<div className="px-3 m-0">
					<form method="get" onSubmit={onSearch}>
						<div className="JobSearch__bound">
							<div className="JobSearch__input-data JobSearch__search-input">
								<input
									className="form-control JobSearch__input jh-box-input"
									value={searchData.text}
									onChange={onChangeTextSearch}
									placeholder={t("Job, Position Name ...")}
									autoComplete="off"
								/>
							</div>
							<div className="JobSearch__input-data JobSearch__search-select">
								<span className="JobSearch__input-icon">
									<i className="bi bi-briefcase-fill" />
								</span>
								<Select
									showSearch
									defaultValue={searchData.industryField}
									className="form-control JobSearch__input jh-box-input"
									placeholder=""
									optionFilterProp="children"
									filterOption={_filterOption}
									filterSort={_filterSort}
									onSelect={onChangeIndustryField}
									options={dropdownData.industry}
								/>
							</div>
							<div className="JobSearch__input-data JobSearch__search-select-company">
								<span className="JobSearch__input-icon">
									<i className="bi bi-building" />
								</span>
								<Select
									showSearch
									defaultValue={searchData.skillField}
									className="form-control JobSearch__input jh-box-input"
									placeholder=""
									optionFilterProp="children"
									filterOption={_filterOption}
									filterSort={_filterSort}
									onSelect={onChangeSkillField}
									options={dropdownData.skill}
								/>
							</div>
							<div className="JobSearch__input-data JobSearch__search-select">
								<span className="JobSearch__input-icon">
									<i className="bi bi-geo-alt-fill" />
								</span>
								<Select
									showSearch
									defaultValue={searchData.cityField}
									className="form-control JobSearch__input jh-box-input"
									placeholder=""
									optionFilterProp="children"
									filterOption={_filterOption}
									filterSort={_filterSort}
									onSelect={onChangeCityField}
									options={dropdownData.city}
								/>
							</div>
							<div className="JobSearch__input-data JobSearch__btn">
								<ButtonPrimary style={{ paddingLeft: "20px", paddingRight: "20px" }}>
									<i className="bi bi-search" /> {t("jobSearch.btn")}
								</ButtonPrimary>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="jh-container">
				{loading ? (
					<LoadingSpinner />
				) : data.length === 0 ? (
					<div className="pt-3 d-flex justify-content-center">
						<div className="m-3">
							<p className="mb-0">
								{t("user.job.search.totalRecord.1")}{" "}
								<strong className="primary-color">{totalRecord}</strong>{" "}
								{t("user.job.search.totalRecord.2")}
							</p>
						</div>
					</div>
				) : (
					<div>
						<div className="m-3">
							<p className="mb-0">
								{t("user.job.search.totalRecord.1")}{" "}
								<strong className="primary-color">{totalRecord}</strong>{" "}
								{t("user.job.search.totalRecord.2")}
							</p>
						</div>
						<JobList data={data} />
						<div className="d-flex justify-content-center align-items-center">
							{totalPage > 0 && (
								<Pagination>
									<Pagination.First onClick={onChangePage(0)} />
									<Pagination.Prev onClick={onChangePage(currentPage - 1)} />
									{_.map([...Array(totalPage)], (item, index) => (
										<Pagination.Item
											key={index}
											active={index === currentPage}
											onClick={onChangePage(index)}
										>
											{index + 1}
										</Pagination.Item>
									))}
									<Pagination.Next onClick={onChangePage(currentPage + 1)} />
									<Pagination.Last onClick={onChangePage(totalPage - 1)} />
								</Pagination>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default JobSearch;
