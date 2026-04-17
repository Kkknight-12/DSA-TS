/**
 * SORT CHARACTERS BY FREQUENCY - OPTIMAL
 * ======================================
 *
 * PROBLEM:
 * String `s` diya hai.
 * Characters ko decreasing frequency order me return karna hai.
 *
 * OPTIMAL IDEA:
 * Sorting comparator avoid karne ke liye bucket sort use karo.
 *
 * INTUITION (Soch):
 * -----------------
 * Kisi character ki maximum frequency `n` ho sakti hai,
 * where `n = s.length`.
 *
 * So hum frequency ko direct bucket index bana sakte hain:
 *
 *   buckets[1] = all chars with frequency 1
 *   buckets[2] = all chars with frequency 2
 *   ...
 *   buckets[n] = all chars with frequency n
 *
 * Phir bucket ko high frequency se low frequency tak read karo.
 *
 * Example:
 *
 *   s = "tree"
 *
 *   t -> 1
 *   r -> 1
 *   e -> 2
 *
 *   bucket[2] = [e]
 *   bucket[1] = [t, r]
 *
 *   result = "ee" + "t" + "r"
 *
 * TIME: O(n + k)
 *   - count n chars
 *   - place k unique chars into buckets
 *   - output n chars
 *
 * SPACE: O(n + k)
 *   - buckets + frequency map + result
 */

namespace SortCharactersByFrequencyOptimal {
  function buildFrequencyMap(s: string): Map<string, number> {
    const frequency = new Map<string, number>();

    for (const char of s) {
      const previousCount = frequency.get(char) ?? 0;

      // Count batata hai current char answer me kitni baar repeat hoga.
      frequency.set(char, previousCount + 1);
    }

    return frequency;
  }

  function frequencySort(s: string): string {
    if (s.length < 2) {
      return s;
    }

    const frequency = buildFrequencyMap(s);
    const buckets: string[][] = Array.from({ length: s.length + 1 }, () => []);

    for (const [char, count] of frequency.entries()) {
      // count hi bucket index hai.
      // Isse sorting comparator ki zarurat nahi padti.
      buckets[count].push(char);
    }

    const resultParts: string[] = [];

    for (let count = buckets.length - 1; count >= 1; count--) {
      const charsWithSameFrequency = buckets[count];

      if (charsWithSameFrequency.length === 0) {
        continue;
      }

      for (const char of charsWithSameFrequency) {
        // High-to-low bucket traversal guarantee karta hai
        // ki higher frequency groups output me pehle aayenge.
        resultParts.push(char.repeat(count));
      }
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

      if (groupLength !== inputFrequency.get(char)) {
        return false;
      }

      if (groupLength > previousGroupFrequency) {
        return false;
      }

      previousGroupFrequency = groupLength;
    }

    return true;
  }

  /**
   * ==========================================================
   * DRY RUN - BUCKET SORT BY FREQUENCY
   * ==========================================================
   *
   * Example:
   * s = "tree"
   *
   * Step 1: frequency map
   *
   * +--------------------------------------------------------+
   * | t -> 1                                                |
   * | r -> 1                                                |
   * | e -> 2                                                |
   * +--------------------------------------------------------+
   *
   * Step 2: create buckets
   *
   * +--------------------------------------------------------+
   * | buckets length = s.length + 1 = 5                     |
   * | bucket indexes = 0, 1, 2, 3, 4                        |
   * +--------------------------------------------------------+
   *
   * Step 3: place chars by frequency
   *
   * +--------------------------------------------------------+
   * | buckets[1] = ["t", "r"]                              |
   * | buckets[2] = ["e"]                                   |
   * +--------------------------------------------------------+
   *
   * Step 4: read buckets high to low
   *
   * +--------------------------------------------------------+
   * | count = 4 -> empty                                   |
   * | count = 3 -> empty                                   |
   * | count = 2 -> "e".repeat(2) = "ee"                    |
   * | count = 1 -> "t".repeat(1), "r".repeat(1)            |
   * | result = "eetr"                                      |
   * +--------------------------------------------------------+
   *
   * Final answer = "eetr"
   *
   * Note:
   *   "eert" also valid because t/r have same frequency.
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
   * 3. Same frequency:
   *    "cccaaa" -> "cccaaa" or "aaaccc"
   *
   * 4. Mixed case:
   *    "Aabb" keeps A and a different
   *
   * 5. Numbers/symbols:
   *    any character can be counted as a key
   */

  export function runTests(): void {
    console.log('Testing Sort Characters By Frequency - OPTIMAL\n');

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

SortCharactersByFrequencyOptimal.runTests();
