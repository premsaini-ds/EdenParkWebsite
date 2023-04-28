
import * as React from "react";


const Arrow = (props: any) => {
    const [isshow, setIsShow] = React.useState(false)
    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 1) {
                setIsShow(true)
            } else {
                setIsShow(false)
            }
        });
    })

    return (
        <>
            {isshow && <div className={`page-up on`}>
                <a className="link-to-top" href="#">
                    <span>To top</span>
                </a>
            </div>}


        </>
    );
};
export default Arrow;