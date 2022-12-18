import { finishNavigate } from "Config/Redux/Slice/CurrentPathSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PathProvider = ({ children }) => {
    const sessionInfo = useSelector((state) => state.User.sessionInfo);
    const path = useSelector((state) => state.CurrentPath.path);
    const isGoToLogin = useSelector((state) => state.CurrentPath.isGoToLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!sessionInfo && isGoToLogin) {
            navigate("/SignIn")
            dispatch(finishNavigate())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, sessionInfo, isGoToLogin]);
    return <>{children}</>;
};

export default React.memo(PathProvider);
