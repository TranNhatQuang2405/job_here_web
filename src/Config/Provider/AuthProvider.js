import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function AuthProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.CurrentPage.page);

  useLayoutEffect(() => {
    const unsubscribed = () => {
      if (currentPage === 1) navigate("/SignIn");
      else if (currentPage === 2) navigate("/SignUp");
      else if (currentPage === 3) navigate("/ResetPassword");
      else if (currentPage === 4) navigate("/AuthCode");
      // else navigate("/SignIn");
      else navigate("/MainPage");
    };
    return () => {
      unsubscribed();
    };
  }, [currentPage, dispatch, navigate]);

  return <>{children}</>;
}

export default React.memo(AuthProvider);
