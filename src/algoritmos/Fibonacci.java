package algoritmos;
import java.util.Scanner;
public class Fibonacci {
	private static Scanner Teclado; 
	public void Fibo() {
		Teclado = new Scanner(System.in);
		int n;
		System.out.println("Questão de Fibonacci");
		System.out.printf("Digite a quantidade de termos: ");
		n = Teclado.nextInt();
		
		if(n <= 1) {
			System.out.printf("O número precisa ser maior que 1");
			return;
		}
		int n1 = 0;
		int n2 = 1;
		System.out.print(n1 + " " + n2 + " ");
		for(int i = 3; i <= n; i++) {
			int n3 = n1 + n2;
			System.out.print(n3 + " ");
			n1 = n2;
			n2 = n3;
		}
		System.out.println();
	}

    public static int[] gerarSequencia(int n) {
        if (n <= 0) return new int[0];
        if (n == 1) return new int[]{0};
        int[] seq = new int[n];
        seq[0] = 0;
        seq[1] = 1;
        for (int i = 2; i < n; i++) {
            seq[i] = seq[i - 1] + seq[i - 2];
        }
        return seq;
    }
}
