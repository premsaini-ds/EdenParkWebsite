import * as React from "react";

type Props = {
  title?: string;
  _site?: any;
  children?: React.ReactNode;
  locale?: string;
};

const PageLayout = ({ children }: Props) => {
  var len = 0;

  return <div className="">{children}</div>;
};

export default PageLayout;
