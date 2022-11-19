import React, { useState, useEffect } from "react";
import "./CompanyTop.css";
import _ from "underscore";
import { Row, Col } from "react-bootstrap";
import { CompanyItem } from "Components/Company";
import { LoadingSpinner } from "Components/Loading";
import { useTranslation } from "react-i18next";
import { companyBusiness } from "Business";
import Pagination from "react-bootstrap/Pagination";

const CompanyTop = () => {
  const { t } = useTranslation();
  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageSize = 6;

  useEffect(() => {
    getData();
  }, [activePage]);

  const getData = () => {
    setLoading(false);
  };

  const onChangePage = (page) => () => {
    if (page >= 0 && page < totalPage) {
      setActivePage(page);
    }
  };

  return (
    <div className="jh-box-item p-3 mt-3 mb-3">
      <h4>{t("Top Company")}</h4>
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
                <Pagination.First onClick={onChangePage(0)} />
                <Pagination.Prev onClick={onChangePage(activePage - 1)} />
                {_.map([...Array(totalPage)], (item, index) => (
                  <Pagination.Item
                    key={index}
                    active={index === activePage}
                    onClick={onChangePage(index)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={onChangePage(activePage + 1)} />
                <Pagination.Last onClick={onChangePage(totalPage - 1)} />
              </Pagination>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyTop;
