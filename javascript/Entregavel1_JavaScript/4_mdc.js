const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });


rl.question("Digite o primeiro número inteiro (a): ", (entradaA) => {

    rl.question("Digite o segundo número inteiro (b): ", (entradaB) => {
        
        let a = Math.abs(parseInt(entradaA));
        let b = Math.abs(parseInt(entradaB));

        if (isNaN(a) || isNaN(b)) {
            console.log("Por favor, digite números inteiros válidos.");
        } else {
            while (b !== 0) {
                const resto = a % b;
                a = b;
                b = resto;
            }

            console.log(`O Máximo Divisor Comum (MDC) entre ${parseInt(entradaA)} e ${parseInt(entradaB)} é: ${a}`);
        }

        rl.close();
    });
});
