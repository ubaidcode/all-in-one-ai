/* =========================================
   ALL IN ONE AI
   Main JavaScript
========================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       ELEMENTS
    ========================================= */

    const body = document.body;

    const sidebar = document.getElementById("sidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const themeToggle =
        document.getElementById("themeToggle");

    const globalSearch =
        document.getElementById("globalSearch");

    const toolCards =
        document.querySelectorAll(".tool-card");

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const emptyState =
        document.getElementById("emptyState");

    const navItems =
        document.querySelectorAll(".nav-item");


    /* =========================================
       MOBILE SIDEBAR
    ========================================= */

    function openSidebar() {

        sidebar.classList.add("open");

        sidebarOverlay.classList.add("open");

    }


    function closeSidebar() {

        sidebar.classList.remove("open");

        sidebarOverlay.classList.remove("open");

    }


    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            openSidebar
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =========================================
       CLOSE SIDEBAR AFTER NAVIGATION
    ========================================= */

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            navItems.forEach(nav => {
                nav.classList.remove("active");
            });

            item.classList.add("active");

            closeSidebar();

        });

    });


    /* =========================================
       THEME TOGGLE
    ========================================= */

    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (body.classList.contains("light-mode")) {

            icon.className =
                "fa-solid fa-sun";

        } else {

            icon.className =
                "fa-solid fa-moon";

        }

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            body.classList.toggle("light-mode");

            localStorage.setItem(
                "allInOneTheme",
                body.classList.contains("light-mode")
                    ? "light"
                    : "dark"
            );

            updateThemeIcon();

        });

    }


    /* =========================================
       LOAD SAVED THEME
    ========================================= */

    const savedTheme =
        localStorage.getItem("allInOneTheme");


    if (savedTheme === "light") {

        body.classList.add("light-mode");

    }


    updateThemeIcon();


    /* =========================================
       SEARCH + FILTER
    ========================================= */

    let currentFilter = "all";


    function filterTools() {

        const searchText =
            globalSearch
                ? globalSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        let visibleCount = 0;


        toolCards.forEach(card => {

            const category =
                card.dataset.category || "";

            const searchData =
                (
                    card.dataset.search ||
                    card.innerText
                ).toLowerCase();


            const matchesSearch =
                searchData.includes(searchText);


            const matchesCategory =
                currentFilter === "all" ||
                category === currentFilter;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                card.style.display = "flex";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (emptyState) {

            if (visibleCount === 0) {

                emptyState.classList.add("show");

            } else {

                emptyState.classList.remove("show");

            }

        }

    }


    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            filterTools
        );

    }


    /* =========================================
       FILTER BUTTONS
    ========================================= */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            currentFilter =
                button.dataset.filter;


            filterTools();

        });

    });


    /* =========================================
       CTRL + K SEARCH
    ========================================= */

    document.addEventListener("keydown", event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (globalSearch) {

                globalSearch.focus();

            }

        }

    });


    /* =========================================
       ACTIVE SECTION DETECTION
    ========================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const top =
                section.offsetTop;

            const bottom =
                top + section.offsetHeight;


            if (
                scrollPosition >= top &&
                scrollPosition < bottom
            ) {

                const sectionId =
                    section.getAttribute("id");


                navItems.forEach(nav => {

                    nav.classList.remove("active");


                    const href =
                        nav.getAttribute("href");


                    if (
                        href ===
                        `#${sectionId}`
                    ) {

                        nav.classList.add("active");

                    }

                });

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    /* =========================================
       CARD CLICK FEEDBACK
    ========================================= */

    const allLinks =
        document.querySelectorAll(
            ".card-link, .finding-content a"
        );


    allLinks.forEach(link => {

        link.addEventListener("click", () => {

            link.style.opacity = "0.65";

            setTimeout(() => {

                link.style.opacity = "1";

            }, 250);

        });

    });


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeSidebar();

            if (
                document.activeElement ===
                globalSearch
            ) {

                globalSearch.blur();

            }

        }

    });


    /* =========================================
       INITIAL FILTER
    ========================================= */

    filterTools();

});