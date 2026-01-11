/**
 * PURPOSE: Find the largest odd number substring using brute force approach
 * APPROACH: Generate all possible substrings, filter odd ones, return the largest
 * TIME: O(n²) for generating substrings + O(n) for each check = O(n²)
 * SPACE: O(n²) for storing all substrings
 */

function largestOddNumber_brute(num: string): string {
  // Variable to store the largest odd substring found so far
  let largestOdd: string = '';

  // STEP 1: Generate all possible substrings using two nested loops
  // Outer loop: Starting point of substring (i)
  for (let i = 0; i < num.length; i++) {
    // Inner loop: Ending point of substring (j)
    // j starts from i because substring should be at least 1 character long
    for (let j = i; j < num.length; j++) {
      // STEP 2: Extract substring from index i to j (inclusive)
      // slice(i, j+1) kyunki slice ka end index exclusive hota hai
      const substring: string = num.slice(i, j + 1);

      // STEP 3: Check if this substring represents an odd number
      // Odd number ki pehchaan: Last digit odd hona chahiye (1,3,5,7,9)
      const lastChar: string = substring[substring.length - 1];
      const lastDigit: number = parseInt(lastChar);

      // Check if last digit is odd using modulo operator
      // Agar number % 2 !== 0 hai, toh odd hai
      const isOdd: boolean = lastDigit % 2 !== 0;

      // STEP 4: If current substring is odd, check if it's larger than current largest
      if (isOdd) {
        // String comparison: Longer string > shorter string
        // Agar same length hai, toh lexicographically compare hoga
        // But humein numerical comparison chahiye

        // Compare by length first (longer string = bigger number)
        if (substring.length > largestOdd.length) {
          largestOdd = substring;
        }
        // If same length, then compare string values
        // Since both are numbers, lexicographic comparison works
        else if (
          substring.length === largestOdd.length &&
          substring > largestOdd
        ) {
          largestOdd = substring;
        }
      }
    }
  }

  // STEP 5: Return the largest odd substring found
  // Agar koi odd substring nahi mila, toh empty string return hoga
  return largestOdd;
}

// Test cases to verify the solution
console.log(largestOddNumber_brute('52')); // Output: "5"
console.log(largestOddNumber_brute('4206')); // Output: ""
console.log(largestOddNumber_brute('35427')); // Output: "35427"