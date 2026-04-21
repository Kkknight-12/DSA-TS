/**
 * PALINDROME PARTITIONING - RECURSION + BACKTRACKING
 * ==================================================
 *
 * PROBLEM:
 * String `s` diya hai.
 * Is string ko aise parts me split karna hai ki har part palindrome ho.
 * Saare valid palindrome partitions return karne hain.
 *
 * Example:
 *   s = "aab"
 *   answer = [["a", "a", "b"], ["aa", "b"]]
 *
 * INTUITION (Soch):
 * -----------------
 * Har recursion frame ek `start` index fix karta hai.
 *
 * Us fixed `start` se hum `end` ko move karte hain:
 *
 *   s[start..start]
 *   s[start..start + 1]
 *   s[start..start + 2]
 *   ...
 *
 * Sirf palindrome substring ko current partition me pick karte hain.
 *
 * Key pointer move:
 *   Agar humne substring s[start..end] choose ki,
 *   toh next recursion `end + 1` se start hogi.
 *
 * Algorithm:
 * ----------
 * 1. Empty result and empty current partition initialize karo.
 * 2. Start recursion from start index 0.
 * 3. Har frame me end ko start se s.length - 1 tak move karo.
 * 4. substring = s[start..end] banao.
 * 5. Agar substring palindrome nahi hai, us branch ko skip karo.
 * 6. Agar substring palindrome hai, current partition me push karo.
 * 7. Remaining string ke liye backtrack(end + 1) call karo.
 * 8. Recursive call return kare toh current.pop() karke choice undo karo.
 * 9. Base case: start === s.length ho jaye toh current ka copy result me add karo.
 * 10. Final result me saare valid palindrome partitions mil jayenge.
 *
 * TIME: O(n * 2^n)
 *   - cut patterns exponential ho sakte hain
 *   - palindrome checks / partition copies length n tak ja sakte hain
 *
 * SPACE: O(n) excluding output
 *   - recursion depth + current partition
 *
 * OUTPUT SPACE: O(n * 2^n)
 */

namespace PalindromePartitioningBacktracking {
  export function partition(s: string): string[][] {
    const result: string[][] = [];
    const current: string[] = [];

    buildPartitions(0, s, current, result);

    return result;
  }

