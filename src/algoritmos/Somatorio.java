package algoritmos;
import java.util.Scanner;
public class Somatorio {
	private static Scanner Teclado;
	public void Soma() {
		Teclado = new Scanner(System.in);
		int numero;
		int qntdnumero;
		int soma = 0;
		System.out.println("Questão de Somatório");
		System.out.printf("Digite quantos números quer somar: ");
		qntdnumero = Teclado.nextInt();
		
		for(int i = 1; i <= qntdnumero; i++) {
			System.out.printf("Digite o " + i + " º número: ");
			numero = Teclado.nextInt();
			soma += numero;
			
		}
		
		System.out.printf("O Somatório dos números é: " + soma);
	}

}
