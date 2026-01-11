// Brute force ek rough draft tha, optimal solution ek polished final document hai jo professional aur maintainable hai!

/**
 * OPTIMAL SOLUTION: String to Integer (atoi)
 *
 * PURPOSE: Convert string to 32-bit signed integer with robust error handling
 *
 * ALGORITHM:
 * 1. Trim leading whitespaces using built-in trim approach
 * 2. Extract and consume sign character (+ or -)
 * 3. Parse digits with overflow protection using mathematical bounds
 * 4. Return result with sign applied
 *
 * ADVANTAGES OVER BRUTE FORCE:
 * - Cleaner code structure with better readability
 * - Consistent overflow handling pattern
 * - More maintainable and easier to debug
 * - Professional coding standards
 *
 * TIME COMPLEXITY: O(n) - single pass through string
 * SPACE COMPLEXITY: O(1) - constant extra space
 *
 * @param s - Input string to convert
 * @returns 32-bit signed integer
 */
function myAtoi(s: string): number {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CONSTANTS: 32-bit Signed Integer Boundaries
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // INT_MAX: Maximum positive value (2^31 - 1)
  // INT_MIN: Minimum negative value (-2^31)
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  // Helper constant for overflow detection
  // WHY: Hum result ko 10 se multiply karne se pehle check karenge
  // ki result INT_MAX/10 se zyada toh nahi hai
  const MAX_DIV_10 = Math.floor(INT_MAX / 10); // 214748364

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 1: PREPROCESSING - Leading Whitespace Removal
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // String ke left side se saare spaces remove karo
  // WHY: Problem statement says "ignore leading whitespace"
  // OPTIMIZATION: Built-in trimStart() fast aur reliable hai
  let i = 0; // Index pointer for traversal
  const n = s.length;

  // Manual trim implementation for better control
  // Alternative: s = s.trimStart() bhi use kar sakte ho
  while (i < n && s[i] === ' ') {
    i++; // Skip all leading spaces
  }

  // EDGE CASE: Agar string mein sirf spaces the
  // Example: "    " → koi digit nahi mila
  if (i >= n) {
    return 0; // Early return for efficiency
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 2: SIGN DETECTION AND EXTRACTION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Pehla non-space character check karo for sign
  let sign = 1; // Default: positive number

  if (s[i] === '-') {
    // Negative sign detected
    sign = -1;
    i++; // Consume the sign character
  } else if (s[i] === '+') {
    // Positive sign detected (explicit)
    sign = 1;
    i++; // Consume the sign character
  }
  // ELSE: No sign character → default positive (sign = 1 already set)

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 3: DIGIT PARSING WITH OVERFLOW PROTECTION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  let result = 0; // Accumulator for building the final number

  // Traverse string character by character
  while (i < n) {
    const char = s[i];

    // ┌─────────────────────────────────────────────────┐
    // │ VALIDATION: Check if current character is digit │
    // └─────────────────────────────────────────────────┘
    // Character must be in range '0' to '9'
    // WHY: Non-digit character means reading should stop
    // Example: "123abc" → stop at 'a'
    if (char < '0' || char > '9') {
      // Non-digit found → stop parsing immediately
      break;
    }

    // ┌─────────────────────────────────────────────────┐
    // │ CONVERSION: Character to Integer                │
    // └─────────────────────────────────────────────────┘
    // Convert character digit to numeric value
    // METHOD 1: ASCII arithmetic (most efficient)
    const digit = char.charCodeAt(0) - '0'.charCodeAt(0);
    // Example: '5' (ASCII 53) - '0' (ASCII 48) = 5

    // Alternative METHOD 2: Using parseInt
    // const digit = parseInt(char, 10);

    // ┌─────────────────────────────────────────────────┐
    // │ CRITICAL: OVERFLOW DETECTION BEFORE OPERATION   │
    // └─────────────────────────────────────────────────┘
    // We check BEFORE doing: result = result * 10 + digit
    // WHY: Agar pehle calculate karenge, toh overflow ho chuka hoga!

    // ═══════════════════════════════════════════════════
    // OVERFLOW CHECK 1: Result too large for multiplication
    // ═══════════════════════════════════════════════════
    // Agar result > MAX_DIV_10 (214748364)
    // toh result * 10 zaroor overflow karega
    // Example: result = 214748365, result * 10 = 2147483650 (> INT_MAX)
    if (result > MAX_DIV_10) {
      // Overflow confirmed! Return boundary value based on sign
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    // ═══════════════════════════════════════════════════
    // OVERFLOW CHECK 2: Result at boundary, check last digit
    // ═══════════════════════════════════════════════════
    // Agar result exactly MAX_DIV_10 ke barabar hai (214748364)
    // toh hume last digit check karni padegi
    if (result === MAX_DIV_10) {
      // For POSITIVE numbers: INT_MAX = 2147483647 (last digit = 7)
      // Agar digit > 7, toh overflow hoga
      if (sign === 1 && digit > 7) {
        return INT_MAX;
      }

      // For NEGATIVE numbers: INT_MIN = -2147483648 (last digit = 8)
      // Agar digit > 8, toh overflow hoga
      // NOTE: -8 absolute value mein 8 hai, isliye digit > 8 check
      if (sign === -1 && digit > 8) {
        return INT_MIN;
      }
    }

    // ┌─────────────────────────────────────────────────┐
    // │ SAFE OPERATION: Add digit to result             │
    // └─────────────────────────────────────────────────┘
    // Ab safely digit add kar sakte hain
    // Formula: new_result = (old_result × 10) + current_digit
    // Example: result = 12, digit = 3
    //          new_result = 12 × 10 + 3 = 123
    result = result * 10 + digit;

    // Move to next character
    i++;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 4: FINALIZATION - Apply Sign and Return
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Result abhi unsigned form mein hai
  // Sign apply karke final signed integer milega
  // Example: result = 42, sign = -1 → final = -42
  return result * sign;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPER FUNCTION (Optional Enhancement)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Check if a character is a digit
 * @param char - Character to check
 * @returns true if digit, false otherwise
 */
function isDigit(char: string): boolean {
  return char >= '0' && char <= '9';
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { myAtoi, isDigit };