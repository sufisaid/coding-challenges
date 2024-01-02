import java.lang.Math;
import java.util.Arrays;


public class Solution {
    public static void main(String[] args) {
        int arr[] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};
         
        System.out.println(Arrays.toString(Solution.solution(30, arr)));
    }

    public static int[] solution(int n, int[] q) {
        int solutions[] = new int[q.length];

        for(int i = 0; i < q.length; i++) {
            solutions[i] = getParent(q[i], n);
        }

        return solutions;
    }

    public static int getParent(int x, int n) {
        int max = (int) Math.pow(2,n) - 1;
        int parent = -1;

        for (n--; n > 0; n--) {
            // X is the current node - return parent
            if (x == max) {
                break;
            }

            parent = max;
            int leftMax = max - (int) Math.pow(2, n);

            // left tree
            if (x <= leftMax) {
                max = leftMax;
                continue;
            }

            // right tree
            max -= 1;
        }

        return parent;
    }
}
