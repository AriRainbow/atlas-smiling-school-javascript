// js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
  
    if (path.includes('homepage.html') || path.endsWith('/')) {
      initHomepage();
    }
  
    if (path.includes('pricing.html')) {
      initPricingPage();
    }
  
    if (path.includes('courses.html')) {
      initCoursesPage();
    }
  });
  
  // === HOMEPAGE ===
  function initHomepage() {
    // Put specific JS here
    console.log('Homepage JS loaded');
    // What to do
  }
  
  // === PRICING PAGE ===
  function initPricingPage() {
    console.log('Pricing page JS loaded');
    // Pricing logic
  }
  
  // === COURSES PAGE ===
  function initCoursesPage() {
    console.log('Courses page JS loaded');
  
    const loader = document.querySelector('#loader');
    const courseSection = document.querySelector('#course-list');
    const searchInput = document.querySelector('#search');
    const topicSelect = document.querySelector('#topic');
    const sortSelect = document.querySelector('#sort');
  
    function showLoader() {
      loader.style.display = 'flex';
    }
  
    function hideLoader() {
      loader.style.display = 'none';
    }
  
    function createCard(course) {
      return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div class="card border-0">
            <img src="${course.thumb_url}" class="card-img-top" alt="${course.title}">
            <div class="card-body">
              <h5 class="card-title">${course.title}</h5>
              <p class="card-text text-muted">${course['sub-title']}</p>
              <div class="d-flex align-items-center">
                <img src="${course.author_pic_url}" class="rounded-circle mr-2" width="30" height="30" alt="${course.author}">
                <small class="text-muted">${course.author}</small>
              </div>
              <div class="text-warning mt-2">
                ${'★'.repeat(course.star)}${'☆'.repeat(5 - course.star)}
                <span class="text-muted">(${course.duration})</span>
              </div>
            </div>
          </div>
        </div>`;
    }
  
    function updateCourses(data) {
      courseSection.innerHTML = '';
      data.courses.forEach(course => {
        courseSection.innerHTML += createCard(course);
      });
    }
  
    function fetchCourses() {
      showLoader();
  
      const params = new URLSearchParams({
        q: searchInput.value,
        topic: topicSelect.value,
        sort: sortSelect.value,
      });
  
      fetch(`https://smileschool-api.hbtn.info/courses?${params}`)
        .then(res => res.json())
        .then(data => {
          searchInput.value = data.q;
          updateCourses(data);
          hideLoader();
        });
    }
  
    function populateDropdowns() {
      fetch('https://smileschool-api.hbtn.info/courses')
        .then(res => res.json())
        .then(data => {
          data.topics.forEach(topic => {
            const opt = document.createElement('option');
            opt.value = topic;
            opt.textContent = topic;
            topicSelect.appendChild(opt);
          });
  
          data.sorts.forEach(sort => {
            const opt = document.createElement('option');
            opt.value = sort;
            opt.textContent = sort;
            sortSelect.appendChild(opt);
          });
  
          fetchCourses();
        });
    }
  
    // Event Listeners
    searchInput.addEventListener('input', fetchCourses);
    topicSelect.addEventListener('change', fetchCourses);
    sortSelect.addEventListener('change', fetchCourses);
  
    // Init
    populateDropdowns();
  }