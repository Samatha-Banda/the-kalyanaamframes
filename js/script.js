document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Navbar Scroll Effect
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Carousel Navigation
  const carousel = document.getElementById('collectionsCarousel');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  if(carousel && btnPrev && btnNext) {
    btnNext.addEventListener('click', () => {
      carousel.scrollBy({ left: 370, behavior: 'smooth' });
    });
    btnPrev.addEventListener('click', () => {
      carousel.scrollBy({ left: -370, behavior: 'smooth' });
    });
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  // Intersection Observers for animations
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-up, .image-reveal").forEach(el => {
    fadeObserver.observe(el);
  });

  // Portfolio Filtering & Empty State Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.portfolio-card');
  const emptyState = document.getElementById('emptyState');
  const emptyMessage = document.getElementById('emptyMessage');
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class on buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        let visibleCount = 0;
        
        // Filter items
        galleryItems.forEach(item => {
          if (filterValue === 'ALL' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            visibleCount++;
          } else {
            item.style.display = 'none';
          }
        });

        // Show/Hide Empty State based on visible items
        if (visibleCount === 0) {
          emptyMessage.textContent = `New work is being curated for ${filterValue}.`;
          emptyState.classList.add('active');
        } else {
          emptyState.classList.remove('active');
        }
      });
    });
  }

  // Contact Form Submission Logic
  const submitInquiryBtn = document.getElementById('submitInquiryBtn');
  if (submitInquiryBtn) {
    submitInquiryBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName').value;
      const phone = document.getElementById('contactPhone').value;
      const email = document.getElementById('contactEmail').value;
      const eventDate = document.getElementById('contactDate').value;
      const details = document.getElementById('contactDetails').value;
      const messageDiv = document.getElementById('formMessage');
      
      if (!name || !phone || !email) {
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = 'rgba(255, 60, 60, 0.1)';
        messageDiv.style.color = '#ff6b6b';
        messageDiv.textContent = 'Please fill in your Name, Phone, and Email.';
        return;
      }
      
      // Update button state
      const originalText = submitInquiryBtn.innerHTML;
      submitInquiryBtn.innerHTML = 'Sending...';
      submitInquiryBtn.disabled = true;
      
      try {
        const response = await fetch(window.location.origin.includes('file://') ? 'http://localhost:3000/api/inquiries' : '/api/inquiries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, phone, email, eventDate, details })
        });
        
        const data = await response.json();
        
        messageDiv.style.display = 'block';
        if (response.ok) {
          // Success
          messageDiv.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
          messageDiv.style.color = '#2ecc71';
          messageDiv.textContent = 'Thank you! Your inquiry has been sent. We will get back to you soon.';
          
          // Clear form
          document.getElementById('contactName').value = '';
          document.getElementById('contactPhone').value = '';
          document.getElementById('contactEmail').value = '';
          document.getElementById('contactDate').value = '';
          document.getElementById('contactDetails').value = '';
        } else {
          // Error from server
          messageDiv.style.backgroundColor = 'rgba(255, 60, 60, 0.1)';
          messageDiv.style.color = '#ff6b6b';
          messageDiv.textContent = data.error || 'Something went wrong. Please try again.';
        }
      } catch (error) {
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = 'rgba(255, 60, 60, 0.1)';
        messageDiv.style.color = '#ff6b6b';
        messageDiv.textContent = 'Network error. Please make sure the backend server is running.';
      } finally {
        // Restore button
        submitInquiryBtn.innerHTML = originalText;
        submitInquiryBtn.disabled = false;
      }
    });
  }
});
