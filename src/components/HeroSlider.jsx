import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroBanner from "./HeroBanner";
import Partnership from "./Partnership";

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            type="button"
            role="presentation"
            className="owl-next absolute top-1/2 right-[30px] -translate-y-1/2 z-50 w-[60px] h-[60px] bg-white/10 hover:bg-[#ffcb07] text-white rounded-full flex items-center justify-center transition-all duration-500 ease-in-out border border-white/20 hover:border-[#ffcb07] group cursor-pointer"
            onClick={onClick}
        >
            <span className="icon fa fa-angle-right text-xl transition-transform duration-300 group-hover:translate-x-1" />
        </button>
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            type="button"
            role="presentation"
            className="owl-prev absolute top-1/2 left-[30px] -translate-y-1/2 z-50 w-[60px] h-[60px] bg-white/10 hover:bg-[#ffcb07] text-white rounded-full flex items-center justify-center transition-all duration-500 ease-in-out border border-white/20 hover:border-[#ffcb07] group cursor-pointer"
            onClick={onClick}
        >
            <span className="icon fa fa-angle-left text-xl transition-transform duration-300 group-hover:-translate-x-1" />
        </button>
    );
};

const customDots = (dots) => (
    <div className="absolute bottom-[30px] w-full flex justify-center z-50">
        <div className="owl-dots flex gap-3">{dots}</div>
    </div>
);

const customPaging = (i) => (
    <button
        role="button"
        className="owl-dot w-[12px] h-[12px] rounded-full bg-white/40 hover:bg-[#ffcb07] transition-all duration-300 p-0 before:hidden"
    >
        <span className="sr-only">Slide {i + 1}</span>
    </button>
);

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        beforeChange: (current, next) => setCurrentSlide(next),
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        appendDots: customDots,
        customPaging: customPaging,
    };

    return (
        <section className="banner-section banner-two relative overflow-hidden">
            <Slider {...settings} className="banner-carousel owl-theme owl-carousel">
                {/* Slide 1 - HeroBanner */}
                <div className="slide-item relative h-[80vh] min-h-[600px] flex items-center">
                    <div
                        className="image-layer absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                        style={{ backgroundImage: "url('/home/bg-4.webp')" }}
                    />
                    <div className="absolute inset-0 bg-[#06235f]/60 z-[1]" />
                    <div className="shape-1 absolute top-[10%] left-[5%] w-[100px] h-[100px] border-2 border-white/10 rounded-full animate-spin-slow z-[2]" />
                    <div className="shape-2 absolute bottom-[20%] right-[10%] w-[150px] h-[150px] border border-white/10 rotate-45 animate-pulse z-[2]" />
                    <div className="shape-3 absolute top-[40%] right-[15%] w-[50px] h-[50px] bg-[#ffcb07]/20 rounded-full blur-md z-[2]" />
                    <div className="shape-4 absolute bottom-[10%] left-[15%] w-[80px] h-[80px] border border-[#ffcb07]/30 rotate-12 z-[2]" />
                    <div className="shape-5 absolute top-[20%] right-[30%] w-[30px] h-[30px] bg-white/20 rounded-full z-[2]" />
                    <div className="shape-6 absolute bottom-[30%] left-[30%] w-[60px] h-[60px] border border-white/10 rotate-45 z-[2]" />

                    <div className="auto-container relative z-10 h-full max-w-7xl mx-auto px-6 w-full flex items-center">
                        <div className="content-box w-full">
                            <div className="content">
                                <HeroBanner isActive={currentSlide === 0} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide 2 - Partnership */}
                <div className="slide-item relative h-[80vh] min-h-[600px] flex items-center">
                    <div
                        className="image-layer absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                        style={{ backgroundImage: "url('/home/digital-app-innovation-banner-image.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-[#06235f]/60 z-[1]" />
                    <div className="shape-1 absolute top-[15%] right-[5%] w-[120px] h-[120px] border-2 border-[#ffcb07]/20 rounded-full animate-spin-slow z-[2]" />
                    <div className="shape-2 absolute bottom-[15%] left-[10%] w-[100px] h-[100px] border border-white/10 rotate-45 animate-pulse z-[2]" />
                    <div className="shape-3 absolute top-[30%] left-[20%] w-[60px] h-[60px] bg-white/10 rounded-full blur-md z-[2]" />
                    <div className="shape-4 absolute top-[10%] left-[10%] w-[80px] h-[80px] border border-white/20 rotate-12 z-[2]" />
                    <div className="shape-5 absolute bottom-[20%] right-[20%] w-[40px] h-[40px] bg-white/20 rounded-full z-[2]" />
                    <div className="shape-6 absolute top-[40%] right-[10%] w-[70px] h-[70px] border border-white/10 rotate-45 z-[2]" />

                    <div className="auto-container relative z-10 h-full max-w-7xl mx-auto px-6 w-full flex items-center">
                        <div className="content-box w-full">
                            <div className="content">
                                <Partnership isActive={currentSlide === 1} />
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
            <style jsx global>{`
                .slick-dots li.slick-active button {
                    background-color: #ffcb07 !important;
                    transform: scale(1.2);
                }
                .slick-slide > div {
                    outline: none;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 15s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default HeroSlider;
