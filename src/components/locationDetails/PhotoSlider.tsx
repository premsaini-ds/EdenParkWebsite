import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import bannerImage1 from "../../images/slider1.png";
import bannerImage2 from "../../images/slider2.png";
import bannerImage3 from "../../images/slider3.png";
import "@splidejs/react-splide/css";
type props = {
  photos: any;
};
const PhotoSlider = (data: props) => {

  return (
    <>
      <div className="container-full-width banner-image-slider !px-0 sm:!px-8">
        <Splide
          aria-label="Photo Slider"
          options={{
            rewind: false,
            focus: "left",
            perMove: 1,
            perPage: 1,
            gap: "20px",
            breakpoints: {
              1279: {
                rewind: false,
                focus: "left",
                perMove: 1,
                perPage: 1,
                gap: "20px",
              },
              991: {
                rewind: false,
                focus: "left",
                perMove: 1,
                perPage: 1,
                gap: "20px",
              },
              640: {
                perPage: 1,
                drag: true,
                pagination: true,
                arrows: true,
                type: "splide",
              },
            },
          }}
        >
          {(data.photos.length > 0 && data.photos) ? data.photos.map((i: any) => {
            return (
              <>
                <SplideSlide>
                  <img
                    className="banner-slider-image"
                    src={i.image?.url}
                    alt="Christmas"
                    title="image"
                  />
                </SplideSlide>
              </>
            );
          }) : <>
            <SplideSlide>
              <img
                className="banner-slider-image"
                src={bannerImage1}
                alt="Christmas"
                title="image"
              />
            </SplideSlide>
            <SplideSlide>
              <img
                className="banner-slider-image"
                src={bannerImage2}
                alt="Christmas"
                title="image"
              />
            </SplideSlide>
            <SplideSlide>
              <img
                className="banner-slider-image"
                src={bannerImage3}
                alt="Christmas"
                title="image"
              />
            </SplideSlide>

          </>}
        </Splide>
      </div>
    </>
  );
};

export default PhotoSlider;
