document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        const slides = project.querySelectorAll('.slide');
        let currentSlide = 0;
        
        function showNextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(showNextSlide, 3000); 
    });
});


