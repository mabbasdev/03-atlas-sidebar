// Enhanced sidebar interactions with improved responsive behavior
document.addEventListener("DOMContentLoaded", function () {
    const navToggler = document.querySelector(".nav-toggler");
    const aside = document.querySelector(".aside");
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav li a");
    const overlay = document.getElementById("overlay");
    const body = document.body;

    // Function to close sidebar
    function closeSidebar() {
        aside.classList.remove("open");
        navToggler.classList.remove("open");
        overlay.classList.remove("active");
        body.classList.remove("sidebar-open");
    }

    // Function to open sidebar
    function openSidebar() {
        aside.classList.add("open");
        navToggler.classList.add("open");
        overlay.classList.add("active");
        body.classList.add("sidebar-open");
    }

    // Toggle sidebar on mobile
    if (navToggler) {
        navToggler.addEventListener("click", function (e) {
            e.stopPropagation();
            if (aside.classList.contains("open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    // Close sidebar when clicking overlay
    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    // Handle window resize
    window.addEventListener("resize", function () {
        if (window.innerWidth > 1199) {
            closeSidebar();
        }
    });

    // Smooth navigation with active state management
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach((l) => l.classList.remove("active"));

            // Add active class to clicked link
            this.classList.add("active");

            // Hide all sections
            sections.forEach((section) => {
                section.classList.remove("active");
            });

            // Show the selected section
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.classList.add("active");
            }

            // Close sidebar on mobile after click
            if (window.innerWidth <= 1199) {
                closeSidebar();
            }
        });
    });

    // Add ripple effect on nav links
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            ripple.classList.add("ripple-effect");

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.setProperty("--x", x + "px");
            ripple.style.setProperty("--y", y + "px");

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 500);
        });
    });

    // Add dark mode toggle
    const styleSwitcher = document.createElement("div");
    styleSwitcher.className = "style-switcher";
    styleSwitcher.style.cssText = `
                position: fixed;
                right: 20px;
                top: 20px;
                z-index: 100;
            `;
    styleSwitcher.innerHTML = `
                <div class="day-night s-icon" style="
                    height: 45px;
                    width: 45px;
                    border-radius: 50%;
                    background: var(--bg-black-100);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
                    transition: all 0.3s ease;
                    z-index: 101;
                ">
                    <i class="fa fa-moon" style="font-size: 24px; color: var(--skin-color);"></i>
                </div>
            `;
    document.body.appendChild(styleSwitcher);

    // Dark mode toggle
    const dayNight = document.querySelector(".day-night");
    if (dayNight) {
        dayNight.addEventListener("click", (e) => {
            e.stopPropagation();
            document.body.classList.toggle("dark");
            const icon = dayNight.querySelector("i");
            if (document.body.classList.contains("dark")) {
                icon.className = "fa fa-sun";
            } else {
                icon.className = "fa fa-moon";
            }
        });
    }

    // Prevent clicks inside aside from closing it
    aside.addEventListener("click", function (e) {
        e.stopPropagation();
    });
});
