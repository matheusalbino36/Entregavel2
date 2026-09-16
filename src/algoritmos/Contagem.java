package algoritmos;
import java.util.Scanner;

public class Contagem {
    private static Scanner Teclado;

    public void Contar() {
        Teclado = new Scanner(System.in);
        System.out.println("Questão de Contagem");
        System.out.print("Digite o valor de N: ");
        int n = Teclado.nextInt();

        if (n <= 0) {
            System.out.println("N deve ser maior que 0.");
            return;
        }

        double[] conjunto = new double[n];

        for (int i = 0; i < n; i++) {
            System.out.print("Digite o número " + (i + 1) + ": ");
            conjunto[i] = Teclado.nextDouble();
        }

        double primeiroDado = conjunto[0];
        double limiteInferior = primeiroDado;
        double limiteSuperior = n;

        if (primeiroDado > n) {
            limiteInferior = n;
            limiteSuperior = primeiroDado;
        }

        int contador = 0;

        for (int i = 0; i < n; i++) {
            double valor = conjunto[i];

            boolean ehInteiro = (valor % 1 == 0);
            boolean estaNoIntervalo = (valor >= limiteInferior && valor <= limiteSuperior);

            if (ehInteiro && estaNoIntervalo) {
                contador++;
            }
        }

        System.out.print("Quantidade de inteiros no intervalo: ");
        System.out.println(contador);
    }
}
