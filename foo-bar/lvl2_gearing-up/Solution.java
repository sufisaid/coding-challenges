import java.util.Arrays;

public class Solution {
    public static void main(String[] args) {
        int[] arr = Arrays.stream(args).mapToInt(Integer::parseInt).toArray();
         
        System.out.println(Arrays.toString(Solution.solution(arr)));
    }

    public static int[] solution(int[] pegs) {
        int sign = -1;
        int solution[] = {-1,-1};
        int b = 1;
        int a = 0;
        int coef;

        // setting up denominator
        if (pegs.length % 2 == 0) {
            b = 3;
        }

        for(int i = 0; i < pegs.length; i++) {
            coef = 1;
            if (i != 0 && i != pegs.length -1) {
                coef = 2;
            }

            a += sign * coef * pegs[i];
            sign *= -1;
        }


        if (a >= 1 && a >= b) {
            if (b == 3 && a % 3 == 0) {
                solution[0] = 2 * a / 3;
                solution[1] = 1;
            } else {
                solution[0] = 2 * a;
                solution[1] = b;
            }
        }

        if (Solution.testSolution(pegs, solution)) {
            return solution;
        }

        solution[0] = -1;
        solution[1] = -1;

        return solution;        
    }

    public static int[] getRanges(int pegs[]) {
        int ranges[] = new int[pegs.length - 1];

        for (int i = 0; i < ranges.length; i++) {
            ranges[i] = pegs[i + 1] - pegs[i];
           
            if (ranges[i] < 1) {
                return ranges;
            }
        }

        return ranges;
    }


    public static boolean testSolution(int pegs[], int solution[]) {
        int ranges[] = Solution.getRanges(pegs);
        float radius = (float) solution[0] / solution[1];
       
        for (int i = 0; i < ranges.length; i++) {
            radius = (float) ranges[i] - radius;

            if (radius < 1) {
                return false;
            }
        }

        return true;
    }
}
