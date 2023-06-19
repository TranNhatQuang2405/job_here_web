import React, { useState, useEffect } from "react";
import "./CompanyPage.css";
import { Row, Col, Modal } from "react-bootstrap";
import { Input } from "antd";
import { CompanyLogo } from "Components/Company";
import { JobShare } from "Components/Job";
import { PathTree } from "Components/Path";
import { Tab } from "Components/Navigation";
import { LoadingSpinner } from "Components/Loading";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { companyBusiness, dropdownBusiness, messageBusiness } from "Business";
import { CompanyRatingOveral, CompanyRating, CompanyAboutAndJob } from "./Component";
import company_default_background from "Assets/Images/company_default_background.jpg";
import { Messenger } from "react-bootstrap-icons";
import { ButtonPrimary } from "Components/Button";
import { IconSpinner } from "Components/Icon";

const CompanyPage = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const [companyData, setCompanyData] = useState({});
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);
	const [show, setShow] = useState(false)
	const [chatMessage, setChatMessage] = useState("")
	const [pendingSend, setPendingSend] = useState(false)
	const getCurrentTab = () => {
		let tab = searchParams.get("tab") * 1;
		if (Number.isInteger(tab)) {
			return tab
		}
		return 0
	}
	const [currentTab, setCurrentTab] = useState(getCurrentTab)
	const tabNames = [t("tabName.company.about"), t("tabName.company.reviews")]
	const sessionInfo = useSelector(state => state.User.sessionInfo)

	const handleOpenChat = () => {
		setShow(true)
	}

	const handleChangeMessage = (e) => {
		setChatMessage(e.target.value)
	}

	const handleHide = () => {
		setChatMessage("")
		setShow(false)
	}

	useEffect(() => {
		let isSubscribed = true;
		const first = async () => {
			let stringPath = location.pathname;
			let tmpPath = stringPath.split("/");
			let companyId = tmpPath && tmpPath.length > 0 ? tmpPath[tmpPath.length - 1] : 0;
			let prepare = [];
			prepare.push(companyBusiness.GetCompanyInfo(companyId));
			prepare.push(companyBusiness.GetJobOfCompany(companyId));
			prepare.push(dropdownBusiness.UnitDropdown());
			let results = await Promise.all(prepare);
			if (!results.find((x) => x.data.httpCode !== 200)) {
				let _companyData = results[0].data.objectData;
				let unitData = results[2].data.objectData;
				_companyData.companyJobs = results[1].data.objectData || [];
				_companyData.valid_urlCompany = getValidUrl(_companyData.urlCompany);
				_companyData.companyJobs.map(job => {
					job.unitName = unitData.find(x => x.unit === job.unit).unitName
					return job
				})
				setCompanyData(_companyData);
			}
			setLoading(false);
		};
		if (isSubscribed) first();
		return () => {
			isSubscribed = false;
		};
	}, [location.pathname]);

	const getValidUrl = (url = "") => {
		let newUrl = window.decodeURIComponent(url);
		newUrl = newUrl.trim().replace(/\s/g, "");

		if (/^(:\/\/)/.test(newUrl)) {
			return `https${newUrl}`;
		}
		if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
			return `https://${newUrl}`;
		}

		return newUrl;
	};

	const onChangeTab = (index) => {
		searchParams.set("tab", index);
		setSearchParams(searchParams)
		setCurrentTab(index)
	}

	const handleSend = async () => {
		if (chatMessage.trim() !== "") {
			setPendingSend(true)
			let params = {
				userId: sessionInfo.userId,
				companyId: companyData.companyId,
				fromUser: true,
				content: chatMessage
			}
			await messageBusiness.chat(params)
			setPendingSend(false)
			setShow(false)
			setChatMessage("")
		}
	}

	return (
		<div className="CompanyPage__container">
			<Modal className='modal__custom-bg'
				size="md"
				fullscreen='lg-down'
				centered show={show} onHide={handleHide}>
				<Modal.Header closeButton>
					<Modal.Title>{t("companyPage.message.title")}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Input
						value={chatMessage}
						onChange={handleChangeMessage}
						size="large"
						placeholder={t("companyPage.message.placeholder")}
					/>
				</Modal.Body>
				<Modal.Footer>
					<ButtonPrimary onClick={handleHide} secondary={true}>{t("companyPage.message.close")}</ButtonPrimary>
					<ButtonPrimary onClick={handleSend}>
						{pendingSend ? <IconSpinner variant="light" /> :
							t("companyPage.message.send")
						}
					</ButtonPrimary>
				</Modal.Footer>
			</Modal>
			<div className="jh-container">
				<PathTree lastPath={companyData.companyName || t("Company introduction")} />
			</div>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div>
					<div className="CompanyPage__header jh-container jh-box-item mb-3">
						<div className="CompanyPage__cover-wrapper">
							<img
								src={companyData.backgroundUrl || company_default_background}
								alt=""
								width="100%"
								height="236px"
							/>
						</div>
						<div className="CompanyPage__company-detail-overview">
							<div className="CompanyPage__company-logo">
								<CompanyLogo
									src={companyData.avatarUrl}
									alt={companyData?.companyName || ""}
									size={130}
								/>
							</div>
							<div className="CompanyPage__company-header-info flex-grow-1">
								<h1 className="CompanyPage__company-detail-name text-highlight">
									{companyData?.companyName || ""}
								</h1>
								<div className="d-flex">
									{!!companyData.urlCompany && (
										<p className="CompanyPage__website">
											<i className="bi bi-house-door-fill" />{" "}
											<a
												href={companyData.valid_urlCompany}
												target="_blank"
												rel="noreferrer"
											>
												{companyData.urlCompany}
											</a>
										</p>
									)}
									{!!companyData.email && (
										<p className="CompanyPage__company-size">
											<i className="bi bi-envelope-fill" /> {companyData.email}
										</p>
									)}
									{!!companyData.size && (
										<p className="CompanyPage__company-size">
											<i className="bi bi-people-fill" /> {companyData.size} {t("Employee")}
										</p>
									)}
								</div>
							</div>
							{
								sessionInfo &&
								<ButtonPrimary secondary={true} onClick={handleOpenChat}>
									<Messenger className="CompanyPage__messageIcon" />
									{t("companyPage.sendMessage")}
								</ButtonPrimary>
							}
						</div>
					</div>
					<div className="CompanyPage__detail jh-container mb-3">
						<Tab data={tabNames} currentTab={currentTab} setCurrentTab={onChangeTab} />
						<Row>
							<Col md={8}>
								{currentTab === 0 ?
									<CompanyAboutAndJob companyData={companyData} />
									:
									<CompanyRating companyId={companyData.companyId} />
								}
							</Col>
							<Col md={4}>
								<CompanyRatingOveral
									currentTab={currentTab}
									companyId={companyData.companyId}
									goToRating={() => setCurrentTab(1)} />
								<div className="CompanyPage__box-address jh-box-item mb-3">
									<h4>{t("Company address")}</h4>
									<p className="pt-3">
										<i className="bi bi-geo-alt-fill"></i> {companyData.address}
									</p>
								</div>
								<JobShare path={location.pathname} company />
							</Col>
						</Row>
					</div>
				</div>
			)}
		</div>
	);
};

export default CompanyPage;
