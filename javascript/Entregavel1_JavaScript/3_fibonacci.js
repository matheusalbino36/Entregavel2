const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Digite a quantidade de termos N para a sequência de Fibonacci (N > 1): ", (entrada) => {
    const n = parseInt(entrada);

    if (isNaN(n) || n <= 0) {
        console.log("Por favor, digite um número inteiro maior que 0.");
    } else {
        const resultado = [];
        let anterior = 0;
        let atual = 1;

        for (let i = 0; i < n; i++) {
            resultado.push(anterior);
            const proximo = anterior + atual;
            anterior = atual;
            atual = proximo;
        }

        console.log(`Os primeiros ${n} termos da sequência de Fibonacci são: ${resultado.join(", ")}`);
    }

    rl.close();
});
