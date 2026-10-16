const app     = document.getElementById('app');
const toggle  = document.getElementById('toggle');
const scrim   = document.getElementById('scrim');
const title   = document.getElementById('page-title');
const items   = document.querySelectorAll('.item');
const mobile  = window.matchMedia('(max-width: 767px)');

// Is the menu currently showing in full?
const isOpen = () =>
  mobile.matches ? app.dataset.drawer === 'open'
                 : app.dataset.collapsed === 'false';

function syncAria() {
  toggle.setAttribute('aria-expanded', String(isOpen()));
}

function closeDrawer() {
  app.dataset.drawer = 'closed';
  syncAria();
}

// Menu button: drawer on mobile, icon rail on desktop
toggle.addEventListener('click', () => {
  if (mobile.matches) {
    app.dataset.drawer = isOpen() ? 'closed' : 'open';
  } else {
    app.dataset.collapsed = isOpen() ? 'true' : 'false';
  }
  syncAria();
});

// Tap the dimmed backdrop, or press Esc, to close the drawer
scrim.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobile.matches) closeDrawer();
});

// Mark the chosen item as the current page
items.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    items.forEach(i => i.removeAttribute('aria-current'));
    item.setAttribute('aria-current', 'page');
    title.textContent = item.dataset.label;
    if (mobile.matches) closeDrawer();
  });
});

// Reset the drawer when the screen size crosses the breakpoint
mobile.addEventListener('change', closeDrawer);
syncAria();