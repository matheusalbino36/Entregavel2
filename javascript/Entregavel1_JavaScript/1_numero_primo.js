const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Digite um numero inteiro positivo para verificar se e primo: ", (entrada) => {
    const numero = parseInt(entrada);

    
    let ehPrimo = true;
    if (numero <= 1) ehPrimo = false;
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            ehPrimo = false;
            break;
        }
    }

    if (ehPrimo) {
        console.log(`${numero} é um número primo!`);
    } else {
        console.log(`${numero} não é um número primo.`);
    }

    rl.close();
});
