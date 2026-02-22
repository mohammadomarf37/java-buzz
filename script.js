document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Order Form Validation
    const orderForm = document.getElementById('orderForm');
    const successMessage = document.getElementById('successMessage');

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const item = document.getElementById('item').value;
            const quantity = document.getElementById('quantity').value;

            if (!name || !email || !phone || !item || !quantity) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Processing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                orderForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                successMessage.style.display = 'block';
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // Dynamic Blog Loading
    const blogGrid = document.getElementById('blogGrid');
    
    if (blogGrid) {
        fetch('blogs.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(blogs => {
                blogs.forEach(blog => {
                    const blogCard = document.createElement('div');
                    blogCard.className = 'blog-card';
                    blogCard.innerHTML = `
                        <img src="${blog.image}" alt="${blog.title}">
                        <div class="blog-card-content">
                            <span class="blog-date">${blog.date}</span>
                            <h3>${blog.title}</h3>
                            <p>${blog.excerpt}</p>
                            <a href="#" class="read-more">Read More</a>
                            <div class="social-share">
                                <a href="#" class="share-btn"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="share-btn"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="share-btn"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    `;
                    blogGrid.appendChild(blogCard);
                });
            })
            .catch(error => {
                console.error('Error loading blogs:', error);
                blogGrid.innerHTML = '<p>Unable to load blog posts at this time.</p>';
            });
    }

    // Menu Category Filtering (Simple Implementation)
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initialize Map if on location page
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Default location (Example: Seattle)
        const map = L.map('map').setView([47.6062, -122.3321], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([47.6062, -122.3321]).addTo(map)
            .bindPopup('<b>Java Buzz</b><br>Come visit us!')
            .openPopup();
    }
});