import React, { useState, useEffect, useRef } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Hotel_Category(props) {
  const [hotelCategory, setHotelCategory] = props.hotel_category;
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  const data = {
    resources: [
      {
        title: "Find me on Mastodon",
        link: "https://indieweb.social/@kendalmintcode",
        imageUrl: "https://placeimg.com/300/300/any",
      },
      {
        title: "Welcome to Ark Labs",
        link: "https://ark-labs.co.uk",
        imageUrl: "https://placeimg.com/300/300/animals",
      },
      {
        title: "Some sort of third title",
        link: "https://indieweb.social/@kendalmintcode",
        imageUrl: "https://placeimg.com/300/300/architecture",
      },
      {
        title: "Super item number the last",
        link: "https://indieweb.social/@kendalmintcode",
        imageUrl: "https://placeimg.com/300/300/tech",
      },
      {
        title: "Super item number the last",
        link: "https://indieweb.social/@kendalmintcode",
        imageUrl: "https://placeimg.com/300/300/tech",
      },
      {
        title: "Super item number the last",
        link: "https://indieweb.social/@kendalmintcode",
        imageUrl: "https://placeimg.com/300/300/tech",
      },
      {
        title: "Super item number the last",
        link: "https://indieweb.social/@kendalmintcode",
        imageUrl: "https://placeimg.com/300/300/tech",
      },
      {
        title: "Super item number the last",
        link: "https://indieweb.social/@kendalmintcode",
        imageUrl: "https://placeimg.com/300/300/tech",
      },
    ],
  };

  // const isDisabled = (direction) => {
  //   if (direction === "prev") {
  //     return currentIndex <= 0;
  //   }

  //   if (direction === "next" && carousel.current !== null) {
  //     return (
  //       carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
  //     );
  //   }

  //   return false;
  // };

  return (
    <div className="carousel my-12 mx-auto">
      <p className="mb-5 mt-28 w-full text-4xl font-bold text-white">
        Tipos de Alojamento
      </p>
      <div className="relative grid place-items-center overflow-hidden">
        <div className="top left absolute flex w-full justify-between">
          <button
            onClick={movePrev}
            className="z-10 w-16 rounded-lg text-center text-white transition-all duration-300 ease-in-out hover:bg-black/50 hover:opacity-100"
            // disabled={isDisabled("prev")}
          >
            <ChevronLeftIcon className="shadow-2xl" />
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="z-10 w-16 rounded-lg text-center text-white transition-all duration-300 ease-in-out hover:bg-black/50 hover:opacity-100"
            // disabled={isDisabled("next")}
          >
            <ChevronRightIcon className="shadow-2xl" />
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative z-0 flex w-full touch-pan-x snap-x snap-mandatory gap-1 overflow-hidden scroll-smooth"
        >
          {hotelCategory.map((category) => {
            return (
              <div
                key={category}
                className="carousel-item relative z-0 mx-2 block aspect-video h-72 w-full snap-start rounded-lg bg-white bg-cover bg-left-top bg-no-repeat bg-origin-padding"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/79/Ponta_Negra_Beach_Hotel.jpg"
                  class="aspect-video h-52 w-full rounded-t-lg object-cover"
                  alt=""
                />
                <div class="p-4">
                  <h3 class="text-xl font-medium text-gray-900">
                    {category.name}
                  </h3>
                  <p class="mt-1 text-gray-500">1 000 alojamentos</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
