// --- 2. STATE & INITIALIZATION ---

let activeTab = 'devops'; // 'devops' | 'dsa' | 'timetable' | 'calendar' | 'tools'
let timetableTab = 'weekdays'; // 'weekdays' | 'weekends' | 'targets'

let roadmapDataDevOps = JSON.parse(localStorage.getItem('roadmapOS_devops_v1')) || defaultDevOpsData;
let roadmapDataDSA = JSON.parse(localStorage.getItem('roadmapOS_dsa_v1')) || defaultDSAData;

// Bumped version to v4 to ensure the new beautiful • dot structure appears
let roadmapDataTimetable = JSON.parse(localStorage.getItem('roadmapOS_timetable_v4')) || defaultTimetableData;
roadmapDataTimetable.forEach(m => {
    if(!m.category) {
        if(m.id === 'tt_m1') m.category = 'weekdays';
        else if(m.id === 'tt_m2' || m.id === 'tt_m3') m.category = 'weekends';
        else if(m.id === 'tt_m4') m.category = 'targets';
        else m.category = 'weekdays';
    }
});

let studyDays = JSON.parse(localStorage.getItem('roadmapOS_calendar_v3')) || [];

let roadmapData = roadmapDataDevOps;

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    document.getElementById('icon-light').classList.add('hidden');
    document.getElementById('icon-dark').classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
}

function toggleTheme() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
    
    document.getElementById('icon-light').classList.toggle('hidden', isDark);
    document.getElementById('icon-dark').classList.toggle('hidden', !isDark);
}

function saveData() {
    if (activeTab === 'devops') {
        roadmapDataDevOps = roadmapData;
        localStorage.setItem('roadmapOS_devops_v1', JSON.stringify(roadmapDataDevOps));
    } else if (activeTab === 'dsa') {
        roadmapDataDSA = roadmapData;
        localStorage.setItem('roadmapOS_dsa_v1', JSON.stringify(roadmapDataDSA));
    } else if (activeTab === 'timetable') {
        roadmapDataTimetable = roadmapData;
        localStorage.setItem('roadmapOS_timetable_v4', JSON.stringify(roadmapDataTimetable));
    }
    updateOverallProgress();
}

function saveCalendarData() {
    localStorage.setItem('roadmapOS_calendar_v3', JSON.stringify(studyDays));
    updateStreak();
}
function generateId() { return Math.random().toString(36).substr(2, 9); }


// --- 3. UI RENDERING ---
function renderRoadmap() {
    if(!['devops', 'dsa', 'timetable'].includes(activeTab)) return;

    if(activeTab === 'timetable') {
        renderTimetableHTML();
    } else {
        renderRoadmapHTML();
    }
    setupDragAndDrop();
    updateOverallProgress();
}

