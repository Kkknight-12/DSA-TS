namespace StringToIntegerAtoiRecursive {
  /**
   * STRING TO INTEGER (ATOI) - RECURSIVE APPROACH
   * ==============================================
   *
   * Intuition (Soch):
   * ----------------
   * String parsing ko recursively kaise karenge?
   *
   * Key insight: Har recursive call ek character ko process karegi!
   *
   * Think step-by-step:
   * 1. Whitespace hai? → Skip karo, next character par recursive call
   * 2. Sign (+/-) hai? → Store karo, next character par recursive call
   * 3. Digit hai? → Result mein add karo, next character par recursive call
   * 4. Non-digit hai ya string khatam? → Base case, return result
   *
   * Recursion naturally breaks problem into smaller subproblems:
   * "  -042" → Skip space → Skip space → Handle sign → Process 0 → Process 4 → Process 2
   *
   * Visual Example:
   * ---------------
   * Input: "  -042"
   *
   * Call Stack (grows downward):
   * ═══════════════════════════════════════════════════════════
   *
   * Call 1: processChar(index=0, result=0, sign=0)
   *         s[0] = ' ' (whitespace)
   *         Action: Skip, call processChar(index=1)
   *         ↓
   *
   * Call 2: processChar(index=1, result=0, sign=0)
   *         s[1] = ' ' (whitespace)
   *         Action: Skip, call processChar(index=2)
   *         ↓
   *
   * Call 3: processChar(index=2, result=0, sign=0)
   *         s[2] = '-' (sign, and sign not set yet)
   *         Action: Set sign=-1, call processChar(index=3, sign=-1)
   *         ↓
   *
   * Call 4: processChar(index=3, result=0, sign=-1)
   *         s[3] = '0' (digit)
   *         Action: result = 0*10 + 0 = 0
   *                 call processChar(index=4, result=0)
   *         ↓
   *
   * Call 5: processChar(index=4, result=0, sign=-1)
   *         s[4] = '4' (digit)
   *         Action: result = 0*10 + 4 = 4
   *                 call processChar(index=5, result=4)
   *         ↓
   *
   * Call 6: processChar(index=5, result=4, sign=-1)
   *         s[5] = '2' (digit)
   *         Action: result = 4*10 + 2 = 42
   *                 call processChar(index=6, result=42)
   *         ↓
   *
   * Call 7: processChar(index=6, result=42, sign=-1)
   *         index >= s.length (BASE CASE!)
   *         Return: 42
   *
   * Unwind: Apply sign: 42 * (-1) = -42 ✓
   *
   * Algorithm:
   * ----------
   * 1. Main function: myAtoi(s)
   *    - Call helper: processChar(s, 0, 0, 0)
   *    - Return result with sign applied
   *
   * 2. Helper: processChar(s, index, result, sign)
   *    BASE CASES:
   *    - If index >= s.length: return result
   *    - If current char is non-digit (and we've started): return result
   *
   *    RECURSIVE CASES:
   *    - If whitespace (and not started yet): processChar(index+1)
   *    - If sign +/- (and not started yet): processChar(index+1, sign set)
   *    - If digit:
   *        a. Check for overflow
   *        b. newResult = result * 10 + digit
   *        c. processChar(index+1, newResult)
   *
   * 3. Overflow handling:
   *    - Before multiplication, check if result > INT_MAX/10
   *    - If result == INT_MAX/10, check if digit > 7
   *    - Return clamped value immediately
   */

  const INT_MAX = 2147483647; // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  /**
   * Main function: Convert string to integer using recursion
   *
   * @param s - Input string
   * @returns 32-bit signed integer
   */
  function myAtoi(s: string): number {
    // EDGE CASE: Empty string
    // WHY: No characters to process
    if (s.length === 0) return 0;

    // Start recursive processing from index 0
    // PARAMETERS:
    //   - index: Current position in string
    //   - result: Accumulated integer value
    //   - sign: 0 (not set), 1 (positive), -1 (negative)
    //   - started: Have we started reading digits?
    return processChar(s, 0, 0, 0, false);
  }

  /**
   * Recursive helper function to process each character
   *
   * @param s - Input string
   * @param index - Current index being processed
   * @param result - Accumulated result so far
   * @param sign - 0 (not set), 1 (positive), -1 (negative)
   * @param started - Whether we've started processing digits
   * @returns Final integer value
   */
  function processChar(
    s: string,
    index: number,
    result: number,
    sign: number,
    started: boolean
  ): number {
    // BASE CASE 1: Reached end of string
    // WHY: No more characters to process
    // RETURN: Result with sign applied
    if (index >= s.length) {
      return applySign(result, sign);
    }

    const char = s[index];

    // CASE 1: Whitespace (and we haven't started processing yet)
    // WHY: Leading whitespace should be ignored
    // ACTION: Skip this character, recursively process next
    // EXAMPLE: "  42" → Skip spaces
    if (char === " " && !started && sign === 0) {
      return processChar(s, index + 1, result, sign, started);
    }

    // CASE 2: Sign character (+ or -, and we haven't set sign yet)
    // WHY: Sign can only appear once, before digits
    // ACTION: Set sign, recursively process next character
    // EXAMPLE: "-42" → Set sign to -1, process "42"
    if ((char === "+" || char === "-") && sign === 0 && !started) {
      const newSign = char === "-" ? -1 : 1;
      return processChar(s, index + 1, result, newSign, false);
    }

    // CASE 3: Digit character (0-9)
    // WHY: This is what we want to convert!
    // ACTION: Add to result, recursively process next
    if (isDigit(char)) {
      const digit = parseInt(char, 10);

      // OVERFLOW CHECK: Before multiplying, check if overflow will occur
      // WHY: Prevent integer overflow during calculation
      //
      // Logic:
      //   result * 10 + digit > INT_MAX
      //   → result > (INT_MAX - digit) / 10
      //   → result > INT_MAX / 10 (simplified check)
      //
      // Special case: If result == INT_MAX / 10 (214748364)
      //   then result * 10 + digit overflows if digit > 7
      //   because INT_MAX = 2147483647
      //
      // EXAMPLE: result = 214748365, digit = 0
      //   → 214748365 > 214748364 → OVERFLOW!
      //
      // EXAMPLE: result = 214748364, digit = 8
      //   → result == 214748364 && digit > 7 → OVERFLOW!

      const actualSign = sign === 0 ? 1 : sign; // Default to positive if no sign

      // Check for positive overflow
      if (actualSign === 1) {
        if (
          result > Math.floor(INT_MAX / 10) ||
          (result === Math.floor(INT_MAX / 10) && digit > 7)
        ) {
          return INT_MAX; // Clamp to INT_MAX
        }
      }

      // Check for negative overflow
      if (actualSign === -1) {
        if (
          result > Math.floor(INT_MAX / 10) ||
          (result === Math.floor(INT_MAX / 10) && digit > 8)
        ) {
          // WHY digit > 8? Because INT_MIN = -2147483648, last digit is 8
          return INT_MIN; // Clamp to INT_MIN
        }
      }

      // Safe to compute new result
      const newResult = result * 10 + digit;

      // Recursively process next character with updated result
      // Mark started = true because we've begun processing digits
      return processChar(s, index + 1, newResult, actualSign, true);
    }

    // BASE CASE 2: Non-digit character encountered
    // WHY: Stop processing at first non-digit (after digits started)
    // EXAMPLE: "42abc" → Stop at 'a', return 42
    // EXAMPLE: "words 42" → Stop at 'w', return 0
    return applySign(result, sign);
  }

  /**
   * Helper: Check if character is a digit (0-9)
   *
   * @param char - Character to check
   * @returns true if digit, false otherwise
   */
  function isDigit(char: string): boolean {
    return char >= "0" && char <= "9";
  }

  /**
   * Helper: Apply sign to result
   *
   * @param result - Unsigned result
   * @param sign - 0 (not set, default positive), 1 (positive), -1 (negative)
   * @returns Signed result
   */
  function applySign(result: number, sign: number): number {
    // If sign never set, default to positive
    return sign === -1 ? -result : result;
  }

  /**
   * ═══════════════════════════════════════════════════════════════════════════════════
   * RECURSION CALL STACK (Visual Diagram)
   * ═══════════════════════════════════════════════════════════════════════════════════
   *
   * Example: myAtoi("  -042")
   *
   * Stack grows DOWN ↓, returns UP ↑:
   *
   * ┌─────────────────────────────────────────────────────────────────────────────────┐
   * │ processChar(index=0, result=0, sign=0, started=false)                           │
   * │   s[0] = ' ' (whitespace)                                                       │
   * │   Action: Skip whitespace → Recurse to next                                     │
   * │   ┌───────────────────────────────────────────────────────────────────────────┐ │
   * │   │ processChar(index=1, result=0, sign=0, started=false)                     │ │
   * │   │   s[1] = ' ' (whitespace)                                                 │ │
   * │   │   Action: Skip whitespace → Recurse to next                               │ │
   * │   │   ┌─────────────────────────────────────────────────────────────────────┐ │ │
   * │   │   │ processChar(index=2, result=0, sign=0, started=false)               │ │ │
   * │   │   │   s[2] = '-' (sign character)                                       │ │ │
   * │   │   │   Action: Set sign=-1 → Recurse to next                             │ │ │
   * │   │   │   ┌───────────────────────────────────────────────────────────────┐ │ │ │
   * │   │   │   │ processChar(index=3, result=0, sign=-1, started=false)       │ │ │ │
   * │   │   │   │   s[3] = '0' (digit)                                         │ │ │ │
   * │   │   │   │   digit = 0                                                  │ │ │ │
   * │   │   │   │   newResult = 0*10 + 0 = 0                                   │ │ │ │
   * │   │   │   │   Action: Recurse with result=0                              │ │ │ │
   * │   │   │   │   ┌─────────────────────────────────────────────────────────┐│ │ │ │
   * │   │   │   │   │ processChar(index=4, result=0, sign=-1, started=true)  ││ │ │ │
   * │   │   │   │   │   s[4] = '4' (digit)                                   ││ │ │ │
   * │   │   │   │   │   digit = 4                                            ││ │ │ │
   * │   │   │   │   │   newResult = 0*10 + 4 = 4                             ││ │ │ │
   * │   │   │   │   │   Action: Recurse with result=4                        ││ │ │ │
   * │   │   │   │   │   ┌───────────────────────────────────────────────────┐││ │ │ │
   * │   │   │   │   │   │ processChar(index=5, result=4, sign=-1, s=true) │││ │ │ │
   * │   │   │   │   │   │   s[5] = '2' (digit)                            │││ │ │ │
   * │   │   │   │   │   │   digit = 2                                     │││ │ │ │
   * │   │   │   │   │   │   newResult = 4*10 + 2 = 42                     │││ │ │ │
   * │   │   │   │   │   │   Action: Recurse with result=42                │││ │ │ │
   * │   │   │   │   │   │   ┌─────────────────────────────────────────────┐│││ │ │ │
   * │   │   │   │   │   │   │ processChar(index=6, result=42, sign=-1)  ││││ │ │ │
   * │   │   │   │   │   │   │   index >= s.length → BASE CASE!          ││││ │ │ │
   * │   │   │   │   │   │   │   return applySign(42, -1) = -42 ←───────┐││││ │ │ │
   * │   │   │   │   │   │   └─────────────────────────────────────────────┘│││ │ │ │
   * │   │   │   │   │   │   return -42 ←────────────────────────────────────┘││ │ │ │
   * │   │   │   │   │   └───────────────────────────────────────────────────┘│ │ │ │
   * │   │   │   │   │   return -42 ←──────────────────────────────────────────┘ │ │ │
   * │   │   │   │   └─────────────────────────────────────────────────────────┘ │ │ │
   * │   │   │   │   return -42 ←────────────────────────────────────────────────┘ │ │
   * │   │   │   └───────────────────────────────────────────────────────────────┘ │ │
   * │   │   │   return -42 ←──────────────────────────────────────────────────────┘ │
   * │   │   └─────────────────────────────────────────────────────────────────────┘ │
   * │   │   return -42 ←────────────────────────────────────────────────────────────┘ │
   * │   └───────────────────────────────────────────────────────────────────────────┘ │
   * │   return -42 ←──────────────────────────────────────────────────────────────────┘ │
   * └─────────────────────────────────────────────────────────────────────────────────┘
   * Final Result: -42 ✓
   *
   *
   * Key Observations from Diagram:
   * ══════════════════════════════════════════════════════════════════════════════════
   * 1. Each box = One recursive call
   * 2. Nested boxes = Deeper in call stack
   * 3. Stack grows DOWN (each call waits for inner call to complete)
   * 4. Returns propagate UP (base case returns first, then unwinds)
   * 5. State flows DOWN (result, sign passed to deeper calls)
   * 6. Final value flows UP (base case returns -42, all calls return -42)
   *
   *
   * ═══════════════════════════════════════════════════════════
   * DRY RUN - COMPLETE VISUALIZATION
   * ═══════════════════════════════════════════════════════════
   *
   * Example 1: "  -042"
   * ═══════════════════════════════════════════════════════════
   *
   * Initial Call: myAtoi("  -042")
   *               processChar(s, index=0, result=0, sign=0, started=false)
   *
   * Call Stack Trace:
   * ─────────────────────────────────────────────────────────
   *
   * Call #1: processChar(index=0, result=0, sign=0, started=false)
   *   char = s[0] = ' '
   *   Case: Whitespace, not started, sign=0
   *   Action: Skip → processChar(index=1, result=0, sign=0, started=false)
   *
   * Call #2: processChar(index=1, result=0, sign=0, started=false)
   *   char = s[1] = ' '
   *   Case: Whitespace, not started, sign=0
   *   Action: Skip → processChar(index=2, result=0, sign=0, started=false)
   *
   * Call #3: processChar(index=2, result=0, sign=0, started=false)
   *   char = s[2] = '-'
   *   Case: Sign character, sign not set
   *   Action: Set sign=-1 → processChar(index=3, result=0, sign=-1, started=false)
   *
   * Call #4: processChar(index=3, result=0, sign=-1, started=false)
   *   char = s[3] = '0'
   *   Case: Digit
   *   digit = 0
   *   Overflow check: result=0, digit=0 → No overflow
   *   newResult = 0*10 + 0 = 0
   *   Action: processChar(index=4, result=0, sign=-1, started=true)
   *
   * Call #5: processChar(index=4, result=0, sign=-1, started=true)
   *   char = s[4] = '4'
   *   Case: Digit
   *   digit = 4
   *   Overflow check: result=0, digit=4 → No overflow
   *   newResult = 0*10 + 4 = 4
   *   Action: processChar(index=5, result=4, sign=-1, started=true)
   *
   * Call #6: processChar(index=5, result=4, sign=-1, started=true)
   *   char = s[5] = '2'
   *   Case: Digit
   *   digit = 2
   *   Overflow check: result=4, digit=2 → No overflow
   *   newResult = 4*10 + 2 = 42
   *   Action: processChar(index=6, result=42, sign=-1, started=true)
   *
   * Call #7: processChar(index=6, result=42, sign=-1, started=true)
   *   index=6 >= s.length=6 → BASE CASE!
   *   Return: applySign(42, -1) = -42
   *
   * Final Result: -42 ✓
   *
   *
   * Example 2: "1337c0d3"
   * ═══════════════════════════════════════════════════════════
   *
   * Initial Call: myAtoi("1337c0d3")
   *
   * Call #1: processChar(index=0, result=0, sign=0, started=false)
   *   char = '1', digit = 1
   *   newResult = 0*10 + 1 = 1
   *   → processChar(index=1, result=1, sign=1, started=true)
   *
   * Call #2: processChar(index=1, result=1, sign=1, started=true)
   *   char = '3', digit = 3
   *   newResult = 1*10 + 3 = 13
   *   → processChar(index=2, result=13, sign=1, started=true)
   *
   * Call #3: processChar(index=2, result=13, sign=1, started=true)
   *   char = '3', digit = 3
   *   newResult = 13*10 + 3 = 133
   *   → processChar(index=3, result=133, sign=1, started=true)
   *
   * Call #4: processChar(index=3, result=133, sign=1, started=true)
   *   char = '7', digit = 7
   *   newResult = 133*10 + 7 = 1337
   *   → processChar(index=4, result=1337, sign=1, started=true)
   *
   * Call #5: processChar(index=4, result=1337, sign=1, started=true)
   *   char = 'c' → Not a digit!
   *   BASE CASE: Non-digit encountered
   *   Return: applySign(1337, 1) = 1337
   *
   * Final Result: 1337 ✓
   *
   *
   * Example 3: "-91283472332" (Overflow)
   * ═══════════════════════════════════════════════════════════
   *
   * Initial Call: myAtoi("-91283472332")
   *
   * Processing sign and digits...
   * [Skipping intermediate steps for brevity]
   *
   * At some point:
   *   result = 912834723
   *   digit = 3
   *
   *   Overflow check for negative:
   *   result > INT_MAX/10? → 912834723 > 214748364? → YES!
   *   Return immediately: INT_MIN = -2147483648
   *
   * Final Result: -2147483648 ✓
   *
   *
   * Example 4: "words and 987"
   * ═══════════════════════════════════════════════════════════
   *
   * Initial Call: myAtoi("words and 987")
   *
   * Call #1: processChar(index=0, result=0, sign=0, started=false)
   *   char = 'w' → Not whitespace, not sign, not digit
   *   BASE CASE: Non-digit encountered (before any digits)
   *   Return: applySign(0, 0) = 0
   *
   * Final Result: 0 ✓
   *
   *
   * Example 5: "0-1"
   * ═══════════════════════════════════════════════════════════
   *
   * Call #1: processChar(index=0, result=0, sign=0, started=false)
   *   char = '0', digit = 0
   *   newResult = 0*10 + 0 = 0
   *   → processChar(index=1, result=0, sign=1, started=true)
   *
   * Call #2: processChar(index=1, result=0, sign=1, started=true)
   *   char = '-' → Not a digit! (sign can't appear after digit)
   *   BASE CASE: Non-digit encountered
   *   Return: applySign(0, 1) = 0
   *
   * Final Result: 0 ✓
   *
   *
   * ═══════════════════════════════════════════════════════════
   * KEY INSIGHTS FROM DRY RUN:
   * ═══════════════════════════════════════════════════════════
   *
   * 1. Recursion naturally handles state (index, result, sign, started)
   * 2. Base cases: End of string OR non-digit encountered
   * 3. Overflow must be checked BEFORE multiplication
   * 4. Sign can only be set once, before any digits
   * 5. Whitespace only skipped before sign/digits
   * 6. Each call processes exactly one character
   *
   * ═══════════════════════════════════════════════════════════
   */

  // ==================== TEST CASES ====================

  export function runTests(): void {
    console.log("🧪 Testing String to Integer (atoi) - RECURSIVE APPROACH\n");

    const testCases: { input: string; expected: number; description: string }[] =
      [
        // Basic cases
        {
          input: "42",
          expected: 42,
          description: "Basic positive number",
        },
        {
          input: "-42",
          expected: -42,
          description: "Basic negative number",
        },
        {
          input: "   -042",
          expected: -42,
          description: "Leading whitespace and zeros",
        },

        // Edge cases with non-digits
        {
          input: "1337c0d3",
          expected: 1337,
          description: "Stop at first non-digit",
        },
        {
          input: "0-1",
          expected: 0,
          description: "Non-digit after digit",
        },
        {
          input: "words and 987",
          expected: 0,
          description: "Non-digit at start",
        },

        // Overflow cases
        {
          input: "2147483647",
          expected: 2147483647,
          description: "INT_MAX exactly",
        },
        {
          input: "2147483648",
          expected: 2147483647,
          description: "Overflow positive (clamp to INT_MAX)",
        },
        {
          input: "-2147483648",
          expected: -2147483648,
          description: "INT_MIN exactly",
        },
        {
          input: "-2147483649",
          expected: -2147483648,
          description: "Overflow negative (clamp to INT_MIN)",
        },
        {
          input: "91283472332",
          expected: 2147483647,
          description: "Large overflow positive",
        },
        {
          input: "-91283472332",
          expected: -2147483648,
          description: "Large overflow negative",
        },

        // Empty and whitespace
        {
          input: "",
          expected: 0,
          description: "Empty string",
        },
        {
          input: "   ",
          expected: 0,
          description: "Only whitespace",
        },

        // Sign cases
        {
          input: "+1",
          expected: 1,
          description: "Positive sign",
        },
        {
          input: "+-12",
          expected: 0,
          description: "Multiple signs (invalid)",
        },
        {
          input: "+",
          expected: 0,
          description: "Only sign, no digits",
        },

        // Leading zeros
        {
          input: "00000123",
          expected: 123,
          description: "Multiple leading zeros",
        },

        // Mixed characters
        {
          input: "4193 with words",
          expected: 4193,
          description: "Space after digits",
        },
        {
          input: "   +0 123",
          expected: 0,
          description: "Space between digits",
        },
      ];

    let passed = 0;
    let failed = 0;

    testCases.forEach(({ input, expected, description }, index) => {
      const result = myAtoi(input);
      const status = result === expected ? "✅ PASS" : "❌ FAIL";

      if (result === expected) {
        passed++;
      } else {
        failed++;
      }

      console.log(`Test ${index + 1}: ${status}`);
      console.log(`  Description: ${description}`);
      console.log(`  Input: "${input}"`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Got: ${result}`);
      console.log();
    });

    console.log("═══════════════════════════════════════════");
    console.log(`Total: ${testCases.length} tests`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log("═══════════════════════════════════════════");
  }
}

// Execute tests
StringToIntegerAtoiRecursive.runTests();
