function debounce(callback, delay) { 
 
    let timer; 
 
    return function (...args) { 
 
        clearTimeout(timer); 
 
        timer = setTimeout(() => { 
 
            callback(...args); 
 
        }, delay); 
    }; 
} 
 
 
export function setupSearch() { 
 
    const searchInput = 
        document.querySelector("#searchInput"); 
 
    if (!searchInput) { 
        return; 
    } 
 
 
    const performSearch = debounce((event) => { 
 
        const searchValue = 
            event.target.value 
                .trim() 
                .toLowerCase(); 
 
 
        const posts = 
            document.querySelectorAll(".grid-post"); 
 
 
        posts.forEach((post) => { 
 
            const image = 
                post.querySelector("img"); 
 
            const title = 
                image.alt.toLowerCase(); 
 
 
            if ( 
                searchValue === "" || 
                title.includes(searchValue) 
            ) { 
 
                post.style.display = "block"; 
 
            } else { 
 
                post.style.display = "none"; 
 
            } 
 
        }); 
 
 
        console.log( 
            "Searching for:", 
            searchValue 
        ); 
 
    }, 500); 
 
 
    searchInput.addEventListener( 
        "input", 
        performSearch 
    ); 
} 