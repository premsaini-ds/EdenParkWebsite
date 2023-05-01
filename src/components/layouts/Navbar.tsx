import { Link } from "@yext/pages/components";
import * as React from "react";

type navbar = {
  navItem: any;
  path: any;
  template: any;
  alternateSlug: any;
  lastLocale: any;
  addClass: Boolean;
};

const Navbar = (props: navbar) => {

  return (
    <div className="container-full-width HeaderMenu">
      <div className="" style={{ marginTop: "1.50rem" }}>
        <ul className={props.addClass ? "nav opened" : "nav"}>
          {props.navItem?.map((item: any) => {
            return (
              <>
                <li>
                  <Link
                    href={item.link}
                    rel="noopener noreferrer"
                    eventName={`HeaderItem`}
                  >
                    {item.label}
                  </Link>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
