const projects = [
  {
    title: 'Fieldnotes',
    year: '2026',
    category: 'INTERACTIVE / WEB',
    skills: ['JavaScript', 'React.js'],
    description: 'A small map for collecting the places, walks, and quiet corners worth remembering.',
    scene: 'atlas',
    art: '<div class="artwork-window atlas-window"><div class="window-topbar"><i></i><i></i><i></i></div><div class="atlas-map"><span class="map-pin"></span></div><div class="atlas-info"><p class="mini-kicker">A place to keep</p><strong>Find your own way.</strong><span></span><small>12 places saved<br>Brooklyn, NY</small></div></div>',
    url: ''
  },
  {
    title: 'Orbit',
    year: '2025',
    category: 'PRODUCT / MOBILE',
    skills: ['JavaScript', 'React.js'],
    description: 'A gentle study planner that turns a busy semester into a handful of doable next steps.',
    scene: 'orbit',
    art: '<div class="artwork-window orbit-window"><div class="window-topbar"><i></i><i></i><i></i></div><div class="orbit-content"><span class="orbit-date">MONDAY · OCT 12</span><strong>Your week,<br>in orbit.</strong><span class="orbit-task"><i></i> Read chapter 4</span><span class="orbit-task"><i></i> Draft lab notes</span><span class="orbit-task"><i></i> Take a real break</span><div class="orbit-progress"><span></span></div></div></div>',
    url: ''
  },
  {
    title: 'Common Ground',
    year: '2025',
    category: 'COMMUNITY / WEB',
    skills: ['React.js', 'Node.js', 'REST APIs'],
    description: 'A campus events board designed to make it easier to find your people and show up.',
    scene: 'common',
    art: '<div class="artwork-window common-window"><div class="common-sidebar"><p class="common-logo">common<span>.</span></p><p class="common-nav active">Discover</p><p class="common-nav">My events</p><p class="common-nav">Saved</p></div><div class="common-panel"><p class="mini-kicker">Around campus this week</p><h3>Find your kind<br>of gathering.</h3><div class="common-cards"><div class="common-card"><i></i><span></span><span></span></div><div class="common-card"><i></i><span></span><span></span></div><div class="common-card"><i></i><span></span><span></span></div></div></div></div>',
    url: ''
  },
  {
    title: 'Luma',
    year: '2024',
    category: 'DESIGN SYSTEM / TOOL',
    skills: ['JavaScript', 'HTML/CSS'],
    description: 'An accessible color-pairing tool for checking contrast and finding combinations with a little more character.',
    scene: 'luma',
    art: '<div class="artwork-window luma-window"><div class="luma-copy"><p class="mini-kicker">Color, with care</p><strong>See it<br>clearly.</strong><small>Contrast checks for the shades you want to use.</small></div><div class="luma-swatches"><span class="luma-swatch"></span><span class="luma-swatch"></span><span class="luma-swatch"></span><span class="luma-swatch"></span></div></div>',
    url: ''
  }
];

const projectArt = document.querySelector('#project-art');
const projectTitle = document.querySelector('#project-title');
const projectDescription = document.querySelector('#project-description');
const projectTags = document.querySelector('#project-tags');
const projectCategory = document.querySelector('#project-category');
const projectYear = document.querySelector('#project-year');
const projectLink = document.querySelector('#project-link');
const projectElement = document.querySelector('.project');
const projectEmpty = document.querySelector('#project-empty');
const projectCount = document.querySelector('#gallery-count');
const projectIndex = document.querySelector('#project-index');
const figureNumber = document.querySelector('#figure-number');
const progressBar = document.querySelector('#progress-bar');
const skillsList = document.querySelector('#skills-list');
const skillResult = document.querySelector('#skill-result');
const previousButton = document.querySelector('#previous-project');
const nextButton = document.querySelector('#next-project');
const resetButton = document.querySelector('#reset-projects');

const selectedSkills = new Set();
let currentIndex = 0;

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'JavaScript', 'C++', 'C', 'Go', 'SQL']
  },
  {
    title: 'Web & API Development',
    skills: ['Next.js', 'React.js', 'Node.js', 'Flask', 'REST APIs', 'HTML/CSS']
  },
  {
    title: 'Tools & Libraries',
    skills: ['AWS', 'Git', 'Linux/Unix', 'PyTorch', 'NumPy', 'Pandas', 'scikit-learn']
  }
];

