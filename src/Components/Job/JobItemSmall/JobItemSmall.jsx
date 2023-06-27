import React from "react";
import "./JobItemSmall.css";
import { Col } from "react-bootstrap";
import { TagList } from "Components/Tag";
import { CompanyLogo } from "Components/Company";
import { ButtonPrimary } from "Components/Button";
import { Link } from "react-router-dom";
import { jobBusiness } from "Business";
import { useSelector, useDispatch } from "react-redux";
import { GetAllSavedJob, SaveTemporary, UnSaveTemporary } from "Config/Redux/Slice/SavedJobSlice";

const JobItemSmall = ({ jobData = {} }) => {
	const dispatch = useDispatch();
	const savedJobList = useSelector((state) => state.SavedJob.listSavedJob) || [];
	const sessionInfo = useSelector((state) => state.User.sessionInfo);

	let tagData = [
		{
			label: `${jobData.salaryMin === jobData.salaryMax
				? jobData.salaryMin
				: `${jobData.salaryMin} - ${jobData.salaryMax}`
				} ${jobData?.unitName ?? ""}`,
		},
		{
			label: jobData?.city?.cityName ?? "",
		},
	];

	const onSaveJob = async () => {
		let result = null;
		if (savedJobList.includes(jobData.jobId)) {
			dispatch(UnSaveTemporary(jobData.jobId))
			result = await jobBusiness.UnsaveJob(jobData.jobId);
		} else {
			dispatch(SaveTemporary(jobData.jobId))
			result = await jobBusiness.SaveJob(jobData.jobId);
		}
		if (result.data.httpCode === 200) {
			dispatch(GetAllSavedJob());
		}
	};

	return (
		<Col md={4} sm={6} className="JobItemSmall__container">
			<div className="JobItemSmall__feature-job-item">
				<div className="d-flex">
					<Link to={`/Job/${jobData?.jobId ?? 0}`} rel="noreferrer">
						<CompanyLogo src={jobData?.avatarUrl ?? null} />
					</Link>
					<div className="JobItemSmall__col-title flex-grow-1">
						<Link
							to={`/Job/${jobData?.jobId ?? 0}`}
							rel="noreferrer"
							className="JobItemSmall__title d-block w-100"
						>
							<strong className="transform-job-title underline-box-job highlight">
								{jobData?.jobName ?? ""}
							</strong>
						</Link>
						<Link
							to={`/Company/${jobData?.companyId ?? 0}`}
							rel="noreferrer"
							className="JobItemSmall__company d-block w-100"
						>
							{jobData?.companyName ?? ""}
						</Link>
					</div>
					<div className="JobItemSmall__col-like">
						{sessionInfo ?
							<ButtonPrimary
								onClick={onSaveJob}
								secondary
								style={{ padding: "4px", height: "25px", overflow: "hidden" }}
							>
								<i
									className={
										savedJobList.includes(jobData.jobId)
											? "bi bi-heart-fill"
											: "bi bi-heart"
									}
								/>
							</ButtonPrimary> : <></>
						}
					</div>
				</div>
				<div className="col-job-info">
					<TagList tagData={tagData} />
				</div>
			</div>
		</Col>
	);
};

export default JobItemSmall;
