import { Link } from "@yext/pages/components";
import * as React from "react";
import Content from "./ReadMore";
type props = {
  informationsectionPart1: any;
  informationsectionPart2: any;
};

const AboutSection = (about: props) => {
  return (
    <>
      {/* section address */}

      {about.informationsectionPart2 && (
        <div className="container-full-width px-5 sm:!px-[3.75rem] clear-both">
          <div className="about-sec about-primary mb-16 md:mb-20">
            {about.informationsectionPart2.aboutAddressImage &&
              (about.informationsectionPart2.aboutAddressHeading ||
                about.informationsectionPart2.aboutAddressDescription ||
                about.informationsectionPart2.aboutAddressLearnMoreCTA) && (
                <>
                  <div className="about-inner-sec">
                    <div className="about-content order-2 md:order-1">
                      <div className="">
                        {/* heading for desktop start */}
                        {about.informationsectionPart2.aboutAddressHeading && (
                          <>
                            <h2
                              className="text-center hidden md:block px-5"
                              style={{ color: "#000" }}
                            >
                              {
                                about.informationsectionPart2
                                  .aboutAddressHeading
                              }
                            </h2>
                          </>
                        )}
                        {/* heading for desktop end */}

                        {about.informationsectionPart2
                          .aboutAddressDescription && (
                            <>
                              <div className="text-black font-light text-sm sm:text-base mt-4 sm:mt-[1.875rem] mb-[1.563rem] sm:mb-[3.125rem] text-center">
                                {about.informationsectionPart2 ? (
                                  <Content
                                    label={
                                      about.informationsectionPart2.readMoreLabel
                                    }
                                    data={
                                      about.informationsectionPart2
                                        .aboutAddressDescription
                                    }
                                  />
                                ) : (
                                  <Content
                                    label="Read More"
                                    data={
                                      about.informationsectionPart2
                                        .aboutAddressDescription
                                    }
                                  />
                                )}
                              </div>
                            </>
                          )}
                        {about?.informationsectionPart2?.aboutAddressLearnMoreCTA?.link &&
                          about?.informationsectionPart2?.aboutAddressLearnMoreCTA?.label && (
                            <>
                              <div className="text-center">
                                <Link
                                  data-ya-track="directions"
                                  className="button"
                                  href={
                                    about.informationsectionPart2
                                      .aboutAddressLearnMoreCTA.link
                                  }
                                >
                                  {
                                    about.informationsectionPart2
                                      .aboutAddressLearnMoreCTA.label
                                  }
                                </Link>
                              </div>
                            </>
                          )}
                      </div>
                    </div>
                    <div className="w-full  md:w-2/4 xl:w-2/4 relative  left-0 lg:h-full order-1 md:order-2">
                      {/* heading for mobile view start */}
                      {about.informationsectionPart2.aboutAddressHeading && (
                        <>
                          <h2
                            className="text-center block md:hidden mb-5"
                            style={{ color: "#000" }}
                          >
                            {about.informationsectionPart2.aboutAddressHeading}
                          </h2>
                        </>
                      )}
                      {/* heading for mobile view end */}
                      <img
                        src={
                          about.informationsectionPart2.aboutAddressImage.image
                            .url
                        }
                      />
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      )}

      {/* section candle */}

      {about.informationsectionPart1 && (
        <div className="container-full-width px-5 sm:!px-[3.75rem] clear-both">
          <div className="about-sec about-secondary candle-of-month">
            {about.informationsectionPart1?.candleOfTheMonthImage &&
              (about.informationsectionPart1.candleOfTheMonthHeading ||
                about.informationsectionPart1.candleOfTheMonthDescription ||
                about.informationsectionPart1.cta) && (
                <>
                  <div className="about-inner-sec">
                    <div className="w-full md:w-2/4 xl:w-2/4 relative  left-0 lg:h-full ">
                      {about.informationsectionPart1
                        .candleOfTheMonthHeading && (
                          <>
                            <h2
                              className="text-center block md:hidden mb-5"
                              style={{ color: "#000" }}
                            >
                              {
                                about.informationsectionPart1
                                  .candleOfTheMonthHeading
                              }
                            </h2>
                          </>
                        )}
                      <img
                        src={
                          about.informationsectionPart1?.candleOfTheMonthImage
                            .image.url
                        }
                      />
                    </div>
                    <div className="about-content md:pl-10 lg:pl-36">
                      <div className="">
                        {about.informationsectionPart1
                          .candleOfTheMonthHeading && (
                            <>
                              <h2
                                className="text-center hidden md:block"
                                style={{ color: "#000" }}
                              >
                                {
                                  about.informationsectionPart1
                                    .candleOfTheMonthHeading
                                }
                              </h2>
                            </>
                          )}
                        {about.informationsectionPart1
                          .candleOfTheMonthSubHeading && (
                            <>
                              <h3
                                className="text-center small-about-heading"
                                style={{ color: "#000" }}
                              >
                                {
                                  about.informationsectionPart1
                                    .candleOfTheMonthSubHeading
                                }
                              </h3>
                            </>
                          )}
                        {about?.informationsectionPart1?.candleOfTheMonthDescription && (
                          <>
                            <div className="text-black font-light text-sm sm:text-base mt-1.5 sm:mt-[1.875rem] mb-[1.563rem] sm:mb-[3.125rem] text-center">
                              {about?.informationsectionPart1?.cta ? (
                                <Content
                                  label={
                                    about?.informationsectionPart1?.cta?.label
                                  }
                                  data={
                                    about?.informationsectionPart1?.candleOfTheMonthDescription
                                  }
                                />
                              ) : (
                                <Content
                                  label="Read More"
                                  data={
                                    about?.informationsectionPart1?.candleOfTheMonthDescription
                                  }
                                />
                              )}
                            </div>
                          </>
                        )}
                        {about?.informationsectionPart1?.bookInStoreCTA?.link &&
                          about?.informationsectionPart1?.bookInStoreCTA
                            ?.label && (
                            <>
                              <div className="text-center">
                                <Link
                                  data-ya-track="directions"
                                  className="button"
                                  href={
                                    about?.informationsectionPart1?.bookInStoreCTA?.link
                                  }
                                >
                                  {
                                    about?.informationsectionPart1?.bookInStoreCTA?.label
                                  }
                                </Link>
                              </div>
                            </>
                          )}
                        {about?.informationsectionPart1?.discoverTheCandleCTA?.link &&
                          about?.informationsectionPart1?.discoverTheCandleCTA?.label && (
                            <>
                              <div className="text-center about-button-lite">
                                <Link
                                  data-ya-track="directions"
                                  href={
                                    about?.informationsectionPart1?.discoverTheCandleCTA?.link
                                  }
                                >
                                  {
                                    about?.informationsectionPart1?.discoverTheCandleCTA?.label
                                  }
                                </Link>
                              </div>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default AboutSection;
