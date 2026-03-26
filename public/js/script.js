(() => {
  "use strict";

  // Bootstrap form validation (keep existing)
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
  });

  // Wanderlust Enhancements
  document.addEventListener('DOMContentLoaded', () => {
    // Toggle tax text only on listings page
    const taxToggle = document.getElementById('switchCheckDefault');
    if (taxToggle) {
      taxToggle.addEventListener('click', () => {
        document.querySelectorAll('.tax-info').forEach((info) => {
          info.style.display = info.style.display === 'inline' ? 'none' : 'inline';
        });
      });
    }

    // Restore like states from localStorage
    const likedListings = JSON.parse(localStorage.getItem('likedListings') || '[]');
    document.querySelectorAll('.like-btn').forEach(btn => {
      const id = btn.dataset.id;
      const heart = btn.querySelector('i');
      if (id && heart && likedListings.includes(id)) {
        btn.classList.add('liked');
        heart.classList.replace('far', 'fas');
        heart.style.color = '#ff385c';
      }
    });

    // Event delegation for filters, likes, search
    document.addEventListener('click', (e) => {
      // Filter clicks
      if (e.target.closest('.filter')) {
        e.preventDefault();
        const filter = e.target.closest('.filter').dataset.filter;
        if (filter) {
          const url = new URL(window.location);
          url.searchParams.set('filter', filter);
          url.searchParams.delete('q');
          window.location = url.toString();
        }
      }

      // Like button toggles
      if (e.target.closest('.like-btn')) {
        e.preventDefault();
        e.stopPropagation();
        const btn = e.target.closest('.like-btn');
        const id = btn.dataset.id;
        const heart = btn.querySelector('i');
        if (!id || !heart) return;
        
        // Toggle state
        if (btn.classList.contains('liked')) {
          btn.classList.remove('liked');
          heart.classList.replace('fas', 'far');
          heart.style.color = '';
          // Remove from localStorage
          let likedListings = JSON.parse(localStorage.getItem('likedListings') || '[]');
          likedListings = likedListings.filter(listingId => listingId !== id);
          localStorage.setItem('likedListings', JSON.stringify(likedListings));
        } else {
          btn.classList.add('liked');
          heart.classList.replace('far', 'fas');
          heart.style.color = '#ff385c';
          // Add to localStorage
          let likedListings = JSON.parse(localStorage.getItem('likedListings') || '[]');
          if (!likedListings.includes(id)) {
            likedListings.push(id);
            localStorage.setItem('likedListings', JSON.stringify(likedListings));
          }
        }
      }
    });

    // Navbar search on Enter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.target.form.submit();
        }
      });
    }
  });
})();

