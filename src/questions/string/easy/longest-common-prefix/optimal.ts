/**
 * LONGEST COMMON PREFIX - OPTIMAL
 * ===============================
 *
 * PROBLEM:
 * Array `strs` diya hai.
 * Hume longest common prefix return karna hai.
 *
 * Agar koi common prefix nahi hai, toh `""` return karo.
 *
 * Examples:
 *   ["flower", "flow", "flight"] -> "fl"
 *   ["dog", "racecar", "car"]    -> ""
 *
 * INTUITION (Soch):
 * ─────────────────
 * Common prefix kabhi bhi shortest string se bada nahi ho sakta.
 *
 * So best idea:
 *   1. shortest string dhundo
 *   2. uske characters ko left se right check karo
 *   3. har position par verify karo ki sab strings me same character hai ya nahi
 *
 * Jaise hi mismatch milta hai,
 * us point ke pehle tak ka part hi common prefix hota hai.
 *
 * Important note:
 * Horizontal scan bhi `O(S)` ho sakta hai.
 * Yahan shortest-string vertical scan ko `optimal` isliye treat kar rahe hain
 * kyunki logic direct hai aur natural upper bound deta hai.
 *
 * Visual:
 *
 *   ["flower", "flow", "flight"]
 *
 *   shortest string = "flow"
 *
 *   index 0 -> 'f' sab me same
 *   index 1 -> 'l' sab me same
 *   index 2 -> 'o' vs 'i' mismatch
 *
 *   answer = "fl"
 *
 * TIME:  O(S)
 *   - har useful character comparison overall bounded hota hai by total input size
 *
 * SPACE: O(1)
 *   - extra variables constant hain
 *   - returned substring ko extra working space me count nahi kar rahe
 */

namespace LongestCommonPrefixOptimal {
  function findShortestString(strs: string[]): string {
    let shortestString = strs[0];

    for (let i = 1; i < strs.length; i++) {
      // Shortest string natural upper bound deti hai.
      // WHY: common prefix isse lamba ho hi nahi sakta.
      if (strs[i].length < shortestString.length) {
        shortestString = strs[i];
      }
    }

    return shortestString;
  }

  function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
      return '';
    }

    if (strs.length === 1) {
      return strs[0];
    }

    const shortestString = findShortestString(strs);

    if (shortestString === '') {
      return '';
    }

    for (let charIndex = 0; charIndex < shortestString.length; charIndex++) {
      const expectedChar = shortestString[charIndex];

      for (let stringIndex = 0; stringIndex < strs.length; stringIndex++) {
        // Agar current position par koi bhi string mismatch kar gayi,
        // toh yahi break point hai. Isse pehle tak ka part common tha.
        if (strs[stringIndex][charIndex] !== expectedChar) {
          return shortestString.slice(0, charIndex);
        }
      }
    }

    return shortestString;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - FULL CODE FLOW
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * strs = ["flower", "flow", "flight"]
   *
   * Step 1: shortestString find karo
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Start shortestString = "flower"                         │
   * │ Compare with "flow"   -> shorter hai -> update to "flow"│
   * │ Compare with "flight" -> longer hai -> no update        │
   * │ Final shortestString = "flow"                           │
   * └──────────────────────────────────────────────────────────┘
   *
   * Step 2: shortestString ko left se right verify karo
   *
   * ═══════════════════════════════════════════════════════════
   * charIndex = 0, expectedChar = 'f'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ "flower"[0] = 'f' -> match                              │
   * │ "flow"[0]   = 'f' -> match                              │
   * │ "flight"[0] = 'f' -> match                              │
   * │ Sab same -> next index                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * charIndex = 1, expectedChar = 'l'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ "flower"[1] = 'l' -> match                              │
   * │ "flow"[1]   = 'l' -> match                              │
   * │ "flight"[1] = 'l' -> match                              │
   * │ Sab same -> next index                                  │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * charIndex = 2, expectedChar = 'o'
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ "flower"[2] = 'o' -> match                              │
   * │ "flow"[2]   = 'o' -> match                              │
   * │ "flight"[2] = 'i' -> mismatch                           │
   * │ Return shortestString.slice(0, 2) = "fl"                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer = "fl"
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Empty array:
   *    [] -> ""
   *
   * 2. Single string:
   *    ["alone"] -> "alone"
   *
   * 3. No common prefix:
   *    ["dog", "racecar", "car"] -> ""
   *
   * 4. Shortest string itself is answer:
   *    ["inter", "internet", "internal"] -> "inter"
   *
   * 5. Empty string present:
   *    ["", "abc"] -> ""
   */

  export function runTests(): void {
    console.log('Testing Longest Common Prefix - OPTIMAL\n');

    const tests: Array<{
      strs: string[];
      expected: string;
      description: string;
    }> = [
      {
        strs: ['flower', 'flow', 'flight'],
        expected: 'fl',
        description: 'Standard example with partial common prefix',
      },
      {
        strs: ['dog', 'racecar', 'car'],
        expected: '',
        description: 'No common prefix exists',
      },
      {
        strs: ['interview', 'internet', 'internal'],
        expected: 'inter',
        description: 'Common prefix spans multiple characters',
      },
      {
        strs: ['same', 'same', 'same'],
        expected: 'same',
        description: 'All strings are identical',
      },
      {
        strs: [''],
        expected: '',
        description: 'Single empty string',
      },
      {
        strs: ['', 'abc'],
        expected: '',
        description: 'Empty string makes prefix empty',
      },
      {
        strs: ['alone'],
        expected: 'alone',
        description: 'Single string returns itself',
      },
      {
        strs: [],
        expected: '',
        description: 'Empty array',
      },
      {
        strs: ['prefix', 'preach', 'prevent'],
        expected: 'pre',
        description: 'Mismatch happens after first three characters',
      },
    ];

    let passed = 0;

    tests.forEach(({ strs, expected, description }, index) => {
      const result = longestCommonPrefix(strs);
      const pass = result === expected;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  strs=${JSON.stringify(strs)}`);
      console.log(
        `  Expected: "${expected}" | Got: "${result}" -> ${pass ? 'PASS' : 'FAIL'}`
      );
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

LongestCommonPrefixOptimal.runTests();
