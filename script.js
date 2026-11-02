const projects = [
  {
    title: 'Fault-Tolerant Key-Value Store',
    year: 'OCT 2026',
    category: 'DISTRIBUTED SYSTEMS / BACKEND',
    skills: ['Go'],
    description: 'A distributed key-value store in Go using primary/backup replication over RPC, with automatic failover driven by heartbeat-based failure detection. Every operation is forwarded to the backup for confirmation, guaranteeing linearizable reads and exactly-once writes across client retries, server crashes, and network partitions. A lock-free concurrency model built on goroutines and channels eliminates data races across concurrent RPC handlers.',
    scene: 'replica',
    art: '<div class="artwork-window replica-window"><div class="window-topbar"><i></i><i></i><i></i></div><div class="replica-body"><div class="replica-nodes"><div class="replica-node"><p class="mini-kicker">Primary</p><strong>S1</strong><span class="replica-beat"></span></div><span class="replica-link">Forward →</span><div class="replica-node"><p class="mini-kicker">Backup</p><strong>S2</strong><span class="replica-beat"></span></div></div><div class="replica-log"><p><span>Put</span> user:42 → "bridget"</p><p><span>Fwd</span> S1 → S2 ack</p><p><span>Ping</span> view 7 · ok</p></div></div></div>',
    url: ''
  },
  {
    title: 'Dog Breed Image Classifier',
    year: 'MAR 2026',
    category: 'MACHINE LEARNING / Computer Vision',
    skills: ['Python', 'PyTorch', 'NumPy'],
    description: 'Built and trained PyTorch CNNs for dog-image classification, with standardized data pipelines, train/validation/test splits, checkpointing, and accuracy, cross-entropy, and AUROC metrics. Implemented custom architectures, training loops, early stopping, learning-curve visualizations, and transfer-learning experiments.',
    scene: 'canine',
    art: '<div class="artwork-window canine-window"><div class="window-topbar"><i></i><i></i><i></i></div><div class="canine-body"><div class="canine-photo"><div class="canine-dog"><i class="canine-ear"></i><i class="canine-ear"></i><span class="canine-face"><b></b><b></b><em></em></span><span class="canine-box"></span></div></div><div class="canine-preds"><p class="mini-kicker">Top predictions</p><div class="canine-pred"><span>Golden retriever</span><small>0.91</small><i style="--p: 91%"></i></div><div class="canine-pred"><span>Labrador</span><small>0.06</small><i style="--p: 6%"></i></div><div class="canine-pred"><span>Beagle</span><small>0.02</small><i style="--p: 2%"></i></div><p class="canine-layers">conv → pool → conv → fc</p></div></div></div>',
    url: ''
  },
  {
    title: 'Scalable Search Engine',
    year: 'NOV 2025',
    category: 'INFORMATION RETRIEVAL / WEB',
    skills: ['Python', 'Flask', 'SQL', 'AWS', 'REST APIs'],
    description: 'A distributed search engine in Python that uses MapReduce to process large sets of HTML files in parallel and build a segmented inverted index. Flask RESTful APIs and server-rendered pages rank results with TF-IDF and PageRank, and a service-oriented architecture fans requests out to distributed index servers before merging results for the frontend.',
    scene: 'search',
    art: '<div class="artwork-window search-window"><div class="window-topbar"><i></i><i></i><i></i></div><div class="search-body"><div class="search-bar"><span>distributed systems</span><i></i></div><div class="search-result"><strong></strong><span></span><small>tf-idf 0.82 · pr 0.31</small></div><div class="search-result"><strong></strong><span></span><small>tf-idf 0.74 · pr 0.28</small></div><div class="search-result"><strong></strong><span></span><small>tf-idf 0.69 · pr 0.17</small></div></div></div>',
    url: ''
  },
  {
    title: 'Full-Stack Instagram Clone',
    year: 'SEP–OCT 2025',
    category: 'SOCIAL / FULL-STACK WEB',
    skills: ['React.js', 'Flask', 'SQL', 'AWS', 'REST APIs', 'JavaScript', 'Python'],
    description: 'A full-stack social media web app built with Flask, React, and SQLite, with secure user authentication, post creation, likes, and comments organized around modular, object-oriented design. RESTful API endpoints and SQL queries manage user data in a relational database and feed React hooks and state management for dynamic rendering.',
    scene: 'feed',
    art: '<div class="artwork-window feed-window"><div class="window-topbar"><i></i><i></i><i></i></div><div class="feed-content"><div class="feed-header"><i></i><span></span></div><div class="feed-photo"></div><div class="feed-actions"><i></i><small>24 likes</small></div><span class="feed-line"></span><span class="feed-line short"></span></div></div>',
    url: ''
  }
];

