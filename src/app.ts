namespace LongestRepeatingCharReplacement {
    
    // Solution 1: Using Plain Object (dictionary)
    export function bruteForceWithObject(s: string, k: number): number {
        let maxLength = 0;
        const n = s.length;

        for (let i = 0; i < n; i++) {
            const charCount: Record<string, number> = {};
            let maxFreq = 0;

            for (let j = i; j < n; j++) {
                const char = s[j];
                
                // Update frequency
                charCount[char] = (charCount[char] || 0) + 1;
                maxFreq = Math.max(maxFreq, charCount[char]);

                const windowSize = j - i + 1;
                const charsToChange = windowSize - maxFreq;

                if (charsToChange <= k) {
                    maxLength = Math.max(maxLength, windowSize);
                } else {
                    // Optimization: Break early if window is invalid
                    break;
                }
            }
        }
        return maxLength;
    }

    // Solution 2: Using JavaScript Map
    export function bruteForceWithMap(s: string, k: number): number {
        let maxLength = 0;
        const n = s.length;

        for (let i = 0; i < n; i++) {
            const charCount = new Map<string, number>();
            let maxFreq = 0;

            for (let j = i; j < n; j++) {
                const char = s[j];
                
                // Map operations
                const currentCount = (charCount.get(char) || 0) + 1;
                charCount.set(char, currentCount);

                maxFreq = Math.max(maxFreq, currentCount);

                const windowSize = j - i + 1;
                const charsToChange = windowSize - maxFreq;

                if (charsToChange <= k) {
                    maxLength = Math.max(maxLength, windowSize);
                } else {
                    break;
                }
            }
        }
        return maxLength;
    }

    // Solution 3: Optimal Sliding Window
    export function characterReplacementOptimal(s: string, k: number): number {
        const charCount = new Map<string, number>(); // Using Map for simplicity with string keys
        let left = 0;
        let maxFreq = 0;
        let maxLength = 0;
    
        for (let right = 0; right < s.length; right++) {
            const char = s[right];
            
            // Update count
            const count = (charCount.get(char) || 0) + 1;
            charCount.set(char, count);
            
            // Track max frequency in current window
            maxFreq = Math.max(maxFreq, count);
    
            // If invalid window (replacements needed > k)
            // Note: In your code, you used `windowSize` and `charsToChange` inside `while`
            // But `windowSize` changes as we move `left`. It's better to calculate condition directly.
            
            while ((right - left + 1) - maxFreq > k) {
                const leftChar = s[left];
                charCount.set(leftChar, charCount.get(leftChar)! - 1);
                left++;
                
                // Note: We DON'T need to decrement maxFreq.
                // Even if maxFreq is technically lower in the new smaller window, 
                // our goal is to find a LARGER max window.
                // A valid window only expands if we find a higher maxFreq.
                // Keeping the old high maxFreq works because the condition
                // (windowSize - maxFreq > k) will still effectively constrain the window size.
            }
    
            maxLength = Math.max(maxLength, right - left + 1);
        }
     
        return maxLength;
    }
}

// Test Runner
if (require.main === module) {
    const testCases = [
        { s: "ABAB", k: 2, expected: 4 },
        { s: "AABABBA", k: 1, expected: 4 },
        { s: "ABCDE", k: 1, expected: 2 },
        { s: "AAAA", k: 0, expected: 4 }
    ];

    console.log("--- Testing Object Solution ---");
    testCases.forEach((t, i) => {
        const result = LongestRepeatingCharReplacement.bruteForceWithObject(t.s, t.k);
        const pass = result === t.expected;
        console.log(`Test ${i + 1}: Expected: ${t.expected}, Got: ${result} [${pass ? "✅ PASS" : "❌ FAIL"}]`);
    });

    console.log("\n--- Testing Map Solution ---");
    testCases.forEach((t, i) => {
        const result = LongestRepeatingCharReplacement.bruteForceWithMap(t.s, t.k);
        const pass = result === t.expected;
        console.log(`Test ${i + 1}: Expected: ${t.expected}, Got: ${result} [${pass ? "✅ PASS" : "❌ FAIL"}]`);
    });

    console.log("\n--- Testing Optimal Solution ---");
    testCases.forEach((t, i) => {
        const result = LongestRepeatingCharReplacement.characterReplacementOptimal(t.s, t.k);
        const pass = result === t.expected;
        console.log(`Test ${i + 1}: Expected: ${t.expected}, Got: ${result} [${pass ? "✅ PASS" : "❌ FAIL"}]`);
    });
}
