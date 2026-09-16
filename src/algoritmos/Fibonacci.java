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

}
