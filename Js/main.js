import { setupSearch } from "./debounce.js";

import { setupInfiniteScroll } from "./infinite-scroll/infiniteScroll.js";
import { setupCarousel } from "./carousel.js";

document.addEventListener("DOMContentLoaded", () => {
    setupSearch();
    
    setupInfiniteScroll();
    setupCarousel();

    console.log("Instagram page loaded");
});