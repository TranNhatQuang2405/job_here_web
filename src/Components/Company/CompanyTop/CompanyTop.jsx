import React, { useState, useEffect } from "react";
import "./CompanyTop.css";
import _ from "underscore";
import { Row, Col } from "react-bootstrap";
import { LoadingSpinner } from "Components/Loading";
import { useTranslation } from "react-i18next";
import { companyBusiness } from "Business";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";

const CompanyTop = () => {
  const { t } = useTranslation();
  const [companyList, setCompanyList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
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
              {_.map(companyList, (companyItem, index) => (
                <Col md={3} sm={6} key={index}>
                  <div className="CompanyTop__item mb-3">
                    <Link to="/Home" target="_blank">
                      <div className="CompanyTop__item-logo">
                        <img
                          src="https://static.topcv.vn/company_logos/cong-ty-cp-dau-tu-va-dich-vu-dat-xanh-mien-nam-60d3e4afd0fb7.jpg"
                          className="lazy img-responsive h-100"
                          alt=""
                        />
                      </div>
                    </Link>
                  </div>
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
