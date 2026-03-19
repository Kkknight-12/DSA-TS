/**
 * Book Allocation Problem - Optimal Solution using Binary Search
 *
 * @param arr - array of book pages [arr[i] represents pages in i-th book]
 * @param m - number of students
 * @returns - minimum of maximum pages that can be allocated to any student
 */
function allocateBooks(arr: number[], m: number): number {
  // Agar students ki sankhya books se zyada hai, toh allocation possible nahi hai
  if (m > arr.length) {
    return -1;
  }

  // Search space ke boundaries set karte hain
  let low = Math.max(...arr); // Minimum possible answer - sabse badi book ke pages
  let high = arr.reduce((sum, pages) => sum + pages, 0); // Maximum possible answer - saari books ke pages ka sum

  let result = -1; // Final result store karne ke liye variable

  // Binary search algorithm
  while (low <= high) {
    // Mid-point calculate karte hain - yeh possible answer hai
    let mid = Math.floor((low + high) / 2);

    // Check karte hain ki kya 'mid' pages ke sath allocation possible hai
    if (isPossible(arr, m, mid)) {
      // Agar possible hai, toh result update karte hain
      result = mid;
      // Aur chota answer dhundhne ki koshish karte hain
      high = mid - 1;
    } else {
      // Agar possible nahi hai, toh bada answer dhundhte hain
      low = mid + 1;
    }
  }

  return result;
}

/**
 * Helper function to check if it's possible to allocate books such that
 * no student gets more than 'maxPages'
 *
 * @param arr - array of book pages
 * @param m - number of students
 * @param maxPages - maximum pages a student can get
 * @returns - true if allocation is possible, false otherwise
 */
function isPossible(arr: number[], m: number, maxPages: number): boolean {
  let studentsRequired = 1; // Initially 1 student lenge
  let currentPages = 0; // Current student ko kitne pages allocate kiye hain

  // Har book ke liye check karte hain
  for (let i = 0; i < arr.length; i++) {
    // Agar current book ke pages maxPages se zyada hain, toh allocation possible hi nahi hai
    if (arr[i] > maxPages) {
      return false;
    }

    // Agar current book ko current student ko allocate karne se maxPages cross ho jaate hain
    if (currentPages + arr[i] > maxPages) {
      // Toh next student ko allocate karte hain
      studentsRequired++;
      // Current student ko current book allocate karte hain
      currentPages = arr[i];

      // Agar required students available students se zyada ho gaye, toh allocation not possible
      if (studentsRequired > m) {
        return false;
      }
    } else {
      // Current book ko current student ko allocate karte hain
      currentPages += arr[i];
    }
  }

  // Agar hum yahan tak pahunche, toh allocation possible hai
  return true;
}

// Example for testing
const books = [12, 34, 67, 90];
const students = 2;
console.log(`Minimum maximum pages: ${allocateBooks(books, students)}`); // Output: 113
