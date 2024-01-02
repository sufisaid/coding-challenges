class Solution {
    public static void main(String[] args) {
        System.out.println(Solution.solution(Integer.parseInt(args[0]), Integer.parseInt(args[1])));
    }

    public static int solution(int start, int length) {
        int checksum = start;

        for(int i = 0; i < length; i++) {
            for(int j = 0; j < length; j++) {
                if (j < (length - i) && (i != 0 || j != 0)) {
                    checksum ^= start;
                }
                start++;
            }
        }

        return checksum;
    }
}