function visibleProjects() {
  return selectedSkills.size > 0
    ? projects.filter((project) => project.skills.some((skill) => selectedSkills.has(skill)))
    : projects;
}

function renderProject() {
  const shown = visibleProjects();
  resetButton.hidden = selectedSkills.size === 0;
  previousButton.disabled = shown.length === 0;
  nextButton.disabled = shown.length === 0;
  if (shown.length === 0) {
    projectElement.hidden = true;
    projectEmpty.hidden = false;
    const skillNames = [...selectedSkills].join(', ');
    projectEmpty.textContent = `No sample projects are tagged with any of these skills yet: ${skillNames}.`;
    projectCount.innerHTML = '00 <span>/</span> 00';
    projectIndex.textContent = '00 / 00';
    progressBar.style.width = '0%';
    skillResult.textContent = `No sample projects tagged with ${skillNames} yet`;
    return;
  }

  projectElement.hidden = false;
  projectEmpty.hidden = true;
  const project = shown[currentIndex];
  const position = String(currentIndex + 1).padStart(2, '0');
  const total = String(shown.length).padStart(2, '0');

  projectArt.className = `project-art art-${project.scene}`;
  projectArt.innerHTML = project.art;
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  projectCategory.textContent = project.category;
  projectYear.textContent = project.year;
  projectTags.replaceChildren(...project.skills.map((skill) => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = skill;
    return tag;
  }));
  projectLink.href = project.url || '#';
  projectLink.hidden = !project.url;
  projectCount.innerHTML = `${position} <span>/</span> ${total}`;
  projectIndex.textContent = `${position} / ${total}`;
  figureNumber.textContent = position;
  progressBar.style.width = `${((currentIndex + 1) / shown.length) * 100}%`;
  skillResult.textContent = selectedSkills.size > 0
    ? `${shown.length} ${shown.length === 1 ? 'project' : 'projects'} match any selected skill: ${[...selectedSkills].join(', ')}`
    : `Showing all ${shown.length} projects`;
}

function renderSkills() {
  if (!skillsList.hasChildNodes()) {
    const allButton = document.createElement('button');
    allButton.className = 'skill-button all-button';
    allButton.type = 'button';
    allButton.textContent = 'All projects';
    allButton.addEventListener('click', resetSkills);

    const categoryGroups = skillCategories.map(({ title, skills }) => {
      const group = document.createElement('section');
      group.className = 'skill-category';

      const heading = document.createElement('h3');
      heading.textContent = title;

      const buttons = document.createElement('div');
      buttons.className = 'category-skills';
      buttons.append(...skills.map((skill) => {
        const button = document.createElement('button');
        button.className = 'skill-button';
        button.type = 'button';
        button.textContent = skill;
        button.addEventListener('click', () => toggleSkill(skill));
        return button;
      }));

      group.append(heading, buttons);
      return group;
    });

    skillsList.replaceChildren(allButton, ...categoryGroups);
  }

  skillsList.querySelector('.all-button').setAttribute('aria-pressed', String(selectedSkills.size === 0));
  skillsList.querySelectorAll('.category-skills .skill-button').forEach((button) => {
    button.setAttribute('aria-pressed', String(selectedSkills.has(button.textContent)));
  });
}

function toggleSkill(skill) {
  if (selectedSkills.has(skill)) {
    selectedSkills.delete(skill);
  } else {
    selectedSkills.add(skill);
  }
  currentIndex = 0;
  renderSkills();
  renderProject();
}

function resetSkills() {
  selectedSkills.clear();
  currentIndex = 0;
  renderSkills();
  renderProject();
}

function moveProject(direction) {
  const count = visibleProjects().length;
  if (count === 0) return;
  currentIndex = (currentIndex + direction + count) % count;
  renderProject();
}

previousButton.addEventListener('click', () => moveProject(-1));
nextButton.addEventListener('click', () => moveProject(1));
resetButton.addEventListener('click', resetSkills);

renderSkills();
renderProject();
