import { Link } from "@yext/pages/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { slugify } from "../../types/constants";
import Address from "../commons/Address";
import { phoneNumberFormat } from "../locationDetails/commonFunction";
import OpenClosedNearby from "../locationDetails/OpenCloseNearby";
import image from "../../images/diptyqueBanner.jpg";
const CitySection = (props: any) => {

    const { t, i18n } = useTranslation();
    i18n.changeLanguage(`${props.locale}`);

    let filter: any = [];
    let Count: any = [];
    if (props.filter) {
        Count = props.dm_directoryChildren && props.dm_directoryChildren.filter((res: any) => {
            if (res.c_storesType === `${props.filter}`) {
                return res.c_storesType
            }
        })
        filter.push(...Count);
    }


    const Divs = filter && filter.map((entity: any) => {

        let url = "";
        const name: any = entity.name.toLowerCase();
        const string: any = name.toString();
        const result: any = string.replaceAll(" ", "-");
        if (!entity.slug) {
            url = `${entity.id}-${result}`;
            url = slugify(url)
            url = url + ".html"
        } else {
            url = `${entity.slug.toString()}`;
            url = slugify(url)
            url = url + ".html"
        }

        const updatedPhone = phoneNumberFormat(entity.mainPhone);

        return (
            <>
                <div className="store-box">
                    {entity && entity.c_locatorInfoImage?.image.url ? (
                        <a href="">
                            <img width="610" height="343" alt="Store Image of diptyque location" src={entity.c_locatorInfoImage?.image.url} />
                        </a>
                    ) : (
                        <a href="">
                            <img width="610" height="343" alt="Store Image of diptyque particular location" src={image} />
                        </a>
                    )}
                    <div className="store-detail">
                        <div className="flex justify-between items-center my-2.5 sm:my-4">
                            <h2>
                                <a href={"/" +
                                    props.locale +
                                    "/" +
                                    url}>{entity.name}</a>
                            </h2>

                            <span className="text-green green-label">
                                {entity.hours && (
                                    <OpenClosedNearby
                                        timeZone={entity.timezone}
                                        hours={entity.hours}
                                        _site={props._site}
                                    />
                                )}
                            </span>
                        </div>

                        {/* address */}
                        {entity.address &&
                            <div className="store-address">
                                <Address address={entity.address} />
                            </div>
                        }

                        {/* phone number */}
                        {entity.mainPhone && (
                            <>
                                <div className="store-phone !mt-0">
                                    <p>
                                        <Link
                                            data-ya-track="phone"
                                            href={`tel:${entity.mainPhone}`}
                                            rel="noopener noreferrer"
                                            eventName={`phone`}
                                        >
                                            {updatedPhone}
                                        </Link>
                                    </p>
                                </div>
                            </>
                        )}
                        <div className="more-info-button">
                            <a href={"/" +
                                props.locale +
                                "/" +
                                url}>{props._site?.c_loctorMoreInformation ? props._site?.c_loctorMoreInformation : t("More information")}</a>
                        </div>
                    </div>
                </div>
            </>
        );
    });

    return (
        <>
            <div className="directory-country DM-state">
                <div className="container-full-width px-5 sm:!px-[3.75rem]">
                    <div className="directory-stores-wrapper">
                        <div className="directory-stores">
                            {props.filter && Count.length > 0 && (
                                <h3 className="store-heading">
                                    <span>{props.name}</span> DIPTYQUE<span className="store-count">({Count.length
                                    })</span>
                                </h3>
                            )}
                            <div className="store-inner-box">
                                <div className="all-stores">
                                    {Divs ? Divs : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CitySection;