function renderRoadmapHTML() {
    const container = document.getElementById('modules-container');
    container.innerHTML = '';
    const brandClass = activeTab === 'dsa' ? 'purpleBrand' : 'brand';

    roadmapData.forEach((module, mIndex) => {
        const completedTopics = module.topics.filter(t => t.done).length;
        const totalTopics = module.topics.length;
        const progress = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);
        const isComplete = progress === 100 && totalTopics > 0;

        const moduleDiv = document.createElement('div');
        moduleDiv.className = `bg-white dark:bg-dark-panel rounded-2xl border ${isComplete ? 'module-completed border-success-500/40' : 'border-slate-200 dark:border-dark-border'} shadow-sm overflow-hidden transition-all duration-500 group relative`;
        
        let badgeHtml = '';
        if(isComplete) badgeHtml = `<span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-success-500/10 text-success-600 dark:text-success-400 border border-success-500/20"><i class="fa-solid fa-check-double mr-1"></i> Completed</span>`;
        else if (progress > 0) badgeHtml = `<span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-${brandClass}-50 dark:bg-${brandClass}-500/10 text-${brandClass}-600 dark:text-${brandClass}-400 border border-${brandClass}-200 dark:border-${brandClass}-500/20"><i class="fa-solid fa-spinner fa-spin-pulse mr-1"></i> In Progress</span>`;
        else badgeHtml = `<span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-dark-bg text-slate-500 border border-slate-200 dark:border-dark-border">Not Started</span>`;

        moduleDiv.innerHTML = `
            <div class="p-6 md:p-8 border-b border-slate-100 dark:border-dark-border flex flex-col gap-4 bg-slate-50/30 dark:bg-[#050505]">
                <div class="flex justify-between items-start gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-3">
                            ${badgeHtml}
                            <span class="text-slate-400 text-xs font-bold tracking-widest">#${String(mIndex + 1).padStart(2, '0')}</span>
                        </div>
                        <h3 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            <span contenteditable="true" onblur="updateText('module', '${module.id}', null, this.innerText)" class="outline-none focus:ring-2 focus:ring-${brandClass}-500/50 rounded">${module.title}</span>
                        </h3>
                    </div>
                    <button onclick="deleteModule('${module.id}')" class="w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 dark:text-slate-600 dark:hover:text-red-400 dark:hover:bg-red-500/10 transition-colors flex-shrink-0" title="Delete Module">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
                
                <div class="flex items-center gap-4 mt-2">
                    <div class="flex-1 bg-slate-200 dark:bg-dark-bg rounded-full h-2.5 overflow-hidden shadow-inner border border-slate-300/50 dark:border-white/5">
                        <div class="${isComplete ? 'bg-gradient-to-r from-success-400 to-success-500 shadow-glow-success' : `bg-gradient-to-r from-${brandClass}-400 to-${brandClass}-600 shadow-glow-${brandClass === 'brand' ? '' : brandClass.replace('Brand','')}`} h-full rounded-full transition-all duration-1000 ease-out relative" style="width: ${progress}%"></div>
                    </div>
                    <span class="text-sm font-black ${isComplete ? 'text-success-500' : 'text-slate-700 dark:text-white'} w-12 text-right">${progress}%</span>
                </div>
            </div>
            
            <div class="p-4 md:p-6 bg-white dark:bg-dark-panel">
                <ul class="space-y-2.5 topic-list min-h-[30px]" data-module-id="${module.id}">
                    ${module.topics.length === 0 ? `<li class="text-center p-6 text-slate-400 dark:text-slate-600 text-sm font-medium border-2 border-dashed border-slate-200 dark:border-dark-border rounded-xl">No tasks defined.</li>` : ''}
                    ${module.topics.map(topic => `
                        <li class="drag-item group flex items-center gap-4 p-3.5 rounded-xl border border-transparent hover:bg-slate-50 dark:hover:bg-[#111] hover:border-slate-200 dark:hover:border-[#222] transition-all cursor-move relative" draggable="true" data-topic-id="${topic.id}">
                            <div class="text-slate-300 dark:text-slate-600 cursor-grab active:cursor-grabbing hover:text-${brandClass}-500 transition-colors w-4" title="Drag to reorder"><i class="fa-solid fa-grip-lines"></i></div>
                            <label class="relative flex items-center justify-center cursor-pointer flex-shrink-0 check-anim">
                                <input type="checkbox" ${topic.done ? 'checked' : ''} onchange="toggleTopic('${module.id}', '${topic.id}')" class="peer sr-only">
                                <div class="w-6 h-6 rounded border-[2px] ${topic.done ? 'border-success-500 bg-success-500 shadow-glow-success' : 'border-slate-300 dark:border-slate-600 bg-transparent'} peer-focus:ring-2 peer-focus:ring-${brandClass}-500/50 transition-all flex items-center justify-center overflow-hidden">
                                    <i class="fa-solid fa-check text-white text-xs check-icon transition-all duration-300"></i>
                                </div>
                            </label>
                            <span contenteditable="true" onblur="updateText('topic', '${module.id}', '${topic.id}', this.innerText)" class="flex-1 outline-none text-[15px] ${topic.done ? 'text-slate-400 dark:text-slate-600 line-through decoration-slate-300 dark:decoration-slate-700' : 'text-slate-700 dark:text-slate-200 font-medium'} transition-all">${topic.title}</span>
                            <button onclick="deleteTopic('${module.id}', '${topic.id}')" class="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:text-slate-600 dark:hover:text-red-400 dark:hover:bg-red-500/10 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all flex-shrink-0" title="Delete"><i class="fa-solid fa-xmark"></i></button>
                        </li>
                    `).join('')}
                </ul>
                <button onclick="addTopic('${module.id}')" class="mt-4 text-sm font-bold text-slate-500 dark:text-slate-500 hover:text-${brandClass}-600 dark:hover:text-white bg-slate-50 dark:bg-dark-bg hover:bg-${brandClass}-50 dark:hover:bg-[#1a1a1a] py-3 rounded-xl transition-all flex items-center gap-2 w-full justify-center border border-slate-200 dark:border-dark-border hover:border-${brandClass}-200 dark:hover:border-slate-700 shadow-sm">
                    <i class="fa-solid fa-plus text-xs"></i> Add Subtopic
                </button>
            </div>
        `;
        container.appendChild(moduleDiv);
    });
}

