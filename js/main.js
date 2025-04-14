document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".header__burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenu = document.querySelector(".mobile-menu__close");
  const body = document.body;

  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      body.classList.toggle("no-scroll");
    });

    if (closeMenu) {
      closeMenu.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        burger.classList.remove("active");
        body.classList.remove("no-scroll");
      });
    }
  }

  const mobileNavItems = document.querySelectorAll(".mobile-menu__nav-item");

  mobileNavItems.forEach((item) => {
    const link = item.querySelector(".mobile-menu__nav-link");
    const arrow = item.querySelector(".mobile-menu__nav-arrow");

    if (arrow) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        item.classList.toggle("active");
      });
    }
  });

  initHeroSlider();

  function initHeroSlider() {
    const slides = document.querySelectorAll(".hero__slide");
    const prevBtn = document.querySelector(".hero__slider-arrow--prev");
    const nextBtn = document.querySelector(".hero__slider-arrow--next");
    const dots = document.querySelectorAll(".hero__slider-dot");

    if (!slides.length) return;

    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });

      dots.forEach((dot) => {
        dot.classList.remove("active");
      });

      slides[index].classList.add("active");

      if (dots[index]) {
        dots[index].classList.add("active");
      }
    }

    showSlide(currentSlide);

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
    }

    if (dots.length) {
      dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
          currentSlide = index;
          showSlide(currentSlide);
        });
      });
    }

    let touchStartX = 0;
    let touchEndX = 0;
    const slider = document.querySelector(".hero__slider");

    if (slider) {
      slider.addEventListener(
        "touchstart",
        function (e) {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      slider.addEventListener(
        "touchend",
        function (e) {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
        },
        { passive: true }
      );

      function handleSwipe() {
        const threshold = 50;

        if (touchEndX - touchStartX > threshold) {
          currentSlide = (currentSlide - 1 + slides.length) % slides.length;
          showSlide(currentSlide);
        } else if (touchStartX - touchEndX > threshold) {
          currentSlide = (currentSlide + 1) % slides.length;
          showSlide(currentSlide);
        }
      }
    }
  }
});
