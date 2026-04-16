/**
 * LONGEST COMMON PREFIX - BRUTE FORCE
 * ===================================
 *
 * PROBLEM:
 * Array `strs` diya hai.
 * Hume longest common prefix return karna hai.
 *
 * Prefix matlab:
 *   string ke start se aane wala part
 *
 * Examples:
 *   ["flower", "flow", "flight"] -> "fl"
 *   ["dog", "racecar", "car"]    -> ""
 *
 * INTUITION (Soch):
 * ─────────────────
 * Longest common prefix hamesha first string ke kisi prefix jaisa hi hoga.
 *
 * So brute force idea:
 *   first string ke full length prefix se start karo
 *   phir prefix ko chhota karte jao
 *   jo pehla prefix sab strings me common nikle, wahi answer
 *
 * Visual:
 *
 *   first string = "flower"
 *
 *   possible prefixes:
 *   "flower"
 *   "flowe"
 *   "flow"
 *   "flo"
 *   "fl"
 *   "f"
 *
 *   Inme se jo sab strings me common ho, wahi answer.
 *
 * TIME:  O(n * m^2)
 *   - `m` possible prefix lengths try karte hain
 *   - har prefix ke liye `n` strings check hoti hain
 *   - prefix banana / compare karna worst case me `O(m)` tak ja sakta hai
 *
 * SPACE: O(m)
 *   - current candidate prefix store hota hai
 */

namespace LongestCommonPrefixBruteForce {
  function allStringsStartWith(strs: string[], candidatePrefix: string): boolean {
    for (let i = 0; i < strs.length; i++) {
      // Agar ek bhi string candidate se start nahi hoti,
      // toh ye common prefix nahi ho sakta.
      if (!strs[i].startsWith(candidatePrefix)) {
        return false;
      }
    }

    return true;
  }

  function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
      return '';
    }

    if (strs.length === 1) {
      return strs[0];
    }

    const firstString = strs[0];

    // Sabse lamba candidate pehle try karte hain.
    // WHY: hume longest common prefix chahiye.
    for (
      let prefixLength = firstString.length;
      prefixLength >= 1;
      prefixLength--
    ) {
      const candidatePrefix = firstString.slice(0, prefixLength);

      if (allStringsStartWith(strs, candidatePrefix)) {
        return candidatePrefix;
      }
    }

    return '';
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - FULL CODE ITERATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example:
   * strs = ["flower", "flow", "flight"]
   *
   * firstString = "flower"
   *
   * Candidate order:
   *   "flower" -> "flowe" -> "flow" -> "flo" -> "fl" -> "f"
   *
   * ═══════════════════════════════════════════════════════════
   * TRY 1: candidatePrefix = "flower"
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ "flower".startsWith("flower") -> true                   │
   * │ "flow".startsWith("flower")   -> false                  │
   * │ Fail, next smaller prefix try karo                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * TRY 2: candidatePrefix = "flowe"
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ "flower".startsWith("flowe") -> true                    │
   * │ "flow".startsWith("flowe")   -> false                   │
   * │ Fail, next smaller prefix try karo                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * TRY 3: candidatePrefix = "flow"
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ "flower".startsWith("flow")  -> true                    │
   * │ "flow".startsWith("flow")    -> true                    │
   * │ "flight".startsWith("flow")  -> false                   │
   * │ Fail, next smaller prefix try karo                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * TRY 4: candidatePrefix = "flo"
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ "flower".startsWith("flo")   -> true                    │
   * │ "flow".startsWith("flo")     -> true                    │
   * │ "flight".startsWith("flo")   -> false                   │
   * │ Fail, next smaller prefix try karo                      │
   * └──────────────────────────────────────────────────────────┘
   *
   * ═══════════════════════════════════════════════════════════
   * TRY 5: candidatePrefix = "fl"
   * ═══════════════════════════════════════════════════════════
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ "flower".startsWith("fl")    -> true                    │
   * │ "flow".startsWith("fl")      -> true                    │
   * │ "flight".startsWith("fl")    -> true                    │
   * │ Sab strings pass -> return "fl"                         │
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
   * 4. Empty string inside array:
   *    ["", "abc"] -> ""
   *
   * 5. Whole shortest string common:
   *    ["inter", "internet", "internal"] -> "inter"
   */

  export function runTests(): void {
    console.log('Testing Longest Common Prefix - BRUTE FORCE\n');

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

LongestCommonPrefixBruteForce.runTests();
