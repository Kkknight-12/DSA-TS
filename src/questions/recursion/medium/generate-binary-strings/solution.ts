/**
 * GENERATE BINARY STRINGS - RECURSION
 * ===================================
 *
 * PROBLEM:
 * Integer `n` diya hai.
 * Length `n` ki saari binary strings generate karni hain.
 *
 * Binary string:
 *   sirf '0' aur '1' characters allowed
 *
 * Example:
 *   n = 2
 *   answer = ["00", "01", "10", "11"]
 *
 * INTUITION (Soch):
 * -----------------
 * Har position par 2 choices hoti hain:
 *
 *   1. '0' add karo
 *   2. '1' add karo
 *
 * Recursion ka role:
 *   current partial string ko aage build karna.
 *
 * Base case:
 *   current.length === n
 *
 * Meaning:
 *   String complete ho gayi, result me add karo.
 *
 * Why '0' first?
 *   Ascending / lexicographic order ke liye.
 *
 * TIME: O(n * 2^n)
 *   - 2^n strings generate hoti hain
 *   - each string length n hoti hai
 *
 * SPACE: O(n) recursion depth, excluding output
 * OUTPUT SPACE: O(n * 2^n)
 */

namespace GenerateBinaryStringsRecursion {
  function generateBinaryStrings(n: number): string[] {
    const result: string[] = [];

    buildBinaryString('', n, result);

    return result;
  }

  function buildBinaryString(
    current: string,
    targetLength: number,
    result: string[]
  ): void {
    if (current.length === targetLength) {
      // Current string ki length target ke equal ho gayi.
      // Is branch ka complete answer mil gaya, so result me store karo.
      result.push(current);
      return;
    }

    // '0' branch pehle explore karte hain because lexicographic order me
    // 0-prefixed strings, 1-prefixed strings se pehle aati hain.
    buildBinaryString(current + '0', targetLength, result);

    // '0' branch complete hone ke baad same call frame wapas aata hai,
    // phir '1' branch explore hoti hai.
    buildBinaryString(current + '1', targetLength, result);
  }

