// ===== BURGER MENÜ - GARANTIERT FUNKTIONIEREND =====

document.addEventListener('DOMContentLoaded', function() {
  
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const overlay = document.querySelector('.mobile-overlay');
  const body = document.body;

  console.log('Burger:', burger);
  console.log('Menu:', menu);
  console.log('Overlay:', overlay);

  // Menü öffnen/schließen
  function toggleMobileMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Toggle Menü geklickt!');
    
    if (burger) burger.classList.toggle('active');
    if (menu) menu.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    if (body) body.classList.toggle('menu-active');
    
    console.log('Menü Klassen:', menu.classList);
  }

  // Menü schließen
  function closeMobileMenu() {
    console.log('Schließe Menü');
    
    if (burger) burger.classList.remove('active');
    if (menu) menu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (body) body.classList.remove('menu-active');
  }

  // Event Listeners mit Check
  if (burger) {
    burger.addEventListener('click', toggleMobileMenu);
    burger.addEventListener('touchstart', toggleMobileMenu, {passive: false});
    console.log('Burger Event Listener hinzugefügt');
  } else {
    console.error('Burger Button nicht gefunden!');
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('touchstart', closeMobileMenu);
  }

  // Menü bei Resize schließen
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1053) {
      closeMobileMenu();
    }
  });

  // ESC Taste zum Schließen
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu && menu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // Links im Menü - Navigation erlauben
  const menuLinks = document.querySelectorAll('.menu a');
  console.log('Anzahl Menu Links gefunden:', menuLinks.length);
  
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('Link geklickt:', link.href);
      // Menü wird NICHT geschlossen - Browser navigiert normal
    });
  });
  // ===== Galerie Lightbox ===================================================
  const galleryThumbs = document.querySelectorAll('.gallery-grid .thumb');
  const galleryLightbox = document.querySelector('.gallery-lightbox');
  const lightboxImage = galleryLightbox ? galleryLightbox.querySelector('img') : null;
  const lightboxCloseBtn = galleryLightbox ? galleryLightbox.querySelector('.lightbox-close') : null;

  function openLightbox(src, altText) {
    if (!galleryLightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = altText || '';
    galleryLightbox.classList.add('open');
    galleryLightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    if (!galleryLightbox || !lightboxImage) return;
    galleryLightbox.classList.remove('open');
    galleryLightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    body.classList.remove('lightbox-open');
  }

  if (galleryThumbs.length && galleryLightbox && lightboxImage) {
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        e.preventDefault();
        const img = thumb.querySelector('img');
        const fullSrc = img && img.dataset.full ? img.dataset.full : thumb.getAttribute('href');
        if (!fullSrc) return;
        openLightbox(fullSrc, img ? img.alt : '');
      });
    });
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (e) => {
      if (e.target === galleryLightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryLightbox && galleryLightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
});
