// Data from CSV
const csvData = `ID,NOME,PERÍODO,CARGA_HORÁRIA,TRANCA,APELIDO,TIPO,DEPARTAMENTO
1,Algoritmo e Estrutura de Dados I,1,60,31;60;,AEDS 1,Obrigatória,DTECH
2,Cálculo Diferencial e Integral I,1,60,8;9;18;21;26;31;,Cálculo 1,Obrigatória,DEFIM
3,Geometria Analítica e Álgebra Linear,1,60,,GAAL,Obrigatória,DEFIM
4,Introdução a Engenharia Química,1,30,33;,Introdução,Obrigatória,DEQUI
5,Metodologias e Redação Científicas,1,30,,Metodologias,Obrigatória,DTECH
6,Química Geral,1,45,11;14;23;25;,Química Geral,Obrigatória,DQBIO
7,Química Geral Experimental,1,15,24;27;,Química Experimental,Obrigatória,DQBIO
8,Cálculo Diferencial e Integral II,2,60,15;17;32;,Cálculo 2,Obrigatória,DEFIM
9,Fenômenos Mecânicos ,2,60,19;42;44;,Física 1,Obrigatória,DEFIM
10,Filosofia da Ciência,2,30,,Filosofia,Obrigatória,DTECH
11,Fundamentos de Química Inorgânica,2,30,,Fundamentos de Inorgânica,Obrigatória,DQBIO
12,Meio Ambiente e Gestão para a Sustentabilidade,2,30,,Meio Ambiente,Obrigatória,DTECH
13,Projeto e Computação Gráfica,2,30,,Computação Gráfica,Obrigatória,DTECH
14,Química Orgânica I,2,60,20;37;,Orgânica 1,Obrigatória,DEQUI
15,Cálculo Diferencial e Integral III,3,60,,Cálculo 3,Obrigatória,DEFIM
16,"Empreendedorismo, Administração e Economia para Engenheiros",3,60,47;,EAEE,Obrigatória,DTECH
17,Equações Diferenciais A,3,60,52;,EDA,Obrigatória,DEFIM
18,Estatística e Probabilidade,3,60,,Estatística,Obrigatória,DEFIM
19,Fenômenos Térmicos e Fluidos,3,30,,Física 2,Obrigatória,DEFIM
20,Química Orgânica II,3,30,28;,Orgânica 2,Obrigatória,DEQUI
21,Fenômenos Eletromagnéticos,4,60,22;36;,Física 3,Obrigatória,DEFIM
22,Física Experimental,4,30,,Física Experimental,Obrigatória,DEFIM
23,Físico-Química,4,60,24;26;34;41;,Físico-Química,Obrigatória,DQBIO
24,Físico-Química Experimental,4,15,,Físico-Química Experimental,Obrigatória,DQBIO
25,Fundamentos de Química Analítica,4,30,27;29;,Fundamentos de Analítica,Obrigatória,DQBIO
26,Princípios de Processos Químicos,4,60,47;49;,Princípios de Processos,Obrigatória,DEQUI
27,Química Analítica Experimental,4,15,30;,Analítica Experimental,Obrigatória,DQBIO
28,Química Orgânica Experimental,4,30,,Orgânica Experimental,Obrigatória,DEQUI
29,Análise Instrumental,5,30,,Análise Instrumental,Obrigatória,DQBIO
30,Análise Instrumental Experimental,5,30,,Instrumental Experimental,Obrigatória,DQBIO
31,Cálculo Numérico,5,60,49;,Cálculo Numérico,Obrigatória,DTECH
32,Mecânica dos Fluidos,5,60,38;40;,Mecânica dos Fluidos,Obrigatória,DEQUI
33,Processos Químicos Industriais,5,60,57;,Processos Industriais,Obrigatória,DEQUI
34,Termodinâmica I,5,60,39;,Termodinâmica I,Obrigatória,DEQUI
35,"Ciência, Tecnologia e Sociedade",6,30,,CTS,Obrigatória,DTECH
36,Eletrotécnica,6,30,,Eletrotécnica,Obrigatória,DTECH
37,Materiais para Indústria Química,6,60,,Materiais ,Obrigatória,DEQUI
38,Operações Unitárias I,6,60,43;,OP 1,Obrigatória,DEQUI
39,Termodinâmica II,6,60,45;50;,Termodinâmica II,Obrigatória,DEQUI
40,Transferência de Calor,6,60,46;,TransCal,Obrigatória,DEQUI
41,Cinética e Cálculo de Reatores Químicos,7,60,51;54;,Cinética,Obrigatória,DEQUI
42,Instrumentação Industrial,7,30,,Instrumentação Industrial,Obrigatória,DEQUI
43,Laboratório de Engenharia Química I,7,60,53;,LEQUI 1,Obrigatória,DEQUI
44,Mecânica dos Sólidos,7,30,,Mecânica dos Sólidos,Obrigatória,DETEM
45,Operações Unitárias II,7,60,48;,OP 2,Obrigatória,DEQUI
46,Transferência de Massa,7,60,,Transferência de Massa,Obrigatória,DEQUI
47,Engenharia Econômica,8,60,56;,Engenharia Econômica,Obrigatória,DEQUI
48,Laboratório de Engenharia Química II,8,60,,LEQUI 2,Obrigatória,DEQUI
49,Modelagem e Simulação de Processos Químicos,8,60,52;56;,Modelagem,Obrigatória,DEQUI
50,Operações Unitárias III,8,60,55;,OP 3,Obrigatória,DEQUI
51,Projeto de Reatores Químicos,8,60,59;,Projeto de Reatores,Obrigatória,DEQUI
52,Controle de Processos Químicos,9,60,,Controle de Processos,Obrigatória,DEQUI
53,Desenvolvimento de Processos Químicos I,9,60,58;,Desenvolvimento de Processos 1,Obrigatória,DEQUI
54,Engenharia Bioquímica,9,60,,Engenharia Bioquímica,Obrigatória,DQBIO
55,Laboratório de Engenharia Química III,9,60,,LEQUI 3,Obrigatória,DEQUI
56,Análise e Otimização de Processos Químicos,10,60,,Análise e Otimização,Obrigatória,DEQUI
57,Controle Ambiental na Indústria,10,60,,Controle Ambiental,Obrigatória,DEQUI
58,Desenvolvimento de Processos Químicos II,10,60,,Desenvolvimento de Processos 2,Obrigatória,DEQUI
59,Projetos e Instalações Industriais,10,60,,Projetos e Instalações,Obrigatória,DEQUI
60,Programação Competitiva I,9,30,,PC 1,Optativa,
61,N/A,9,30,N/A,N/A,Optativa,
62,N/A,10,30,N/A,N/A,Optativa,
63,N/A,10,30,N/A,N/A,Optativa,`;

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


    // Optionally, also highlight the hovered element itself differently (keep as-is)
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
''