  /**
   * ==========================================================
   * DRY RUN - DECISION TREE + CALL FRAMES
   * ==========================================================
   *
   * Example:
   * n = 3
   *
   * Goal:
   * Generate all length-3 binary strings.
   *
   * ==========================================================
   * DECISION TREE
   * ==========================================================
   *
   * Har node ek `current` string represent karta hai.
   * Left branch = append '0'
   * Right branch = append '1'
   *
   *                                   ""
   *                         /                   \
   *                      "0"                    "1"
   *                   /      \                /      \
   *                "00"      "01"          "10"      "11"
   *               /   \      /   \         /   \     /   \
   *            "000" "001" "010" "011" "100" "101" "110" "111"
   *              |     |     |     |     |     |     |     |
   *             add   add   add   add   add   add   add   add
   *
   * Output order:
   *   ["000", "001", "010", "011", "100", "101", "110", "111"]
   *
   * ==========================================================
   * TREE NODE MEANING
   * ==========================================================
   *
   * Node: "01"
   *
   * Meaning:
   *   Abhi tak 2 positions fill ho chuki hain.
   *   Target length 3 hai.
   *   Ek aur character choose karna baaki hai.
   *
   * Children:
   *   "010" by choosing '0'
   *   "011" by choosing '1'
   *
   * Base node:
   *   "010"
   *
   * Meaning:
   *   length 3 complete ho gayi.
   *   result.push("010")
   *   return to parent "01"
   *
   * ==========================================================
   * FULL RECURSION TREE - REFERENCE STYLE
   * ==========================================================
   *
   * Code lines for this tree:
   *
   * LINE A: if current.length === targetLength -> push current, return
   * LINE B: buildBinaryString(current + '0', targetLength, result)
   * LINE C: buildBinaryString(current + '1', targetLength, result)
   *
   * root  (current="", result=[])
   * │
   * ├── LINE B: choose '0' -> build("0")  ALLOWED
   * │   Reason: current length 0 hai, target 3 hai, so next char choose karo.
   * │   │
   * │   │   (current="0", result=[])
   * │   │   ├── LINE B: choose '0' -> build("00")  ALLOWED
   * │   │   │   Reason: "0" abhi length 1 hai, target 3 hai.
   * │   │   │   │
   * │   │   │   │   (current="00", result=[])
   * │   │   │   │   ├── LINE B: choose '0' -> build("000")  ALLOWED
   * │   │   │   │   │   LINE A: BASE CASE -> push "000"
   * │   │   │   │   │   result=["000"]
   * │   │   │   │   │   return to current="00"
   * │   │   │   │   │
   * │   │   │   │   └── LINE C: choose '1' -> build("001")  ALLOWED
   * │   │   │   │       LINE A: BASE CASE -> push "001"
   * │   │   │   │       result=["000", "001"]
   * │   │   │   │       return to current="00"
   * │   │   │   │
   * │   │   │   │   both branches done for current="00"
   * │   │   │   │   return to current="0"
   * │   │   │
   * │   │   └── LINE C: choose '1' -> build("01")  ALLOWED
   * │   │       Reason: "0" ka '0' subtree complete ho gaya, now same frame tries '1'.
   * │   │       │
   * │   │       │   (current="01", result=["000", "001"])
   * │   │       │   ├── LINE B: choose '0' -> build("010")  ALLOWED
   * │   │       │   │   LINE A: BASE CASE -> push "010"
   * │   │       │   │   result=["000", "001", "010"]
   * │   │       │   │   return to current="01"
   * │   │       │   │
   * │   │       │   └── LINE C: choose '1' -> build("011")  ALLOWED
   * │   │       │       LINE A: BASE CASE -> push "011"
   * │   │       │       result=["000", "001", "010", "011"]
   * │   │       │       return to current="01"
   * │   │       │
   * │   │       │   both branches done for current="01"
   * │   │       │   return to current="0"
   * │   │
   * │   │   both branches done for current="0"
   * │   │   return to root current=""
   * │
   * └── LINE C: choose '1' -> build("1")  ALLOWED
   *     Reason: root ka '0' subtree complete ho gaya, now root tries '1'.
   *     │
   *     │   (current="1", result=["000", "001", "010", "011"])
   *     │   ├── LINE B: choose '0' -> build("10")  ALLOWED
   *     │   │   │
   *     │   │   │   (current="10", result=["000", "001", "010", "011"])
   *     │   │   │   ├── LINE B: choose '0' -> build("100")  ALLOWED
   *     │   │   │   │   LINE A: BASE CASE -> push "100"
   *     │   │   │   │   result=["000", "001", "010", "011", "100"]
   *     │   │   │   │   return to current="10"
   *     │   │   │   │
   *     │   │   │   └── LINE C: choose '1' -> build("101")  ALLOWED
   *     │   │   │       LINE A: BASE CASE -> push "101"
   *     │   │   │       result=["000", "001", "010", "011", "100", "101"]
   *     │   │   │       return to current="10"
   *     │   │   │
   *     │   │   │   both branches done for current="10"
   *     │   │   │   return to current="1"
   *     │   │
   *     │   └── LINE C: choose '1' -> build("11")  ALLOWED
   *     │       │
   *     │       │   (current="11", result=["000", "001", "010", "011", "100", "101"])
   *     │       │   ├── LINE B: choose '0' -> build("110")  ALLOWED
   *     │       │   │   LINE A: BASE CASE -> push "110"
   *     │       │   │   result=["000", "001", "010", "011", "100", "101", "110"]
   *     │       │   │   return to current="11"
   *     │       │   │
   *     │       │   └── LINE C: choose '1' -> build("111")  ALLOWED
   *     │       │       LINE A: BASE CASE -> push "111"
   *     │       │       result=["000", "001", "010", "011", "100", "101", "110", "111"]
   *     │       │       return to current="11"
   *     │       │
   *     │       │   both branches done for current="11"
   *     │       │   return to current="1"
   *     │
   *     │   both branches done for current="1"
   *     │   return to root current=""
   *
   * root ke dono branches complete.
   * Final result=["000", "001", "010", "011", "100", "101", "110", "111"]
   *
   * Note:
   *   Is problem me manual pop/backtrack nahi hai because `current + '0'`
   *   and `current + '1'` new strings create karte hain.
   *   Return ke baad parent frame simply next branch run karta hai.
   *
   * ==========================================================
   * BOX-HEAVY CALL FRAME VIEW FOR n = 2
   * ==========================================================
   *
   * +--------------------------------------------------------+
   * | CALL: build("", 2, result)                             |
   * | current.length = 0, targetLength = 2                   |
   * | Not complete. First choose '0'.                        |
   * +--------------------------------------------------------+
   *                      |
   *                      v
   * +--------------------------------------------------------+
   * | CALL: build("0", 2, result)                            |
   * | current.length = 1, targetLength = 2                   |
   * | Not complete. First choose '0'.                        |
   * +--------------------------------------------------------+
   *                      |
   *                      v
   * +--------------------------------------------------------+
   * | CALL: build("00", 2, result)                           |
   * | current.length = 2, targetLength = 2                   |
   * | BASE CASE: result.push("00")                           |
   * | result = ["00"]                                       |
   * | return to build("0")                                  |
   * +--------------------------------------------------------+
   *
   * Back at build("0"):
   *
   * +--------------------------------------------------------+
   * | build("0") ka '0' branch complete ho gaya.             |
   * | Ab same call frame me next line run hoti hai:          |
   * | build("01", 2, result)                                |
   * +--------------------------------------------------------+
   *                      |
   *                      v
   * +--------------------------------------------------------+
   * | CALL: build("01", 2, result)                           |
   * | BASE CASE: result.push("01")                           |
   * | result = ["00", "01"]                                 |
   * | return to build("0")                                  |
   * +--------------------------------------------------------+
   *
   * build("0") ke dono branches complete.
   * return to build("").
   *
   * Then build("") runs its second recursive call:
   *
   * +--------------------------------------------------------+
   * | CALL: build("1", 2, result)                            |
   * | First choose '0' -> build("10")                        |
   * | BASE: add "10"                                        |
   * | Then choose '1' -> build("11")                         |
   * | BASE: add "11"                                        |
   * +--------------------------------------------------------+
   *
   * Final result:
   *   ["00", "01", "10", "11"]
   *
   * ==========================================================
   * WHY ORDER IS ASCENDING
   * ==========================================================
   *
   * At every node:
   *
   *   first explore current + '0'
   *   then explore current + '1'
   *
   * That means:
   *
   *   all strings starting with "0" finish before strings starting with "1"
   *   inside "0", all "00..." finish before "01..."
   *   inside "1", all "10..." finish before "11..."
   *
   * This is exactly lexicographic order.
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. n = 0:
   *    [""]
   *    One empty string exists with length 0.
   *
   * 2. n = 1:
   *    ["0", "1"]
   *
   * 3. n = 2:
   *    ["00", "01", "10", "11"]
   *
   * 4. n = 3:
   *    8 strings, from "000" to "111"
   */

