/**
 * STRING TO INTEGER (ATOI) - RECURSIVE APPROACH
 * =============================================
 *
 * Problem:
 * Ek string di gayi hai.
 * Usko 32-bit signed integer me convert karna hai using atoi rules.
 *
 * Rules:
 *   1. Leading spaces ignore karo
 *   2. Optional '+' ya '-' sign read karo
 *   3. Continuous digits read karo
 *   4. Pehle non-digit par stop karo
 *   5. Result ko 32-bit signed range me clamp karo
 *
 * Intuition:
 * Iterative atoi me hum index ko loop se aage badhate hain.
 * Recursive version me wahi kaam recursive calls karti hain.
 *
 * Parsing ko 3 parts me tod dete hain:
 *   1. leading spaces recursively skip karo
 *   2. optional sign read karo
 *   3. digits ko recursive chain me build karo
 *
 * currentNumber ko hum unsigned magnitude ki tarah store karte hain.
 * Sign ko end tak alag rakhne se overflow checks simple ho jaate hain.
 *
 * Algorithm:
 * 1. Recursively first non-space index dhoondo.
 * 2. Agar string yahin khatam ho jaye, return 0.
 * 3. Optional sign read karo aur digit start index one step aage move karo.
 * 4. Agar optional sign ke baad digit hi nahi hai, return 0.
 * 5. Recursive helper se digits read karo.
 * 6. Har digit add karne se pehle check karo ki `currentNumber * 10 + digit`
 *    32-bit range cross toh nahi karega.
 * 7. Safe ho toh `nextNumber = currentNumber * 10 + digit` banao aur next index par recurse karo.
 * 8. End of string ya non-digit milte hi accumulated number par sign apply karke return karo.
 *
 * Time Complexity:
 *   O(n)
 *   Har character at most ek baar process hota hai.
 *
 * Space Complexity:
 *   O(n)
 *   Recursion call stack depth ki wajah se.
 */

namespace StringToIntegerAtoiRecursive {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;
  const MAX_PREFIX = 214748364;
  const ZERO_CHAR_CODE = "0".charCodeAt(0);

  function myAtoi(s: string): number {
    const firstMeaningfulIndex = skipLeadingSpaces(s, 0);

    if (firstMeaningfulIndex === s.length) {
      // Puri string spaces hi thi ya empty thi.
      // Is case me parse karne ke liye koi sign ya digit bachta hi nahi.
      return 0;
    }

    let sign = 1;
    let digitStartIndex = firstMeaningfulIndex;

    if (s[digitStartIndex] === "+" || s[digitStartIndex] === "-") {
      // Optional sign sirf first meaningful position par valid hota hai.
      // Sign consume karne ke baad actual digits next index se start honge.
      sign = s[digitStartIndex] === "-" ? -1 : 1;
      digitStartIndex++;
    }

    if (digitStartIndex === s.length || !isDigit(s[digitStartIndex])) {
      // Optional sign ke baad digit milna zaroori hai.
      // Agar digit nahi mila, toh koi valid number start hi nahi hua.
      return 0;
    }

    return readDigits(s, digitStartIndex, sign, 0);
  }

  function skipLeadingSpaces(s: string, index: number): number {
    if (index === s.length || s[index] !== " ") {
      // Yahan ya toh string khatam ho gayi, ya first non-space mil gaya.
      // Isi index se meaningful parsing start hogi.
      return index;
    }

    // Current character space hai aur atoi rules me leading spaces ignore hote hain.
    // Isliye is token ko consume karke next index par recurse karte hain.
    return skipLeadingSpaces(s, index + 1);
  }

