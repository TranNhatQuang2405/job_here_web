import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authBusiness } from "Business";
import { changeSession, LogOut } from "Config/Redux/Slice/UserSlice";
import { GetAllSavedJob } from "Config/Redux/Slice/SavedJobSlice";
import { LoadingPage } from "Layout/Common";
import { SetIsNotPending, SetIsPending } from "Config/Redux/Slice/UserSlice";
import { GetAllData } from "Config/Redux/Slice/MasterDataSlice";
import { getAllAppliedJob } from "Config/Redux/Slice/AppliedJobSlice";
const listAuthPath = ["/SignIn", "/SignUp", "/ResetPassword", "/AuthCode"];
const listPathPrivate = ["/Chat", "/CVManage", "/CVManage/CreateCV"]

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isLoading = useSelector((state) => state.User.pending);

    useEffect(() => {
        let isSubscribed = true;
        const unsubscribed = async () => {
            dispatch(SetIsPending());
            let session = await authBusiness.GetSession();
            if (
                session.data &&
                session.data.httpCode !== 401 &&
                session.data.objectData &&
                session.data.objectData.email
            ) {
                dispatch(changeSession(session.data.objectData));
                dispatch(GetAllSavedJob());
                dispatch(getAllAppliedJob())
                let path = location.pathname;
                if (listAuthPath.find((x) => x === path)) navigate("/Home");
            } else {
                dispatch(LogOut());
                let path = location.pathname;
                if (listPathPrivate.find((x) => path.startsWith(x))) navigate("/Home");

            }
            dispatch(GetAllData());
            dispatch(SetIsNotPending());
        };
        if (isSubscribed) {
            unsubscribed();
        }
        return () => {
            isSubscribed = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
    if (isLoading === true) return <LoadingPage />;
    return <>{children}</>;
};

export default React.memo(AuthProvider);