  export function runTests(): void {
    console.log('Testing Generate Binary Strings - Recursion\n');

    const tests: Array<{
      n: number;
      expected: string[];
      description: string;
    }> = [
      {
        n: 0,
        expected: [''],
        description: 'Length zero has one empty string',
      },
      {
        n: 1,
        expected: ['0', '1'],
        description: 'Single character strings',
      },
      {
        n: 2,
        expected: ['00', '01', '10', '11'],
        description: 'Two-character strings in ascending order',
      },
      {
        n: 3,
        expected: ['000', '001', '010', '011', '100', '101', '110', '111'],
        description: 'Three-character strings',
      },
      {
        n: 4,
        expected: [
          '0000',
          '0001',
          '0010',
          '0011',
          '0100',
          '0101',
          '0110',
          '0111',
          '1000',
          '1001',
          '1010',
          '1011',
          '1100',
          '1101',
          '1110',
          '1111',
        ],
        description: 'Four-character strings count and order',
      },
    ];

    let passed = 0;

    tests.forEach(({ n, expected, description }, index) => {
      const result = generateBinaryStrings(n);
      const pass = JSON.stringify(result) === JSON.stringify(expected);

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  n=${n}`);
      console.log(
        `  Expected count: ${expected.length} | Got count: ${result.length}`
      );
      console.log(`  Expected: ${JSON.stringify(expected)}`);
      console.log(
        `  Got:      ${JSON.stringify(result)} -> ${pass ? 'PASS' : 'FAIL'}`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

GenerateBinaryStringsRecursion.runTests();
