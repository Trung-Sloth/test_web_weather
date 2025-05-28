
document.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector("body"),
        sidebar = document.querySelector(".sidebar"),
        toggle = document.querySelector(".toggle"),
        modeSwitch = document.querySelector(".mode"),
        modeText = document.querySelector(".mode-text");

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
    });


    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Light Mode"
        } else {
            modeText.innerText = "Dark Mode"
        }
    });

    //click event for links with class 'ajax-link'
    const links = document.querySelectorAll('.ajax-link');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            loadPage(url);
        });
    });

    function loadPage(url) {
        fetch(url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('main-content').innerHTML = data.html;
                // Nếu có script cần chạy lại trong nội dung mới thì thêm ở đây
            })
            .catch(error => console.error('Error loading page:', error));
    }
});
