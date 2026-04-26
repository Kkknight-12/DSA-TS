/**
 * WORD BREAK - RECURSION + MEMOIZATION
 * ====================================
 *
 * Problem:
 * String `s` aur dictionary `wordDict` di gayi hai.
 * Check karna hai kya `s` ko dictionary words me completely tod sakte hain.
 *
 * Example:
 *   s = "leetcode"
 *   wordDict = ["leet", "code"]
 *   answer = true
 *
 * Intuition:
 * Har recursion frame ek `start` index represent karta hai.
 *
 * Question:
 *   Kya suffix `s[start...]` break ho sakta hai?
 *
 * Har frame me hum dictionary ke saare words try karte hain.
 * Agar koi word current `start` par match karta hai,
 * toh next frame `start + word.length` se chalega.
 *
 * Agar koi bhi matching word remaining suffix ko successfully break kar de,
 * toh current frame turant true return kar deta hai.
 *
 * Problem:
 *   Same `start` index multiple paths se baar-baar aa sakta hai.
 *
 * Fix:
 *   memo[start] me cache karo ki `s[start...]` break ho sakta hai ya nahi.
 *
 * Algorithm:
 * 1. `memo` array banao jahan har index ka answer cache hoga.
 * 2. Recursion `canBreakFrom(0)` se start karo.
 * 3. Base case: agar `start === s.length`, string completely consume ho chuki hai, return true.
 * 4. Agar `memo[start]` already known hai, cached answer return karo.
 * 5. Dictionary ke har word ko current `start` par try karo.
 * 6. Agar current `word` `s` me `start` se match nahi karta, next word par jao.
 * 7. Match karta hai toh `nextStart = start + word.length` compute karo.
 * 8. Recursively check karo `canBreakFrom(nextStart)`.
 * 9. Agar recursive call true de, `memo[start] = true` store karke turant true return karo.
 * 10. Agar koi bhi word kaam na kare, `memo[start] = false` store karke false return karo.
 *
 * Time Complexity:
 *   O(n * d * L)
 *   n = string length, d = dictionary size, L = average word length
 *
 * Space Complexity:
 *   O(n)
 *   memo + recursion stack
 */

namespace WordBreakRecursionMemoization {
  export function wordBreak(s: string, wordDict: string[]): boolean {
    if (s.length === 0) {
      // Empty string already fully segmented mani jaati hai.
      // Yahan consume karne ke liye koi character bacha hi nahi.
      return true;
    }

    if (wordDict.length === 0) {
      // Non-empty string ko break karne ke liye kam se kam ek usable word chahiye.
      // Empty dictionary ke saath koi positive-length suffix solve nahi ho sakta.
      return false;
    }

    const memo: Array<boolean | undefined> = new Array(s.length);

    function canBreakFrom(start: number): boolean {
      if (start === s.length) {
        // `start` end tak pahunch gaya means previous choices ne string ko exactly cover kar diya.
        return true;
      }

      const cachedAnswer = memo[start];
      if (cachedAnswer !== undefined) {
        // Same suffix `s[start...]` ka answer pehle hi nikal chuke hain.
        // Isliye poori subtree dobara explore karne ki zaroorat nahi.
        return cachedAnswer;
      }

      for (const word of wordDict) {
        if (!s.startsWith(word, start)) {
          // Current word is position `start` par prefix match nahi karta.
          // Is branch se segmentation start hi nahi ho sakti, so next word try karo.
          continue;
        }

        const nextStart = start + word.length;
        const remainingCanBreak = canBreakFrom(nextStart);

        if (remainingCanBreak) {
          // Current word ne prefix cover kar diya,
          // aur baaki suffix bhi successfully break ho gaya.
          // Ab dusre words try karna waste hai.
          memo[start] = true;
          return true;
        }
      }

      // Is `start` index se koi bhi dictionary word successful full segmentation nahi bana saka.
      memo[start] = false;
      return false;
    }

    return canBreakFrom(0);
  }

