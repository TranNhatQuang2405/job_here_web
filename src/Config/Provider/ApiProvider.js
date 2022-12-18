import React, { useEffect } from "react";


const ApiProvider = ({ children }) => {


    useEffect(() => {
        let isSubscribed = true;
        const unsubscribed = async () => {

        };
        if (isSubscribed) {
            unsubscribed();
        }
        return () => {
            isSubscribed = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>{children}</>;
};

export default React.memo(ApiProvider);
