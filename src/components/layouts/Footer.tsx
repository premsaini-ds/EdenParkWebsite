import * as React from "react";
import { svgIcons } from "../../svgIcon ";
type footer = {
 
  footerData: any;
};
let FooterContent: any = "";
let c_footerAllMenus: any;


const Footer = (props: footer) => {
  // action toggle switcher-trigger

  FooterContent = props?.footerData?.c_footerBottomContent;
  c_footerAllMenus = props?.footerData.c_footerAllMenus;


  console.log(props.footerData, "footerData");


  
  return (
    <>
      <footer className="page-footer">
        <div className="container-full-width">
          <div className="footer content">
            <div className="footer-pages-links">
              <div className="footer-columns">
                <div className="column column1">
                  <div className="footer-logo">
                    {/* Site Logo */}
                    <img
                      width="200"
                      height="200"
                      alt="logo"
                      src={props.footerData?.c_footerLogo?.url}
                    />
                    {/* Site Logo */}
                  </div>
                </div>

          {c_footerAllMenus && c_footerAllMenus.map((item: any, index: number) => {
              return (
                <>
                <div className="column column2">
                  <div className="-footerlogo_sec">
                    <p>
                         {item.footerMenuTitle}
                    </p>
                    <ul className="menu-list">
                    {item.footerMenus && item.footerMenus.map((itemmenu: any, index: number) => {
                          return (
                            <>
                               <li>
                                <a
                                  href= {itemmenu.link}
                                  title="Do Son">
                                  {itemmenu.label}
                                  </a>
                              </li>
                            </>
                          )
                    })}
                     
                    </ul>
                  </div>
                </div>
                  
                </> 
          )
})}
                <div className="column column4">
                  <div className="em-client__colophon">
                  {props?.footerData?.c_footerBottomContent?.map((data: any) => {
                        return (
                          <>
                            <p>{data}</p>
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
           <div className="copyright-footer">
              <div className="em-copyright">
                {props.footerData?.c_copyrightText}
              </div>
              <div className="payment-options">
              {props?.footerData?.c_footerPayment.textPayment ? (
                    <>
                         <span>{props?.footerData?.c_footerPayment.textPayment}</span>
                    </>
              ) : (<></>)
            }
              {props?.footerData?.c_footerPayment.paymentImage?.url ? (
                    <>
                        <img src={props?.footerData?.c_footerPayment.paymentImage?.url}></img>
                       
                    </>
                  ) : (
                    <>
                        {svgIcons.paymentimg}
                    </>
                    )}

              </div>
           </div>
          </div>
        </div>
      </footer>
      <script async src="https://assets.sitescdn.net/ytag/ytag.min.js"></script>
    </>
  );
};

export default Footer;
