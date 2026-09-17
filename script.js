document.addEventListener('DOMContentLoaded', () => {
  // --- CAROUSEL LOGIC ---
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const slides = Array.from(track.children);

  if (!track || slides.length === 0) return;

  // indicator dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  // dot highlights 🥀
  const updateDots = (activeIndex) => {
    dots.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  // click button
  nextBtn.addEventListener('click', () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.scrollBy({ left: slideWidth, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  });

  // Keep indicator dots synchronized perfectly while scrolling
  track.addEventListener('scroll', () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const activeIndex = Math.round(track.scrollLeft / slideWidth);
    updateDots(activeIndex);
  });

  // --- AUDIO LOGIC (Moved inside DOMContentLoaded for safety) ---
  const audio = document.getElementById('bg-audio');
  const toggleBtn = document.getElementById('toggle-audio');
  
  // Track if this is the first time the music is being played
  let isFirstPlay = true; 

  if (audio && toggleBtn) {
    audio.volume = 0.7;

    toggleBtn.addEventListener('click', () => {
      if (audio.paused) {
        //18s
        if (isFirstPlay) {
          audio.currentTime = 18; 
          isFirstPlay = false;
        }

        audio.play();
        toggleBtn.textContent = 'Pause Music';
      } else {
        audio.pause();
        toggleBtn.textContent = 'Play Music';
      }
    });
  }
});
