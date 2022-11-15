import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authBusiness } from "Business";
import { changeSession, LogOut } from "Config/Redux/Slice/UserSlice";
import { LoadingPage } from "Layout/Common";
const listAuthPath = ["/SignIn", "/SignUp", "/ResetPassword", "/AuthCode"];

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = useSelector((state) => state.CurrentPage.page);
  const isLoading = useSelector((state) => state.User.pending);

  useEffect(() => {
    let isSubscribed = true;
    const unsubscribed = async () => {
      let session = await authBusiness.GetSession();
      if (
        session.data &&
        session.data.httpCode !== 401 &&
        session.data.objectData &&
        session.data.objectData.email
      ) {
        dispatch(changeSession(session.data.objectData));
        let path = location.pathname;
        if (listAuthPath.find((x) => x === path)) navigate("/Home");
      } else {
        dispatch(LogOut());
        if (currentPage === 1) navigate("/SignIn");
        else if (currentPage === 2) navigate("/SignUp");
        else if (currentPage === 3) navigate("/ResetPassword");
        else if (currentPage === 4) navigate("/AuthCode");
        else navigate("/SignIn");
      }
    };
    if (isSubscribed) {
      unsubscribed();
    }
    return () => {
      isSubscribed = false;
    };
  }, [currentPage, dispatch, navigate]);
  if (isLoading === true) return <LoadingPage />;
  return <>{children}</>;
};

export default React.memo(AuthProvider);
