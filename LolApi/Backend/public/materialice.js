document.addEventListener('DOMContentLoaded', function() {
    var parallaxElems = document.querySelectorAll('.parallax');
    var collapsibleElems = document.querySelectorAll('.collapsible');
    M.Parallax.init(parallaxElems);
    M.Collapsible.init(collapsibleElems);

    const scrollToTopButton = document.querySelector('.fixed-action-btn-right');

    if (scrollToTopButton) {
        window.addEventListener('scroll', function() {
            scrollToTopButton.classList.toggle('show', window.scrollY > 100);
        });

        scrollToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});