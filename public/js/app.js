/* ==========================================================================
   Frontend Application JavaScript - Entregavel 1 Algorithms
   ========================================================================== */

const app = {
    currentAlgo: 'primo',
    currentEngine: 'benchmark',
    serverOnline: false,
    sourceCodeCache: {},

    // Definitions for algorithm inputs and presets
    algoConfig: {
        primo: {
            title: '1. Número Primo',
            desc: 'Verifica se um número inteiro positivo N é primo.',
            inputs: [
                { id: 'numero', label: 'Número Inteiro (N)', type: 'number', placeholder: 'Ex: 29', default: '29' }
            ],
            presets: [
                { label: '29 (Primo)', values: { numero: 29 } },
                { label: '100 (Composto)', values: { numero: 100 } },
                { label: '997 (Primo Grande)', values: { numero: 997 } },
                { label: '7919 (Primo Exemplo)', values: { numero: 7919 } }
            ]
        },
        somatorio: {
            title: '2. Somatório de Conjunto',
            desc: 'Calcula a soma de um conjunto de números.',
            inputs: [
                { id: 'numeros', label: 'Conjunto de Números (separados por vírgula)', type: 'text', placeholder: 'Ex: 10, 20, 30.5, 40', default: '10, 20, 30.5, 40' }
            ],
            presets: [
                { label: '10, 20, 30', values: { numeros: '10, 20, 30' } },
                { label: 'Com Decimais', values: { numeros: '1.5, 2.5, 3.5, 4.5' } },
                { label: 'Sequência 1..10', values: { numeros: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10' } }
            ]
        },
        fibonacci: {
            title: '3. Sequência de Fibonacci',
            desc: 'Gera os N primeiros termos da sequência de Fibonacci (N > 1).',
            inputs: [
                { id: 'n', label: 'Quantidade de Termos (N)', type: 'number', placeholder: 'Ex: 10', default: '10' }
            ],
            presets: [
                { label: '5 Termos', values: { n: 5 } },
                { label: '10 Termos', values: { n: 10 } },
                { label: '15 Termos', values: { n: 15 } },
                { label: '20 Termos', values: { n: 20 } }
            ]
        },
        mdc: {
            title: '4. Máximo Divisor Comum (MDC)',
            desc: 'Calcula o MDC entre dois números pelo Algoritmo de Euclides.',
            inputs: [
                { id: 'a', label: 'Primeiro Número (a)', type: 'number', placeholder: 'Ex: 24', default: '24' },
                { id: 'b', label: 'Segundo Número (b)', type: 'number', placeholder: 'Ex: 36', default: '36' }
            ],
            presets: [
                { label: '24 e 36 (MDC=12)', values: { a: 24, b: 36 } },
                { label: '48 e 180 (MDC=12)', values: { a: 48, b: 180 } },
                { label: '101 e 103 (Primos)', values: { a: 101, b: 103 } }
            ]
        },
        quicksort: {
            title: '5. Ordenação Quicksort',
            desc: 'Ordena um vetor de números utilizando o algoritmo Quicksort.',
            inputs: [
                { id: 'numeros', label: 'Vetor de Números (separados por vírgula)', type: 'text', placeholder: 'Ex: 12, 7, 3, 1, 13, 5, 8', default: '12, 7, 3, 1, 13, 5, 8' }
            ],
            presets: [
                { label: 'Exemplo Java [12,7,3...]', values: { numeros: '12, 7, 3, 1, 13, 5, 8' } },
                { label: 'Exemplo JS [34,7,23...]', values: { numeros: '34, 7, 23, 32, 5, 62' } },
                { label: 'Desordenado [90,12,50,4...]', values: { numeros: '90, 12, 50, 4, 33, 78, 1' } }
            ]
        },
        contagem: {
            title: '6. Contagem no Intervalo [1º Dado, N]',
            desc: 'Conta quantos valores inteiros no conjunto estão no intervalo entre o 1º elemento e N.',
            inputs: [
                { id: 'dados', label: 'Conjunto de Dados (separados por vírgula)', type: 'text', placeholder: 'Ex: 2, 5, 7.5, 3, 10, 1, 4', default: '2, 5, 7.5, 3, 10, 1, 4' },
                { id: 'n', label: 'Valor Limite (N)', type: 'number', placeholder: 'Ex: 5', default: '5' }
            ],
            presets: [
                { label: 'Exemplo 1 (N=5)', values: { dados: '2, 5, 7.5, 3, 10, 1, 4', n: 5 } },
                { label: 'Exemplo 2 (N=10)', values: { dados: '15, 2, 8, 4.5, 10', n: 10 } }
            ]
        }
    },

    // Client-side pure JS algorithms for standalone execution
    jsClient: {
        primo: (n) => {
            const num = parseInt(n);
            if (isNaN(num)) return { error: 'Número inválido.' };
            let ehPrimo = true;
            if (num <= 1) ehPrimo = false;
            const steps = [];
            for (let i = 2; i < num; i++) {
                if (num % i === 0) {
                    ehPrimo = false;
                    steps.push(`Divisível por ${i}`);
                    break;
                } else if (steps.length < 6) {
                    steps.push(`Não divisível por ${i}`);
                }
            }
            return {
                numero: num,
                ehPrimo,
                steps,
                output: ehPrimo ? `${num} é um número primo!` : `${num} não é um número primo.`
            };
        },
        somatorio: (raw) => {
            const partes = String(raw).split(",");
            const nums = [];
            let soma = 0;
            for (const p of partes) {
                const val = parseFloat(p.trim());
                if (!isNaN(val)) {
                    nums.push(val);
                    soma += val;
                }
            }
            return {
                numeros: nums,
                resultado: soma,
                output: nums.length > 0 ? `O somatório dos números [${nums.join(", ")}] é: ${soma}` : "Nenhum número foi inserido."
            };
        },
        fibonacci: (nVal) => {
            const n = parseInt(nVal);
            if (isNaN(n) || n <= 0) return { error: 'Informe N > 0.' };
            const seq = [];
            let a = 0, b = 1;
            for (let i = 0; i < n; i++) {
                seq.push(a);
                const next = a + b;
                a = b;
                b = next;
            }
            return {
                n,
                sequencia: seq,
                output: `Os primeiros ${n} termos da sequência de Fibonacci são: ${seq.join(", ")}`
            };
        },
        mdc: (aVal, bVal) => {
            let a = Math.abs(parseInt(aVal));
            let b = Math.abs(parseInt(bVal));
            const origA = parseInt(aVal);
            const origB = parseInt(bVal);
            if (isNaN(a) || isNaN(b)) return { error: 'Números inválidos.' };
            const steps = [];
            while (b !== 0) {
                const resto = a % b;
                steps.push(`MDC(${a}, ${b}) -> Resto: ${resto}`);
                a = b;
                b = resto;
            }
            return {
                a: origA, b: origB, mdc: a, steps,
                output: `O Máximo Divisor Comum (MDC) entre ${origA} e ${origB} é: ${a}`
            };
        },
        quicksort: (raw) => {
            const partes = String(raw).split(",");
            const arr = [];
            for (const p of partes) {
                const v = parseFloat(p.trim());
                if (!isNaN(v)) arr.push(v);
            }
            const ordenado = [...arr];
            const pilha = [];
            if (ordenado.length > 1) pilha.push([0, ordenado.length - 1]);
            while (pilha.length > 0) {
                const [inicio, fim] = pilha.pop();
                const pivo = ordenado[Math.floor((inicio + fim) / 2)];
                let esq = inicio, dir = fim;
                while (esq <= dir) {
                    while (ordenado[esq] < pivo) esq++;
                    while (ordenado[dir] > pivo) dir--;
                    if (esq <= dir) {
                        const temp = ordenado[esq];
                        ordenado[esq] = ordenado[dir];
                        ordenado[dir] = temp;
                        esq++; dir--;
                    }
                }
                if (inicio < dir) pilha.push([inicio, dir]);
                if (esq < fim) pilha.push([esq, fim]);
            }
            return {
                original: arr,
                ordenado,
                output: `Array original: [${arr.join(", ")}]\nArray ordenado: [${ordenado.join(", ")}]`
            };
        },
        contagem: (rawDados, nVal) => {
            const partes = String(rawDados).split(",");
            const dados = [];
            for (const p of partes) {
                const v = parseFloat(p.trim());
                if (!isNaN(v)) dados.push(v);
            }
            const N = parseFloat(nVal);
            if (isNaN(N) || dados.length === 0) return { error: 'Entradas inválidas.' };
            const primeiro = dados[0];
            const inicio = Math.min(primeiro, N);
            const fim = Math.max(primeiro, N);
            let total = 0;
            const inteirosNoIntervalo = [];
            for (const val of dados) {
                if (Number.isInteger(val) && val >= inicio && val <= fim) {
                    total++;
                    inteirosNoIntervalo.push(val);
                }
            }
            return {
                dados, n: N, inicio, fim, total, inteirosNoIntervalo,
                output: `No conjunto [${dados.join(", ")}], há ${total} valor(es) inteiro(s) entre o 1º elemento (${primeiro}) e N (${N}).`
            };
        }
    },

    // Initialization
    init() {
        this.bindEvents();
        this.checkServerStatus();
        this.renderAlgorithmForm(this.currentAlgo);
        this.loadSourceCode(this.currentAlgo);
        this.logTerminal('info', 'Aplicação inicializada com sucesso.');
    },

    bindEvents() {
        // Algorithm tab switching
        document.querySelectorAll('.algo-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const algo = tab.dataset.algo;
                document.querySelectorAll('.algo-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentAlgo = algo;
                this.renderAlgorithmForm(algo);
                this.loadSourceCode(algo);
            });
        });

        // Engine switching buttons
        document.querySelectorAll('.engine-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.engine-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentEngine = btn.dataset.engine;
                const benchCard = document.getElementById('benchmark-card');
                if (this.currentEngine === 'benchmark') {
                    benchCard.classList.remove('hidden');
                } else {
                    benchCard.classList.add('hidden');
                }
            });
        });

        // Inspector tabs (Code vs Terminal)
        document.querySelectorAll('.inspector-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.inspector-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.inspector-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
            });
        });

        // Form submission
        document.getElementById('algo-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.executeCurrentAlgorithm();
        });
    },

    checkServerStatus() {
        fetch('/api/status')
            .then(res => res.json())
            .then(data => {
                this.serverOnline = true;
                const statusDot = document.querySelector('.status-dot');
                const statusText = document.getElementById('status-text');
                statusText.innerText = 'Servidor Online (Java & JS)';
                this.logTerminal('info', `Servidor online: Node ${data.nodeVersion} (${data.platform})`);
            })
            .catch(() => {
                this.serverOnline = false;
                const statusText = document.getElementById('status-text');
                statusText.innerText = 'Modo Local JS (Offline)';
                this.logTerminal('error', 'Servidor Backend indisponível. Executando em modo cliente JS.');
            });
    },

    // Render input forms dynamically
    renderAlgorithmForm(algo) {
        const config = this.algoConfig[algo];
        if (!config) return;

        document.getElementById('form-title').innerText = config.title;

        // Render presets
        const presetsContainer = document.getElementById('presets-container');
        presetsContainer.innerHTML = '';
        config.presets.forEach(p => {
            const chip = document.createElement('span');
            chip.className = 'preset-chip';
            chip.innerText = p.label;
            chip.onclick = () => {
                Object.keys(p.values).forEach(k => {
                    const inp = document.getElementById(`input-${k}`);
                    if (inp) inp.value = p.values[k];
                });
            };
            presetsContainer.appendChild(chip);
        });

        // Render inputs
        const inputsContainer = document.getElementById('dynamic-inputs');
        inputsContainer.innerHTML = '';

        config.inputs.forEach(inp => {
            const group = document.createElement('div');
            group.className = 'form-group';
            group.innerHTML = `
                <label for="input-${inp.id}">${inp.label}</label>
                <input type="${inp.type}" id="input-${inp.id}" placeholder="${inp.placeholder}" value="${inp.default}">
            `;
            inputsContainer.appendChild(group);
        });
    },

    // Get input parameters object
    getFormValues() {
        const config = this.algoConfig[this.currentAlgo];
        const params = {};
        config.inputs.forEach(inp => {
            const el = document.getElementById(`input-${inp.id}`);
            if (el) params[inp.id] = el.value;
        });
        return params;
    },

    // Main Execution Orchestrator
    async executeCurrentAlgorithm() {
        const params = this.getFormValues();
        const algo = this.currentAlgo;
        const engine = this.currentEngine;

        this.logTerminal('info', `Executando [${algo.toUpperCase()}] no motor [${engine.toUpperCase()}] com parâmetros: ${JSON.stringify(params)}`);

        document.getElementById('result-badge').innerText = 'Executando...';
        document.getElementById('result-badge').className = 'result-badge';
        document.getElementById('result-main-output').innerHTML = '<div class="placeholder-text">Processando cálculo...</div>';

        if (this.serverOnline) {
            try {
                const response = await fetch('/api/execute', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ engine, algorithm: algo, params })
                });

                const data = await response.json();

                if (engine === 'benchmark') {
                    this.renderBenchmarkResults(data);
                } else {
                    this.renderSingleResult(data);
                }
                
                // Execute JS locally to generate interactive visualizer state
                const localData = this.jsClient[algo] ? this.jsClient[algo](...(Object.values(params))) : null;
                this.renderVisualizer(algo, localData, params);

            } catch (err) {
                this.logTerminal('error', `Erro na requisição: ${err.message}`);
                this.fallbackLocalExecution(algo, params);
            }
        } else {
            this.fallbackLocalExecution(algo, params);
        }
    },

    fallbackLocalExecution(algo, params) {
        const startTime = performance.now();
        const fn = this.jsClient[algo];
        if (!fn) return;

        const args = Object.values(params);
        const result = fn(...args);
        const duration = performance.now() - startTime;

        this.renderSingleResult({
            engine: 'JavaScript (Client)',
            success: !result.error,
            output: result.output || result.error,
            executionTimeMs: duration
        });

        this.renderVisualizer(algo, result, params);
    },

    renderSingleResult(data) {
        const badge = document.getElementById('result-badge');
        const outputDiv = document.getElementById('result-main-output');
        const timesDiv = document.getElementById('exec-times');

        if (data.success !== false) {
            badge.innerText = `${data.engine || 'Execução'} OK`;
            badge.className = 'result-badge success';
            outputDiv.innerHTML = `<div class="result-text">${this.escapeHtml(data.output)}</div>`;
            timesDiv.innerHTML = `<span class="time-item">⏱ ${data.executionTimeMs ? data.executionTimeMs.toFixed(3) : 0} ms</span>`;
            this.logTerminal('success', `[${data.engine}] Resultado: ${data.output}`);
        } else {
            badge.innerText = 'Erro';
            badge.className = 'result-badge error';
            outputDiv.innerHTML = `<div class="result-text error-text">${this.escapeHtml(data.output)}</div>`;
            timesDiv.innerHTML = '';
            this.logTerminal('error', `[${data.engine}] Erro: ${data.output}`);
        }
    },

    renderBenchmarkResults(data) {
        const benchCard = document.getElementById('benchmark-card');
        benchCard.classList.remove('hidden');

        const javaTime = data.java.executionTimeMs ? data.java.executionTimeMs.toFixed(2) : 'N/A';
        const jsTime = data.javascript.executionTimeMs ? data.javascript.executionTimeMs.toFixed(3) : 'N/A';

        document.getElementById('java-bench-time').innerText = `${javaTime} ms`;
        document.getElementById('js-bench-time').innerText = `${jsTime} ms`;

        document.getElementById('java-bench-status').innerText = data.java.success ? 'Concluído' : 'Erro';
        document.getElementById('js-bench-status').innerText = data.javascript.success ? 'Concluído' : 'Erro';

        const summary = document.getElementById('benchmark-summary');
        summary.innerHTML = `
            Vencedor de Velocidade: <span class="winner-tag">${data.fastest}</span> | 
            Java: ${data.java.output} | JS: ${data.javascript.output}
        `;

        this.renderSingleResult({
            engine: 'Benchmark',
            success: true,
            output: data.java.output,
            executionTimeMs: Math.min(data.java.executionTimeMs, data.javascript.executionTimeMs)
        });

        this.logTerminal('java', `[JAVA] Execution: ${javaTime} ms -> ${data.java.output}`);
        this.logTerminal('js', `[JS] Execution: ${jsTime} ms -> ${data.javascript.output}`);
    },

    // Step Visualizers for each algorithm
    renderVisualizer(algo, data, params) {
        const canvas = document.getElementById('vis-canvas');
        canvas.innerHTML = '';

        if (!data || data.error) {
            canvas.innerHTML = '<div class="placeholder-text">Visualizador indisponível para estes dados.</div>';
            return;
        }

        if (algo === 'quicksort') {
            const arr = data.ordenado || [];
            const orig = data.original || [];
            const maxVal = Math.max(...arr, 1);

            const container = document.createElement('div');
            container.className = 'bars-container';

            arr.forEach((val, idx) => {
                const heightPct = Math.max((val / maxVal) * 100, 15);
                const barItem = document.createElement('div');
                barItem.className = 'bar-item';
                barItem.innerHTML = `
                    <div class="bar-value">${val}</div>
                    <div class="bar-fill" style="height: ${heightPct}px;"></div>
                `;
                container.appendChild(barItem);
            });
            canvas.appendChild(container);
        } 
        else if (algo === 'fibonacci') {
            const seq = data.sequencia || [];
            const flow = document.createElement('div');
            flow.className = 'badge-flow';

            seq.forEach((val, i) => {
                const badge = document.createElement('div');
                badge.className = `flow-badge ${i === seq.length - 1 ? 'highlight' : ''}`;
                badge.innerHTML = `F(${i+1}) = <strong>${val}</strong>`;
                flow.appendChild(badge);
            });
            canvas.appendChild(flow);
        }
        else if (algo === 'primo') {
            const steps = data.steps || [];
            const flow = document.createElement('div');
            flow.className = 'badge-flow';

            const statusBadge = document.createElement('div');
            statusBadge.className = `flow-badge ${data.ehPrimo ? 'highlight' : ''}`;
            statusBadge.innerHTML = `Resultado: <strong>${data.ehPrimo ? 'É PRIMO' : 'NÃO É PRIMO'}</strong>`;
            flow.appendChild(statusBadge);

            steps.forEach(step => {
                const badge = document.createElement('div');
                badge.className = 'flow-badge';
                badge.innerText = step;
                flow.appendChild(badge);
            });
            canvas.appendChild(flow);
        }
        else if (algo === 'mdc') {
            const steps = data.steps || [];
            const flow = document.createElement('div');
            flow.className = 'badge-flow';

            steps.forEach(step => {
                const badge = document.createElement('div');
                badge.className = 'flow-badge highlight';
                badge.innerText = step;
                flow.appendChild(badge);
            });

            const resBadge = document.createElement('div');
            resBadge.className = 'flow-badge highlight';
            resBadge.innerHTML = `MDC Final: <strong>${data.mdc}</strong>`;
            flow.appendChild(resBadge);

            canvas.appendChild(flow);
        }
        else if (algo === 'somatorio') {
            const nums = data.numeros || [];
            const flow = document.createElement('div');
            flow.className = 'badge-flow';

            let somaParcial = 0;
            nums.forEach((val, i) => {
                somaParcial += val;
                const badge = document.createElement('div');
                badge.className = 'flow-badge';
                badge.innerHTML = `Item ${i+1}: +${val} (Acumulado: ${somaParcial})`;
                flow.appendChild(badge);
            });

            canvas.appendChild(flow);
        }
        else if (algo === 'contagem') {
            const dados = data.dados || [];
            const inicio = data.inicio;
            const fim = data.fim;

            const flow = document.createElement('div');
            flow.className = 'badge-flow';

            const rangeBadge = document.createElement('div');
            rangeBadge.className = 'flow-badge highlight';
            rangeBadge.innerHTML = `Intervalo Válido: <strong>[${inicio} à ${fim}]</strong> | Total Encontrado: <strong>${data.total}</strong>`;
            flow.appendChild(rangeBadge);

            dados.forEach(val => {
                const isInt = Number.isInteger(val);
                const inRange = val >= inicio && val <= fim;
                const match = isInt && inRange;

                const badge = document.createElement('div');
                badge.className = `flow-badge ${match ? 'highlight' : ''}`;
                badge.innerHTML = `${val} ${match ? '✓ (Inteiro no intervalo)' : ''}`;
                flow.appendChild(badge);
            });

            canvas.appendChild(flow);
        }
    },

    // Source Code Loader
    loadSourceCode(algo) {
        document.getElementById('java-filename').innerText = `${algo}.java`;
        document.getElementById('js-filename').innerText = `${algo}.js`;

        if (this.sourceCodeCache[algo]) {
            this.renderSourceCode(this.sourceCodeCache[algo]);
            return;
        }

        fetch(`/api/source-code?algo=${algo}`)
            .then(res => res.json())
            .then(data => {
                this.sourceCodeCache[algo] = data;
                this.renderSourceCode(data);
            })
            .catch(() => {
                document.getElementById('java-code-display').innerText = '// Erro ao carregar código Java';
                document.getElementById('js-code-display').innerText = '// Erro ao carregar código JS';
            });
    },

    renderSourceCode(data) {
        document.getElementById('java-filename').innerText = data.javaFile;
        document.getElementById('js-filename').innerText = data.jsFile;

        document.getElementById('java-code-display').innerText = data.javaCode;
        document.getElementById('js-code-display').innerText = data.jsCode;
    },

    copyCode(type) {
        const codeEl = document.getElementById(type === 'java' ? 'java-code-display' : 'js-code-display');
        if (codeEl) {
            navigator.clipboard.writeText(codeEl.innerText);
            this.logTerminal('info', `Código ${type.toUpperCase()} copiado para a área de transferência.`);
        }
    },

    // Terminal Logging Helper
    logTerminal(type, text) {
        const body = document.getElementById('terminal-body');
        if (!body) return;

        const timestamp = new Date().toLocaleTimeString();
        const line = document.createElement('div');
        line.className = `log-line ${type}`;
        line.innerText = `[${timestamp}] ${text}`;

        body.appendChild(line);
        body.scrollTop = body.scrollHeight;
    },

    clearTerminal() {
        document.getElementById('terminal-body').innerHTML = '<div class="log-line info">[SISTEMA] Console limpo.</div>';
    },

    escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
};

// Start application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
