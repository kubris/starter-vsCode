// polyfill for forEach
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

// === custom select
document.querySelectorAll(".select-custom").forEach(function (selectBlock) {
	const selectField = selectBlock.querySelector(".select-custom__field");
	const selectList = selectBlock.querySelector(".select-custom__list");
	const selectItems = selectList.querySelectorAll(".select-custom__list-item");
	const selectValue = selectBlock.querySelector(".select-custom__value");

	selectField.addEventListener("click", function () {
		selectList.classList.toggle("open");
		this.classList.add("active");
	});

	selectItems.forEach(function (listItem) {
		listItem.addEventListener("click", function (e) {
			e.stopPropagation();
			selectField.focus();
			selectField.innerText = this.innerText;
			selectValue.value = this.dataset.value;
			selectList.classList.remove("open");
		});
	});

	document.addEventListener("click", function (e) {
		if (e.target !== selectField) {
			selectField.classList.remove("active");
			selectList.classList.remove("open");
		}
	});

	document.addEventListener("keydown", function (e) {
		if (e.key === "Tab" || e.key === "Escape") {
			selectField.classList.remove("active");
			selectList.classList.remove("open");
		}
	});
});
// === end custom select

// === custom price range
if (document.querySelector(".range") !== null) {
	const rangeInput = document.querySelectorAll(".range-input input"),
		priceInput = document.querySelectorAll(".range-price input"),
		progress = document.querySelector(".range-slider .progress");

	let priceGap = 550;

	priceInput.forEach((input) => {
		input.addEventListener("input", (e) => {
			let minVal = parseInt(priceInput[0].value),
				maxVal = parseInt(priceInput[1].value);

			if (maxVal - minVal >= priceGap && maxVal <= 10000) {
				if (e.target.className === "input-min") {
					rangeInput[0].value = minVal;
					progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
				} else {
					rangeInput[1].value = maxVal;
					progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
				}
			}
		});
	});

	rangeInput.forEach((input) => {
		input.addEventListener("input", (e) => {
			let minVal = parseInt(rangeInput[0].value),
				maxVal = parseInt(rangeInput[1].value);

			if (maxVal - minVal < priceGap) {
				if (e.target.className === "range-min") {
					rangeInput[0].value = maxVal - priceGap;
				} else {
					rangeInput[1].value = minVal + priceGap;
				}
			} else {
				priceInput[0].value = minVal;
				priceInput[1].value = maxVal;
				progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
				progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
			}
		});
	});
}
// === end custom price range

// === tabs
if ($(".tabs").length !== 0) {
	$(".tabs-content__text").not(":first").hide();
	$(".tabs-tags__tag")
		.click(function () {
			$(".tabs-tags__tag").removeClass("active").eq($(this).index()).addClass("active");
			$(".tabs-content__text").hide().eq($(this).index()).fadeIn();
		})
		.eq(0)
		.addClass("active");
}
// === end tabs

// === select field
if ($(".drop-input")) {
	$(".drop-input").on("click", function () {
		$(".drop-input").not(this).siblings(".drop-sublist").slideUp().removeClass("open");
		$(".drop-input").not(this).removeClass("turn");

		$(this).siblings(".drop-sublist").slideToggle("open");
		$(this).toggleClass("turn");
	});

	$(".drop-sublist li").click(function () {
		var res = $(this).text();
		$(this).parent().prev().prev(".drop-input").val(res);
		$(this).parent(".drop-sublist").slideUp().removeClass("open");
		$(this).parent().prev().prev(".drop-input").removeClass("turn");
	});

	$(document).on("click", function (e) {
		if (!$(e.target).closest(".drop-list").length) {
			$(".drop-sublist").slideUp().removeClass("open");
			$(".drop-input").removeClass("turn");
		}
		e.stopPropagation();
	});
}
// === end select field

// === SWIPER slider
if ($(".swiper").length !== 0) {
	const swiper = new Swiper(".swiper", {
		direction: "horizontal",
		loop: true,
		speed: 800,
		//initialSlide: 0, // 0 - first slide
		//slidesPerView: 2,
		//centeredSlides: true,
		effect: "cube", //'slide','fade','cube','coverflow','flip',  'creative','cards'
		cubeEffect: {
			slideShadows: false,
		},

		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		// autoplay: {
		// 	delay: 3000,
		// },
	});
}
// === end SWIPER slider

