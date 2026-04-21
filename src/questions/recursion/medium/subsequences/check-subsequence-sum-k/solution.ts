/**
 * CHECK SUBSEQUENCE SUM K - RECURSION
 * ===================================
 *
 * PROBLEM:
 * Array `arr` aur target `k` diya hai.
 * Check karna hai ki koi non-empty subsequence exist karti hai
 * jiska sum exactly `k` ho.
 *
 * Example:
 *   arr = [5, 1, 2], k = 3
 *   subsequence [1, 2] ka sum 3 hai
 *   answer = true
 *
 * INTUITION (Soch):
 * -----------------
 * Har element par 2 choices hoti hain:
 *
 *   1. Pick karo     -> currentSum me arr[index] add hoga
 *   2. Not pick karo -> currentSum same rahega
 *
 * Is problem me hume count nahi chahiye.
 * Sirf existence chahiye.
 *
 * Isliye jaise hi koi branch `true` return kare,
 * recursion turant upar `true` propagate kar sakti hai.
 *
 * Algorithm:
 * ----------
 * 1. Start recursion from index 0 and currentSum 0.
 * 2. Har element par pehle pick choice try karo.
 * 3. Pick: currentSum me arr[index] add karo, next index par recurse karo.
 * 4. Agar pick branch true de, turant true return karo because answer mil gaya.
 * 5. Pick branch false de tabhi not-pick branch try karo.
 * 6. Not Pick: currentSum same rakho, next index par recurse karo.
 * 7. Base case: currentSum === k means valid subsequence mil gayi, return true.
 * 8. Base case: index array ke bahar chala gaya and sum nahi mila, return false.
 *
 * TIME: O(2^n) worst case
 *   - worst case me har element ke pick / not-pick branches explore ho sakte hain
 *
 * SPACE: O(n)
 *   - recursion depth maximum array length tak ja sakti hai
 */

namespace CheckSubsequenceSumKRecursion {
  export function checkSubsequenceSum(arr: number[], target: number): boolean {
    if (target <= 0) {
      // Is problem setup me empty subsequence count nahi hoti.
      // Array values positive hain, so non-empty subsequence se 0 ya negative target
      // banana possible nahi maana ja raha.
      return false;
    }

    return existsFromIndex(0, 0, arr, target);
  }

  function existsFromIndex(
    index: number,
    currentSum: number,
    arr: number[],
    target: number
  ): boolean {
    if (currentSum === target) {
      // Picked elements ka sum target ban gaya.
      // Existence problem me ek valid subsequence milte hi answer true hota hai.
      return true;
    }

    if (index === arr.length) {
      // Saare elements ke decisions ho chuke hain.
      // Yahan tak target nahi bana, so ye branch fail hai.
      return false;
    }

    if (currentSum > target) {
      // Array values positive hain.
      // Sum target se aage nikal gaya toh future picks sum ko aur badhayenge hi.
      return false;
    }

    const pickedCurrent = existsFromIndex(
      index + 1,
      currentSum + arr[index],
      arr,
      target
    );

    if (pickedCurrent) {
      // Pick branch ne valid subsequence dhoondh li.
      // Ab same frame ki not-pick branch explore karna waste hai.
      return true;
    }

    // Pick branch fail hui, so ab current element ko skip karke dekhte hain.
    // Sum same rehta hai because arr[index] subsequence me include nahi hua.
    return existsFromIndex(index + 1, currentSum, arr, target);
  }

