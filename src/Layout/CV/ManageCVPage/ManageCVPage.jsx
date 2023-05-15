import React, { useState } from "react";
import "./ManageCVPage.css";
import { PathTree } from "Components/Path";
import { CVCreated, CVUploaded } from "./Component";
import { useTranslation } from "react-i18next";
import { Tab } from "Components/Navigation";
import { useSearchParams } from "react-router-dom";

const ManageCVPage = () => {
	const { t } = useTranslation()
	const [searchParams, setSearchParams] = useSearchParams();
	const getCurrentTab = () => {
		let tab = searchParams.get("tab") * 1;
		if (Number.isInteger(tab)) {
			return tab
		}
		return 0
	}
	const [currentTab, setCurrentTab] = useState(getCurrentTab)
	const tabNames = [t("tabName.cv.uploadedCV"), t("tabName.cv.createdCV")]

	const onChangeTab = (index) => {
		searchParams.set("tab", index);
		setSearchParams(searchParams)
		setCurrentTab(index)
	}
	return (
		<div className="jh-container">
			<PathTree />
			<Tab
				data={tabNames}
				currentTab={currentTab}
				setCurrentTab={onChangeTab}
				isHalf={true}
			/>
			{currentTab === 0 ? <CVUploaded /> : <CVCreated />}
		</div>
	);
};

export default ManageCVPage;