// === SLIDER
if ($(".slider-list").length !== 0) {
	const slider = new Swiper(".slider-list", {
		direction: "horizontal",
		loop: true,
		speed: 800,
		slidesPerView: 1,

		pagination: {
			el: ".slider-pagination",
			clickable: true,
			type: "bullets", // 'bullets', 'fraction', 'progressbar' or 'custom'
		},

		navigation: {
			nextEl: ".slider-button-next",
			prevEl: ".slider-button-prev",
		},

		breakpoints: {
			// width is >= 320px
			300: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 15,
			},
		},
	});
}
// === end SLIDER

// === SLIDER-SEC
if ($(".slider-sec-list").length !== 0) {
	const sliderSec = new Swiper(".slider-sec-list", {
		direction: "horizontal",
		loop: true,
		speed: 800,
		slidesPerView: "auto",
		spaceBetween: 15,

		pagination: {
			el: ".slider-sec-pagination",
			clickable: true,
			type: "fraction",
		},

		navigation: {
			nextEl: ".slider-sec-button-next",
			prevEl: ".slider-sec-button-prev",
		},
	});
}
// === end SLIDER-SEC

// === SLIDER CENTER
if ($(".slider-center-list").length !== 0) {
	const sliderCenter = new Swiper(".slider-center-list", {
		direction: "horizontal",
		loop: true,
		centeredSlides: true,
		speed: 800,
		slidesPerView: 1,

		pagination: {
			el: ".slider-center-pagination",
			clickable: true,
			type: "bullets", // 'bullets', 'fraction', 'progressbar' or 'custom'
		},

		navigation: {
			nextEl: ".slider-center-button-next",
			prevEl: ".slider-center-button-prev",
		},

		breakpoints: {
			// width is >= 320px
			300: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 45,
			},
			1241: {
				slidesPerView: 3,
				spaceBetween: 80,
			},
		},
	});
}
// === end SLIDER CENTER

// === SLIDER WIDTH
if ($(".slider-width-list").length !== 0) {
	const sliderWidth = new Swiper(".slider-width-list", {
		slidesPerView: 5,
		centeredSlides: true,
		loop: true,
		spaceBetween: 20,
		pagination: {
			el: ".slider-width-pagination",
			clickable: true,
			type: "bullets",
		},
		navigation: {
			nextEl: ".slider-width-button-next",
			prevEl: ".slider-width-button-prev",
		},
	});
}
// === end SLIDER WIDTH

// === SLIDER LAZY
if ($(".slider-lazy__list").length !== 0) {
	const sliderLazy = new Swiper(".slider-lazy__list", {
		loop: true,
		slidesPerView: 3,
		spaceBetween: 10,
		lazyPreloadPrevNext: 1,

		pagination: {
			el: ".slider-lazy__pagination",
			clickable: true,
			type: "bullets",
		},

		navigation: {
			nextEl: ".slider-lazy__button-next",
			prevEl: ".slider-lazy__button-prev",
		},
	});
}
// === end SLIDER LAZY

// === SLIDER VERTICAL
if ($(".slider-vertical__nav").length !== 0) {
	const sliderVertNav = new Swiper(".slider-vertical__nav", {
		slidesPerView: 5,
		spaceBetween: 10,
		freeMode: true,
		direction: "vertical",
	});

	const sliderVertMain = new Swiper(".slider-vertical__main", {
		spaceBetween: 10,
		navigation: {
			nextEl: ".slider-vertical__button-next",
			prevEl: ".slider-vertical__button-prev",
		},
		thumbs: {
			swiper: sliderVertNav,
		},
	});
}
// === end SLIDER VERRTICAL

// === SLIDER OWN CLASS
if ($(".slider-ownClass-list").length !== 0) {
	const sliderOwnClass = new Swiper(".slider-ownClass-list", {
		loop: true,
		slidesPerView: 3,
		spaceBetween: 10,
		wrapperClass: "slider-ownClass-block",
		slideClass: "slider-ownClass-item",

		pagination: {
			el: ".slider-ownClass-pagination",
			clickable: true,
			type: "bullets",
		},

		navigation: {
			nextEl: ".slider-ownClass-button-next",
			prevEl: ".slider-ownClass-button-prev",
		},
	});
}
// === end SLIDER OWN CLASS

