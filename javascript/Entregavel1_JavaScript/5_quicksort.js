const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Digite os números do array separados por vírgula (ex: 34, 7, 23, 32, 5, 62): ", (entrada) => {
    if (entrada) {
        const partes = entrada.split(",");
        const arr = [];

        for (const parte of partes) {
            const valor = parseFloat(parte.trim());
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

        console.log(`\nArray original: [${arr.join(", ")}]`);
        console.log(`Array ordenado: [${ordenado.join(", ")}]`);
    } else {
        console.log("Nenhum dado foi inserido.");
    }

    rl.close();
});
