package algoritmos;

public class Ordenacao {
	public void Ordenar() {
        int[] vetor = {12, 7, 3, 1, 13, 5, 8};
        System.out.println("Questão de Ordenação");
        System.out.print("Vetor original: ");
        imprimirVetor(vetor);

        quicksort(vetor, 0, vetor.length - 1);

        System.out.print("Vetor ordenado: ");
        imprimirVetor(vetor);
    }

    public static void quicksort(int[] vetor, int inicio, int fim) {
        if (inicio < fim) {
            int posicaoPivo = particionar(vetor, inicio, fim);

            quicksort(vetor, inicio, posicaoPivo - 1);

            quicksort(vetor, posicaoPivo + 1, fim);
        }
    }

    public static int particionar(int[] vetor, int inicio, int fim) {
        int pivo = vetor[fim];
        int i = inicio - 1;

        for (int j = inicio; j < fim; j++) {
            if (vetor[j] <= pivo) {
                i++;
                int temporario = vetor[i];
                vetor[i] = vetor[j];
                vetor[j] = temporario;
            }
        }

        int temporario = vetor[i + 1];
        vetor[i + 1] = vetor[fim];
        vetor[fim] = temporario;

        return i + 1;
    }

    public static void imprimirVetor(int[] vetor) {
        for (int numero : vetor) {
            System.out.print(numero + " ");
        }
        System.out.println();
    }
}