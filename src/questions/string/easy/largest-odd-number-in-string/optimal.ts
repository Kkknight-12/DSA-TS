// https://www.notion.so/Largest-Odd-Number-in-a-String-281a2680896880758575f26e0b8fc9e2

/**
 * PURPOSE: Find the largest odd number substring using optimal approach
 * APPROACH: Traverse from right to left, find first odd digit, return substring
 * TIME COMPLEXITY: O(n) - Single pass through the string
 * SPACE COMPLEXITY: O(1) - Only using index variable (excluding output)
 *
 * KEY INSIGHT: Largest odd number = Maximum length substring ending with odd digit
 */

function largestOddNumber_optimal(num: string): string {
  // STEP 1: Start traversing from the rightmost position
  // Why right to left? Kyunki hume largest number chahiye,
  // aur agar right side ka digit odd hai, toh pura string return kar sakte hain

  for (let i = num.length - 1; i >= 0; i--) {
    // STEP 2: Get the current character (digit) at position i
    const currentChar: string = num[i];

    // STEP 3: Convert character to actual number for odd/even check
    // Example: '5' (string) → 5 (number)
    const currentDigit: number = parseInt(currentChar);

    // STEP 4: Check if current digit is odd
    // Odd check formula: number % 2 !== 0
    // Examples: 5 % 2 = 1 (odd), 4 % 2 = 0 (even)
    const isOdd: boolean = currentDigit % 2 !== 0;

    // STEP 5: If we found an odd digit, this is our answer!
    // Why? Kyunki:
    // 1. Yeh rightmost odd digit hai (last digit odd = number odd)
    // 2. Start se yaha tak saare digits include karke largest number milega
    if (isOdd) {
      // Return substring from start (0) to current position (i+1)
      // i+1 kyunki slice ka end index exclusive hota hai
      // Example: num = "35427", i = 4 → return num.slice(0, 5) → "35427"
      return num.slice(0, i + 1);
    }

    // STEP 6: If current digit is even, continue to next (left) digit
    // Loop automatically moves: i-- (right to left movement)
  }

  // STEP 7: If we've checked all digits and found no odd digit
  // This means saare digits even hain, toh empty string return karo
  // Example: "4206" → No odd digits → return ""
  return '';
}

// Test cases with detailed outputs
console.log('Test 1:', largestOddNumber_optimal('52')); // Expected: "5"
console.log('Test 2:', largestOddNumber_optimal('4206')); // Expected: ""
console.log('Test 3:', largestOddNumber_optimal('35427')); // Expected: "35427"
console.log('Test 4:', largestOddNumber_optimal('10133')); // Expected: "10133"
console.log('Test 5:', largestOddNumber_optimal('123456')); // Expected: "12345"