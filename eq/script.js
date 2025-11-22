// Função assíncrona para carregar o CSV
async function loadCSV() {
    try {
        const response = await fetch('Materias_EQ_UFSJ_PPC2023.csv');
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo CSV');
        }
        return await response.text();
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}

// Função de inicialização
async function init() {
    const csvData = await loadCSV();
    if (!csvData) {
        console.error('Não foi possível carregar os dados do CSV.');
        return;
    }

    // Parse CSV to array of objects
    function parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const next = line[i + 1];

            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        return result;
    }

    const lines = csvData.trim().split('\n');
    const headers = parseCSVLine(lines[0]);
    const subjectsData = lines.slice(1).map(line => {
        const values = parseCSVLine(line);
        const obj = {};
        headers.forEach((h, i) => obj[h] = values[i] || '');
        obj.ID = parseInt(obj.ID);
        obj.PERÍODO = parseInt(obj.PERÍODO);
        obj.CARGA_HORÁRIA = parseInt(obj.CARGA_HORÁRIA);
        obj.prereqs = obj.TRANCA ? obj.TRANCA.split(';').filter(id => id).map(id => parseInt(id)) : [];
        return obj;
    });

    // Build dependents
    subjectsData.forEach(sub => {
        sub.dependents = [];
    });
    subjectsData.forEach(sub => {
        sub.prereqs.forEach(prereqId => {
            const prereqSub = subjectsData.find(s => s.ID === prereqId);
            if (prereqSub) prereqSub.dependents.push(sub.ID);
        });
    });

    const container = document.getElementById('subjectsContainer');

    // Group by period
    const periods = {};
    subjectsData.forEach(sub => {
        if (!periods[sub.PERÍODO]) periods[sub.PERÍODO] = [];
        periods[sub.PERÍODO].push(sub);
    });

    // Create period divs
    for (let p = 1; p <= 10; p++) {
        const periodDiv = document.createElement('div');
        periodDiv.className = 'period';
        periodDiv.innerHTML = `<h3>${p}º Período</h3>`;

        if (periods[p]) {
            periods[p].forEach(sub => {
                const subjectDiv = document.createElement('div');
                subjectDiv.className = 'subject';
                subjectDiv.dataset.id = sub.ID;

                const cardDiv = document.createElement('div');
                cardDiv.className = 'card';

                const frontDiv = document.createElement('div');
                frontDiv.className = 'front';
                frontDiv.textContent = sub.NOME;

                const backDiv = document.createElement('div');
                backDiv.className = 'back';
                backDiv.innerHTML = `<div>${sub.NOME}</div><div>${sub.CARGA_HORÁRIA}h</div><div>${sub.APELIDO}</div><div>${sub.TIPO}</div><div>${sub.DEPARTAMENTO}</div>`;

                cardDiv.appendChild(frontDiv);
                cardDiv.appendChild(backDiv);
                subjectDiv.appendChild(cardDiv);
                periodDiv.appendChild(subjectDiv);
            });
        }

        container.appendChild(periodDiv);
    }

    // Helper: get all prereqs recursively (ancestors)
    function getAllPrereqs(startId) {
        const visited = new Set();
        function dfs(id) {
            const sub = subjectsData.find(s => s.ID === id);
            if (!sub) return;
            sub.prereqs.forEach(pid => {
                if (!visited.has(pid)) {
                    visited.add(pid);
                    dfs(pid);
                }
            });
        }
        dfs(startId);
        return Array.from(visited);
    }

    // Helper: get all dependents recursively (descendants)
    function getAllDependents(startId) {
        const visited = new Set();
        function dfs(id) {
            const sub = subjectsData.find(s => s.ID === id);
            if (!sub) return;
            sub.dependents.forEach(did => {
                if (!visited.has(did)) {
                    visited.add(did);
                    dfs(did);
                }
            });
        }
        dfs(startId);
        return Array.from(visited);
    }

    // Hover logic — now transitive
    container.addEventListener('mouseover', (e) => {
        if (e.target.closest('.subject')) {
            const hovered = e.target.closest('.subject');
            const id = parseInt(hovered.dataset.id);
            const subj = subjectsData.find(s => s.ID === id);

            // Reset all
            document.querySelectorAll('.front, .back').forEach(el => {
                el.classList.remove('locked', 'prereq');
            });

            // Color direct + transitive prereqs (yellow)
            const allPrereqs = getAllPrereqs(id);
            allPrereqs.forEach(pid => {
                const pFront = document.querySelector(`.subject[data-id="${pid}"] .front`);
                const pBack = document.querySelector(`.subject[data-id="${pid}"] .back`);
                if (pFront) pFront.classList.add('prereq');
                if (pBack) pBack.classList.add('prereq');
            });

            // Also color immediate prereqs of hovered (so that if none transitive, still shows)
            subj.prereqs.forEach(pid => {
                const pFront = document.querySelector(`.subject[data-id="${pid}"] .front`);
                const pBack = document.querySelector(`.subject[data-id="${pid}"] .back`);
                if (pFront) pFront.classList.add('prereq');
                if (pBack) pBack.classList.add('prereq');
            });

            // Color direct + transitive dependents (red)
            const allDependents = getAllDependents(id);
            allDependents.forEach(did => {
                const dFront = document.querySelector(`.subject[data-id="${did}"] .front`);
                const dBack = document.querySelector(`.subject[data-id="${did}"] .back`);
                if (dFront) dFront.classList.add('locked');
                if (dBack) dBack.classList.add('locked');
            });

            // Also color immediate dependents of hovered
            subj.dependents.forEach(did => {
                const dFront = document.querySelector(`.subject[data-id="${did}"] .front`);
                const dBack = document.querySelector(`.subject[data-id="${did}"] .back`);
                if (dFront) dFront.classList.add('locked');
                if (dBack) dBack.classList.add('locked');
            });
        }
    });

    container.addEventListener('mouseout', () => {
        document.querySelectorAll('.front, .back').forEach(el => {
            el.classList.remove('locked', 'prereq');
        });
    });

    // Click to flip
    container.addEventListener('click', (e) => {
        if (e.target.closest('.subject')) {
            const subject = e.target.closest('.subject');
            subject.classList.toggle('flipped');
        }
    });

    // Volta todos os cards para a posição original ao clicar no título
    document.querySelector('h1').addEventListener('click', () => {
        document.querySelectorAll('.subject.flipped').forEach(subject => {
            subject.classList.remove('flipped');
        });
    });
}

// Chama a função de inicialização
init();
