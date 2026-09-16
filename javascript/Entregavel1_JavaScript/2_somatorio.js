const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Digite os números separados por vírgula (ex: 1, 2, 3.5, 4): ", (entrada) => {
    if (entrada) {
        const partes = entrada.split(",");
        const numeros = [];
        let resultado = 0;

        for (const parte of partes) {
            const valor = parseFloat(parte.trim());
            if (!isNaN(valor)) {
                numeros.push(valor);
                resultado += valor;
            }
        }

       
        console.log(`O somatório dos números [${numeros.join(", ")}] é: ${resultado}`);
    } else {
        console.log("Nenhum número foi inserido.");
    }

    rl.close();
});
