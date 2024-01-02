public class Solution {
    public static void main(String[] args) {
        System.out.println(Solution.solution(Integer.parseInt(args[0])));
    }

    public static String solution(int n) {
        String primes = "";

        for (Integer x = 2; primes.length() < n + 5; x++) {
            if (!Solution.isPrime(x)) {
                continue;
            }

            primes += x.toString();
        }

        return primes.substring(n, n + 5);
    }


    public static boolean isPrime(Integer number) {
        for(int i = 2; i <= number/2; i++) {
            // early return on a first divisible number
            if (number % i == 0 && number != 2) {
                return false;
            }
        }
       
        return true;
    }
}
