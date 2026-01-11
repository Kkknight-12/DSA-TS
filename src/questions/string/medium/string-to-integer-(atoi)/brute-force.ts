/**
 * PURPOSE: Convert string to 32-bit signed integer using Brute Force approach
 *
 * APPROACH: Manually traverse string with explicit condition checking
 * - Skip leading whitespaces using loop
 * - Detect sign explicitly (+ or -)
 * - Build number digit by digit with overflow checks
 * - Handle all edge cases with multiple if-else conditions
 *
 * TIME: O(n) where n is string length
 * SPACE: O(1) only using variables
 */
function myAtoi(s: string): number {
  // STEP 1: Define constants aur initial variables
  // INT_MAX aur INT_MIN 32-bit signed integer ki boundaries hain
  const INT_MAX = 2147483647; // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  // index: current position in string (traverse karne ke liye)
  let index = 0;

  // sign: number positive hai ya negative (default = positive)
  let sign = 1;

  // result: final answer yahan build hoga
  let result = 0;

  // n: string ki total length (boundary check ke liye)
  const n = s.length;

  // EDGE CASE: Agar string hi empty hai, toh 0 return karo
  if (n === 0) {
    return 0;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP 2: Leading Whitespaces Skip Karo
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Jab tak space milta rahe aur string khatam na ho, tab tak skip karo
  // WHY: Problem statement kehti hai leading spaces ignore karo
  while (index < n && s[index] === ' ') {
    index++; // Agle character pe move karo
  }

  // EDGE CASE: Agar saari string me sirf spaces the
  // Example: "    " → index = n ho jaega
  if (index === n) {
    return 0; // Koi digit nahi mila, 0 return karo
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP 3: Sign Detection (+ ya - check karo)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Pehla non-space character check karo
  if (s[index] === '+') {
    // Positive sign mila
    sign = 1;
    index++; // Sign consume karke aage badho
  } else if (s[index] === '-') {
    // Negative sign mila
    sign = -1;
    index++; // Sign consume karke aage badho
  }
  // ELSE case: Agar + ya - nahi hai, toh sign = 1 already hai (default positive)

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP 4: Digit by Digit Number Build Karo
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Jab tak valid digits milte rahe, tab tak process karo
  while (index < n) {
    const currentChar = s[index];

    // Character check: Kya ye digit hai? (0-9)
    // WHY: Non-digit character pe reading stop karni hai
    if (currentChar < '0' || currentChar > '9') {
      // Non-digit mila (letter, space, dot, etc.)
      // Example: "123abc" me 'a' pe stop
      break; // Loop se bahar niklo
    }

    // Character ko actual digit value me convert karo
    // HOW: ASCII difference use karke
    // '0' ka ASCII = 48, '5' ka ASCII = 53
    // '5' - '0' = 53 - 48 = 5 (actual digit value)
    const digit = currentChar.charCodeAt(0) - '0'.charCodeAt(0);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // CRITICAL: OVERFLOW CHECK (result * 10 + digit se pehle)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // CHECK 1: Agar result already INT_MAX/10 se bada hai
    // Example: result = 214748365, INT_MAX/10 = 214748364
    // Agar ye multiply by 10 hoga, toh overflow pakka hai
    if (result > Math.floor(INT_MAX / 10)) {
      // Overflow detect hua!
      // Positive number overflow → return INT_MAX
      // Negative number overflow → return INT_MIN
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    // CHECK 2: Agar result exactly INT_MAX/10 ke barabar hai
    // Example: result = 214748364 (INT_MAX/10)
    // Tab last digit pe dhyan dena padega
    if (result === Math.floor(INT_MAX / 10)) {
      // Positive number ka last digit 7 se bada nahi ho sakta
      // MAX = 2147483647 (last digit = 7)
      if (sign === 1 && digit > 7) {
        return INT_MAX; // Overflow! MAX return karo
      }

      // Negative number ka last digit 8 se bada nahi ho sakta
      // MIN = -2147483648 (last digit = 8)
      if (sign === -1 && digit > 8) {
        return INT_MIN; // Overflow! MIN return karo
      }
    }

    // Ab safely digit add kar sakte hain
    // Formula: new_result = old_result * 10 + current_digit
    // Example: result=12, digit=3 → result = 12*10 + 3 = 123
    result = result * 10 + digit;

    // Agle character pe move karo
    index++;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP 5: Sign Apply Karke Final Answer Return Karo
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // result abhi unsigned hai, sign multiply karke actual value milega
  // Example: result=42, sign=-1 → final = -42
  return result * sign;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPORT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export { myAtoi };