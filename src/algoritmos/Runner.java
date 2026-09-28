package algoritmos;

public class Runner {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("Uso: java algoritmos.Runner <algoritmo> [argumentos...]");
            return;
        }

        String algo = args[0].toLowerCase();

        try {
            switch (algo) {
                case "primo":
                    if (args.length < 2) {
                        System.out.println("Erro: Informe o número a ser verificado.");
                        return;
                    }
                    int numPrimo = Integer.parseInt(args[1]);
                    boolean ehPrimo = Primo.verificarPrimo(numPrimo);
                    if (ehPrimo) {
                        System.out.println(numPrimo + " é primo");
                    } else {
                        System.out.println(numPrimo + " não é primo");
                    }
                    break;

                case "somatorio":
                    if (args.length < 2) {
                        System.out.println("Erro: Informe os números separados por vírgula.");
                        return;
                    }
                    String[] partesSoma = args[1].split(",");
                    double[] numsSoma = new double[partesSoma.length];
                    for (int i = 0; i < partesSoma.length; i++) {
                        numsSoma[i] = Double.parseDouble(partesSoma[i].trim());
                    }
                    double soma = Somatorio.calcularSoma(numsSoma);
                    System.out.println("O Somatório dos números é: " + (soma % 1 == 0 ? (long)soma : soma));
                    break;

                case "fibonacci":
                    if (args.length < 2) {
                        System.out.println("Erro: Informe a quantidade de termos.");
                        return;
                    }
                    int nFibo = Integer.parseInt(args[1]);
                    if (nFibo <= 1) {
                        System.out.println("O número precisa ser maior que 1");
                        return;
                    }
                    int[] seq = Fibonacci.gerarSequencia(nFibo);
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < seq.length; i++) {
                        sb.append(seq[i]).append(i == seq.length - 1 ? "" : " ");
                    }
                    System.out.println(sb.toString());
                    break;

                case "mdc":
                    if (args.length < 3) {
                        System.out.println("Erro: Informe dois números inteiros.");
                        return;
                    }
                    int a = Integer.parseInt(args[1]);
                    int b = Integer.parseInt(args[2]);
                    int resMdc = Mdc.calcularMdc(a, b);
                    System.out.println("O MDC de " + a + " e " + b + " é: " + resMdc);
                    break;

                case "ordenacao":
                case "quicksort":
                    if (args.length < 2) {
                        new Ordenacao().Ordenar();
                        return;
                    }
                    String[] partesOrd = args[1].split(",");
                    int[] vetor = new int[partesOrd.length];
                    for (int i = 0; i < partesOrd.length; i++) {
                        vetor[i] = Integer.parseInt(partesOrd[i].trim());
                    }
                    System.out.print("Vetor original: ");
                    Ordenacao.imprimirVetor(vetor);
                    int[] ordenado = Ordenacao.ordenarVetor(vetor);
                    System.out.print("Vetor ordenado: ");
                    Ordenacao.imprimirVetor(ordenado);
                    break;

                case "contagem":
                    if (args.length < 3) {
                        System.out.println("Erro: Informe o conjunto (virgulas) e o valor N.");
                        return;
                    }
                    String[] partesCont = args[1].split(",");
                    double[] conjunto = new double[partesCont.length];
                    for (int i = 0; i < partesCont.length; i++) {
                        conjunto[i] = Double.parseDouble(partesCont[i].trim());
                    }
                    double nCont = Double.parseDouble(args[2]);
                    int totalCont = Contagem.contarInteiros(conjunto, nCont);
                    System.out.println("Quantidade de inteiros no intervalo: " + totalCont);
                    break;

                default:
                    System.out.println("Algoritmo desconhecido: " + algo);
                    break;
            }
        } catch (Exception e) {
            System.err.println("Erro na execução: " + e.getMessage());
        }
    }
}