// Sub-navigation logic for Timetable Tabs
function setTimetableTab(tab) {
    timetableTab = tab;
    const tabs = ['weekdays', 'weekends', 'targets'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tt-tab-${t}`);
        if(t === tab) {
            btn.className = 'flex-1 py-3 px-6 rounded-xl bg-white dark:bg-[#222] text-emeraldBrand-600 dark:text-emeraldBrand-400 font-bold shadow-sm transition-all text-sm border border-slate-200/50 dark:border-[#333] tracking-wide';
        } else {
            btn.className = 'flex-1 py-3 px-6 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-semibold transition-all text-sm border border-transparent tracking-wide';
        }
    });
    renderTimetableHTML();
    setupDragAndDrop();
}

function renderTimetableHTML() {
    const container = document.getElementById('timetable-board');
    container.innerHTML = '';
    
    // Filter by the current Timetable Tab (weekdays, weekends, targets)
    const filteredData = roadmapData.filter(m => m.category === timetableTab);

    if (filteredData.length === 0) {
         container.innerHTML = `<div class="w-full text-center p-12 text-slate-500 font-medium">No items in this section. Add a new column to start planning!</div>`;
    }
    
    filteredData.forEach((module, mIndex) => {
        const colDiv = document.createElement('div');
        // Removed overflow restrictions so columns grow to exact content height natively (freestyle cards)
        colDiv.className = 'flex-shrink-0 w-80 md:w-[400px] bg-slate-100/50 dark:bg-[#0a0a0a] rounded-[2rem] flex flex-col border border-slate-200/80 dark:border-[#1a1a1a] shadow-xl shadow-slate-200/20 dark:shadow-none snap-center h-max pb-2';
        
        colDiv.innerHTML = `
            <div class="p-6 border-b border-slate-200/80 dark:border-[#1a1a1a] bg-white dark:bg-[#111] rounded-t-[2rem] flex justify-between items-center z-10 shrink-0">
                <h3 contenteditable="true" onblur="updateText('module', '${module.id}', null, this.innerText)" class="font-black text-xl text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-emeraldBrand-500/50 rounded px-1 -ml-1 uppercase tracking-wider">${module.title}</h3>
                <button onclick="deleteModule('${module.id}')" class="text-slate-400 hover:text-red-500 transition-colors shrink-0 p-1"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            
            <div class="p-5 flex-1 flex flex-col gap-4 topic-list min-h-[150px]" data-module-id="${module.id}">
                ${module.topics.length === 0 ? `<div class="text-center p-6 text-slate-400 dark:text-slate-600 text-sm font-medium border-2 border-dashed border-slate-300 dark:border-[#333] rounded-xl flex-1 flex items-center justify-center">Drag items here</div>` : ''}
                ${module.topics.map(topic => `
                    <div class="drag-item group flex flex-col gap-2 p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#222] border-l-[6px] ${topic.done ? 'border-l-success-500 opacity-70 bg-slate-50 dark:bg-[#111]' : 'border-l-emeraldBrand-500'} shadow-sm hover:shadow-lg transition-all duration-300 cursor-move relative" draggable="true" data-topic-id="${topic.id}">
                        <div class="flex gap-4 items-start">
                            <div class="mt-1 text-slate-300 dark:text-slate-600 cursor-grab active:cursor-grabbing hover:text-emeraldBrand-500 transition-colors shrink-0" title="Drag to move"><i class="fa-solid fa-grip-vertical text-sm"></i></div>
                            <div class="flex-1 flex flex-col pt-0.5">
                                <span contenteditable="true" onblur="updateText('topic', '${module.id}', '${topic.id}', this.innerText)" class="outline-none text-[15px] font-semibold tabular-nums leading-relaxed ${topic.done ? 'text-slate-400 dark:text-slate-500 line-through decoration-slate-400' : 'text-slate-700 dark:text-slate-200'} focus:ring-2 focus:ring-emeraldBrand-500/30 rounded px-1 -ml-1">${topic.title}</span>
                            </div>
                            <label class="relative flex items-center justify-center cursor-pointer check-anim shrink-0 ml-2 mt-0.5">
                                <input type="checkbox" ${topic.done ? 'checked' : ''} onchange="toggleTopic('${module.id}', '${topic.id}')" class="peer sr-only">
                                <div class="w-6 h-6 rounded border-2 ${topic.done ? 'border-success-500 bg-success-500 shadow-glow-success' : 'border-slate-300 dark:border-slate-600 bg-transparent'} peer-focus:ring-2 peer-focus:ring-emeraldBrand-500/50 transition-all flex items-center justify-center overflow-hidden">
                                    <i class="fa-solid fa-check text-white text-xs check-icon transition-all duration-300"></i>
                                </div>
                            </label>
                        </div>
                        <button onclick="deleteTopic('${module.id}', '${topic.id}')" class="absolute -top-3 -right-3 w-7 h-7 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md flex items-center justify-center text-[10px] scale-75 hover:scale-100 z-10"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                `).join('')}
            </div>

            <div class="p-4 bg-transparent shrink-0">
                <button onclick="addTopic('${module.id}')" class="w-full py-3 rounded-xl bg-white dark:bg-[#151515] hover:bg-emeraldBrand-50 dark:hover:bg-emeraldBrand-500/10 text-slate-500 dark:text-slate-400 hover:text-emeraldBrand-600 dark:hover:text-emeraldBrand-400 font-bold text-sm transition-colors flex items-center justify-center gap-2 border border-slate-200/80 dark:border-[#222]">
                    <i class="fa-solid fa-plus"></i> Add Block
                </button>
            </div>
        `;
        container.appendChild(colDiv);
    });
}


// --- 4. DATA MUTATION ---
function toggleTopic(moduleId, topicId) {
    const module = roadmapData.find(m => m.id === moduleId);
    const topic = module.topics.find(t => t.id === topicId);
    topic.done = !topic.done;
    saveData();
    renderRoadmap();
}

function updateText(type, id1, id2, newText) {
    if(type === 'module') roadmapData.find(m => m.id === id1).title = newText;
    else if (type === 'topic') roadmapData.find(m => m.id === id1).topics.find(t => t.id === id2).title = newText;
    saveData();
}

function addModule() {
    if(activeTab === 'timetable') {
        roadmapData.push({ id: 'm_' + generateId(), title: '✨ New Column', category: timetableTab, topics: [] });
    } else {
        roadmapData.push({ id: 'm_' + generateId(), title: '✨ New Module', topics: [] });
    }
    saveData();
    renderRoadmap();
    
    if(activeTab === 'timetable') {
        const board = document.getElementById('timetable-board');
        board.scrollLeft = board.scrollWidth;
    } else {
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function deleteModule(moduleId) {
    let msg = activeTab === 'timetable' ? "Delete this entire column?" : "Delete this entire module and its topics?";
    if(confirm(msg)) {
        roadmapData = roadmapData.filter(m => m.id !== moduleId);
        saveData();
        renderRoadmap();
    }
}

function addTopic(moduleId) {
    const module = roadmapData.find(m => m.id === moduleId);
    module.topics.push({ id: 't_' + generateId(), title: activeTab === 'timetable' ? '00:00 AM  •  New Block' : 'New Topic', done: false });
    saveData();
    renderRoadmap();
}

function deleteTopic(moduleId, topicId) {
    const module = roadmapData.find(m => m.id === moduleId);
    module.topics = module.topics.filter(t => t.id !== topicId);
    saveData();
    renderRoadmap();
}

function updateOverallProgress() {
    let currentRoadmapData = roadmapDataDevOps;
    if(activeTab === 'dsa') currentRoadmapData = roadmapDataDSA;
    if(activeTab === 'timetable') currentRoadmapData = roadmapDataTimetable;

    let total = 0, done = 0, modulesCompleted = 0;
    currentRoadmapData.forEach(m => {
        total += m.topics.length;
        const mDone = m.topics.filter(t => t.done).length;
        done += mDone;
        if(mDone === m.topics.length && m.topics.length > 0) modulesCompleted++;
    });
    
    const percent = total === 0 ? 0 : Math.round((done/total)*100);
    
    // Stats updates (Only for DevOps/DSA now, as it's hidden on timetable)
    if (['devops', 'dsa'].includes(activeTab)) {
        document.getElementById('stat-modules').innerText = `${modulesCompleted} / ${currentRoadmapData.length}`;
        document.getElementById('stat-topics').innerText = total - done;
        document.getElementById('stat-title-1').innerText = 'Modules Done';
        document.getElementById('stat-title-2').innerText = 'Topics Left';
    }

    let circleColor = '#3b82f6';
    let labelHtml = 'DevOps<br>Done';

    if (percent === 100) {
        circleColor = '#10b981';
    } else if (activeTab === 'dsa' || (document.getElementById('nav-progress-label').innerHTML.includes('DSA') && ['calendar','tools'].includes(activeTab))) {
        circleColor = '#a855f7';
        labelHtml = 'DSA<br>Done';
    } else if (activeTab === 'timetable' || (document.getElementById('nav-progress-label').innerHTML.includes('Routine') && ['calendar','tools'].includes(activeTab))) {
        circleColor = '#10b981';
        labelHtml = 'Routine<br>Done';
    }

    if(['devops', 'dsa', 'timetable'].includes(activeTab)) {
        document.getElementById('nav-progress-label').innerHTML = labelHtml;
    }
    
    document.getElementById('nav-progress-text').innerText = `${percent}%`;
    document.getElementById('nav-circle-progress').setAttribute('stroke-dasharray', `${percent}, 100`);
    document.getElementById('nav-circle-progress').style.stroke = circleColor;
}

// --- 5. DRAG AND DROP (Safe Multi-Tab Update) ---
let draggedElement = null;

function setupDragAndDrop() {
    const items = document.querySelectorAll('.drag-item');
    const lists = document.querySelectorAll('.topic-list');

    let borderClass = '!border-brand-500';
    if (activeTab === 'dsa') borderClass = '!border-purpleBrand-500';
    if (activeTab === 'timetable') borderClass = '!border-emeraldBrand-500';

    items.forEach(item => {
        item.removeEventListener('dragstart', handleDragStart);
        item.removeEventListener('dragend', handleDragEnd);
        
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    function handleDragStart(e) {
        if(document.activeElement.getAttribute('contenteditable') === 'true') { e.preventDefault(); return; }
        draggedElement = this;
        setTimeout(() => this.classList.add('dragging'), 0);
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragEnd() {
        this.classList.remove('dragging');
        document.querySelectorAll('.drag-over-top, .drag-over-bottom').forEach(el => el.classList.remove('drag-over-top', 'drag-over-bottom', '!border-brand-500', '!border-purpleBrand-500', '!border-emeraldBrand-500'));
        draggedElement = null;
        updateStateFromDOM();
    }

    lists.forEach(list => {
        list.removeEventListener('dragover', handleDragOver);
        list.removeEventListener('dragleave', handleDragLeave);
        
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('dragleave', handleDragLeave);
        
        function handleDragOver(e) {
            e.preventDefault();
            if(!draggedElement) return;
            const afterElementData = getDragAfterElement(list, e.clientY);
            list.querySelectorAll('.drag-item').forEach(el => el.classList.remove('drag-over-top', 'drag-over-bottom', '!border-brand-500', '!border-purpleBrand-500', '!border-emeraldBrand-500'));
            
            if (afterElementData.element == null) list.appendChild(draggedElement);
            else {
                afterElementData.element.classList.add('drag-over-top', borderClass);
                list.insertBefore(draggedElement, afterElementData.element);
            }
        }
        
        function handleDragLeave(e) {
            if(e.target.classList.contains('drag-item')) e.target.classList.remove('drag-over-top', 'drag-over-bottom', '!border-brand-500', '!border-purpleBrand-500', '!border-emeraldBrand-500');
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.drag-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) return { offset: offset, element: child };
        else return closest;
    }, { offset: Number.NEGATIVE_INFINITY });
}

function updateStateFromDOM() {
    // Safely parse so we don't destroy unrendered tabs (like "Weekends" while dragging in "Weekdays")
    const newRoadmapData = JSON.parse(JSON.stringify(roadmapData)); 
    
    document.querySelectorAll('.topic-list').forEach(list => {
        const moduleId = list.getAttribute('data-module-id');
        const moduleIndex = newRoadmapData.findIndex(m => m.id === moduleId);
        
        if (moduleIndex !== -1) {
            const newTopics = [];
            list.querySelectorAll('.drag-item[data-topic-id]').forEach(li => {
                const topicId = li.getAttribute('data-topic-id');
                let foundTopic = null;
                // Search for the full object in the original data
                roadmapData.forEach(m => { 
                    const t = m.topics.find(x => x.id === topicId); 
                    if(t) foundTopic = JSON.parse(JSON.stringify(t)); 
                });
                if(foundTopic) newTopics.push(foundTopic);
            });
            newRoadmapData[moduleIndex].topics = newTopics;
        }
    });
    roadmapData = newRoadmapData;
    saveData();
    renderRoadmap(); 
}

// --- 6. NAVIGATION & TAB SWITCHING ---
let currentMonthDate = new Date();

function switchTab(tab) {
    activeTab = tab;
    const isRoadmapOrTimetable = ['devops', 'dsa', 'timetable'].includes(tab);
    
    document.getElementById('shared-roadmap-header').classList.toggle('hidden', !isRoadmapOrTimetable);
    
    // Hide Dashboard Stats completely for timetable
    const statsContainer = document.getElementById('roadmap-stats-container');
    if(tab === 'timetable') {
        statsContainer.classList.add('hidden');
    } else if(isRoadmapOrTimetable) {
        statsContainer.classList.remove('hidden');
    }

    document.getElementById('roadmap-list-view').classList.toggle('hidden', !['devops', 'dsa'].includes(tab));
    document.getElementById('timetable-board-view').classList.toggle('hidden', tab !== 'timetable');
    
    document.getElementById('calendar-view').classList.toggle('hidden', tab !== 'calendar');
    document.getElementById('tools-view').classList.toggle('hidden', tab !== 'tools');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.className = 'nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-border hover:text-slate-900 dark:hover:text-white font-semibold transition-all group border border-transparent';
    });

    const activeBtn = document.getElementById(`nav-${tab}`);
    if(tab === 'devops') {
        activeBtn.className = 'nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold transition-all group border border-brand-100 dark:border-brand-500/20';
    } else if (tab === 'dsa') {
        activeBtn.className = 'nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-purpleBrand-50 dark:bg-purpleBrand-500/10 text-purpleBrand-600 dark:text-purpleBrand-400 font-semibold transition-all group border border-purpleBrand-100 dark:border-purpleBrand-500/20';
    } else if (tab === 'timetable') {
        activeBtn.className = 'nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emeraldBrand-50 dark:bg-emeraldBrand-500/10 text-emeraldBrand-600 dark:text-emeraldBrand-400 font-semibold transition-all group border border-emeraldBrand-100 dark:border-emeraldBrand-500/20';
    } else if (tab === 'tools') {
        activeBtn.className = 'nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-roseBrand-50 dark:bg-roseBrand-500/10 text-roseBrand-600 dark:text-roseBrand-400 font-semibold transition-all group border border-roseBrand-100 dark:border-roseBrand-500/20';
    } else {
        activeBtn.className = 'nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 dark:bg-dark-border text-slate-900 dark:text-white font-semibold transition-all group border border-slate-300 dark:border-slate-700';
    }
    
    if (isRoadmapOrTimetable) {
        if (tab === 'devops') roadmapData = roadmapDataDevOps;
        if (tab === 'dsa') roadmapData = roadmapDataDSA;
        if (tab === 'timetable') roadmapData = roadmapDataTimetable;
        
        const titleEl = document.getElementById('roadmap-header-title');
        const descEl = document.getElementById('roadmap-header-desc');

        if (tab === 'devops') {
            titleEl.innerHTML = 'DevOps <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Engineering</span>';
            descEl.innerText = 'Master the cloud native ecosystem. Track your progress, edit topics inline, and build your career roadmap.';
        } else if (tab === 'dsa') {
            titleEl.innerHTML = 'DSA & C++ <span class="text-transparent bg-clip-text bg-gradient-to-r from-purpleBrand-400 to-purpleBrand-600">Mastery</span>';
            descEl.innerText = 'Master problem-solving and algorithms. Track your learning phases, analyze complexity, and build strong logical foundations.';
        } else if (tab === 'timetable') {
            titleEl.innerHTML = 'Daily <span class="text-transparent bg-clip-text bg-gradient-to-r from-emeraldBrand-400 to-emeraldBrand-600">Routine</span>';
            descEl.innerText = 'Master your schedule. Switch tabs, drag, drop, and edit your daily time blocks to build bulletproof consistency.';
        }

        renderRoadmap();
    } else if (tab === 'calendar') {
        renderCalendar();
    } else if (tab === 'tools') {
        updateOverallProgress();
    }
    
    document.getElementById('main-scroll').scrollTop = 0;
}

// --- Consistency, Calendar & Tools Logic remains exactly the same ---
function updateStreak() {
    if(studyDays.length === 0) { 
        const streakEls = document.querySelectorAll('#stat-streak');
        streakEls.forEach(el => el.innerText = '0 Days');
        return; 
    }
    let streak = 0;
    let checkDate = new Date();
    checkDate.setHours(0,0,0,0);
    const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    let isTodayLogged = studyDays.includes(fmt(checkDate));
    if(!isTodayLogged) checkDate.setDate(checkDate.getDate() - 1);
    while(true) {
        if(studyDays.includes(fmt(checkDate))) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else { break; }
    }
    const streakEls = document.querySelectorAll('#stat-streak');
    streakEls.forEach(el => el.innerText = `${streak} ${streak === 1 ? 'Day' : 'Days'}`);
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById('current-month-year').innerText = `${monthNames[month]} ${year}`;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for(let i = 0; i < firstDay; i++) grid.innerHTML += `<div class="aspect-square"></div>`;
    const today = new Date();
    for(let i = 1; i <= daysInMonth; i++) {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const isStudied = studyDays.includes(dateString);
        const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year;
        let cellClasses = `aspect-square flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all border-2 group relative overflow-hidden font-bold select-none `;
        if (isStudied) cellClasses += `bg-success-500 border-success-400 text-white shadow-glow-success hover:bg-success-400 transform hover:scale-105 `;
        else cellClasses += `bg-slate-50 dark:bg-dark-bg border-slate-200 dark:border-dark-border text-slate-500 dark:text-slate-500 hover:border-brand-400 dark:hover:border-brand-500 `;
        if (isToday && !isStudied) cellClasses += `ring-4 ring-brand-500/20 dark:ring-brand-500/20 `;

        grid.innerHTML += `<div onclick="toggleStudyDay('${dateString}')" class="${cellClasses}">
                <span class="z-10 text-lg md:text-xl">${i}</span>
                ${isStudied ? `<i class="fa-solid fa-fire text-[10px] mt-1 text-white z-10"></i>` : `<span class="h-4"></span>`}
            </div>`;
    }
}

function toggleStudyDay(dateString) {
    if(studyDays.includes(dateString)) studyDays = studyDays.filter(d => d !== dateString);
    else studyDays.push(dateString);
    saveCalendarData();
    renderCalendar();
}

function changeMonth(delta) {
    currentMonthDate.setMonth(currentMonthDate.getMonth() + delta);
    renderCalendar();
}

// Tools
let alarmTimeStr = null;
let alarmRinging = false;

function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes().toString().padStart(2, '0');
    let s = now.getSeconds().toString().padStart(2, '0');
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12; h = h ? h : 12; h = h.toString().padStart(2, '0');
    document.getElementById('digital-clock').innerHTML = `${h}<span class="text-slate-300 dark:text-slate-700 mx-1 lg:mx-2 font-light">:</span>${m}<span class="text-slate-300 dark:text-slate-700 mx-1 lg:mx-2 font-light">:</span>${s} <span class="text-3xl md:text-5xl text-roseBrand-500 font-semibold tracking-tight ml-2 md:ml-4">${ampm}</span>`;
    document.getElementById('digital-date').innerText = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    if (alarmTimeStr && !alarmRinging) {
        let current24H = now.getHours().toString().padStart(2, '0');
        let currentM = now.getMinutes().toString().padStart(2, '0');
        if (alarmTimeStr === `${current24H}:${currentM}` && now.getSeconds() === 0) triggerAlarm();
    }
}
setInterval(updateClock, 1000); updateClock();

let pomoTime = 25 * 60; let pomoMode = 'work'; let pomoInterval = null; let isPomoRunning = false;
function updatePomoDisplay() {
    let m = Math.floor(pomoTime / 60).toString().padStart(2, '0');
    let s = (pomoTime % 60).toString().padStart(2, '0');
    document.getElementById('pomo-display').innerHTML = `${m}<span class="text-slate-300 dark:text-slate-700 mx-1 font-light">:</span>${s}`;
    document.title = isPomoRunning ? `(${m}:${s}) Roadmap OS` : `Roadmap OS | Premium Learning Dashboard`;
}
function setPomoMode(mode) {
    if(isPomoRunning) togglePomo();
    pomoMode = mode; pomoTime = mode === 'work' ? 25 * 60 : 5 * 60;
    document.getElementById('btn-pomo-work').className = mode === 'work' ? 'px-3 py-1.5 rounded-md bg-roseBrand-500 text-white transition-all' : 'px-3 py-1.5 rounded-md bg-slate-100 dark:bg-dark-bg text-slate-500 transition-all hover:bg-slate-200 dark:hover:text-slate-300';
    document.getElementById('btn-pomo-break').className = mode === 'break' ? 'px-3 py-1.5 rounded-md bg-roseBrand-500 text-white transition-all' : 'px-3 py-1.5 rounded-md bg-slate-100 dark:bg-dark-bg text-slate-500 transition-all hover:bg-slate-200 dark:hover:text-slate-300';
    document.getElementById('pomo-status').innerText = mode === 'work' ? 'Ready to focus' : 'Time for a break';
    updatePomoDisplay();
}
function togglePomo() {
    const btn = document.getElementById('pomo-toggle-btn');
    if (isPomoRunning) {
        clearInterval(pomoInterval); isPomoRunning = false;
        btn.innerText = "Resume"; btn.className = "py-4 rounded-xl bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 font-bold transition-all active:scale-95";
        document.getElementById('pomo-status').innerText = "Paused";
    } else {
        isPomoRunning = true; btn.innerText = "Pause"; btn.className = "py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/20 active:scale-95";
        document.getElementById('pomo-status').innerText = pomoMode === 'work' ? "Focusing..." : "Resting...";
        pomoInterval = setInterval(() => {
            if (pomoTime > 0) { pomoTime--; updatePomoDisplay(); }
            else { clearInterval(pomoInterval); isPomoRunning = false; triggerAlarm(); setPomoMode(pomoMode === 'work' ? 'break' : 'work'); }
        }, 1000);
    }
    updatePomoDisplay();
}
function resetPomo() {
    if (isPomoRunning) togglePomo();
    setPomoMode(pomoMode);
    document.getElementById('pomo-toggle-btn').innerText = "Start";
    document.getElementById('pomo-toggle-btn').className = "py-4 rounded-xl bg-roseBrand-500 hover:bg-roseBrand-600 text-white font-bold transition-all shadow-lg shadow-roseBrand-500/20 active:scale-95";
}

let swTime = 0; let swInterval = null; let isSwRunning = false; let swStartTime = 0;
function updateSwDisplay() {
    let h = Math.floor(swTime / 3600000).toString().padStart(2, '0');
    let m = Math.floor((swTime % 3600000) / 60000).toString().padStart(2, '0');
    let s = Math.floor((swTime % 60000) / 1000).toString().padStart(2, '0');
    let ms = Math.floor((swTime % 1000) / 10).toString().padStart(2, '0');
    if (h === '00') document.getElementById('sw-display').innerHTML = `${m}<span class="text-slate-300 dark:text-slate-700 mx-1 font-light">:</span>${s}<span class="text-xl md:text-3xl text-slate-400 font-medium ml-1">.${ms}</span>`;
    else document.getElementById('sw-display').innerHTML = `${h}<span class="text-slate-300 dark:text-slate-700 mx-1 font-light">:</span>${m}<span class="text-slate-300 dark:text-slate-700 mx-1 font-light">:</span>${s}<span class="text-xl md:text-3xl text-slate-400 font-medium ml-1">.${ms}</span>`;
}
function toggleSw() {
    const btn = document.getElementById('sw-toggle-btn');
    if (isSwRunning) {
        clearInterval(swInterval); isSwRunning = false;
        btn.innerText = "Resume"; btn.className = "py-4 rounded-xl bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 font-bold transition-all active:scale-95";
    } else {
        isSwRunning = true; btn.innerText = "Pause"; btn.className = "py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/20 active:scale-95";
        swStartTime = Date.now() - swTime;
        swInterval = setInterval(() => { swTime = Date.now() - swStartTime; updateSwDisplay(); }, 10);
    }
}
function resetSw() {
    if (isSwRunning) toggleSw();
    swTime = 0; updateSwDisplay();
    document.getElementById('sw-toggle-btn').innerText = "Start";
    document.getElementById('sw-toggle-btn').className = "py-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all shadow-lg shadow-brand-500/20 active:scale-95";
}

function setAlarm() {
    const input = document.getElementById('alarm-input').value;
    if(!input) return;
    alarmTimeStr = input;
    let [h, m] = input.split(':');
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12; h = h ? h : 12; 
    document.getElementById('alarm-display-time').innerText = `${h}:${m} ${ampm}`;
    document.getElementById('alarm-status-container').classList.remove('hidden');
    const btn = document.getElementById('alarm-set-btn');
    btn.innerText = "Saved"; btn.className = "py-4 rounded-xl bg-success-500 text-white font-bold transition-all shadow-lg shadow-success-500/20 active:scale-95";
    setTimeout(() => {
        btn.innerText = "Update"; btn.className = "py-4 rounded-xl bg-purpleBrand-500 hover:bg-purpleBrand-600 text-white font-bold transition-all shadow-lg shadow-purpleBrand-500/20 active:scale-95";
    }, 2000);
}
function clearAlarm() {
    alarmTimeStr = null; document.getElementById('alarm-input').value = '';
    document.getElementById('alarm-status-container').classList.add('hidden');
    document.getElementById('alarm-set-btn').innerText = "Set";
    document.getElementById('alarm-set-btn').className = "py-4 rounded-xl bg-purpleBrand-500 hover:bg-purpleBrand-600 text-white font-bold transition-all shadow-lg shadow-purpleBrand-500/20 active:scale-95";
}
function triggerAlarm() {
    alarmRinging = true;
    const modal = document.getElementById('alarm-modal');
    const content = document.getElementById('alarm-modal-content');
    modal.classList.remove('hidden'); modal.classList.add('flex');
    setTimeout(() => { modal.classList.remove('opacity-0'); content.classList.remove('scale-95'); }, 10);
    if(navigator.vibrate) navigator.vibrate([500, 250, 500, 250, 500]);
}
function dismissAlarm() {
    alarmRinging = false;
    const modal = document.getElementById('alarm-modal');
    const content = document.getElementById('alarm-modal-content');
    modal.classList.add('opacity-0'); content.classList.add('scale-95');
    setTimeout(() => { modal.classList.add('hidden'); modal.classList.remove('flex'); }, 300);
    clearAlarm();
}

// --- INIT ---
const pathName = window.location.pathname.toLowerCase();
let initialTab = 'timetable';
if (pathName.includes('devops')) initialTab = 'devops';
else if (pathName.includes('dsa')) initialTab = 'dsa';
else if (pathName.includes('tools')) initialTab = 'tools';
else if (pathName.includes('calendar')) initialTab = 'calendar';

switchTab(initialTab);
updateStreak();