  function buildPartitions(
    start: number,
    s: string,
    current: string[],
    result: string[][]
  ): void {
    if (start === s.length) {
      // Whole string consume ho chuki hai.
      // Current me sirf palindrome pieces aaye hain, so ye complete valid partition hai.
      result.push([...current]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (!isPalindromeRange(s, start, end)) {
        // s[start..end] palindrome nahi hai.
        // Is substring ko partition me include karenge toh partition invalid ho jayega.
        continue;
      }

      const substring = s.slice(start, end + 1);

      // Valid palindrome choice ko current path me add karte hain.
      current.push(substring);

      // Chosen piece s[start..end] consume ho gaya.
      // Isliye remaining string ka next start end + 1 hota hai.
      buildPartitions(end + 1, s, current, result);

      // Sirf current frame ki choice undo hoti hai.
      // Parent frame ke selected pieces current me preserved rehte hain.
      current.pop();
    }
  }

  function isPalindromeRange(s: string, left: number, right: number): boolean {
    while (left < right) {
      if (s[left] !== s[right]) {
        // Dono ends par different characters mile.
        // Ye substring mirror nahi hai, so palindrome nahi ho sakti.
        return false;
      }

      left++;
      right--;
    }

    return true;
  }

  /**
   * ==========================================================
   * DRY RUN - RECURSION TREE + CALL FRAMES
   * ==========================================================
   *
   * Example:
   * s = "aab"
   *
   * Expected:
   * [["a", "a", "b"], ["aa", "b"]]
   *
   * ==========================================================
   * HANDWRITTEN NOTE MENTAL MODEL
   * ==========================================================
   *
   * Har frame me:
   *
   *   start fixed rehta hai
   *   end / i move hota hai
   *
   * Example:
   *
   *   start = 0
   *   end = 0 -> "a"
   *   end = 1 -> "aa"
   *   end = 2 -> "aab"
   *
   * Agar substring s[start..end] choose ki:
   *
   *   next call start = end + 1
   *
   * Ye `end + 1` important hai.
   * Sirf `start + 1` nahi, because chosen substring length 1 se bada bhi ho sakta hai.
   *
   * ==========================================================
   * HIGH-LEVEL DECISION TREE
   * ==========================================================
   *
   *                                    [] start=0
   *                         /              |              \
   *                   choose "a"       choose "aa"      "aab" skip
   *                      |                 |              not palindrome
   *                 ["a"] start=1      ["aa"] start=2
   *                  /       \             |
   *            choose "a"   "ab" skip   choose "b"
   *                |       not pal         |
   *           ["a","a"] start=2       ["aa","b"] start=3
   *                |                         |
   *           choose "b"                 add copy
   *                |
   *        ["a","a","b"] start=3
   *                |
   *             add copy
   *
   * Output:
   *   [["a","a","b"], ["aa","b"]]
   *
   * ==========================================================
   * FULL RECURSION TREE - WITH RETURNS + BACKTRACKING
   * ==========================================================
   *
   * root  (start=0, current=[], result=[])
   * │
   * ├── end=0: substring "a" is palindrome -> choose "a"
   * │   current=["a"]
   * │   │
   * │   │   (start=1, current=["a"], result=[])
   * │   │   ├── end=1: substring "a" is palindrome -> choose "a"
   * │   │   │   current=["a","a"]
   * │   │   │   │
   * │   │   │   │   (start=2, current=["a","a"], result=[])
   * │   │   │   │   └── end=2: substring "b" is palindrome -> choose "b"
   * │   │   │   │       current=["a","a","b"]
   * │   │   │   │       │
   * │   │   │   │       │   (start=3, current=["a","a","b"])
   * │   │   │   │       │   BASE CASE: start === s.length
   * │   │   │   │       │   push copy ["a","a","b"]
   * │   │   │   │       │   result=[["a","a","b"]]
   * │   │   │   │       │   return to start=2 frame
   * │   │   │   │       │
   * │   │   │   │       backtrack: pop "b"
   * │   │   │   │       current=["a","a"]
   * │   │   │   │       loop done, return to start=1 frame
   * │   │   │   │
   * │   │   │   backtrack: pop "a"
   * │   │   │   current=["a"]
   * │   │   │
   * │   │   └── end=2: substring "ab" is not palindrome -> skip
   * │   │       loop done, return to root
   * │   │
   * │   backtrack: pop "a"
   * │   current=[]
   * │
   * ├── end=1: substring "aa" is palindrome -> choose "aa"
   * │   current=["aa"]
   * │   │
   * │   │   (start=2, current=["aa"], result=[["a","a","b"]])
   * │   │   └── end=2: substring "b" is palindrome -> choose "b"
   * │   │       current=["aa","b"]
   * │   │       │
   * │   │       │   (start=3, current=["aa","b"])
   * │   │       │   BASE CASE: push copy ["aa","b"]
   * │   │       │   result=[["a","a","b"], ["aa","b"]]
   * │   │       │   return
   * │   │       │
   * │   │       backtrack: pop "b"
   * │   │       current=["aa"]
   * │   │       loop done, return to root
   * │   │
   * │   backtrack: pop "aa"
   * │   current=[]
   * │
   * └── end=2: substring "aab" is not palindrome -> skip
   *
   * root loop done.
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Initial Call: partition("aab")
   * - result = []
   * - current = []
   * - Start: buildPartitions(0, "aab", [], result)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: buildPartitions(0, "aab", [], result)                        │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ start = 0                                                            │
   * │ current = []                                                         │
   * │ result = []                                                          │
   * │ Base case? start === s.length? 0 === 3 -> Nahi                      │
   * │                                                                      │
   * │ Loop end from 0 to 2                                                 │
   * │                                                                      │
   * │ end = 0, substring = "a"                                             │
   * │ isPalindromeRange("aab", 0, 0) -> Haan                              │
   * │ current.push("a") -> current = ["a"]                                │
   * │ Recurse with start = end + 1 = 1                                     │
   * │                                                                      │
   * │   ┌────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: buildPartitions(1, "aab", ["a"], result)           │     │
   * │   ├────────────────────────────────────────────────────────────┤     │
   * │   │ start = 1                                                  │     │
   * │   │ current = ["a"]                                            │     │
   * │   │ Base case? 1 === 3 -> Nahi                                 │     │
   * │   │                                                            │     │
   * │   │ end = 1, substring = "a"                                   │     │
   * │   │ palindrome? Haan                                           │     │
   * │   │ current.push("a") -> current = ["a","a"]                  │     │
   * │   │ Recurse with start = 2                                     │     │
   * │   │                                                            │     │
   * │   │   ┌──────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 3: buildPartitions(2, "aab",                │     │     │
   * │   │   │         ["a","a"], result)                       │     │     │
   * │   │   ├──────────────────────────────────────────────────┤     │     │
   * │   │   │ start = 2                                        │     │     │
   * │   │   │ current = ["a","a"]                              │     │     │
   * │   │   │ Base case? 2 === 3 -> Nahi                       │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ end = 2, substring = "b"                         │     │     │
   * │   │   │ palindrome? Haan                                 │     │     │
   * │   │   │ current.push("b")                                │     │     │
   * │   │   │ current = ["a","a","b"]                          │     │     │
   * │   │   │ Recurse with start = 3                           │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │   ┌────────────────────────────────────────┐     │     │     │
   * │   │   │   │ CALL 4: buildPartitions(3, "aab",      │     │     │     │
   * │   │   │   │         ["a","a","b"], result)         │     │     │     │
   * │   │   │   ├────────────────────────────────────────┤     │     │     │
   * │   │   │   │ start = 3                              │     │     │     │
   * │   │   │   │ current = ["a","a","b"]                │     │     │     │
   * │   │   │   │ Base case? 3 === 3 -> Haan             │     │     │     │
   * │   │   │   │ result.push([...current])              │     │     │     │
   * │   │   │   │ result = [["a","a","b"]]               │     │     │     │
   * │   │   │   │ Return                                 │     │     │     │
   * │   │   │   └────────────────────────────────────────┘     │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ Back to CALL 3                                  │     │     │
   * │   │   │ current.pop() removes "b"                       │     │     │
   * │   │   │ current = ["a","a"]                              │     │     │
   * │   │   │ Loop done for start=2, Return                    │     │     │
   * │   │   └──────────────────────────────────────────────────┘     │     │
   * │   │                                                            │     │
   * │   │ Back to CALL 2                                            │     │
   * │   │ current.pop() removes "a"                                │     │
   * │   │ current = ["a"]                                           │     │
   * │   │                                                            │     │
   * │   │ end = 2, substring = "ab"                                 │     │
   * │   │ palindrome? Nahi -> skip                                  │     │
   * │   │ Loop done for start=1, Return                             │     │
   * │   └────────────────────────────────────────────────────────────┘     │
   * │                                                                      │
   * │ Back to CALL 1                                                       │
   * │ current.pop() removes "a"                                            │
   * │ current = []                                                         │
   * │                                                                      │
   * │ end = 1, substring = "aa"                                            │
   * │ palindrome? Haan -> push "aa", recurse start=2                       │
   * │ This branch later pushes ["aa","b"]                                  │
   * │                                                                      │
   * │ end = 2, substring = "aab"                                           │
   * │ palindrome? Nahi -> skip                                             │
   * │                                                                      │
   * │ Return                                                               │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   [["a","a","b"], ["aa","b"]]
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. s = "a"
   *    Output: [["a"]]
   *
   * 2. s = "aaa"
   *    Output count: 4
   *
   * 3. s = "abc"
   *    Output: [["a","b","c"]]
   *
   * 4. s = "aba"
   *    Output includes ["aba"] and ["a","b","a"]
   */

  export function runTests(): void {
    type TestCase = {
      input: string;
      expected?: string[][];
      expectedCount?: number;
      description: string;
    };

    const tests: TestCase[] = [
      {
        input: 'aab',
        expected: [
          ['a', 'a', 'b'],
          ['aa', 'b'],
        ],
        description: 'basic example',
      },
      {
        input: 'a',
        expected: [['a']],
        description: 'single character',
      },
      {
        input: 'aaa',
        expected: [['a', 'a', 'a'], ['a', 'aa'], ['aa', 'a'], ['aaa']],
        description: 'all same characters',
      },
      {
        input: 'abc',
        expected: [['a', 'b', 'c']],
        description: 'no multi-character palindrome',
      },
      {
        input: 'aba',
        expected: [
          ['a', 'b', 'a'],
          ['aba'],
        ],
        description: 'full string is palindrome',
      },
      {
        input: 'aa',
        expected: [['a', 'a'], ['aa']],
        description: 'two same characters',
      },
      {
        input: 'racecar',
        expectedCount: 4,
        description: 'longer palindrome with inner palindrome options',
      },
      {
        input: 'aabb',
        expected: [
          ['a', 'a', 'b', 'b'],
          ['a', 'a', 'bb'],
          ['aa', 'b', 'b'],
          ['aa', 'bb'],
        ],
        description: 'two repeated groups',
      },
      {
        input: 'abcba',
        expectedCount: 3,
        description: 'full and middle palindrome options',
      },
      {
        input: 'aaaa',
        expectedCount: 8,
        description: 'all substrings are palindromes',
      },
    ];

    let passed = 0;

    console.log('Testing Palindrome Partitioning - Backtracking\n');

    tests.forEach(({ input, expected, expectedCount, description }, index) => {
      const actual = partition(input);
      const exactMatch = expected ? samePartitions(actual, expected) : true;
      const countMatch =
        expectedCount !== undefined ? actual.length === expectedCount : true;
      const allPalindromes = actual.every((partitionItem) =>
        partitionItem.every(isWholeStringPalindrome)
      );
      const joinsBack = actual.every((partitionItem) => partitionItem.join('') === input);
      const noDuplicates = new Set(actual.map(toPartitionSignature)).size === actual.length;
      const pass =
        exactMatch && countMatch && allPalindromes && joinsBack && noDuplicates;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  input="${input}"`);
      console.log(`  Got count: ${actual.length}`);

      if (expected) {
        console.log(`  Expected: ${JSON.stringify(expected)}`);
        console.log(`  Got:      ${JSON.stringify(actual)}`);
      }

      if (expectedCount !== undefined) {
        console.log(`  Expected count: ${expectedCount}`);
      }

      console.log(
        `  Checks -> exact/count=${exactMatch && countMatch}, palindromes=${allPalindromes}, joins=${joinsBack}, unique=${noDuplicates}`
      );
      console.log(`  Result: ${pass ? 'PASS' : 'FAIL'}`);
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }

  function samePartitions(actual: string[][], expected: string[][]): boolean {
    if (actual.length !== expected.length) {
      return false;
    }

    const actualSignatures = actual.map(toPartitionSignature).sort();
    const expectedSignatures = expected.map(toPartitionSignature).sort();

    return actualSignatures.every(
      (signature, index) => signature === expectedSignatures[index]
    );
  }

  function toPartitionSignature(partitionItem: string[]): string {
    return JSON.stringify(partitionItem);
  }

  function isWholeStringPalindrome(value: string): boolean {
    return isPalindromeRange(value, 0, value.length - 1);
  }
}

const partition = PalindromePartitioningBacktracking.partition;

PalindromePartitioningBacktracking.runTests();

export { partition, PalindromePartitioningBacktracking };
