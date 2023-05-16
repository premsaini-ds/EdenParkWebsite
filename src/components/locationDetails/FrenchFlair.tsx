
import * as React from "react";

type props = {
    frenchFlairDetails: any;
    FrenchSectionTitle:any;
  };

const FrenchFlair = (data: props) => {
    console.log("premsaini",data);
    return (
        <>
            {/* Start French Location Section */}
            <div className="container FrenchSection mt-5 pt-[3.75rem]">
                <div className="text-[35px] uppercase text-center mt-5 mb-5"><h2>{data?.FrenchSectionTitle}</h2></div>
                <div className="flex gap-5 mt-[2.25rem]">
                    {data?.frenchFlairDetails?.map((frenchdata:any)=>{
                         return (
                    <>
                        <div className="w-1/3">
                             <div className="SectionImg">
                                 <div className="left-img">
                                      <img src={frenchdata?.image?.url} className="w-full rounded-[12px] h-[350px]" title="french Image" alt="french image"/>
                                      <div className="absolute bottom-[0px] text-white p-5 text-center ">{frenchdata?.description}</div>
                             </div>
                            </div>
                        </div>
                    </>
                         )
                    })}
                </div>
            </div>
             {/* End French Location Section */}
        </>
        
    );
};
export default FrenchFlair;