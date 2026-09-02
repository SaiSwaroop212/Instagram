const API_URL = "https://jsonplaceholder.typicode.com/photos";

let currentPage = 1;
const limit = 9;

let isLoading = false;
let hasMorePosts = true;

const loadedPostIds = new Set();

const localImages = [
    "images/img1.png",
    "images/img2.png",
    "images/img3.png",
    "images/img4.png",
    "images/img5.png",
    "images/img6.png",
    "images/img7.png",
    "images/img8.png",
    "images/img9.png"
];


// ================================
// Fetch Posts
// ================================

async function fetchPosts(page) {

    console.log("Loading page:", page);

    const response = await fetch(
        `${API_URL}?_page=${page}&_limit=${limit}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();

    console.log("API returned:", posts.length);

    return posts;
}


// ================================
// Create Post
// ================================

function createPost(post, index) {

    if (loadedPostIds.has(post.id)) {
        return null;
    }

    loadedPostIds.add(post.id);

    const article = document.createElement("article");

    article.className = "grid-post";

    // CHANGED
    const image =
        localImages[(post.id - 1) % localImages.length];

    article.innerHTML = `
        <img
            src="${image}"
            alt="${post.title}"
        >
    `;

    return article;
}


// ================================
// Render Posts
// ================================

function renderPosts(posts) {

    const grid =
        document.querySelector(".instagram-grid");

    posts.forEach((post, index) => {

        const postElement =
            createPost(post, index);

        if (postElement) {
            grid.appendChild(postElement);
        }

    });
}


// ================================
// Skeleton
// ================================

function showSkeleton() {

    const grid =
        document.querySelector(".instagram-grid");

    for (let i = 0; i < 3; i++) {

        const skeleton =
            document.createElement("article");

        skeleton.className =
            "grid-post skeleton";

        grid.appendChild(skeleton);
    }
}


function removeSkeleton() {

    document
        .querySelectorAll(".skeleton")
        .forEach((item) => item.remove());
}


// ================================
// Load Next Page
// ================================

async function loadNextPage() {

    if (isLoading || !hasMorePosts) {
        return;
    }

    isLoading = true;

    showSkeleton();

    try {

        const posts =
            await fetchPosts(currentPage);

        removeSkeleton();

        if (posts.length === 0) {

            hasMorePosts = false;

            console.log("No more posts");

            return;
        }

        renderPosts(posts);

        currentPage++;

        console.log(
            "Next page will be:",
            currentPage
        );

    } catch (error) {

        console.error("Error:", error);

        removeSkeleton();

    } finally {

        isLoading = false;
    }
}


// ================================
// Infinite Scroll
// ================================

export function setupInfiniteScroll() {

    const sentinel =
        document.querySelector("#scroll-sentinel");

    if (!sentinel) {

        console.error(
            "Scroll sentinel not found"
        );

        return;
    }

    console.log(
        "Infinite scroll setup completed"
    );

    const observer =
        new IntersectionObserver(

            (entries) => {

                if (
                    entries[0].isIntersecting
                ) {

                    console.log(
                        "Bottom reached"
                    );

                    loadNextPage();
                }

            },

            {
                root: null,

                // Changed from 300px
                rootMargin: "100px",

                threshold: 0
            }
        );

    observer.observe(sentinel);

    // Load first page
    loadNextPage();
}