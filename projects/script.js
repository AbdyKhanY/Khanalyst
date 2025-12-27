$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });

    // Fetch and Show Projects
    fetch("./projects.json")
        .then(res => res.json())
        .then(data => {
            let projectsHTML = "";
            data.forEach(project => {
                let buttonsHTML = "";
                for (let key in project.links) {
                    let label = key;
                    let url = project.links[key];
                    let icon = "fas fa-link";
                    if (label.toLowerCase() === "view") icon = "fas fa-eye";
                    if (label.toLowerCase() === "code") icon = "fas fa-code";
                    if (label.toLowerCase() === "read") icon = "fas fa-file-alt";

                    buttonsHTML += `<a href="${url}" class="btn" target="_blank"><i class="${icon}"></i> ${label}</a>`;
                }

                projectsHTML += `
                <div class="grid-item ${project.category}">
                    <div class="box tilt" style="width: 380px; margin: 1rem">
                        <img src="../assets/images/projects/${project.image}.png" alt="project" />
                        <div class="content">
                            <div class="tag"><h3>${project.name}</h3></div>
                            <div class="desc">
                                <p>${project.desc}</p>
                                <div class="btns">${buttonsHTML}</div>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
            document.querySelector(".box-container").innerHTML = projectsHTML;

            // Init Tilt and Isotope
            VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 20 });
            var $grid = $('.box-container').isotope({ itemSelector: '.grid-item', layoutMode: 'fitRows' });
            $('.button-group').on('click', 'button', function () {
                $('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
                $grid.isotope({ filter: $(this).attr('data-filter') });
            });
        });
});
