$(document).ready(function () {
    // Navbar toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

// Change page title and favicon on tab visibility
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Abdikhani Mohamed";
        $("#favicon").attr("href", "/assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "/assets/images/favhand.png");
    }
});

// Fetch projects
async function getProjects() {
    const response = await fetch("./projects.json");
    const data = await response.json();
    return data;
}

// Display projects dynamically
function showProjects(projects) {
    const projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
        let buttonsHTML = "";

        // Iterate over all keys in project.links (View, Code, Read, etc.)
        for (let key in project.links) {
            if (project.links.hasOwnProperty(key)) {
                let label = key; 
                let url = project.links[key];

                // Data Engineer approach: Map keys to specific icons
                let icon = "fas fa-link"; // Default icon
                const lowerLabel = label.toLowerCase();

                if (lowerLabel === "view") icon = "fas fa-eye";
                if (lowerLabel === "code") icon = "fas fa-code";
                if (lowerLabel === "read" || lowerLabel === "product") icon = "fas fa-file-alt";

                // We add a specific class based on the label (e.g., btn-read) for custom styling later
                buttonsHTML += `
                    <a href="${url}" class="btn btn-${lowerLabel}" target="_blank">
                        <i class="${icon}"></i> ${label}
                    </a>
                `;
            }
        }

        projectsHTML += `
        <div class="grid-item ${project.category}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
                <img draggable="false" src="assets/images/projects/${project.image}.png" alt="project" />
                <div class="content">
                    <div class="tag"><h3>${project.name}</h3></div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            ${buttonsHTML}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    projectsContainer.innerHTML = projectsHTML;

    // Reinitialize tilt.js
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 20 });
    }

    // Reinitialize isotope
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

// Load projects
getProjects().then(data => {
    showProjects(data);
});

// Disable developer tools (Keep this if you prefer, though usually not recommended for UX)
document.onkeydown = function (e) {
    if (e.keyCode == 123) return false; 
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};
