import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type props = {
    label: any;
    data: any;

};

const ReadMore = ({ children }) => {
    const text = children;
    const { t, i18n } = useTranslation();
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 150) : text}
            <span onClick={toggleReadMore} className="underline ml-1 text-textGray cursor-pointer">
                {isReadMore ? `${t("...Read more")}` : `${t("show less")}`}
            </span>
        </p>
    );
};
//    {t("View All Location")}
const Content = (about: props) => {
    return (
        <ReadMore>
            {about.data}
        </ReadMore>
    );
};

export default Content;