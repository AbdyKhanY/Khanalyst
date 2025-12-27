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
function getProjects() {
    return fetch("./projects.json")
        .then(response => response.json())
        .then(data => data);
}

// Display projects dynamically
function showProjects(projects) {
    const projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
        let buttonsHTML = "";

        // Check if links exist to avoid errors
        if (project.links) {
            for (let key in project.links) {
                if (project.links.hasOwnProperty(key)) {
                    let label = key; 
                    let url = project.links[key];

                    // assign icons based on key
                    let icon = "fas fa-link";
                    const lowerLabel = label.toLowerCase();
                    
                    if (lowerLabel === "view") icon = "fas fa-eye";
                    if (lowerLabel === "code") icon = "fas fa-code";
                    if (lowerLabel === "read") icon = "fas fa-file-alt"; // Icon for summary

                    buttonsHTML += `
                        <a href="${url}" class="btn" target="_blank">
                            <i class="${icon}"></i> ${label}
                        </a>
                    `;
                }
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
    // ... rest of your Isotope and Tilt code
}
// Reinitialize tilt.js
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 20 });

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
getProjects().then(data => showProjects(data));

// Disable developer tools
document.onkeydown = function (e) {
    if (e.keyCode == 123) return false; // F12
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};