  /**
   * ==========================================================
   * MENTAL MODEL
   * ==========================================================
   *
   * `start` ka meaning:
   *   string ka current unresolved index
   *
   * `canBreakFrom(start)` ka meaning:
   *   kya suffix `s[start...]` dictionary se segment ho sakta hai?
   *
   * Example:
   *   s = "leetcode"
   *
   *   canBreakFrom(0)  -> "leetcode" solve karna hai
   *   canBreakFrom(4)  -> "code" solve karna hai
   *   canBreakFrom(8)  -> empty suffix, success
   *
   * ==========================================================
   * DECISION TREE
   * ==========================================================
   *
   * Example:
   * s = "catsandog"
   * wordDict = ["cats", "dog", "sand", "and", "cat"]
   *
   * canBreakFrom(0) for "catsandog"
   * │
   * ├── choose "cat"  -> canBreakFrom(3) for "sandog"
   * │   └── choose "sand" -> canBreakFrom(7) for "og"
   * │       └── no word matches -> false
   * │
   * ├── choose "cats" -> canBreakFrom(4) for "andog"
   * │   └── choose "and" -> canBreakFrom(7) for "og"
   * │       └── memo hit / already false
   * │
   * └── no successful path -> false
   *
   * Key point:
   *   Different branches same `start = 7` par mil sakti hain.
   *   Isi repeated suffix ko memo save karta hai.
   *
   * ==========================================================
   * RECURSION TREE
   * ==========================================================
   *
   * Example:
   * s = "leetcode"
   * wordDict = ["leet", "code", "lee", "to"]
   *
   * canBreakFrom(0) for "leetcode"
   * │
   * ├── try "leet" -> prefix match
   * │   └── canBreakFrom(4) for "code"
   * │       ├── try "code" -> prefix match
   * │       │   └── canBreakFrom(8) -> true
   * │       └── return true
   * │
   * ├── try "lee" -> prefix match
   * │   └── canBreakFrom(3) for "tcode"
   * │       └── no valid completion
   * │
   * └── as soon as one path returns true, current frame stops
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Input:
   *   s = "leetcode"
   *   wordDict = ["leet", "code", "lee", "to"]
   *
   * Initial Call: canBreakFrom(0)
   * memo = [undefined, undefined, undefined, undefined, undefined, ...]
   *
   * ┌────────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: canBreakFrom(0)                                                │
   * ├────────────────────────────────────────────────────────────────────────┤
   * │ start = 0                                                              │
   * │ suffix = "leetcode"                                                    │
   * │ Base case? 0 === 8 -> Nahi                                             │
   * │ memo[0]? unknown                                                       │
   * │                                                                        │
   * │ Try word = "leet"                                                      │
   * │ startsWith("leet", 0)? Haan                                            │
   * │ nextStart = 0 + 4 = 4                                                  │
   * │ recurse: canBreakFrom(4)                                               │
   * │                                                                        │
   * │   ┌──────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: canBreakFrom(4)                                      │     │
   * │   ├──────────────────────────────────────────────────────────────┤     │
   * │   │ start = 4                                                    │     │
   * │   │ suffix = "code"                                              │     │
   * │   │ Base case? 4 === 8 -> Nahi                                   │     │
   * │   │ memo[4]? unknown                                             │     │
   * │   │                                                              │     │
   * │   │ Try word = "leet"                                            │     │
   * │   │ startsWith("leet", 4)? Nahi                                  │     │
   * │   │                                                              │     │
   * │   │ Try word = "code"                                            │     │
   * │   │ startsWith("code", 4)? Haan                                  │     │
   * │   │ nextStart = 4 + 4 = 8                                        │     │
   * │   │ recurse: canBreakFrom(8)                                     │     │
   * │   │                                                              │     │
   * │   │   ┌────────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 3: canBreakFrom(8)                            │     │     │
   * │   │   ├────────────────────────────────────────────────────┤     │     │
   * │   │   │ start = 8                                          │     │     │
   * │   │   │ suffix = ""                                        │     │     │
   * │   │   │ Base case? 8 === 8 -> Haan                         │     │     │
   * │   │   │ return true                                        │     │     │
   * │   │   └────────────────────────────────────────────────────┘     │     │
   * │   │                                                              │     │
   * │   │ remainingCanBreak = true                                    │     │
   * │   │ memo[4] = true                                              │     │
   * │   │ return true                                                 │     │
   * │   └──────────────────────────────────────────────────────────────┘     │
   * │                                                                        │
   * │ remainingCanBreak = true                                               │
   * │ memo[0] = true                                                         │
   * │ return true                                                            │
   * └────────────────────────────────────────────────────────────────────────┘
   *
   * Final:
   *   true
   *
   * ==========================================================
   * MEMOIZATION HIT EXAMPLE
   * ==========================================================
   *
   * For "catsandog":
   *
   *   canBreakFrom(7) for "og" -> false
   *
   * Later when another branch again reaches start=7:
   *
   *   memo[7] already false
   *   return false immediately
   *
   * Yahi repeated work ko bachata hai.
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. "" with any dictionary -> true
   * 2. Non-empty string with empty dictionary -> false
   * 3. Same word reuse allowed: "applepenapple"
   * 4. Overlapping choices: "cars" with ["car","ca","rs"]
   */

  function expectWordBreak(
    s: string,
    wordDict: string[],
    expected: boolean
  ): void {
    const actual = wordBreak(s, wordDict);

    if (actual !== expected) {
      throw new Error(
        `For s=${JSON.stringify(s)} and wordDict=${JSON.stringify(
          wordDict
        )}, expected ${expected} but got ${actual}`
      );
    }
  }

  export function runTests(): void {
    const tests: Array<{
      s: string;
      wordDict: string[];
      expected: boolean;
    }> = [
      { s: 'leetcode', wordDict: ['leet', 'code'], expected: true },
      { s: 'applepenapple', wordDict: ['apple', 'pen'], expected: true },
      {
        s: 'catsandog',
        wordDict: ['cats', 'dog', 'sand', 'and', 'cat'],
        expected: false,
      },
      { s: '', wordDict: ['a'], expected: true },
      { s: 'a', wordDict: [], expected: false },
      { s: 'cars', wordDict: ['car', 'ca', 'rs'], expected: true },
      { s: 'aaaaaaa', wordDict: ['aaaa', 'aaa'], expected: true },
      { s: 'aaaaaaa', wordDict: ['aaaa', 'aa'], expected: false },
      { s: 'aaaaab', wordDict: ['a', 'aa', 'aaa', 'aaaa'], expected: false },
      {
        s: 'goalspecial',
        wordDict: ['go', 'goal', 'goals', 'special'],
        expected: true,
      },
    ];

    tests.forEach(({ s, wordDict, expected }) => {
      expectWordBreak(s, wordDict, expected);
    });

    console.log(`Passed ${tests.length}/${tests.length} tests`);
  }
}

WordBreakRecursionMemoization.runTests();