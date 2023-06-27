import React, { useState, useEffect } from "react";
import "./JobAppliedPage.css";
import _ from "underscore";
import { JobItem } from "Components/Job";
import { useTranslation } from "react-i18next";
import { dropdownBusiness, userBusiness } from "Business";
import { LoadingSpinner } from "Components/Loading";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from 'dayjs';


const PARTERN = "YYYY-MM"

const getCurrentMonth = () => {
	const time = moment()
	return time.format(PARTERN)
}

const JobAppliedPage = () => {
	const { t } = useTranslation();
	const [data, setData] = useState([]);
	const [timePicker, setTimePicker] = useState(getCurrentMonth());
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timePicker]);

	const getData = async () => {
		setLoading(true);
		let result = await userBusiness.GetAppliedJob(timePicker);
		if (result.data.httpCode === 200) {
			let listJob = result?.data?.objectData ?? [];
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

	const handlePickMonth = (time, month) => {
		let monthRecived = dayjs(month, "MM/YYYY")
		setTimePicker(monthRecived.format(PARTERN))
	}
	return (
		<div className="jh-container jh-box-item p-3 pb-0 mt-3 mb-3">
			<h4 className="mb-2">{t("Jobs you have applied")}</h4>
			<div className="d-flex align-items-center mb-3">
				<p className="m-0 me-3">{t("Pick Time")} (MM/YYYY) :</p>
				<DatePicker
					size="large"
					picker="month"
					value={dayjs(timePicker, 'YYYY-MM')}
					format="MM/YYYY"
					onChange={handlePickMonth}
				/>
			</div>
			{loading ? (
				<LoadingSpinner />
			) : data.length === 0 ? (
				<p>{t("There is no applied job in this time!")}</p>
			) : (
				_.map(data, (item) => <JobItem key={item.jobId} jobData={item} applied />)
			)}
		</div>
	);
};

export default JobAppliedPage;
