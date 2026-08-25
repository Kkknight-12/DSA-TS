namespace Practice {
  // class TreeNode {
  //   val: number;
  //   left: TreeNode | null;
  //   right: TreeNode | null;
  //
  //   constructor(
  //     val = 0,
  //     left: TreeNode | null = null,
  //     right: TreeNode | null = null
  //   ) {
  //     this.val = val;
  //     this.left = left;
  //     this.right = right;
  //   }
  // }
  //
  // function maxDepth(root: TreeNode | null): number {
  //   if (root === null) {
  //     // Empty tree me ek bhi real level nahi hai.
  //     return 0;
  //   }
  //
  //   const queue: TreeNode[] = [root];
  //   let head = 0;
  //   let depth = 0;
  //   const stack = [];
  //
  //   while (head < queue.length) {
  //     const levelSize = queue.length - head;
  //     const frame = [];
  //
  //     for (let i = 0; i < levelSize; i++) {
  //       const currentNode = queue[head];
  //       frame.push(currentNode.val);
  //       head++;
  //
  //       if (currentNode.left !== null) {
  //         queue.push(currentNode.left);
  //       }
  //
  //       if (currentNode.right !== null) {
  //         queue.push(currentNode.right);
  //       }
  //
  //       console.log(currentNode.val);
  //     }
  //     stack.push(frame);
  //     depth++;
  //   }
  //
  //   console.log(stack);
  //
  //   return depth;
  // }
  //
  // function buildTree(values: Array<number | null>): TreeNode | null {
  //   const rootValue = values[0];
  //
  //   if (rootValue === null || rootValue === undefined) {
  //     return null;
  //   }
  //
  //   const root = new TreeNode(rootValue);
  //   const queue: TreeNode[] = [root];
  //   let queueIndex = 0;
  //   let valueIndex = 1;
  //
  //   // Ye construction queue serialization ko tree me convert karti hai.
  //   // Solution queue ka job different hai: ready tree ke levels count karna.
  //   while (queueIndex < queue.length && valueIndex < values.length) {
  //     const current = queue[queueIndex++];
  //     const leftValue = values[valueIndex++];
  //
  //     if (leftValue !== null && leftValue !== undefined) {
  //       current.left = new TreeNode(leftValue);
  //       queue.push(current.left);
  //     }
  //
  //     if (valueIndex >= values.length) {
  //       break;
  //     }
  //
  //     const rightValue = values[valueIndex++];
  //
  //     if (rightValue !== null && rightValue !== undefined) {
  //       current.right = new TreeNode(rightValue);
  //       queue.push(current.right);
  //     }
  //   }
  //
  //   return root;
  // }
  //
  // export function test() {
  //   const root = buildTree([3, 9, 20, null, null, 15, 7]);
  //   const result = maxDepth(root);
  //
  //   console.log('result ', result);
  // }

  export function sample(arr: number[], k: number) {
    const nums = arr;
    const indexMap = new Map<number, number[]>();

    nums.forEach((num, index) => {
      if (!indexMap.has(num)) {
        indexMap.set(num, []);
      }

      const arr = indexMap.get(num);

      if (arr) {
        arr.push(index);
      }
    });

    let maxLength = 0;

    for (const indices of indexMap.values()) {
      let left = 0;
      for (let right = 0; right < indices.length; right++) {
        while (indices[right] - indices[left] - (right - left) > k) {
          left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
      }
    }
    console.log(maxLength);
  }
}

Practice.sample([1, 2, 1, 2, 1], 2);