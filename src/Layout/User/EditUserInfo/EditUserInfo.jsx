import React, { useState, useRef, useEffect } from "react";
import "./EditUserInfo.css";
import _ from "underscore";
import {
  Col,
  Row,
  Card,
  Form,
  InputGroup,
  FormControl,
  FormLabel,
  FormGroup,
  Button,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import user_img from "Assets/Images/user.png";
import { useSelector } from "react-redux";
import { userBusiness, dropdownBusiness } from "Business";
import { ValidateUTF8Name, ValidateDateOfBirth, ValidatePhone } from "Config/Validate";
import { WarningModal } from "Components/Modal";
import { LoadingPage } from "Layout/Common";

const EditUserInfo = () => {
  const { t } = useTranslation();
  let sessionInfo = useSelector((state) => state.User.sessionInfo);
  const [account, setAccount] = useState({
    displayName: sessionInfo?.fullname ?? "",
    address: sessionInfo?.address ?? "",
    dateOfBirth: sessionInfo?.dateOfBirth ?? "",
    gender: sessionInfo?.gender ?? "MALE",
    phone: sessionInfo?.phone ?? "",
  });
  const [dropdownData, setDropdownData] = useState({
    gender: [],
  });
  const [loading, setLoading] = useState(false);
  const [modalRef, setModalRef] = useState(useRef());

  useEffect(() => {
    const getData = async () => {
      let prepare = [];
      prepare.push(dropdownBusiness.GenderDropdown());
      let results = await Promise.all(prepare);
      if (!results.find((x) => x.data.httpCode !== 200)) {
        let gender = results[0].data.objectData;

        setDropdownData({ gender: gender });
      }
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    setAccount({
      displayName: sessionInfo?.fullname ?? "",
      address: sessionInfo?.address ?? "",
      dateOfBirth: sessionInfo?.dateOfBirth ?? "",
      gender: sessionInfo?.gender ?? "MALE",
      phone: sessionInfo?.phone ?? "",
    });
  }, [sessionInfo]);

  if (loading) return <LoadingPage />;

  const onChangeValueDisplayName = (e) => {
    setAccount((prev) => ({ ...prev, displayName: e.target.value }));
  };

  const onChangeValueAddress = (e) => {
    setAccount((prev) => ({ ...prev, address: e.target.value }));
  };

  const onChangeValueDateOfBirth = (e) => {
    setAccount((prev) => ({ ...prev, dateOfBirth: e.target.value }));
  };

  const onChangeValueGender = (e) => {
    setAccount((prev) => ({ ...prev, gender: e.target.value }));
  };

  const onChangeValuePhoneNumber = (e) => {
    setAccount((prev) => ({ ...prev, phone: e.target.value }));
  };

  const onEditUserInfo = async (e) => {
    e.preventDefault();
    if (!ValidateUTF8Name(account.displayName)) {
      modalRef.current.setMessage("Invalid Display Name!");
      modalRef.current.onToggleModal();
    } else if (!ValidateDateOfBirth(account.dateOfBirth)) {
      modalRef.current.setMessage("Invalid Date Of Birth!");
      modalRef.current.onToggleModal();
    } else if (!ValidatePhone(account.phone)) {
      modalRef.current.setMessage("Invalid Phone Number!");
      modalRef.current.onToggleModal();
    } else {
      let { address, dateOfBirth, displayName, phone, gender } = account;
      let updateUserInfo = await userBusiness.UpdateUserInfo(
        displayName,
        address,
        dateOfBirth.replaceAll("-", "/"),
        phone,
        gender
      );
      modalRef.current.setMessage(updateUserInfo.data?.message ?? "");
      modalRef.current.onToggleModal();
    }
  };

  return (
    <div className="EditUserInfo__container pt-3 pb-3">
      <WarningModal ref={modalRef} title={t("Edit Your Information")} />
      <Row className="justify-content-center">
        <Col lg={6} xs={12}>
          <div className="d-flex justify-content-between align-items-center mb-4 ps-3 pe-3">
            <h3 className="EditUserInfo__title">{t("Edit Your Information")}</h3>
            <img
              alt=""
              src={user_img}
              width="100"
              height="100"
              className="d-inline-block rounded-circle"
            />
          </div>
          <Card className="EditUserInfo__card">
            <Card.Body className="p-4">
              <Form onSubmit={onEditUserInfo}>
                <FormGroup className="mb-3">
                  <FormLabel className="EditUserInfo__form-label">Email</FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="EditUserInfo__input-text">
                      <i className="bi bi-envelope-fill" />
                    </InputGroup.Text>
                    <FormControl
                      type="email"
                      className="EditUserInfo__form-control jh-box-input"
                      placeholder={t("Enter Email")}
                      aria-label="Enter Email"
                      value={sessionInfo?.email ?? ""}
                      onChange={() => {}}
                      disabled
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel className="EditUserInfo__form-label">
                    {t("Display Name")}
                  </FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="EditUserInfo__input-text">
                      <i className="bi bi-person-fill" />
                    </InputGroup.Text>
                    <FormControl
                      type="text"
                      className="EditUserInfo__form-control jh-box-input"
                      placeholder={t("Enter Username")}
                      aria-label="Enter Username"
                      value={account.displayName}
                      onChange={onChangeValueDisplayName}
                      minLength={8}
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel className="EditUserInfo__form-label">
                    {t("Address")}
                  </FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="EditUserInfo__input-text">
                      <i className="bi bi-house-fill" />
                    </InputGroup.Text>
                    <FormControl
                      type="text"
                      className="EditUserInfo__form-control jh-box-input"
                      placeholder={t("Enter Address")}
                      aria-label="Enter Address"
                      value={account.address}
                      onChange={onChangeValueAddress}
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel className="EditUserInfo__form-label">
                    {t("Date Of Birth")}
                  </FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="EditUserInfo__input-text">
                      <i className="bi bi-calendar-date-fill" />
                    </InputGroup.Text>
                    <FormControl
                      type="date"
                      className="EditUserInfo__form-control jh-box-input"
                      value={account.dateOfBirth}
                      onChange={onChangeValueDateOfBirth}
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel className="EditUserInfo__form-label">
                    {t("Gender")}
                  </FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="EditUserInfo__input-text">
                      <i className="bi bi-gender-ambiguous" />
                    </InputGroup.Text>
                    <select
                      className="form-control EditUserInfo__form-control jh-box-input"
                      id="city"
                      value={account.gender}
                      onChange={onChangeValueGender}
                      tabIndex="-1"
                      aria-hidden="true"
                    >
                      {_.map(dropdownData.gender, (item) => (
                        <option key={item.gender} value={item.gender}>
                          {item.genderName}
                        </option>
                      ))}
                    </select>
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel className="EditUserInfo__form-label">
                    {t("Phone Number")}
                  </FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="EditUserInfo__input-text">
                      <i className="bi bi-telephone-fill" />
                    </InputGroup.Text>
                    <FormControl
                      type="text"
                      className="EditUserInfo__form-control jh-box-input"
                      placeholder={t("Enter Phone Number")}
                      aria-label="Enter Phone Number"
                      value={account.phone}
                      onChange={onChangeValuePhoneNumber}
                      minLength={10}
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <Button className="EditUserInfo__button mt-3 w-100" type="submit">
                  {t("Update Infomation")}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EditUserInfo;