  /**
   * ==========================================================
   * DRY RUN - RECURSION TREE + CALL FRAMES
   * ==========================================================
   *
   * Example:
   * arr = [5, 1, 2], target = 3
   *
   * Expected:
   * true
   *
   * Why this example?
   *   Pehle pick 5 fail hota hai because sum target se bada ho jata hai.
   *   Uske baad not-pick branch run hoti hai.
   *   Then [1, 2] milte hi early return hota hai.
   *
   * ==========================================================
   * DECISION TREE
   * ==========================================================
   *
   * Each node stores:
   *   index
   *   currentSum
   *
   * root  (index=0, sum=0, next=5)
   * │
   * ├── PICK 5 -> (index=1, sum=5)
   * │   │
   * │   └── PRUNE: sum 5 > target 3 -> return false
   * │
   * └── NOT PICK 5 -> (index=1, sum=0, next=1)
   *     │
   *     ├── PICK 1 -> (index=2, sum=1, next=2)
   *     │   │
   *     │   ├── PICK 2 -> (index=3, sum=3)
   *     │   │   │
   *     │   │   └── BASE CASE: sum === target -> return true
   *     │   │
   *     │   └── NOT PICK 2
   *     │       skipped because PICK 2 already returned true
   *     │
   *     └── NOT PICK 1
   *         skipped because PICK 1 subtree already returned true
   *
   * Final:
   *   true
   *
   * ==========================================================
   * NESTED BOX-HEAVY CALL FRAME DRY RUN
   * ==========================================================
   *
   * Initial Call: checkSubsequenceSum([5, 1, 2], 3)
   * - result is not stored because this is existence check
   * - Start: existsFromIndex(0, 0, [5,1,2], 3)
   *
   * ┌──────────────────────────────────────────────────────────────────────┐
   * │ CALL 1: existsFromIndex(0, 0, [5,1,2], 3)                            │
   * ├──────────────────────────────────────────────────────────────────────┤
   * │ index = 0                                                            │
   * │ currentSum = 0                                                       │
   * │ current element = arr[0] = 5                                         │
   * │ Base: currentSum === target? 0 === 3 -> Nahi                        │
   * │ Base: index === arr.length? 0 === 3 -> Nahi                         │
   * │ Prune: currentSum > target? 0 > 3 -> Nahi                           │
   * │                                                                      │
   * │ Try PICK 5: call existsFromIndex(1, 5, [5,1,2], 3)                  │
   * │                                                                      │
   * │   ┌────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 2: existsFromIndex(1, 5, [5,1,2], 3)                  │     │
   * │   ├────────────────────────────────────────────────────────────┤     │
   * │   │ index = 1                                                  │     │
   * │   │ currentSum = 5                                             │     │
   * │   │ current element would be arr[1] = 1                        │     │
   * │   │ Base: currentSum === target? 5 === 3 -> Nahi              │     │
   * │   │ Base: index === arr.length? 1 === 3 -> Nahi               │     │
   * │   │ Prune: currentSum > target? 5 > 3 -> Haan                 │     │
   * │   │                                                            │     │
   * │   │ Reason: positive numbers add karne se sum aur badhega.    │     │
   * │   │ Return false                                              │     │
   * │   └────────────────────────────────────────────────────────────┘     │
   * │                                                                      │
   * │ PICK 5 returned false                                                │
   * │ Ab same CALL 1 me NOT PICK branch try hogi.                          │
   * │                                                                      │
   * │ Try NOT PICK 5: call existsFromIndex(1, 0, [5,1,2], 3)              │
   * │                                                                      │
   * │   ┌────────────────────────────────────────────────────────────┐     │
   * │   │ CALL 3: existsFromIndex(1, 0, [5,1,2], 3)                  │     │
   * │   ├────────────────────────────────────────────────────────────┤     │
   * │   │ index = 1                                                  │     │
   * │   │ currentSum = 0                                             │     │
   * │   │ current element = arr[1] = 1                               │     │
   * │   │ Base: currentSum === target? 0 === 3 -> Nahi              │     │
   * │   │ Base: index === arr.length? 1 === 3 -> Nahi               │     │
   * │   │ Prune: currentSum > target? 0 > 3 -> Nahi                 │     │
   * │   │                                                            │     │
   * │   │ Try PICK 1: call existsFromIndex(2, 1, [5,1,2], 3)        │     │
   * │   │                                                            │     │
   * │   │   ┌──────────────────────────────────────────────────┐     │     │
   * │   │   │ CALL 4: existsFromIndex(2, 1, [5,1,2], 3)        │     │     │
   * │   │   ├──────────────────────────────────────────────────┤     │     │
   * │   │   │ index = 2                                        │     │     │
   * │   │   │ currentSum = 1                                   │     │     │
   * │   │   │ current element = arr[2] = 2                     │     │     │
   * │   │   │ Base: currentSum === target? 1 === 3 -> Nahi    │     │     │
   * │   │   │ Base: index === arr.length? 2 === 3 -> Nahi     │     │     │
   * │   │   │ Prune: currentSum > target? 1 > 3 -> Nahi       │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ Try PICK 2: existsFromIndex(3, 3, [5,1,2], 3)   │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │   ┌────────────────────────────────────────┐     │     │     │
   * │   │   │   │ CALL 5: existsFromIndex(3, 3,          │     │     │     │
   * │   │   │   │         [5,1,2], 3)                    │     │     │     │
   * │   │   │   ├────────────────────────────────────────┤     │     │     │
   * │   │   │   │ index = 3                              │     │     │     │
   * │   │   │   │ currentSum = 3                         │     │     │     │
   * │   │   │   │ Base: currentSum === target?           │     │     │     │
   * │   │   │   │ 3 === 3 -> Haan                        │     │     │     │
   * │   │   │   │                                        │     │     │     │
   * │   │   │   │ Return true                            │     │     │     │
   * │   │   │   └────────────────────────────────────────┘     │     │     │
   * │   │   │                                                  │     │     │
   * │   │   │ PICK 2 returned true                            │     │     │
   * │   │   │ NOT PICK 2 skipped because answer mil gaya.      │     │     │
   * │   │   │ Return true                                     │     │     │
   * │   │   └──────────────────────────────────────────────────┘     │     │
   * │   │                                                            │     │
   * │   │ PICK 1 returned true                                      │     │
   * │   │ NOT PICK 1 skipped because answer mil gaya.                │     │
   * │   │ Return true                                               │     │
   * │   └────────────────────────────────────────────────────────────┘     │
   * │                                                                      │
   * │ NOT PICK 5 returned true                                             │
   * │ Return true                                                          │
   * └──────────────────────────────────────────────────────────────────────┘
   *
   * Final answer:
   *   true
   *
   * Valid subsequence:
   *   [1, 2]
   *
   * ==========================================================
   * WHY EARLY RETURN IS VALID
   * ==========================================================
   *
   * Count problem:
   *   Har valid subsequence count karni hoti hai.
   *   Isliye saare branches explore karna zaroori hai.
   *
   * Check problem:
   *   Sirf ye puchha hai ki at least one valid subsequence exists?
   *   Isliye first true milte hi answer final ho sakta hai.
   *
   * ==========================================================
   * EDGE CASES
   * ==========================================================
   *
   * 1. arr = [5], target = 5
   *    Pick 5 -> sum target -> true
   *
   * 2. arr = [5], target = 3
   *    Pick 5 prunes, not-pick reaches end -> false
   *
   * 3. arr = [1, 1, 1, 1], target = 2
   *    Any two 1s form target -> true
   *
   * 4. arr = [1, 2, 3], target = 10
   *    No combination can reach target -> false
   *
   * 5. target = 0
   *    Empty subsequence is not counted in this setup -> false
   */

