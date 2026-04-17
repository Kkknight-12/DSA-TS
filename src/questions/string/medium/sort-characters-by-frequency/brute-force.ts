/**
 * SORT CHARACTERS BY FREQUENCY - BRUTE FORCE
 * ==========================================
 *
 * PROBLEM:
 * String `s` diya hai.
 * Characters ko unki frequency ke decreasing order me arrange karna hai.
 *
 * Examples:
 *   s = "tree"   -> "eetr" or "eert"
 *   s = "cccaaa" -> "cccaaa" or "aaaccc"
 *
 * IMPORTANT:
 * Same frequency wale characters ka order flexible hota hai.
 * Isliye "cccaaa" and "aaaccc" dono valid ho sakte hain.
 *
 * INTUITION (Soch):
 * -----------------
 * Pehle count karo:
 *
 *   "tree"
 *   t -> 1
 *   r -> 1
 *   e -> 2
 *
 * Phir characters ko count ke basis par sort karo:
 *
 *   e(2), t(1), r(1)
 *
 * Final output:
 *
 *   "eetr"
 *
 * TIME: O(n + k log k)
 *   - n characters count hote hain
 *   - k unique characters sort hote hain
 *
 * SPACE: O(n + k)
 *   - frequency map + result string
 */

namespace SortCharactersByFrequencyBruteForce {
  function buildFrequencyMap(s: string): Map<string, number> {
    const frequency = new Map<string, number>();

    for (const char of s) {
      const previousCount = frequency.get(char) ?? 0;

      // frequency map character inventory hai.
      // Current char ek aur baar mila, so uska count one increase hota hai.
      frequency.set(char, previousCount + 1);
    }

    return frequency;
  }

  function frequencySort(s: string): string {
    const frequency = buildFrequencyMap(s);
    const entries = Array.from(frequency.entries());

    // Higher frequency groups answer me pehle aane chahiye.
    // Equal frequency me order problem ke hisaab se flexible hai.
    entries.sort((first, second) => second[1] - first[1]);

    const resultParts: string[] = [];

    for (const [char, count] of entries) {
      // Same character ko grouped form me output karna hai.
      // count times repeat karne se group directly ban jata hai.
      resultParts.push(char.repeat(count));
    }

    return resultParts.join('');
  }

  function isValidFrequencySorted(input: string, output: string): boolean {
    if (input.length !== output.length) {
      return false;
    }

    const inputFrequency = buildFrequencyMap(input);
    const outputFrequency = buildFrequencyMap(output);

    for (const [char, count] of inputFrequency.entries()) {
      if (outputFrequency.get(char) !== count) {
        return false;
      }
    }

    let previousGroupFrequency = Number.POSITIVE_INFINITY;
    let index = 0;

    while (index < output.length) {
      const char = output[index];
      let groupLength = 0;

      while (index < output.length && output[index] === char) {
        groupLength++;
        index++;
      }

      // Output group length original frequency ke barabar honi chahiye.
      // Agar char split ho gaya ya extra/missing hai, validity break ho jayegi.
      if (groupLength !== inputFrequency.get(char)) {
        return false;
      }

      // Frequencies non-increasing order me honi chahiye.
      // Current group previous group se zyada frequent hua, toh sorting wrong hai.
      if (groupLength > previousGroupFrequency) {
        return false;
      }

      previousGroupFrequency = groupLength;
    }

    return true;
  }

  /**
   * ==========================================================
   * DRY RUN - FREQUENCY MAP + SORT
   * ==========================================================
   *
   * Example:
   * s = "tree"
   *
   * Step 1: build frequency map
   *
   * +--------------------------------------------------------+
   * | char 't' -> { t: 1 }                                  |
   * | char 'r' -> { t: 1, r: 1 }                             |
   * | char 'e' -> { t: 1, r: 1, e: 1 }                       |
   * | char 'e' -> { t: 1, r: 1, e: 2 }                       |
   * +--------------------------------------------------------+
   *
   * Step 2: convert to entries
   *
   * +--------------------------------------------------------+
   * | entries = [["t",1], ["r",1], ["e",2]]                 |
   * +--------------------------------------------------------+
   *
   * Step 3: sort by frequency descending
   *
   * +--------------------------------------------------------+
   * | sorted = [["e",2], ["t",1], ["r",1]]                  |
   * +--------------------------------------------------------+
   *
   * Step 4: build output
   *
   * +--------------------------------------------------------+
   * | "e".repeat(2) = "ee"                                  |
   * | "t".repeat(1) = "t"                                   |
   * | "r".repeat(1) = "r"                                   |
   * | result = "eetr"                                       |
   * +--------------------------------------------------------+
   *
   * Final answer = "eetr"
   *
   * Note:
   *   "eert" bhi valid hai because t/r same frequency ke hain.
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. Empty string:
   *    "" -> ""
   *
   * 2. Single character:
   *    "a" -> "a"
   *
   * 3. Equal highest frequencies:
   *    "cccaaa" -> "cccaaa" or "aaaccc"
   *
   * 4. Case-sensitive characters:
   *    "Aabb" -> "bbAa" or "bbA a style variants depending ties"
   *
   * 5. Digits/symbols:
   *    "2a554442f544asfasssffffasss"
   */

  export function runTests(): void {
    console.log('Testing Sort Characters By Frequency - BRUTE FORCE\n');

    const tests: Array<{
      s: string;
      description: string;
    }> = [
      { s: 'tree', description: 'One character has highest frequency' },
      { s: 'cccaaa', description: 'Two characters tied for highest frequency' },
      { s: 'Aabb', description: 'Case-sensitive characters' },
      { s: '', description: 'Empty string' },
      { s: 'a', description: 'Single character' },
      { s: 'raaeaedere', description: 'Multiple frequency groups' },
      { s: 'bbbaaac', description: 'Two top groups and one small group' },
      {
        s: '2a554442f544asfasssffffasss',
        description: 'Digits and letters with repeated groups',
      },
    ];

    let passed = 0;

    tests.forEach(({ s, description }, index) => {
      const result = frequencySort(s);
      const pass = isValidFrequencySorted(s, result);

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  s="${s}"`);
      console.log(`  Got: "${result}" -> ${pass ? 'PASS' : 'FAIL'}`);
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }
}

SortCharactersByFrequencyBruteForce.runTests();