  function readDigits(
    s: string,
    index: number,
    sign: number,
    currentNumber: number
  ): number {
    if (index === s.length || !isDigit(s[index])) {
      // End of string ya first non-digit mil gaya.
      // Yahi atoi ka stop point hota hai, so accumulated magnitude par sign apply karke return karo.
      return sign === 1 ? currentNumber : -currentNumber;
    }

    const digit = s.charCodeAt(index) - ZERO_CHAR_CODE;

    if (willOverflow(currentNumber, digit, sign)) {
      // Next digit append karte hi 32-bit signed range break ho jaayegi.
      // Isliye actual multiplication se pehle hi clamped boundary return karte hain.
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    const nextNumber = currentNumber * 10 + digit;

    // Current digit consume ho chuka hai.
    // nextNumber ab tak parse hui continuous digit prefix ki value represent karta hai.
    return readDigits(s, index + 1, sign, nextNumber);
  }

  function willOverflow(
    currentNumber: number,
    digit: number,
    sign: number
  ): boolean {
    if (currentNumber > MAX_PREFIX) {
      // `currentNumber * 10` hi boundary cross kar dega,
      // so koi bhi next digit safe nahi ho sakta.
      return true;
    }

    if (currentNumber < MAX_PREFIX) {
      // Abhi prefix strictly smaller hai, so next digit append karna safe hai.
      return false;
    }

    // currentNumber exactly 214748364 hai.
    // Ab last allowed digit sign par depend karta hai.
    if (sign === 1) {
      return digit > 7;
    }

    return digit > 8;
  }

  function isDigit(char: string): boolean {
    return char >= "0" && char <= "9";
  }

  /**
   * ==========================================================
   * MENTAL MODEL
   * ==========================================================
   *
   * Parsing ko phases me dekho:
   *
   *   spaces skip
   *   sign read
   *   digits build
   *
   * Example:
   *
   *   s = "   -042"
   *
   *   skipLeadingSpaces(0) -> 3
   *   sign = -1
   *   readDigits(index=4, currentNumber=0)
   *
   * ==========================================================
   * RECURSION STATE FLOW
   * ==========================================================
   *
   * Yahan branching tree nahi hai.
   * Har call mostly ek hi next recursive child banati hai.
   *
   * So is problem ka best visual:
   *
   *   state flow chain
   *   + nested call frames
   *
   * Example:
   *
   * myAtoi("   -042")
   * │
   * ├── skipLeadingSpaces(0)
   * │   └── skipLeadingSpaces(1)
   * │       └── skipLeadingSpaces(2)
   * │           └── skipLeadingSpaces(3) -> return 3
   * │
   * ├── sign = -1, digitStartIndex = 4
   * │
   * └── readDigits(index=4, sign=-1, currentNumber=0)
   *     └── readDigits(index=5, sign=-1, currentNumber=0)
   *         └── readDigits(index=6, sign=-1, currentNumber=4)
   *             └── end -> return -42
   *
   * ==========================================================
   * DIGIT BUILDING CHAIN
   * ==========================================================
   *
   * For digits "042":
   *
   *   currentNumber = 0
   *   read '0' -> 0 * 10 + 0 = 0
   *   read '4' -> 0 * 10 + 4 = 4
   *   read '2' -> 4 * 10 + 2 = 42
   *
   * Sign last me apply hota hai:
   *
   *   sign = -1
   *   final = -42
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Input: "   -042"
   *
   * Phase 1: skipLeadingSpaces
   *
   * ┌────────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: skipLeadingSpaces("   -042", 0)                               │
   * ├────────────────────────────────────────────────────────────────────────┤
   * │ index = 0, s[0] = ' '                                                 │
   * │ Space mila -> is token ko ignore karna hai                            │
   * │ recurse: skipLeadingSpaces("   -042", 1)                              │
   * │                                                                        │
   * │   ┌──────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: skipLeadingSpaces("   -042", 1)                      │     │
   * │   ├──────────────────────────────────────────────────────────────┤     │
   * │   │ index = 1, s[1] = ' '                                        │     │
   * │   │ Space mila -> next index par jao                             │     │
   * │   │ recurse: skipLeadingSpaces("   -042", 2)                     │     │
   * │   │                                                              │     │
   * │   │   ┌────────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 3: skipLeadingSpaces("   -042", 2)            │     │     │
   * │   │   ├────────────────────────────────────────────────────┤     │     │
   * │   │   │ index = 2, s[2] = ' '                              │     │     │
   * │   │   │ Space mila -> next index par jao                   │     │     │
   * │   │   │ recurse: skipLeadingSpaces("   -042", 3)           │     │     │
   * │   │   │                                                    │     │     │
   * │   │   │   ┌──────────────────────────────────────────┐     │     │     │
   * │   │   │   │ CALL 4: skipLeadingSpaces("   -042", 3)  │     │     │     │
   * │   │   │   ├──────────────────────────────────────────┤     │     │     │
   * │   │   │   │ index = 3, s[3] = '-'                    │     │     │     │
   * │   │   │   │ Non-space mil gaya                       │     │     │     │
   * │   │   │   │ return 3                                 │     │     │     │
   * │   │   │   └──────────────────────────────────────────┘     │     │     │
   * │   │   │ return 3                                            │     │     │
   * │   │   └────────────────────────────────────────────────────┘     │     │
   * │   │ return 3                                                      │     │
   * │   └──────────────────────────────────────────────────────────────┘     │
   * │ return 3                                                                │
   * └────────────────────────────────────────────────────────────────────────┘
   *
   * Phase 2: sign read
   *
   *   firstMeaningfulIndex = 3
   *   s[3] = '-'
   *   sign = -1
   *   digitStartIndex = 4
   *
   * Phase 3: readDigits
   *
   * ┌────────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: readDigits("   -042", 4, -1, 0)                               │
   * ├────────────────────────────────────────────────────────────────────────┤
   * │ index = 4, s[4] = '0'                                                  │
   * │ digit = 0                                                              │
   * │ overflow? Nahi                                                         │
   * │ nextNumber = 0 * 10 + 0 = 0                                            │
   * │ recurse: readDigits("   -042", 5, -1, 0)                               │
   * │                                                                        │
   * │   ┌──────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: readDigits("   -042", 5, -1, 0)                      │     │
   * │   ├──────────────────────────────────────────────────────────────┤     │
   * │   │ index = 5, s[5] = '4'                                        │     │
   * │   │ digit = 4                                                    │     │
   * │   │ overflow? Nahi                                               │     │
   * │   │ nextNumber = 0 * 10 + 4 = 4                                 │     │
   * │   │ recurse: readDigits("   -042", 6, -1, 4)                    │     │
   * │   │                                                              │     │
   * │   │   ┌────────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 3: readDigits("   -042", 6, -1, 4)            │     │     │
   * │   │   ├────────────────────────────────────────────────────┤     │     │
   * │   │   │ index = 6, s[6] = '2'                              │     │     │
   * │   │   │ digit = 2                                           │     │     │
   * │   │   │ overflow? Nahi                                      │     │     │
   * │   │   │ nextNumber = 4 * 10 + 2 = 42                        │     │     │
   * │   │   │ recurse: readDigits("   -042", 7, -1, 42)           │     │     │
   * │   │   │                                                     │     │     │
   * │   │   │   ┌──────────────────────────────────────────┐      │     │     │
   * │   │   │   │ CALL 4: readDigits("   -042", 7, -1, 42) │      │     │     │
   * │   │   │   ├──────────────────────────────────────────┤      │     │     │
   * │   │   │   │ index = 7 -> end of string               │      │     │     │
   * │   │   │   │ stop parsing                             │      │     │     │
   * │   │   │   │ return -42                               │      │     │     │
   * │   │   │   └──────────────────────────────────────────┘      │     │     │
   * │   │   │ return -42                                           │     │     │
   * │   │   └────────────────────────────────────────────────────┘     │     │
   * │   │ return -42                                                    │     │
   * │   └──────────────────────────────────────────────────────────────┘     │
   * │ return -42                                                              │
   * └────────────────────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   -42
   *
   * ==========================================================
   * OVERFLOW MENTAL CHECK
   * ==========================================================
   *
   * currentNumber = 214748364
   *
   * Positive:
   *   digit 7 tak safe
   *   digit 8 se overflow
   *
   * Negative:
   *   digit 8 tak safe
   *   digit 9 se overflow
   */

  function expectAtoi(input: string, expected: number): void {
    const actual = myAtoi(input);

    if (actual !== expected) {
      throw new Error(
        `For input ${JSON.stringify(input)}, expected ${expected} but got ${actual}`
      );
    }
  }

  export function runTests(): void {
    const tests: Array<{ input: string; expected: number }> = [
      { input: "42", expected: 42 },
      { input: "-42", expected: -42 },
      { input: "   -042", expected: -42 },
      { input: "1337c0d3", expected: 1337 },
      { input: "0-1", expected: 0 },
      { input: "words and 987", expected: 0 },
      { input: "2147483647", expected: 2147483647 },
      { input: "2147483648", expected: 2147483647 },
      { input: "-2147483648", expected: -2147483648 },
      { input: "-2147483649", expected: -2147483648 },
      { input: "91283472332", expected: 2147483647 },
      { input: "-91283472332", expected: -2147483648 },
      { input: "", expected: 0 },
      { input: "   ", expected: 0 },
      { input: "+1", expected: 1 },
      { input: "+-12", expected: 0 },
      { input: "+", expected: 0 },
      { input: "00000123", expected: 123 },
      { input: "4193 with words", expected: 4193 },
      { input: "   +0 123", expected: 0 },
    ];

    tests.forEach(({ input, expected }) => {
      expectAtoi(input, expected);
    });

    console.log(`Passed ${tests.length}/${tests.length} tests`);
  }
}

StringToIntegerAtoiRecursive.runTests();
