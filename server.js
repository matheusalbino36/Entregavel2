const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');
const { performance } = require('perf_hooks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Path to Java binary compiled directory
const BIN_DIR = path.join(__dirname, 'bin');
const JAVA_SRC_DIR = path.join(__dirname, 'src', 'algoritmos');
const JS_SRC_DIR = path.join(__dirname, 'javascript', 'Entregavel1_JavaScript');

// Pure JS implementations matching original Entregavel 1 files
const jsAlgorithms = {
    primo: (numero) => {
        const num = parseInt(numero);
        if (isNaN(num)) throw new Error("Número inválido.");
        let ehPrimo = true;
        if (num <= 1) ehPrimo = false;
        const steps = [];
        for (let i = 2; i < num; i++) {
            if (num % i === 0) {
                ehPrimo = false;
                steps.push(`Divisível por ${i}`);
                break;
            } else {
                if (steps.length < 5) steps.push(`Não divisível por ${i}`);
            }
        }
        return {
            numero: num,
            ehPrimo,
            steps,
            output: ehPrimo ? `${num} é um número primo!` : `${num} não é um número primo.`
        };
    },

    somatorio: (entrada) => {
        const partes = Array.isArray(entrada) ? entrada : String(entrada).split(",");
        const numeros = [];
        let resultado = 0;
        for (const parte of partes) {
            const valor = parseFloat(String(parte).trim());
            if (!isNaN(valor)) {
                numeros.push(valor);
                resultado += valor;
            }
        }
        return {
            numeros,
            resultado,
            output: numeros.length > 0 
                ? `O somatório dos números [${numeros.join(", ")}] é: ${resultado}` 
                : "Nenhum número foi inserido."
        };
    },

    fibonacci: (nInput) => {
        const n = parseInt(nInput);
        if (isNaN(n) || n <= 0) {
            return { error: true, output: "Por favor, digite um número inteiro maior que 0." };
        }
        const resultado = [];
        let anterior = 0;
        let atual = 1;
        for (let i = 0; i < n; i++) {
            resultado.push(anterior);
            const proximo = anterior + atual;
            anterior = atual;
            atual = proximo;
        }
        return {
            n,
            sequencia: resultado,
            output: `Os primeiros ${n} termos da sequência de Fibonacci são: ${resultado.join(", ")}`
        };
    },

    mdc: (entradaA, entradaB) => {
        let a = Math.abs(parseInt(entradaA));
        let b = Math.abs(parseInt(entradaB));
        const origA = parseInt(entradaA);
        const origB = parseInt(entradaB);

        if (isNaN(a) || isNaN(b)) {
            return { error: true, output: "Por favor, digite números inteiros válidos." };
        }

        const steps = [];
        while (b !== 0) {
            const resto = a % b;
            steps.push(`mdc(${a}, ${b}) -> resto ${resto}`);
            a = b;
            b = resto;
        }

        return {
            a: origA,
            b: origB,
            mdc: a,
            steps,
            output: `O Máximo Divisor Comum (MDC) entre ${origA} e ${origB} é: ${a}`
        };
    },

    quicksort: (entrada) => {
        const partes = Array.isArray(entrada) ? entrada : String(entrada).split(",");
        const arr = [];
        for (const parte of partes) {
            const valor = parseFloat(String(parte).trim());
            if (!isNaN(valor)) {
                arr.push(valor);
            }
        }

        const ordenado = [...arr];
        const pilha = [];
        if (ordenado.length > 1) {
            pilha.push([0, ordenado.length - 1]);
        }

        while (pilha.length > 0) {
            const limites = pilha.pop();
            const inicio = limites[0];
            const fim = limites[1];
            const pivo = ordenado[Math.floor((inicio + fim) / 2)];
            let esquerda = inicio;
            let direita = fim;

            while (esquerda <= direita) {
                while (ordenado[esquerda] < pivo) esquerda++;
                while (ordenado[direita] > pivo) direita--;

                if (esquerda <= direita) {
                    const temporario = ordenado[esquerda];
                    ordenado[esquerda] = ordenado[direita];
                    ordenado[direita] = temporario;
                    esquerda++;
                    direita--;
                }
            }

            if (inicio < direita) pilha.push([inicio, direita]);
            if (esquerda < fim) pilha.push([esquerda, fim]);
        }

        return {
            original: arr,
            ordenado,
            output: `Array original: [${arr.join(", ")}]\nArray ordenado: [${ordenado.join(", ")}]`
        };
    },

    contagem: (entradaDados, entradaN) => {
        const partes = Array.isArray(entradaDados) ? entradaDados : String(entradaDados).split(",");
        const dados = [];
        for (const parte of partes) {
            const valor = parseFloat(String(parte).trim());
            if (!isNaN(valor)) {
                dados.push(valor);
            }
        }
        const N = parseFloat(entradaN);
        if (isNaN(N) || dados.length === 0) {
            return { error: true, output: "Entradas inválidas." };
        }

        let total = 0;
        const primeiro = dados[0];
        const inicio = Math.min(primeiro, N);
        const fim = Math.max(primeiro, N);

        const inteirosNoIntervalo = [];
        for (const valor of dados) {
            if (Number.isInteger(valor) && valor >= inicio && valor <= fim) {
                total++;
                inteirosNoIntervalo.push(valor);
            }
        }

        return {
            dados,
            n: N,
            inicio,
            fim,
            total,
            inteirosNoIntervalo,
            output: `No conjunto [${dados.join(", ")}], há ${total} valor(es) inteiro(s) entre o 1º elemento (${dados[0]}) e N (${N}).`
        };
    }
};

// Execute Java algorithm via CLI process
function runJavaAlgorithm(algo, params) {
    return new Promise((resolve) => {
        const args = [
            '-Dfile.encoding=UTF-8',
            '-Dstdout.encoding=UTF-8',
            '-Dstderr.encoding=UTF-8',
            '-cp',
            BIN_DIR,
            'algoritmos.Runner',
            algo
        ];

        if (algo === 'primo') {
            args.push(String(params.numero || params.n || 0));
        } else if (algo === 'somatorio') {
            args.push(Array.isArray(params.numeros) ? params.numeros.join(',') : String(params.numeros || ''));
        } else if (algo === 'fibonacci') {
            args.push(String(params.n || 0));
        } else if (algo === 'mdc') {
            args.push(String(params.a || 0), String(params.b || 0));
        } else if (algo === 'quicksort' || algo === 'ordenacao') {
            args.push(Array.isArray(params.numeros) ? params.numeros.join(',') : String(params.numeros || ''));
        } else if (algo === 'contagem') {
            args.push(
                Array.isArray(params.dados) ? params.dados.join(',') : String(params.dados || ''),
                String(params.n || 0)
            );
        }

        const startTime = performance.now();
        execFile('java', args, { cwd: __dirname, encoding: 'utf8', timeout: 5000 }, (error, stdout, stderr) => {
            const duration = performance.now() - startTime;
            if (error) {
                resolve({
                    success: false,
                    output: stderr || error.message,
                    executionTimeMs: duration
                });
            } else {
                resolve({
                    success: true,
                    output: stdout.trim(),
                    executionTimeMs: duration
                });
            }
        });
    });
}

// Execute JS algorithm in Node
function runJSAlgorithm(algo, params) {
    const startTime = performance.now();
    try {
        let result;
        if (algo === 'primo') {
            result = jsAlgorithms.primo(params.numero || params.n);
        } else if (algo === 'somatorio') {
            result = jsAlgorithms.somatorio(params.numeros);
        } else if (algo === 'fibonacci') {
            result = jsAlgorithms.fibonacci(params.n);
        } else if (algo === 'mdc') {
            result = jsAlgorithms.mdc(params.a, params.b);
        } else if (algo === 'quicksort' || algo === 'ordenacao') {
            result = jsAlgorithms.quicksort(params.numeros);
        } else if (algo === 'contagem') {
            result = jsAlgorithms.contagem(params.dados, params.n);
        } else {
            throw new Error(`Algoritmo não suportado: ${algo}`);
        }
        const duration = performance.now() - startTime;
        return {
            success: true,
            data: result,
            output: result.output,
            executionTimeMs: duration
        };
    } catch (err) {
        const duration = performance.now() - startTime;
        return {
            success: false,
            output: err.message,
            executionTimeMs: duration
        };
    }
}

// API Routes
app.post('/api/execute', async (req, res) => {
    const { engine, algorithm, params } = req.body;
    const algo = (algorithm || '').toLowerCase();

    if (!algo) {
        return res.status(400).json({ error: 'Algoritmo não especificado.' });
    }

    if (engine === 'java') {
        const javaResult = await runJavaAlgorithm(algo, params);
        return res.json({ engine: 'Java', algorithm: algo, ...javaResult });
    } else if (engine === 'javascript' || engine === 'js') {
        const jsResult = runJSAlgorithm(algo, params);
        return res.json({ engine: 'JavaScript', algorithm: algo, ...jsResult });
    } else if (engine === 'benchmark') {
        const [javaRes, jsRes] = await Promise.all([
            runJavaAlgorithm(algo, params),
            Promise.resolve(runJSAlgorithm(algo, params))
        ]);

        return res.json({
            algorithm: algo,
            benchmark: true,
            java: javaRes,
            javascript: jsRes,
            fastest: javaRes.executionTimeMs < jsRes.executionTimeMs ? 'Java' : 'JavaScript',
            speedRatio: (jsRes.executionTimeMs / (javaRes.executionTimeMs || 0.001)).toFixed(2)
        });
    } else {
        return res.status(400).json({ error: 'Engine inválido. Use java, javascript ou benchmark.' });
    }
});

// Source Code endpoint
app.get('/api/source-code', (req, res) => {
    const algo = (req.query.algo || 'primo').toLowerCase();
    
    const fileMap = {
        primo: { java: 'Primo.java', js: '1_numero_primo.js' },
        somatorio: { java: 'Somatorio.java', js: '2_somatorio.js' },
        fibonacci: { java: 'Fibonacci.java', js: '3_fibonacci.js' },
        mdc: { java: 'Mdc.java', js: '4_mdc.js' },
        quicksort: { java: 'Ordenacao.java', js: '5_quicksort.js' },
        ordenacao: { java: 'Ordenacao.java', js: '5_quicksort.js' },
        contagem: { java: 'Contagem.java', js: '6_contagem.js' }
    };

    const target = fileMap[algo] || fileMap.primo;
    
    try {
        const javaPath = path.join(JAVA_SRC_DIR, target.java);
        const jsPath = path.join(JS_SRC_DIR, target.js);

        const javaCode = fs.existsSync(javaPath) ? fs.readFileSync(javaPath, 'utf8') : '// Arquivo Java não encontrado';
        const jsCode = fs.existsSync(jsPath) ? fs.readFileSync(jsPath, 'utf8') : '// Arquivo JS não encontrado';

        res.json({
            algorithm: algo,
            javaFile: target.java,
            jsFile: target.js,
            javaCode,
            jsCode
        });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao ler arquivos de código fonte: ' + err.message });
    }
});

// Health & System Info
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        nodeVersion: process.version,
        platform: process.platform,
        algorithms: ['primo', 'somatorio', 'fibonacci', 'mdc', 'quicksort', 'contagem']
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server de Algoritmos rodando na porta http://localhost:${PORT}`);
});
