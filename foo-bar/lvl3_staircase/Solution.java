class Solution {
    public static void main(String[] args) {
        System.out.println(Solution.solution(Integer.parseInt(args[0])));
    }

    public static int solution(int n) {
        return Solution.calculateCombinations(1, n - 1);
    }

    public static int calculateCombinations(int start, int end) {
        int combinations = 0;

        for(int i = start; i < end; i++, end--) {
            combinations++;

            int start2 = i + 1;
            int end2 = end - start2;

            if (start2 < end2) {
                combinations += Solution.calculateCombinations(start2, end2);
            }
        }

        return combinations;
    }
}
