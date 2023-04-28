import { Link } from "@yext/pages/components";
import * as React from "react";
import { phoneNumberFormat, separatePhoneNumber } from "../locationDetails/commonFunction";

const PhoneNumber = (props: any) => {

    const getnumber = separatePhoneNumber(props.phone)
    const newcode = getnumber.phoneCode;
    const newnumber = getnumber.newnumber;

    const number = phoneNumberFormat(newnumber);

    const formattednumber = newcode + " " + number;
    return (
        <>

            <Link
                data-ya-track="phone"
                href={`tel:${formattednumber}`}
                rel="noopener noreferrer"
                eventName={`phone`}
            >
                {formattednumber}
            </Link>

        </>
    );
};
export default PhoneNumber;