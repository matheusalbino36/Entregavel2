package algoritmos;
import java.util.Scanner;

public class Primo {
    private static Scanner Teclado;

    public void NPrimo() {
        Teclado = new Scanner(System.in);
        int numero;
        boolean ehPrimo = true;
        System.out.println("Questão de Primo");
        System.out.printf("Digite um número: ");
        numero = Teclado.nextInt();

        if (numero <= 1) {
            ehPrimo = false;
        } else {
            for (int i = 2; i <= numero / 2; i++) {
                if (numero % i == 0) {
                    ehPrimo = false;
                    break;
                }
            }
        }

        if (ehPrimo) {
            System.out.println(numero + " é primo");
        } else {
            System.out.println(numero + " não é primo");
        }
    }
}
