/**
 * ═══════════════════════════════════════════════════════════
 * BEST TIME TO BUY AND SELL STOCK — OPTIMAL
 * ═══════════════════════════════════════════════════════════
 *
 * PROBLEM:
 * Array `prices` diya hai jahan `prices[i]` day i ka stock price hai.
 * Sirf ek baar buy aur ek baar sell kar sakte hain.
 * Buy pehle hoga, sell baad me hoga.
 * Maximum profit return karo. Agar profit possible nahi hai, toh 0 return karo.
 *
 * EXAMPLES:
 *   [7, 1, 5, 3, 6, 4]  →  5
 *   [7, 6, 4, 3, 1]     →  0
 *
 * ─────────────────────────────────────────────────────────
 * INTUITION (Soch)
 * ─────────────────────────────────────────────────────────
 *
 * Pehle brute force socho:
 * Har day ko buy day maan kar uske baad ke sab sell days try karo.
 * Yeh O(n^2) ho jayega.
 *
 * Smart observation:
 * Agar aaj sell karna hai, toh best buy kaunsa hoga?
 *
 * Answer:
 *   Aaj se pehle jo sabse chhota price mila ho.
 *
 * Example:
 *   prices = [7, 1, 5, 3, 6, 4]
 *
 *   day 2 pe price = 5
 *   isse pehle minimum price = 1
 *   profit = 5 - 1 = 4
 *
 *   day 4 pe price = 6
 *   isse pehle minimum price = 1
 *   profit = 6 - 1 = 5
 *
 * Yani har day pe bas 2 cheezein maintain karni hain:
 * - ab tak ka minimum buy price
 * - ab tak ka maximum profit
 *
 * Alternative approach bhi hota hai:
 *   suffix max price rakhkar har day ke liye best sell dekho
 *
 * Woh bhi valid hai, lekin current version cleaner hai kyunki:
 * - one pass hai
 * - natural flow "buy pehle, sell baad me" follow karta hai
 * - extra array nahi chahiye
 *
 * TIME:  O(n)
 * SPACE: O(1)
 */

namespace BuySellStockOptimal {

  function maxProfit(prices: number[]): number {
    if (prices.length <= 1) {
      return 0;
    }

    // Ab tak ka sabse sasta buy price.
    let minPrice = prices[0];

    // Ab tak ka best profit.
    let bestProfit = 0;

    for (let i = 1; i < prices.length; i++) {
      const currentPrice = prices[i];

      // Aaj sell karein toh best possible buy wahi hoga
      // jo ab tak ka minimum price hai.
      const currentProfit = currentPrice - minPrice;

      // Agar aaj bechna best deal deta hai, profit update karo.
      bestProfit = Math.max(bestProfit, currentProfit);

      // Future ke liye aur better buy day mil gaya ho toh store karo.
      minPrice = Math.min(minPrice, currentPrice);
    }

    return bestProfit;
  }

  /**
   * ═══════════════════════════════════════════════════════════
   * DRY RUN — COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * ── Example 1: Profit possible ───────────────────────────
   * prices = [7, 1, 5, 3, 6, 4]
   *
   * idx:    0  1  2  3  4  5
   * price:  7  1  5  3  6  4
   *
   * Start:
   *   minPrice = 7
   *   bestProfit = 0
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Day 1: price = 1                                        │
   * │ currentProfit = 1 - 7 = -6                              │
   * │ bestProfit = max(0, -6) = 0                             │
   * │ minPrice = min(7, 1) = 1                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Day 2: price = 5                                        │
   * │ currentProfit = 5 - 1 = 4                               │
   * │ bestProfit = max(0, 4) = 4                              │
   * │ minPrice = min(1, 5) = 1                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Day 3: price = 3                                        │
   * │ currentProfit = 3 - 1 = 2                               │
   * │ bestProfit = max(4, 2) = 4                              │
   * │ minPrice = min(1, 3) = 1                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Day 4: price = 6                                        │
   * │ currentProfit = 6 - 1 = 5                               │
   * │ bestProfit = max(4, 5) = 5                              │
   * │ minPrice = min(1, 6) = 1                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * ┌──────────────────────────────────────────────────────────┐
   * │ Day 5: price = 4                                        │
   * │ currentProfit = 4 - 1 = 3                               │
   * │ bestProfit = max(5, 3) = 5                              │
   * │ minPrice = min(1, 4) = 1                                │
   * └──────────────────────────────────────────────────────────┘
   *
   * Final answer = 5 ✅
   *
   * ── Example 2: No profit possible ────────────────────────
   * prices = [7, 6, 4, 3, 1]
   *
   * idx:    0  1  2  3  4
   * price:  7  6  4  3  1
   *
   * Har day pe price neeche hi ja raha hai.
   * Isliye koi positive profit kabhi banega hi nahi.
   * bestProfit poore traversal me 0 hi rahega.
   *
   * ═══════════════════════════════════════════════════════════
   * EDGE CASES
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Single day: [5]
   *    Buy aur sell dono possible nahi → 0
   *
   * 2. Strictly decreasing: [7,6,4,3,1]
   *    Har possible sell loss dega → 0
   *
   * 3. Profit at end: [2,1,2,1,10]
   *    Best buy = 1, best sell = 10 → 9
   *
   * 4. Buy after a new lower price:
   *    [5,4,10] → minPrice 5 se 4 ho jayega, answer 6
   */

  export function runTests(): void {
    console.log('🧪 Testing Best Time to Buy and Sell Stock — OPTIMAL\n');

    const tests: Array<{ prices: number[]; expected: number }> = [
      { prices: [7, 1, 5, 3, 6, 4], expected: 5 },
      { prices: [7, 6, 4, 3, 1], expected: 0 },
      { prices: [1, 2, 3, 4, 5], expected: 4 },
      { prices: [5], expected: 0 },
      { prices: [2, 1, 2, 1, 10], expected: 9 },
      { prices: [5, 4, 10], expected: 6 },
      { prices: [3, 3, 5, 0, 0, 3, 1, 4], expected: 4 },
      { prices: [2, 4, 1], expected: 2 },
      { prices: [1, 1, 1, 1], expected: 0 },
      { prices: [9, 1, 8, 2, 7], expected: 7 },
    ];

    tests.forEach(({ prices, expected }, i) => {
      const result = maxProfit(prices);
      const pass = result === expected;

      console.log(`Test ${i + 1}: prices=[${prices}]`);
      console.log(`  Expected: ${expected} | Got: ${result} → ${pass ? '✅' : '❌'}`);
    });
  }
}

BuySellStockOptimal.runTests();
