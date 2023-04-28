import { Link } from "@yext/pages/components";
import * as React from "react";

type navbar = {
    listItem: any;
};

const FooterListAccordian = (props: navbar) => {
    return (
        <>
            {props.listItem?.textCTA[0].heading ? (
                <ul>
                    <li className="footer-sub-heading">{props.listItem?.textCTA[0].heading}</li>
                    {props.listItem?.textCTA[0].cta.map((i: any) => {
                        return (
                            <li>
                                <Link
                                    href={i.link}
                                    title={i.lable}
                                    style={{ fontSize: "14px", color: "#000000" }}
                                    rel="noopener noreferrer"
                                    eventName={`footerMenuItem`}
                                >
                                    {i.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <></>
            )}
            {props.listItem?.textCTA[1].heading ? (
                <ul>
                    <li className="footer-sub-heading">{props.listItem?.textCTA[1].heading}</li>
                    {props.listItem?.textCTA[1].cta.map((i: any) => {
                        return (
                            <li>
                                <Link
                                    href={i.link}
                                    title={i.lable}
                                    style={{ fontSize: "14px", color: "#000000" }}
                                    rel="noopener noreferrer"
                                    eventName={`footerMenuItem`}
                                >
                                    {i.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <></>
            )}
        </>
    );
};

export default FooterListAccordian;
