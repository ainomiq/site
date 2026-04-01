// ==========================================
// Nav Toggle
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      this.classList.toggle('is-active');
      this.nextElementSibling.classList.toggle('is-open');
    });
  }
});

// ==========================================
// Scroll Reveal (IntersectionObserver)
// ==========================================
(function() {
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var parent = entry.target.parentElement;
        var siblings = parent ? Array.from(parent.querySelectorAll(':scope > .reveal')) : [];
        var idx = siblings.indexOf(entry.target);
        var delay = idx >= 0 ? idx * 100 : 0;
        setTimeout(function() {
          entry.target.classList.add('is-visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function(el) { observer.observe(el); });
})();

// ==========================================
// Metric Count-Up
// ==========================================
(function() {
  var metrics = document.querySelectorAll('.metric-value[data-target]');
  var metricObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-target'));
        var suffix = el.getAttribute('data-suffix') || '';
        var prefix = el.getAttribute('data-prefix') || '';
        var current = 0;
        var duration = 1500;
        var step = target / (duration / 16);
        function tick() {
          current += step;
          if (current >= target) {
            el.textContent = prefix + target + suffix;
          } else {
            el.textContent = prefix + Math.floor(current) + suffix;
            requestAnimationFrame(tick);
          }
        }
        tick();
        metricObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  metrics.forEach(function(el) { metricObserver.observe(el); });
})();

// ==========================================
// Container Scroll Animation (homepage)
// ==========================================
(function() {
  var showcase = document.getElementById('scroll-showcase');
  if (!showcase) return;

  var header = showcase.querySelector('.scroll-header');
  var card = showcase.querySelector('.scroll-card');
  var isMobile = window.innerWidth <= 768;

  window.addEventListener('resize', function() {
    isMobile = window.innerWidth <= 768;
  });

  function lerp(start, end, t) { return start + (end - start) * t; }
  function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

  window.addEventListener('scroll', function() {
    var rect = showcase.getBoundingClientRect();
    var windowH = window.innerHeight;
    var sectionH = showcase.offsetHeight;
    var progress = clamp((windowH - rect.top) / (windowH + sectionH), 0, 1);
    var rotate = lerp(20, 0, progress);
    var scaleStart = isMobile ? 0.7 : 1.05;
    var scaleEnd = isMobile ? 0.9 : 1.0;
    var scale = lerp(scaleStart, scaleEnd, progress);
    var translate = lerp(0, -100, progress);
    header.style.transform = 'translateY(' + translate + 'px)';
    card.style.transform = 'rotateX(' + rotate + 'deg) scale(' + scale + ')';
  }, { passive: true });
})();

// ==========================================
// Sparkles Canvas Effect
// ==========================================
(function() {
  var canvas = document.getElementById('sparkles-canvas');
  if (!canvas) return;
  
  var ctx = canvas.getContext('2d');
  var particles = [];
  var PARTICLE_COUNT = 80;
  var colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#ffffff'];
  
  function resize() {
    var parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  
  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random(),
      opacitySpeed: (Math.random() - 0.5) * 0.02,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }
  
  for (var i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity += p.opacitySpeed;
      if (p.opacity <= 0 || p.opacity >= 1) p.opacitySpeed *= -1;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
})();
