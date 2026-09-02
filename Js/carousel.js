export function setupCarousel() {

    document.addEventListener("click", (event) => {

        // Find clicked post
        const post = event.target.closest(".grid-post");

        if (!post) {
            return;
        }

        // Get all posts
        const allPosts = Array.from(
            document.querySelectorAll(".grid-post")
        );

        // Find clicked post index
        const clickedIndex = allPosts.indexOf(post);

        // Show only 3 posts
        const carouselPosts = allPosts.slice(
            clickedIndex,
            clickedIndex + 3
        );

        if (carouselPosts.length === 0) {
            return;
        }

        let currentIndex = 0;

        // Create carousel
        const carousel = document.createElement("div");

        carousel.className = "carousel";

        carousel.innerHTML = `
            <div class="carousel-content">

                <button class="carousel-close">
                    ×
                </button>

                <button class="carousel-prev">
                    ‹
                </button>

                <div class="carousel-post">

                    <img
                        class="carousel-image"
                        src="${carouselPosts[0]
                            .querySelector("img").src}"
                        alt="Instagram image"
                    >

                    <div class="carousel-dots"></div>

                    <div class="carousel-actions">

                        <button
                            class="carousel-like"
                            type="button"
                        >
                            ♡
                        </button>

                        <span class="carousel-like-count">
                            10 likes
                        </span>

                        <button
                            class="carousel-comment"
                            type="button"
                        >
                            💬
                        </button>

                        <button
                            class="carousel-share"
                            type="button"
                        >
                            ↗
                        </button>

                    </div>

                    <!-- Comment Box -->
                    <div class="comment-box">

                        <input
                            type="text"
                            class="comment-input"
                            placeholder="Add a comment..."
                        >

                        <button
                            class="comment-send"
                            type="button"
                        >
                            Send
                        </button>

                    </div>

                </div>

                <button class="carousel-next">
                    ›
                </button>

            </div>
        `;

        document.body.appendChild(carousel);

        // Show carousel
        carousel.style.display = "flex";


        // =================================
        // Elements
        // =================================

        const carouselImage =
            carousel.querySelector(".carousel-image");

        const dotsContainer =
            carousel.querySelector(".carousel-dots");

        const likeButton =
            carousel.querySelector(".carousel-like");

        const likeCount =
            carousel.querySelector(".carousel-like-count");

        const commentButton =
            carousel.querySelector(".carousel-comment");

        const commentBox =
            carousel.querySelector(".comment-box");

        const commentInput =
            carousel.querySelector(".comment-input");

        const sendButton =
            carousel.querySelector(".comment-send");


        // =================================
        // Store like information
        // =================================

        const likeCounts = [
            10, 25, 7, 42, 15, 30, 8, 50, 20
        ];

        const likeData = carouselPosts.map((post) => {

            const postIndex = allPosts.indexOf(post);

            return {
                liked: false,
                count:
                    likeCounts[
                        postIndex % likeCounts.length
                    ]
            };

        });


        // =================================
        // Create dots
        // =================================

        carouselPosts.forEach((post, index) => {

            const dot =
                document.createElement("span");

            dot.className = "carousel-dot";

            if (index === 0) {
                dot.classList.add("active");
            }

            dotsContainer.appendChild(dot);

        });

        const dots =
            carousel.querySelectorAll(".carousel-dot");


        // =================================
        // Update carousel
        // =================================

        function updateCarousel() {

            const currentPost =
                carouselPosts[currentIndex];

            // Change image
            carouselImage.src =
                currentPost
                    .querySelector("img")
                    .src;


            // Update dots
            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            });


            // Update like button
            if (
                likeData[currentIndex].liked
            ) {

                likeButton.textContent = "♥";

                likeButton.classList.add(
                    "liked"
                );

            } else {

                likeButton.textContent = "♡";

                likeButton.classList.remove(
                    "liked"
                );

            }


            // Update like count
            likeCount.textContent =
                `${likeData[currentIndex].count} likes`;


            // Hide comment box when changing post
            commentBox.style.display = "none";

            commentInput.value = "";

            sendButton.style.display = "none";
        }


        // =================================
        // Like / Unlike
        // =================================

        likeButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const currentLike =
                    likeData[currentIndex];


                if (currentLike.liked) {

                    // Unlike
                    currentLike.liked = false;

                    currentLike.count--;

                } else {

                    // Like
                    currentLike.liked = true;

                    currentLike.count++;

                }

                updateCarousel();

            }
        );


        // =================================
        // Comment Button
        // =================================

        commentButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                if (
                    commentBox.style.display === "flex"
                ) {

                    commentBox.style.display = "none";

                } else {

                    commentBox.style.display = "flex";

                    commentInput.focus();

                }

            }
        );


        // =================================
        // Show Send While Typing
        // =================================

        commentInput.addEventListener(
            "input",
            () => {

                if (
                    commentInput.value.trim() !== ""
                ) {

                    sendButton.style.display =
                        "block";

                } else {

                    sendButton.style.display =
                        "none";

                }

            }
        );


        // =================================
        // Send Comment
        // =================================

        sendButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const comment =
                    commentInput.value.trim();

                if (comment === "") {
                    return;
                }

                console.log(
                    "Comment:",
                    comment
                );

                // Clear input
                commentInput.value = "";

                // Hide Send button
                sendButton.style.display = "none";

            }
        );


        // =================================
        // Prevent carousel opening
        // when clicking input
        // =================================

        commentInput.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

            }
        );


        // =================================
        // Share
        // =================================

        carousel
            .querySelector(".carousel-share")
            .addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    console.log(
                        "Share clicked"
                    );

                }
            );


        // =================================
        // Close
        // =================================

        carousel
            .querySelector(".carousel-close")
            .addEventListener(
                "click",
                () => {

                    carousel.remove();

                }
            );


        // =================================
        // Previous
        // =================================

        carousel
            .querySelector(".carousel-prev")
            .addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    currentIndex--;

                    if (currentIndex < 0) {

                        currentIndex =
                            carouselPosts.length - 1;

                    }

                    updateCarousel();

                }
            );


        // =================================
        // Next
        // =================================

        carousel
            .querySelector(".carousel-next")
            .addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    currentIndex++;

                    if (
                        currentIndex >=
                        carouselPosts.length
                    ) {

                        currentIndex = 0;

                    }

                    updateCarousel();

                }
            );


        // =================================
        // Initial update
        // =================================

        updateCarousel();

    });

}