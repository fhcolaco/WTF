import React, { useEffect, useState, useRef } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function Destaques(props) {
  const hotel = props.hotel_list;
  const [topHoteis, setTopHoteis] = useState([0]);
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
        Destaques
      </p>
      <div className="relative grid place-items-center overflow-hidden">
        <div className="top left absolute flex  w-full justify-between">
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
          className="carousel-container relative z-0 flex h-64 w-full touch-pan-x snap-x snap-mandatory gap-1 overflow-hidden scroll-smooth"
        >
          {topHoteis.map((index) => {
            return (
              <NavLink
                to={`/hoteldetail/${hotel[index]._id}`}
                key={index}
                className="carousel-item relative z-0 mx-2 block aspect-video w-full snap-start rounded-xl bg-white bg-[url(https://www.kayak.pt/rimg/himg/9f/e7/f6/arbisoftimages-59430-Facade-lower-image.jpg?width=1366&height=768&xhint=832&yhint=377&crop=true)] bg-cover bg-left-top bg-no-repeat bg-origin-padding"
              >
                <span className="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                  4.5
                  <StarIcon class="ml-1.5 h-4 w-4 fill-yellow-300 text-yellow-300" />
                </span>
                <div className="relative h-full rounded-xl bg-black bg-opacity-40 p-5 pt-44 text-white hover:bg-opacity-10">
                  <h3 className="text-2xl font-bold">{hotel[index].name}</h3>
                  <p className="text-sm">Localização</p>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

{
  /* <p className="mb-5 mt-28 ml-6 w-full text-4xl font-bold text-white">
              Destaques
            </p>
            <div className=" flex flex-row justify-center rounded-lg py-6 ">
              {topHoteis.map((index) => {
                return (
                  <a
                    href="#"
                    className={`relative mx-2 block w-full overflow-hidden rounded-xl bg-[url(https://www.kayak.pt/rimg/himg/9f/e7/f6/arbisoftimages-59430-Facade-lower-image.jpg?width=1366&height=768&xhint=832&yhint=377&crop=true)] bg-cover bg-center bg-no-repeat`}
                  >
                    <span className="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                      4.5
                      <StarIcon class="ml-1.5 h-4 w-4 fill-yellow-300 text-yellow-300" />
                    </span>
                    <div className="relative bg-black bg-opacity-40 p-8 pt-40 text-white hover:bg-opacity-10">
                      <h3 className="text-2xl font-bold">
                        {hotel[index].name}
                        {console.log("INDEX: ", index)}
                      </h3>
                      <p className="text-sm">Localização</p>
                    </div>
                  </a>
                );
              })}
            </div> */
}
