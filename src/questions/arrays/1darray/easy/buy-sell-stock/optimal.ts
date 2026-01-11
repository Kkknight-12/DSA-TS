function maxProfit(prices: number[]): number {
  // If we have no prices or only one price, we can't make any profit
  if (prices.length <= 1) return 0;

  // Keep track of the minimum price we've seen so far
  let minPrice = prices[0];
  // Keep track of the maximum profit we can make
  let maxProfit = 0;

  // Iterate through each price
  for (let i = 1; i < prices.length; i++) {
    // Update the minimum price if we find a lower price
    minPrice = Math.min(minPrice, prices[i]);

    // Calculate potential profit if we sell at current price
    // by subtracting minimum price seen so far from current price
    const currentProfit = prices[i] - minPrice;

    // Update maximum profit if current profit is higher
    maxProfit = Math.max(maxProfit, currentProfit);
  }

  return maxProfit;
}
