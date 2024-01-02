import java.util.Arrays;

public class Solution {

    public static void main(String[] args) {
	    String[] result = solution(args);

        System.out.println(Arrays.toString(result));
    }

    public static String[] solution(String[] l) {
        Arrays.sort(l, (o1, o2) -> {
            int[] a1 = Arrays.stream(o1.split("\\.")).mapToInt(Integer::parseInt).toArray();
            int[] a2 = Arrays.stream(o2.split("\\.")).mapToInt(Integer::parseInt).toArray();

            int l1 = a1.length;
            int l2 = a2.length;

            for (int i = 0; i < 3; i++) {
                if (i > 0 && (l1 - 1 < i || l2 - 1 < i)) {
                    return l1 - l2;
                }

                if (a1[i] != a2[i]) {
                    return a1[i] - a2[i];
                }
            }

            return l1 - l2;
        });

        return l;
    }
}
