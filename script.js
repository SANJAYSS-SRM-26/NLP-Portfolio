// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
	navToggle.addEventListener('click', () => {
		const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
		navToggle.setAttribute('aria-expanded', String(!expanded));
		navMenu.classList.toggle('open');
	});
}

// Smooth scroll with header offset for in-page links
const header = document.querySelector('.site-header');
// Add scrolled class for header shadow/background
const onScroll = () => {
	if (!header) return;
	if (window.scrollY > 8) header.classList.add('scrolled');
	else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', (e) => {
		const targetId = anchor.getAttribute('href');
		if (!targetId || targetId === '#') return;
		const target = document.querySelector(targetId);
		if (!target) return;
		e.preventDefault();
		const headerOffset = header ? header.offsetHeight + 4 : 0;
		const elementPosition = target.getBoundingClientRect().top + window.scrollY;
		const offsetPosition = elementPosition - headerOffset;
		window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
		// Close mobile menu after click
		navMenu?.classList.remove('open');
		navToggle?.setAttribute('aria-expanded', 'false');
	});
});

// Reveal on scroll animations (IntersectionObserver)
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
	const io = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

	revealEls.forEach(el => io.observe(el));
} else {
	revealEls.forEach(el => el.classList.add('visible'));
}

// Simple slider controls (scroll-snap based)
const slider = document.querySelector('.slider');
const track = document.querySelector('.slider-track');
const prev = document.querySelector('.slider-prev');
const next = document.querySelector('.slider-next');

function slideBy(direction = 1) {
	if (!track) return;
	const card = track.querySelector('.badge-card');
	const amount = card ? card.getBoundingClientRect().width + 12 : 260;
	track.scrollBy({ left: direction * amount, behavior: 'smooth' });
}

prev?.addEventListener('click', () => slideBy(-1));
next?.addEventListener('click', () => slideBy(1));

// Keyboard navigation for slider
track?.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowRight') { e.preventDefault(); slideBy(1); }
	if (e.key === 'ArrowLeft') { e.preventDefault(); slideBy(-1); }
});

// Close accordions like an accordion (only one open at a time)
const accordion = document.querySelector('.accordion');
accordion?.addEventListener('toggle', (e) => {
	const target = e.target;
	if (!(target instanceof HTMLDetailsElement) || !target.open) return;
	accordion.querySelectorAll('details[open]').forEach((openEl) => {
		if (openEl !== target) openEl.open = false;
	});
});