  export function runTests(): void {
    type TestCase = {
      arr: number[];
      target: number;
      expected: boolean;
      description: string;
    };

    const tests: TestCase[] = [
      {
        arr: [10, 1, 2, 7, 6, 1, 5],
        target: 8,
        expected: true,
        description: 'multiple valid subsequences exist',
      },
      {
        arr: [2, 3, 5, 7, 9],
        target: 100,
        expected: false,
        description: 'target is larger than possible total',
      },
      {
        arr: [1, 2, 3],
        target: 6,
        expected: true,
        description: 'all elements are needed',
      },
      {
        arr: [5, 10, 15],
        target: 8,
        expected: false,
        description: 'target cannot be formed',
      },
      {
        arr: [1, 1, 1, 1],
        target: 2,
        expected: true,
        description: 'repeated values can form target',
      },
      {
        arr: [5],
        target: 5,
        expected: true,
        description: 'single element equals target',
      },
      {
        arr: [5],
        target: 3,
        expected: false,
        description: 'single element does not equal target',
      },
      {
        arr: [5, 1, 2],
        target: 3,
        expected: true,
        description: 'pick branch fails first, not-pick branch succeeds',
      },
      {
        arr: [1, 2, 3],
        target: 0,
        expected: false,
        description: 'zero target does not count empty subsequence',
      },
    ];

    let passed = 0;

    console.log('Testing Check Subsequence Sum K - Recursion\n');

    tests.forEach(({ arr, target, expected, description }, index) => {
      const actual = checkSubsequenceSum(arr, target);
      const bruteExpected = verifyByBruteForce(arr, target);
      const pass = actual === expected && actual === bruteExpected;

      if (pass) {
        passed++;
      }

      console.log(`Test ${index + 1}: ${description}`);
      console.log(`  arr=[${arr.join(', ')}], target=${target}`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Brute:    ${bruteExpected}`);
      console.log(`  Got:      ${actual}`);
      console.log(`  Result:   ${pass ? 'PASS' : 'FAIL'}`);
    });

    console.log(`\nResults: ${passed}/${tests.length} passed`);
  }

  function verifyByBruteForce(arr: number[], target: number): boolean {
    if (target <= 0) {
      return false;
    }

    const totalMasks = 1 << arr.length;

    for (let mask = 1; mask < totalMasks; mask++) {
      let sum = 0;

      for (let index = 0; index < arr.length; index++) {
        if ((mask & (1 << index)) !== 0) {
          sum += arr[index];
        }
      }

      if (sum === target) {
        return true;
      }
    }

    return false;
  }
}

const checkSubsequenceSum =
  CheckSubsequenceSumKRecursion.checkSubsequenceSum;

CheckSubsequenceSumKRecursion.runTests();

export { checkSubsequenceSum, CheckSubsequenceSumKRecursion };
