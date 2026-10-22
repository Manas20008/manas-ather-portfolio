const battery = document.getElementById('batteryRange');
const trip = document.getElementById('tripRange');
const batteryOutput = document.getElementById('batteryOutput');
const tripOutput = document.getElementById('tripOutput');
const rangeValue = document.getElementById('rangeValue');
const estimatedRange = document.getElementById('estimatedRange');
const afterTrip = document.getElementById('afterTrip');
const rangeMessage = document.getElementById('rangeMessage');

function updateRange() {
  const percent = Number(battery.value);
  const km = Number(trip.value);
  const illustrativeFullRange = 115;
  const available = Math.round(illustrativeFullRange * percent / 100);
  const remaining = available - km;
  batteryOutput.textContent = percent + '%';
  tripOutput.textContent = km + ' km';
  rangeValue.textContent = percent;
  estimatedRange.textContent = available + ' km';
  afterTrip.textContent = Math.max(0, remaining) + ' km';
  if (remaining < 0) {
    rangeMessage.textContent = 'This trip exceeds the illustrative range. Consider a charging stop or a shorter route.';
  } else if (remaining < 15) {
    rangeMessage.textContent = 'Your buffer is getting low. A charging stop may give you more confidence.';
  } else {
    rangeMessage.textContent = 'You have a comfortable buffer for this trip.';
  }
}
battery.addEventListener('input', updateRange);
trip.addEventListener('input', updateRange);
updateRange();

const modalData = {
  mobility: {
    eyebrow: 'CONCEPT STUDY / MOBILITY',
    title: 'A calmer way to move.',
    body: `<p><strong>Challenge</strong><br>EV information can feel fragmented when a rider needs a quick answer: how much range is left, whether a trip feels feasible, and when to charge.</p>
    <p><strong>Design direction</strong><br>Bring the most decision-useful information forward: battery, estimated range, trip context and a clear next action. Keep supporting detail secondary.</p>
    <h3>WHAT THIS EXPLORATION COVERS</h3><ul><li>Rider-facing battery and range hierarchy</li><li>A simplified trip-versus-range interaction</li><li>Readable states and a clear charging prompt</li></ul>
    <p><strong>Status:</strong> Concept created for this portfolio. The range numbers are illustrative and are not Ather specifications or vehicle data.</p>`
  },
  synapse: {
    eyebrow: 'PROJECT / AI PRODUCT',
    title: 'SynapseOS',
    body: `<p><strong>Goal</strong><br>Explore a personal AI workspace that goes beyond one-off answers and helps users move tasks forward with relevant context.</p>
    <h3>CORE IDEAS</h3><ul><li>AI assistant for multiple query and task types</li><li>Vector-based memory for context across sessions</li><li>Workflow automation for scheduling and information retrieval</li></ul>
    <p><strong>Stack:</strong> React, Node.js, Python, OpenAI API and a vector database.</p>
    <p><strong>Portfolio note:</strong> This page presents the project's intended experience. Be ready to explain which features are implemented in your current version and which remain planned.</p>`
  },
  flowmind: {
    eyebrow: 'PROJECT / INTERACTION DESIGN',
    title: 'FlowMind',
    body: `<p><strong>Goal</strong><br>Make workflows easier to understand by representing steps and connections visually rather than hiding them in long configuration screens.</p>
    <h3>DESIGN PRINCIPLES</h3><ul><li>Make the sequence of steps visible</li><li>Separate triggers, processing and outputs</li><li>Keep the structure inspectable as a workflow grows</li></ul>
    <p><strong>Stack:</strong> React and React Flow.</p>
    <p><strong>Portfolio note:</strong> Use this case study to describe the functionality that exists in your actual repository and demonstrate the live version if available.</p>`
  }
};
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalEyebrow = document.getElementById('modalEyebrow');
document.querySelectorAll('[data-modal]').forEach(button => {
  button.addEventListener('click', () => {
    const data = modalData[button.dataset.modal];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalEyebrow.textContent = data.eyebrow;
    modalBody.innerHTML = data.body;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.querySelector('.modal-close').focus();
  });
});
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

const revealTargets = document.querySelectorAll('.project, .manifesto-grid, .lab-grid, .process-list > div, .cap-list > div, .about-grid');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(target => {
    target.classList.add('reveal');
    observer.observe(target);
  });
}

const indexPanel = document.getElementById('siteIndex');
const indexButton = document.getElementById('indexButton');
const indexClose = document.getElementById('indexClose');
function setIndex(open) {
  indexPanel.classList.toggle('open', open);
  indexPanel.setAttribute('aria-hidden', String(!open));
  indexButton.setAttribute('aria-expanded', String(open));
  indexButton.querySelector('span').textContent = open ? '×' : '＋';
}
indexButton.addEventListener('click', () => setIndex(!indexPanel.classList.contains('open')));
indexClose.addEventListener('click', () => setIndex(false));
indexPanel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setIndex(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && indexPanel.classList.contains('open')) setIndex(false);
});


// Reading progress indicator
(() => {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
