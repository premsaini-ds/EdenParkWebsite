
import * as React from "react";

type props = {
    WelcomeSecData: any;
  };

const WelcomSection = (data: props) => {
    return (
        <>
        {/* Start Welcome Section on location detail */}
            <div className="container WelcomeSection mt-5 pt-[3.75rem]">
                <div className="flex gap-5">
                    <div className="w-1/2">
                        <div className="SectionLeft">
                            <div className="left-img">
                                <img src={data?.WelcomeSecData?.leftImage?.url} title="welcom Image" alt="welcome image"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 m-auto ">
                        <div className="Sectionright">
                            <div className="right-data">
                                <div className="text-[25px] uppercase">{data?.WelcomeSecData?.welcomeTitle}</div>
                                <p className="mt-5 text-[18px] leading-normal">{data?.WelcomeSecData?.welcomeDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Welcome Section on location detail */}
        </>
        
    );
};
export default WelcomSection;