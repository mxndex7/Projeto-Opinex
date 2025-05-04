
function preloadImages() {
  const imagesToPreload = [
    'c.jpg', 'snowfall.jpg', 'lu.jpg', 'saul.png', 'sf.png', 'cl.png'
  ];

  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  preloadImages();

  if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('.series-grid img, .cast-grid img');
    lazyImages.forEach(img => {
      img.loading = 'lazy';
    });
  }
  const likedComments = JSON.parse(localStorage.getItem('likedComments') || '{}');

  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach((button, index) => {
    const commentId = `comment_${index}`;

    if (likedComments[commentId]) {
      button.classList.add('liked');
      const likeCount = button.querySelector('.like-count');
      if (likeCount) {
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
      }
    }

    button.addEventListener('click', function() {
      const isLiked = this.classList.toggle('liked');
      const likeCount = this.querySelector('.like-count');

      if (likeCount) {
        const currentCount = parseInt(likeCount.textContent);
        likeCount.textContent = isLiked ? currentCount + 1 : currentCount - 1;
      }

      likedComments[commentId] = isLiked;
      localStorage.setItem('likedComments', JSON.stringify(likedComments));
    });
  });
});

function openTrailerModal() {
  const modal = document.getElementById('trailerModal');
  if (modal) {
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('fade-in'), 10);

    const video = document.querySelector('#trailerModal video');
    if (video) {
      video.muted = false;
      video.play();
    }
  }
}

function closeTrailerModal() {
  const modal = document.getElementById('trailerModal');
  if (modal) {
    modal.classList.remove('fade-in');
    setTimeout(() => {
      modal.style.display = 'none';
      const video = document.querySelector('#trailerModal video');
      if (video) {
        video.pause();
      }
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const trailerButtons = document.querySelectorAll('.cta-button');
  trailerButtons.forEach(button => {
    button.addEventListener('click', openTrailerModal);
  });

  const modal = document.getElementById('trailerModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeTrailerModal();
      }
    });
  }

  const menuIcon = document.getElementById('menu-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');

  if (menuIcon && mobileMenu && closeMenu) {
    menuIcon.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  function adjustHeroHeight() {
    const windowWidth = window.innerWidth;
    const heroElements = document.querySelectorAll('.hero-series');
    
    if (windowWidth <= 480) {
      heroElements.forEach(hero => {
        hero.style.height = '60vh';
      });
    } else if (windowWidth <= 768) {
      heroElements.forEach(hero => {
        hero.style.height = '70vh';
      });
    } else {
      heroElements.forEach(hero => {
        hero.style.height = '75vh';
      });
    }
  }

  adjustHeroHeight();
  window.addEventListener('resize', adjustHeroHeight);
  
  const resizeMetaTags = () => {
    const metaElements = document.querySelectorAll('.meta');
    if (window.innerWidth <= 480) {
      metaElements.forEach(meta => {
        meta.style.flexDirection = 'column';
        meta.style.alignItems = 'flex-start';
      });
    } else {
      metaElements.forEach(meta => {
        meta.style.flexDirection = 'row';
        meta.style.alignItems = 'center';
      });
    }
  };
  
  resizeMetaTags();
  window.addEventListener('resize', resizeMetaTags);
});