// === SLIDER METHODS
if ($(".slider-methods-list").length !== 0) {
	const sliderMethods = new Swiper(".slider-methods-list", {
		loop: true,
		slidesPerView: 3,
		spaceBetween: 10,
		wrapperClass: "slider-methods-block",
		slideClass: "slider-methods-item",

		pagination: {
			el: ".slider-methods-pagination",
			clickable: true,
			type: "bullets",
		},

		navigation: {
			nextEl: ".slider-methods-button-next",
			prevEl: ".slider-methods-button-prev",
		},
	});

	document.querySelector(".slide-to").addEventListener("click", () => {
		sliderMethods.slideTo(4);
	});
	document.querySelector(".slide-dest").addEventListener("click", () => {
		sliderMethods.destroy();
	});
	document.querySelector(".slide-hide").addEventListener("click", () => {
		$(".slider-methods-list").fadeOut();
	});
	document.querySelector(".slide-update").addEventListener("click", () => {
		$(".slider-methods-list").removeAttr("style");
		//$('.slider-methods-list').css('display','flex');
		// $('.slider-methods-list').css('display','flex').hide().fadeIn().removeAttr('style');
		sliderMethods.update();
	});
	sliderMethods.on("transitionEnd", () => {
		console.log("Current index: " + sliderMethods.realIndex);
	});
}
// === end SLIDER METHODS

// === SLIDER WITH SAME CLASSES
if ($(".slider-methods-list").length !== 0) {
	const slidersSame = document.querySelectorAll(".slider-same-list");
	slidersSame.forEach((el) => {
		let slidersSameItem = new Swiper(el, {
			loop: true,
			slidesPerView: 1,

			navigation: {
				nextEl: el.querySelector(".slider-same-button-next"),
				prevEl: el.querySelector(".slider-same-button-prev"),
			},
		});
	});
}
// === end SLIDER WITH SAME CLASSES

// === SLIDER ON BG WITH FADE-EFFECT
if ($(".s-slider-list").length !== 0) {
	const sSlider = new Swiper(".s-slider-list", {
		loop: true,
		speed: 1000,
		slidesPerView: 1,
		autoplay: {
			delay: 3000,
		},
		effect: "fade",
	});
}
// === end SLIDER ON BG WITH FADE-EFFECT

// === SLIDER IN MOBILE
if ($(".slider-mobile-list").length !== 0) {
	const sliderMobile = document.querySelector(".slider-mobile-list");

	let mySliderMobile;

	mobileSlider();

	window.addEventListener("resize", () => {
		mobileSlider();
	});
}
function mobileSlider() {
	if (window.innerWidth <= 678 && sliderMobile.dataset.mobile == "false") {
		mySliderMobile = new Swiper(".slider-mobile-list", {
			slidesPerView: 1,
			loop: true,
			spaceBetween: 15,
			//autoplay: true,
			//slideClass: "slider-mobile-item",
		});
		sliderMobile.dataset.mobile = "true";
	}

	if (window.innerWidth > 678 && sliderMobile.dataset.mobile == "true") {
		sliderMobile.dataset.mobile = "false";
		mySliderMobile.destroy();
	}
}
// === end SLIDER IN MOBILE

// === ACCORDION
if (".accordion") {
	// --- All content closed
	//$(".accordion-content").slideUp();
	// --- end All content closed

	// --- First content open
	$(".accordion-content:not(:first)").slideUp();
	$(".accordion-title").eq(0).children("i").first().addClass("i-turn");
	// -- end First content open

	$(document).on("click", ".accordion-title", (ev) => {
		$(ev.target).next(".accordion-content").slideToggle().siblings(".accordion-content").slideUp();

		if (!$(ev.target).children("i").first().hasClass("i-turn")) {
			$(".accordion-title").each(function () {
				$(this).children("i").first().removeClass("i-turn");
			});
		}

		$(ev.target).children("i").first().toggleClass("i-turn");
	});
}
// === end ACCORDION