const artPieces = [
  {
    title: 'A Sunday on La Grande Jatte',
    year: '1884–86',
    category: 'GEORGES SEURAT / POINTILLISM',
    skills: ['Pointillism', 'Color', 'Everyday life'],
    description: 'I love how the tiny marks resolve into a whole world from a distance. The scene feels carefully composed, but the light and people keep it from ever feeling still.',
    scene: 'painting',
    image: 'images/1926.224 - A Sunday on La Grande Jatte — 1884.jpg',
    alt: 'A Sunday on La Grande Jatte, showing people relaxing in a tree-lined park beside the water.',
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
const engineeringTab = document.querySelector('#engineering-tab');
const artTab = document.querySelector('#art-tab');
const skillsSection = document.querySelector('#skills-section');
const entryRuleTitle = document.querySelector('#entry-rule-title');
const entryRuleAction = document.querySelector('#entry-rule-action');
const galleryKicker = document.querySelector('#gallery-kicker');
const galleryHeading = document.querySelector('#gallery-heading');
const galleryNote = document.querySelector('#gallery-note');
const galleryToolbar = document.querySelector('.gallery-toolbar');
const figureLabel = document.querySelector('#figure-label');

const selectedSkills = new Set();
let currentIndex = 0;
let currentMode = 'engineering';

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
  if (currentMode === 'art') return artPieces;
  return selectedSkills.size > 0
    ? projects.filter((project) => project.skills.some((skill) => selectedSkills.has(skill)))
    : projects;
}

function renderProject() {
  const shown = visibleProjects();
  resetButton.hidden = currentMode === 'art' || selectedSkills.size === 0;
  previousButton.disabled = shown.length === 0;
  nextButton.disabled = shown.length === 0;
  if (shown.length === 0) {
    projectElement.hidden = true;
    projectEmpty.hidden = false;
    const skillNames = [...selectedSkills].join(', ');
    projectEmpty.textContent = `No projects are tagged with any of these skills yet: ${skillNames}.`;
    projectCount.innerHTML = '00 <span>/</span> 00';
    projectIndex.textContent = '00 / 00';
    progressBar.style.width = '0%';
    skillResult.textContent = `No projects tagged with ${skillNames} yet`;
    return;
  }

  projectElement.hidden = false;
  projectEmpty.hidden = true;
  const project = shown[currentIndex];
  const position = String(currentIndex + 1).padStart(2, '0');
  const total = String(shown.length).padStart(2, '0');

  projectArt.className = `project-art art-${project.scene}`;
  projectArt.innerHTML = project.image
    ? `<img class="artwork-image" src="${project.image}" alt="${project.alt}">`
    : project.art;
  projectArt.setAttribute('aria-hidden', String(currentMode !== 'art'));
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
  projectTags.setAttribute('aria-label', currentMode === 'art' ? 'Art interests' : 'Project technologies');
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

function setMode(mode) {
  currentMode = mode;
  currentIndex = 0;
  const isArt = mode === 'art';

  document.body.classList.toggle('art-mode', isArt);
  engineeringTab.setAttribute('aria-pressed', String(!isArt));
  artTab.setAttribute('aria-pressed', String(isArt));
  skillsSection.hidden = isArt;
  entryRuleTitle.textContent = isArt ? 'Art I have been enjoying lately' : 'Selected projects';
  entryRuleAction.textContent = isArt ? 'Look closer ↓' : 'Enter the gallery ↓';
  galleryKicker.lastChild.textContent = isArt
    ? ' A personal collection · Lately'
    : ' A living collection · 2023—Current';
  galleryHeading.innerHTML = isArt ? 'Recently <em>admired</em>' : 'Selected <em>work</em>';
  galleryNote.textContent = isArt
    ? 'Paintings, details, and ideas I keep coming back to.'
    : 'Small experiments, useful things, and the ideas in between.';
  galleryToolbar.setAttribute('aria-label', isArt ? 'Artwork controls' : 'Gallery controls');
  figureLabel.textContent = isArt ? 'PLATE' : 'FIG.';
  renderProject();
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
engineeringTab.addEventListener('click', () => setMode('engineering'));
artTab.addEventListener('click', () => setMode('art'));

renderSkills();
renderProject();
