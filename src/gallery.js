document.addEventListener("DOMContentLoaded", () => {
    Fancybox.bind('[data-fancybox="gallery"]', {
        groupAll: true,
        infinite: true,
        Thumbs: false,
        Toolbar: false,
        Carousel: {
            Dots: true,
        },
        on: {
            reveal: (fancybox, slide) => {
                if (slide.$content) {
                    const swiperContainer = slide.$content.querySelector(".swiper");
                    if (swiperContainer) {
                        new Swiper(swiperContainer, {
                            slidesPerView: 1,
                            loop: true,
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            },
                        });
                    }
                }
            },
        },
    });
});
