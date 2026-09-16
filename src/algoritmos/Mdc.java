package algoritmos;
import java.util.Scanner;
public class Mdc {
	private static Scanner Teclado;
	public void Maximo() {
		Teclado = new Scanner(System.in);
		int a;
		int b;
		System.out.println("Questão de MDC");
		System.out.printf("Digite o primeiro número: ");
		a = Teclado.nextInt();
		
		System.out.printf("Digite o segundo número: ");
		b = Teclado.nextInt();
		
		int num1 = a;
		int num2 = b;
		
		while(b != 0) {
			int resto = a % b;
			a = b;
			b = resto;
		}
		System.out.println("O MDC de " + num1 + " e " + num2 + " é: " + a);
	}

}
