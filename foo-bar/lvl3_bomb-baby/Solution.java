public static String solution(String M, String F) {
    BigInteger m = new BigInteger(M),
        f = new BigInteger(F),
        control = new BigInteger("1"),
        generations = new BigInteger("0"),
        multiplier;

    int cmp;
    
    while (true) {
        cmp = m.compareTo(f);

        if (Solution.isEven(m) && Solution.isEven(f)) {
            return "impossible";
        }

        switch (cmp) {
            case 0:
                return "impossible";
            case 1:
                multiplier = m.divide(f);
                if (multiplier.compareTo(control) == 1) {
                    multiplier = multiplier.subtract(control);
                }
                m = m.subtract(f.multiply(multiplier));
                generations = generations.add(multiplier);
                break;
            case -1:
                multiplier = f.divide(m);
                if (multiplier.compareTo(control) == 1) {
                    multiplier = multiplier.subtract(control);
                }
                f = f.subtract(m.multiply(multiplier));
                generations = generations.add(multiplier);
                break;
        }

        if (m.compareTo(control) == 0 && f.compareTo(control) == 0) {
            break;
        }        
    }

    return generations.toString();
}


public static boolean isEven(BigInteger num) {
    String strNum = num.toString();
    int intNum = Integer.parseInt(strNum.substring(strNum.length() - 1));

    if (intNum % 2 == 0) {
        return true;
    }

    return false;
}
