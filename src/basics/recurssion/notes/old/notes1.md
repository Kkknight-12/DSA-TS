// https://joelolawanle.com/blog/recursion-in-javascript-explained-for-beginners

Recursion in JavaScript: Explained for beginners
Have you ever heard of the term "recursion" and wondered what it meant? Yay! In this article, you will learn everything you need to know about recursion and how it works in JavaScript.

Recursion is when a function gets so caught up in its own thoughts that it ends up calling itself over and over again until it finally snaps out of it and gets the answer it's looking for. This may sound confusing, but you will understand as you read through this article and various examples, you’ll gain clarification.

So let's get started!

Recursion is a fundamental programming concept involving a function repeatedly calling itself until it reaches a specific end condition. It's like a puzzle where you keep breaking the problem into smaller pieces until you solve it.

For example, consider a function that calculates the factorial of a given number. The factorial of a number is the product of all the positive integers from 1 to that number. For example, the factorial of 5 is 5 x 4 x 3 x 2 x 1, which equals 120.

To calculate the factorial of a number using recursion, we can define a function that calls itself with progressively smaller numbers until it reaches 1 (the base case). Here's what the code might look like:

const factorial = (n) => {
// base case
if (n == 1) {
return 1;
}

	// recursive call
	return n * factorial(n - 1);
};

console.log(factorial(5)); // outputs 120
In this example, the factorial() function calls itself with n - 1 until it reaches the base case of n == 1. Once the base case is reached, the function starts returning values back up the call stack until the original call is completed and returns the final result.

Recursion Illustration
— Recursion Illustration

To better understand how recursion works in JavaScript, let's take a closer look at the call stack and the two key components of a recursive function.

The call stack is a data structure JavaScript uses to keep track of function calls. When a function is called, it's added to the top of the call stack. When a function returns, it's removed from the top of the call stack.

Recursion works by adding multiple instances of a function to the call stack until the base case is reached and the functions start to return. This process is repeated until all function calls have been completed.

A recursive function has two components: the base case and the recursive call.

The base case is the condition under which the function stops calling itself and starts returning values. Without a base case, a recursive function will continue calling itself indefinitely, eventually causing a stack overflow error.

The recursive call is the part of the function that calls itself with a modified input parameter, bringing the function closer to the base case with each iteration.

It's essential to modify the input parameter in each recursive call, or the function will keep calling itself with the same input indefinitely, resulting in a stack overflow error.

Here's an example of a recursive function that calculates the nth number in the Fibonacci sequence:

const fibonacci = (n) => {
if (n <= 1) {
return n;
}
return fibonacci(n - 1) + fibonacci(n - 2);
};

console.log(fibonacci(6)); // outputs 8
In this example, the fibonacci() function calls itself with n - 1 and n - 2 until it reaches the base case of n <= 1. It then returns values back up the call stack until the original call is completed and returns the final result.

Another example of a recursive function is a countdown:

const countdown = (num) => {
if (num === 0) {
return;
}
console.log(num);
countdown(num - 1);
};

countdown(5); // outputs 5, 4, 3, 2, 1
In this example, the countdown() function calls itself with num - 1 until it reaches the base case of num === 0. It then returns values back up the call stack until all function calls have been completed.

To ensure your recursive functions work as intended, it's important to follow some best practices. Here are four best practices to keep in mind when using recursion in JavaScript:

A base case is a condition that stops the recursion from continuing. Defining a base case in every recursive function is important to prevent an infinite loop.

Let's say we want to use recursion to calculate the factorial of a number. We can define a base case when the input is 0 or 1.

const factorial = (n) => {
if (n === 0 || n === 1) {
return 1;
}
return n * factorial(n - 1);
};
Recursion uses the call stack to keep track of function calls. When a function is called recursively, it adds a new frame to the call stack. If the call stack grows too large, it can result in a stack overflow error. To avoid this, ensure your recursive function does not call itself indefinitely.

Here's an example of a recursive function that searches for a value in a binary search tree.

const searchBST = (node, target) => {
if (node === null) {
return null;
}
if (node.value === target) {
return node;
}
if (target < node.value) {
return searchBST(node.left, target);
} else {
return searchBST(node.right, target);
}
};
Recursive functions can be slow, especially when dealing with large data sets. Consider memoization or dynamic programming techniques to optimize your recursive functions to avoid unnecessary calculations.

If we're using recursion to calculate the Fibonacci sequence, we can use memoization to avoid unnecessary calculations.

const fibonacci = (n, memo = {}) => {
if (n in memo) {
return memo[n];
}
if (n === 0 || n === 1) {
return n;
}
memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
return memo[n];
};
You can also use iterative solutions instead of recursive ones when performance is a concern.

Recursive functions can be difficult to understand and debug, especially for other developers. To make your code more readable, use descriptive variable names and add comments to explain the logic behind your recursive function.

If you're using recursion to flatten a nested array, we can use descriptive variable names and comments to make our code more readable.

const flattenArray = (arr) => {
let result = [];
for (let i = 0; i < arr.length; i++) {
if (Array.isArray(arr[i])) {
// If the element is an array, recursively flatten it
result = result.concat(flattenArray(arr[i]));
} else {
// Otherwise, add the element to the result array
result.push(arr[i]);
}
}
return result;
};
By following these best practices, you can use recursion safely and effectively in your JavaScript code.

In this article, you have learned recursion, how it works, and best practices for writing and optimizing recursive functions.

By following these best practices and mastering recursion, you can become a more proficient JavaScript developer and tackle even the most complex programming challenges.

Try what you have learned in the interactive code editor below.

const factorial = (n) => {
// base case
if (n == 1) {
return 1;
}

    // recursive call
    return n * factorial(n - 1);

};

let answer = factorial(5);
document.write(answer);

Have fun coding!