import * as React from "react";

type footer = {
  footerData: any;

};
let FooterContent: any = "";
const Footer = (props: footer) => {
  // action toggle switcher-trigger

 
 FooterContent = props?.footerData?.c_footerBottomContent;
//  console.log(FooterContent,"footerData");
  return (
    <>
      <footer className="page-footer">
        <div className="container-full-width">
          <div className="footer content">
            {/* Crawled Footer From Live Site */}
              <div className="footer-logo">
                {/* Site Logo */}
                  <img
                    width="200"
                    height="200"
                    alt="logo"
                    src={
                      props.footerData?.c_footerLogo?.url}
                  />
                  {/* Site Logo */}
              </div>
               {/* footer Content */}
              <div className="em-client__colophon">
                      {FooterContent?.map((data: any) => {
                        return(
                          <>
                              <p>{data}</p>
                          </>
                        )
                      
                      })}
                       
              </div>
              <div className="em-copyright">
                   { props.footerData?.c_copyrightText} 
              </div>
               {/* footer Content */}
            {/* Crawled Footer From Live Site */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
