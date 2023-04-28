import { Link } from "@yext/pages/components";
import * as React from "react";

type navbar = {
  listItem: any;
};

const FooterList = (props: navbar) => {
  const { listItem } = props;

  return (
    <ul>
      {props.listItem &&
        props.listItem.cta.map((i: any) => {
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
  );
};

export default FooterList;
