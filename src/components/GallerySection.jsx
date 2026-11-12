import React, { useState, useEffect, useRef } from "react";

const GallerySection = () => {
  const originalImages = [
    { id: 1, url: "/gallery1.jpg", alt: "GalleryImage1" },
    { id: 2, url: "/gallery2.jpg", alt: "GalleryImage2" },
    { id: 3, url: "/gallery3.jpg", alt: "GalleryImage3" },
    { id: 4, url: "/gallery4.jpg", alt: "GalleryImage4" },
    { id: 5, url: "/gallery5.jpg", alt: "GalleryImage5" },
    { id: 6, url: "/gallery6.jpg", alt: "GalleryImage6" },
    { id: 7, url: "/gallery7.jpg", alt: "GalleryImage7" },
    { id: 8, url: "/gallery8.jpg", alt: "GalleryImage8" },
    { id: 9, url: "/gallery9.jpg", alt: "GalleryImage9" },
    { id: 10, url: "/gallery10.jpg", alt: "GalleryImage10" },
  ];

  const tripleGallery = [...originalImages, ...originalImages, ...originalImages];
  const totalOriginalItems = originalImages.length;

  const [activeIndex, setActiveIndex] = useState(totalOriginalItems);
  const [isMobile, setIsMobile] = useState(false);
  const [cardWidthPercent, setCardWidthPercent] = useState(() => {
    if (window.innerWidth < 640) return 100;
    if (window.innerWidth < 768) return 50;
    if (window.innerWidth < 1024) return 100 / 3;
    return 50;
  });
  const containerRef = useRef(null);

  // Match the carousel offset to the responsive card width.
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setCardWidthPercent(
        width < 640 ? 100 : width < 768 ? 50 : width < 1024 ? 100 / 3 : 50
      );
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Auto-slide interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 1800);

    return () => clearInterval(intervalId);
  }, []);

  // Reset transition for infinite loop
  useEffect(() => {
    if (activeIndex >= totalOriginalItems * 2) {
      const timeout = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          setActiveIndex(totalOriginalItems);

          // Force reflow
          containerRef.current.offsetHeight;

          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.transition =
                "transform 500ms ease-in-out";
            }
          }, 20);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [activeIndex, totalOriginalItems]);

  const translateValue = `translateX(-${activeIndex * cardWidthPercent - (100 - cardWidthPercent) / 2}%)`;

  const getOriginalIndex = (index) => index % totalOriginalItems;

  return (
   <section id="journey" className="w-full mx-auto px-2 relative overflow-hidden bg-[#060608] py-20 sm:py-28">
      <div className="container mx-auto overflow-hidden text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 font-mono text-xs uppercase tracking-widest mb-4">
          <span>INNOVERSE LEGACY ARCHIVES</span>
        </div>
        <h2 className="mb-2 text-center font-display text-3xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
          The Journey <span className="text-amber-400">So Far</span>
        </h2>
        <p className="mb-12 text-center font-sans text-sm leading-relaxed text-gray-400 sm:text-base">
          Highlights{" "}
          <span className="text-amber-400">
            from Past Editions
          </span>{" "}
          leading up to INNOVERSE 3.0
        </p>

        <div className="slider overflow-hidden relative w-full lg:w-4/5 mx-auto rounded-xl py-3 sm:py-10">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out -mx-2"
            style={{
              transform: translateValue,
            }}
          >
            {tripleGallery.map((image, index) => {
              const isHighlighted = index === activeIndex;

              return (
                <div
                  key={index}
                  className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/2 px-2 sm:px-3 md:px-4"
                  onClick={() => setActiveIndex(index)}
                >
                  <div
                    className={`relative w-full transition-all duration-300 transform cursor-pointer rounded-xl
                      ${
                        isHighlighted
                          ? "scale-110 shadow-md shadow-slate-900/50 z-10 bg-gray-900"
                          : "scale-90 opacity-70 shadow-md bg-gray-800"
                      }`}
                    style={{ padding: isMobile ? '16px' : '20px' }}
                  >
                    <div className="relative w-full aspect-video">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className={`w-full h-full object-cover rounded-lg ${
                          isHighlighted ? "border-2 border-gray-50" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {originalImages.map((_, index) => (
            <span
              key={index}
              onClick={() => setActiveIndex(index + totalOriginalItems)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                getOriginalIndex(activeIndex) === index
                  ? "bg-amber-400 shadow-md shadow-amber-400/40"
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to image ${index + 1}`}
            ></span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GallerySection;