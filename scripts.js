document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.body.classList.toggle('dark-theme');
        });
    }

    // Fetch and display Medium articles
    const rssUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://medium.com/feed/@wassafali');

    fetch(rssUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data); // Log the received data for debugging
            const parser = new DOMParser();
            const xml = parser.parseFromString(data.contents, 'text/xml');
            const items = xml.querySelectorAll('item');
            const blogContainer = document.getElementById('blog-posts');

            if (items.length > 0) {
                blogContainer.innerHTML = '';
                items.forEach(item => {
                    const title = item.querySelector('title')?.textContent || 'No title';
                    const link = item.querySelector('link')?.textContent || '#';
                    let description = item.querySelector('description')?.textContent || 'No description';

                    // Remove any HTML tags from the description if present
                    description = description.replace(/<\/?[^>]+>/gi, '');

                    const postElement = document.createElement('div');
                    postElement.classList.add('blog-post');
                    postElement.innerHTML = `
                        <h2><a href="${link}" target="_blank">${title}</a></h2>
                        <p>${description}</p>
                    `;
                    blogContainer.appendChild(postElement);
                });
            } else {
                blogContainer.innerHTML = '<p>No articles found.</p>';
            }
        })
        .catch(error => {
            document.getElementById('blog-posts').innerHTML = '<p>Error loading articles.</p>';
            console.error('Error fetching Medium RSS feed:', error);
        });

    // Example of project slide functionality if needed
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
