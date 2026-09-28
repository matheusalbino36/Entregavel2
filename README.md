# Entregável 1 - Aplicação Web de Algoritmos (Java & JavaScript)

Aplicação Web Interativa (Front-end SPA + API Backend) desenvolvida para executar, analisar e comparar visualmente a performance dos **6 Algoritmos Fundamentais** implementados tanto em **Java** quanto em **JavaScript**.

---

## 🚀 Como Executar a Aplicação

### 1. Pré-requisitos
- **Node.js** (v14 ou superior)
- **Java JDK** (versão 8+ com `javac` e `java` configurados no PATH)

### 2. Passo a Passo

```bash
# 1. Compilar as classes Java (caso ainda não estejam compiladas)
javac -d bin src/algoritmos/*.java

# 2. Instalar dependências da API Web
cmd /c npm install

# 3. Iniciar o Servidor Web Backend
node server.js
```

Após iniciar o servidor, abra o navegador em:
**`http://localhost:3000`**

---

## 💻 Algoritmos Suportados

1. **Número Primo**: Verifica se um número $N$ é primo.
2. **Somatório**: Soma todos os elementos numéricos de um conjunto.
3. **Fibonacci**: Gera a sequência com os $N$ primeiros termos ($N > 1$).
4. **MDC (Máximo Divisor Comum)**: Algoritmo de Euclides entre $a$ e $b$.
5. **Ordenação (Quicksort)**: Ordena um vetor de números utilizando pivoteamento.
6. **Contagem**: Conta quantos valores inteiros no conjunto estão no intervalo entre o 1º elemento e $N$.

---

## ✨ Funcionalidades da Interface Web (Front-end)

- ☕ **Execução Backend em Java**: Envia requisições HTTP REST para o servidor executar o bytecode Java compilado via CLI process runner.
- ⚡ **Execução em JavaScript**: Suporta execução tanto no lado do cliente (browser) quanto no servidor Node.js.
- ⚔️ **Modo Benchmark (Dual)**: Executa simultaneamente em **Java** e **JavaScript**, comparando a saída e o tempo de execução (em milissegundos).
- 🎨 **Visualizador Interativo do Passo a Passo**:
  - Gráficos de barras animados para o **Quicksort**.
  - Sequência de blocos interativos para **Fibonacci**.
  - Tabela de passos do Algoritmo de Euclides para o **MDC**.
  - Destaque de intervalo e contagem para **Contagem**.
- 💻 **Inspetor de Código Fonte**: Visualização lado a lado do código fonte original em `Java (.java)` e `JavaScript (.js)`.
- 📟 **Console Terminal**: Log em tempo real com timestamp e métricas de execução.

---

## 📂 Estrutura do Projeto

```
Entregavel1-main/
├── bin/                       # Bytecodes Java compilados
├── src/algoritmos/            # Implementações em Java
│   ├── Primo.java
│   ├── Somatorio.java
│   ├── Fibonacci.java
│   ├── Mdc.java
│   ├── Ordenacao.java
│   ├── Contagem.java
│   ├── Runner.java            # Executador parametrizado em Java
│   └── main.java
├── javascript/                # Implementações em JavaScript
│   └── Entregavel1_JavaScript/
│       ├── 1_numero_primo.js
│       ├── 2_somatorio.js
│       ├── 3_fibonacci.js
│       ├── 4_mdc.js
│       ├── 5_quicksort.js
│       └── 6_contagem.js
├── public/                    # Front-end da Aplicação Web
│   ├── index.html             # Layout SPA principal
│   ├── css/style.css          # Estilo Glassmorphism & Cyber Theme
│   └── js/app.js              # Lógica de controle e visualizações
├── package.json
└── server.js                  # Servidor Express & API REST
```
