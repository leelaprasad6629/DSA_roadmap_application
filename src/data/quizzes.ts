export type QuizQuestionType = 'MCQ' | 'CodeOutput' | 'Complexity' | 'Debugging';

export interface QuizQuestion {
  id: string;
  topic: string;
  type: QuizQuestionType;
  question: string;
  options: string[];
  codeSnippet?: string;
  correctAnswer: number | string;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    "id": "arr-1",
    "topic": "Arrays",
    "type": "Complexity",
    "question": "What is the worst-case time complexity of accessing an element in an array by its index?",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Arrays are stored in contiguous memory blocks. The location of any element can be computed directly in O(1) time using the base address and index offset."
  },
  {
    "id": "arr-2",
    "topic": "Arrays",
    "type": "CodeOutput",
    "question": "What will be the output of the following JavaScript code snippet?",
    "codeSnippet": "const nums = [1, 2, 3, 4, 5];\nconst res = nums.reduce((acc, curr) => acc + curr, 0);\nconsole.log(res);",
    "options": [
      "15",
      "10",
      "5",
      "undefined"
    ],
    "correctAnswer": 0,
    "explanation": "Array.prototype.reduce accumulates elements starting from initial value 0: 0 + 1 + 2 + 3 + 4 + 5 = 15."
  },
  {
    "id": "arr-3",
    "topic": "Arrays",
    "type": "Debugging",
    "question": "Identify the bug in the following implementation intended to find the maximum element in an array.",
    "codeSnippet": "function findMax(arr) {\n  let max = 0;\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] > max) max = arr[i];\n  }\n  return max;\n}",
    "options": [
      "Fails when all numbers in the array are negative (returns 0 instead of max negative number)",
      "Causes an index out of bounds error",
      "Fails on empty array",
      "Returns undefined for single element array"
    ],
    "correctAnswer": 0,
    "explanation": "Initializing 'max' to 0 causes failure when all elements are negative (e.g. [-5, -2, -10]), because 0 is larger than all negative inputs. It should be initialized to arr[0] or -Infinity."
  },
  {
    "id": "arr-4",
    "topic": "Arrays",
    "type": "MCQ",
    "question": "Which algorithmic technique allows finding a pair of elements in a sorted array that sum to a target value in O(n) time?",
    "options": [
      "Two Pointers",
      "Binary Search",
      "Sliding Window",
      "Divide and Conquer"
    ],
    "correctAnswer": 0,
    "explanation": "The Two Pointers technique (one starting at index 0, one at index n-1) scans inward in O(n) time by taking advantage of the sorted property."
  },
  {
    "id": "arr-5",
    "topic": "Arrays",
    "type": "MCQ",
    "question": "What is Kadane's algorithm used for?",
    "options": [
      "Finding the Maximum Subarray Sum in O(n) time",
      "Sorting an array in O(n log n) time",
      "Finding the median of two sorted arrays",
      "Detecting a cycle in an array"
    ],
    "correctAnswer": 0,
    "explanation": "Kadane's algorithm finds the contiguous subarray with the largest sum within a 1D array of numbers in linear O(n) time."
  },
  {
    "id": "str-1",
    "topic": "Strings",
    "type": "MCQ",
    "question": "Which string matching algorithm uses the Longest Proper Prefix which is also Suffix (LPS) array to achieve O(N + M) time complexity?",
    "options": [
      "Knuth-Morris-Pratt (KMP)",
      "Rabin-Karp",
      "Boyer-Moore",
      "Naive Matching"
    ],
    "correctAnswer": 0,
    "explanation": "KMP builds an LPS lookup table to skip redundant re-comparisons during pattern matching in O(N + M) time."
  },
  {
    "id": "str-2",
    "topic": "Strings",
    "type": "CodeOutput",
    "question": "What is the output of the following string reversal snippet?",
    "codeSnippet": "const str = 'Algorithms';\nconsole.log(str.split('').reverse().join(''));",
    "options": [
      "smhtiroglA",
      "Algorithms",
      "smhtirogla",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "split('') turns the string into an array of characters, reverse() reverses the array in place, and join('') joins them back into 'smhtiroglA'."
  },
  {
    "id": "str-3",
    "topic": "Strings",
    "type": "Complexity",
    "question": "What is the time complexity of checking if two strings of length N are anagrams using a character frequency array / hash map?",
    "options": [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "O(1)"
    ],
    "correctAnswer": 0,
    "explanation": "Counting character frequencies takes one pass over each string (O(N) time) and comparing fixed frequency counts takes O(1) extra space."
  },
  {
    "id": "str-4",
    "topic": "Strings",
    "type": "Debugging",
    "question": "Find the bug in this palindrome checking function.",
    "codeSnippet": "function isPalindrome(s) {\n  let left = 0;\n  let right = s.length;\n  while (left < right) {\n    if (s[left] !== s[right]) return false;\n    left++; right--;\n  }\n  return true;\n}",
    "options": [
      "s[right] initially accesses an undefined index because index range is 0 to s.length - 1",
      "The while loop should be left <= right",
      "left and right increment/decrement in wrong directions",
      "s.length is not a valid property in JavaScript"
    ],
    "correctAnswer": 0,
    "explanation": "Indices in JavaScript strings are 0-based. s.length is out of bounds, so s[right] returns undefined on the first comparison."
  },
  {
    "id": "str-5",
    "topic": "Strings",
    "type": "MCQ",
    "question": "Which data structure is specifically designed for fast retrieval of keys with common prefixes (such as autocomplete)?",
    "options": [
      "Trie (Prefix Tree)",
      "Hash Table",
      "Binary Search Tree",
      "Red-Black Tree"
    ],
    "correctAnswer": 0,
    "explanation": "A Trie (Prefix Tree) stores characters along edge paths, enabling O(L) lookup and prefix matching where L is key length."
  },
  {
    "id": "ll-1",
    "topic": "Linked Lists",
    "type": "Complexity",
    "question": "What is the time complexity to insert a new node at the head of a singly linked list?",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Inserting at the head requires creating a node, setting node.next = head, and updating head reference, which takes O(1) constant time."
  },
  {
    "id": "ll-2",
    "topic": "Linked Lists",
    "type": "MCQ",
    "question": "Floyd's Cycle Detection Algorithm (Slow and Fast Pointers) moves references at what relative speeds?",
    "options": [
      "Slow moves 1 step at a time, Fast moves 2 steps at a time",
      "Slow moves 1 step at a time, Fast moves 3 steps at a time",
      "Both move 2 steps at a time",
      "Slow moves backward, Fast moves forward"
    ],
    "correctAnswer": 0,
    "explanation": "By moving slow reference by 1 node and fast reference by 2 nodes, if a cycle exists, fast reference will catch up to slow reference inside the cycle."
  },
  {
    "id": "ll-3",
    "topic": "Linked Lists",
    "type": "Debugging",
    "question": "What is wrong with this iterative linked list reversal function?",
    "codeSnippet": "function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr !== null) {\n    curr.next = prev;\n    prev = curr;\n    curr = curr.next;\n  }\n  return prev;\n}",
    "options": [
      "curr.next is overwritten before storing the reference to the original next node, cutting off the rest of the list",
      "prev should start at head",
      "while loop condition causes NullPointer exception",
      "The function returns curr instead of prev"
    ],
    "correctAnswer": 0,
    "explanation": "Overwriting curr.next = prev loses the reference to original curr.next. A temporary variable next = curr.next must store the original next node before updating curr.next."
  },
  {
    "id": "ll-4",
    "topic": "Linked Lists",
    "type": "CodeOutput",
    "question": "What value is returned when finding the middle node of list 1 -> 2 -> 3 -> 4 -> 5 using the slow and fast reference snippet below?",
    "codeSnippet": "function findMiddle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n  }\n  return slow.val;\n}",
    "options": [
      "3",
      "2",
      "4",
      "5"
    ],
    "correctAnswer": 0,
    "explanation": "When fast reference reaches node 5, slow reference will be at node 3, which is the middle element of the 5-node list."
  },
  {
    "id": "ll-5",
    "topic": "Linked Lists",
    "type": "MCQ",
    "question": "What is a main disadvantage of a Linked List compared to an Array?",
    "options": [
      "No random access by index (requires O(n) traversal)",
      "Fixed size during runtime",
      "High cost for insertion at the beginning",
      "Cannot store dynamic data"
    ],
    "correctAnswer": 0,
    "explanation": "Linked List elements are non-contiguous in memory, so accessing the i-th element requires sequential traversal from head in O(n) time."
  },
  {
    "id": "tree-1",
    "topic": "Trees",
    "type": "MCQ",
    "question": "In a Binary Search Tree (BST), which traversal produces nodes in sorted ascending order?",
    "options": [
      "In-order Traversal",
      "Pre-order Traversal",
      "Post-order Traversal",
      "Level-order Traversal"
    ],
    "correctAnswer": 0,
    "explanation": "In-order traversal visits (Left, Root, Right). In a valid BST, left < root < right, resulting in sorted output."
  },
  {
    "id": "tree-2",
    "topic": "Trees",
    "type": "CodeOutput",
    "question": "What maximum node count does this function return for a full binary tree of height H?",
    "codeSnippet": "function maxNodes(height) {\n  return Math.pow(2, height) - 1;\n}",
    "options": [
      "2^H - 1",
      "2^H",
      "2^(H-1)",
      "H^2"
    ],
    "correctAnswer": 0,
    "explanation": "A full binary tree of height H has 1 + 2 + 4 + ... + 2^(H-1) = 2^H - 1 total nodes."
  },
  {
    "id": "tree-3",
    "topic": "Trees",
    "type": "Complexity",
    "question": "What is the worst-case time complexity of search in a highly unbalanced / skewed Binary Search Tree of N nodes?",
    "options": [
      "O(N)",
      "O(log N)",
      "O(1)",
      "O(N log N)"
    ],
    "correctAnswer": 0,
    "explanation": "In a skewed BST (e.g. 1 -> 2 -> 3 -> 4), the tree degenerates into a linked list, making search O(N)."
  },
  {
    "id": "tree-4",
    "topic": "Trees",
    "type": "Debugging",
    "question": "Why does this tree height / max depth function return an incorrect depth for a single-node tree?",
    "codeSnippet": "function maxDepth(root) {\n  if (!root) return 0;\n  return Math.max(maxDepth(root.left), maxDepth(root.right));\n}",
    "options": [
      "It forgets to add + 1 for the current root node level",
      "It returns 0 instead of null",
      "It causes stack overflow on empty trees",
      "Math.max cannot compare recursive outputs"
    ],
    "correctAnswer": 0,
    "explanation": "Without adding + 1 (i.e. 1 + Math.max(...)), a tree with 1 node evaluates to Math.max(0, 0) = 0 instead of 1."
  },
  {
    "id": "tree-5",
    "topic": "Trees",
    "type": "MCQ",
    "question": "What is the key self-balancing property of an AVL Tree?",
    "options": [
      "The balance factor (height difference between left and right subtrees) of any node is at most 1",
      "All leaf nodes must be at the exact same depth",
      "Nodes are colored red or black",
      "Every non-leaf node must have exactly two children"
    ],
    "correctAnswer": 0,
    "explanation": "AVL trees strictly enforce that for every node, |height(left) - height(right)| <= 1, keeping height bounded to O(log N)."
  },
  {
    "id": "graph-1",
    "topic": "Graphs",
    "type": "MCQ",
    "question": "Which data structure is primarily used to implement Breadth-First Search (BFS) on a graph?",
    "options": [
      "Queue",
      "Stack",
      "Priority Queue",
      "Hash Set"
    ],
    "correctAnswer": 0,
    "explanation": "BFS explores graph vertices level by level using a FIFO Queue to process nodes in the order they are visited."
  },
  {
    "id": "graph-2",
    "topic": "Graphs",
    "type": "Complexity",
    "question": "What is the time complexity of BFS or DFS on a graph with V vertices and E edges using an Adjacency List?",
    "options": [
      "O(V + E)",
      "O(V * E)",
      "O(V^2)",
      "O(E^2)"
    ],
    "correctAnswer": 0,
    "explanation": "BFS/DFS visits each vertex once O(V) and inspects each edge once (or twice for undirected) O(E), giving total time complexity O(V + E)."
  },
  {
    "id": "graph-3",
    "topic": "Graphs",
    "type": "CodeOutput",
    "question": "Why does Dijkstra's greedy edge relaxation step shown below fail on graphs with negative edge weights?",
    "codeSnippet": "if (dist[u] + weight < dist[v]) {\n  dist[v] = dist[u] + weight;\n}",
    "options": [
      "Negative edge weights violate the greedy assumption that visited shortest path costs never decrease",
      "dist array values overflow integer bounds",
      "JavaScript comparison returns NaN for negative numbers",
      "weight variable must be positive integer in JS"
    ],
    "correctAnswer": 0,
    "explanation": "Dijkstra assumes adding an edge never decreases path cost. Negative edge weights violate this greedy choice, requiring Bellman-Ford instead."
  },
  {
    "id": "graph-4",
    "topic": "Graphs",
    "type": "Debugging",
    "question": "Find the flaw in this graph DFS traversal on a cyclic graph.",
    "codeSnippet": "function dfs(graph, node) {\n  console.log(node);\n  for (let neighbor of graph[node]) {\n    dfs(graph, neighbor);\n  }\n}",
    "options": [
      "Missing a visited set/array to track visited nodes, causing infinite recursion on cyclic graphs",
      "for...of loop does not iterate neighbors correctly",
      "graph[node] is invalid syntax",
      "console.log fails on node objects"
    ],
    "correctAnswer": 0,
    "explanation": "Without tracking visited nodes (visited.has(neighbor)), graph cycles cause dfs to re-visit previously seen nodes infinitely, triggering stack overflow."
  },
  {
    "id": "graph-5",
    "topic": "Graphs",
    "type": "MCQ",
    "question": "Topological Sort can be performed on which type of graph?",
    "options": [
      "Directed Acyclic Graph (DAG)",
      "Undirected Graph with cycles",
      "Complete Undirected Graph",
      "Graph with negative cycles"
    ],
    "correctAnswer": 0,
    "explanation": "Topological sorting orders vertices such that for every directed edge u -> v, u comes before v. This is only possible in DAGs (no cycles)."
  },
  {
    "id": "dp-1",
    "topic": "Dynamic Programming",
    "type": "MCQ",
    "question": "What are the two fundamental properties required to solve a problem using Dynamic Programming?",
    "options": [
      "Optimal Substructure and Overlapping Subproblems",
      "Greedy Choice and Divide and Conquer",
      "Sorted Input and Balanced Structure",
      "Subproblem Independence and Monotonicity"
    ],
    "correctAnswer": 0,
    "explanation": "Optimal substructure means optimal solution contains optimal sub-solutions; overlapping subproblems means recursive solutions compute identical subproblems multiple times."
  },
  {
    "id": "dp-2",
    "topic": "Dynamic Programming",
    "type": "CodeOutput",
    "question": "What value is returned for fib(6) by this memoized Fibonacci function?",
    "codeSnippet": "function fib(n, memo = {}) {\n  if (n in memo) return memo[n];\n  if (n <= 1) return n;\n  return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n}",
    "options": [
      "8",
      "5",
      "13",
      "6"
    ],
    "correctAnswer": 0,
    "explanation": "Fibonacci sequence: fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5, fib(6)=8."
  },
  {
    "id": "dp-3",
    "topic": "Dynamic Programming",
    "type": "Complexity",
    "question": "What is the time complexity of solving the 0/1 Knapsack problem using Dynamic Programming with N items and capacity W?",
    "options": [
      "O(N * W)",
      "O(2^N)",
      "O(N + W)",
      "O(N log W)"
    ],
    "correctAnswer": 0,
    "explanation": "The DP table has dimensions (N + 1) x (W + 1), taking O(N * W) time and space (pseudo-polynomial)."
  },
  {
    "id": "dp-4",
    "topic": "Dynamic Programming",
    "type": "Debugging",
    "question": "Why does this bottom-up coin change DP function fail to calculate minimum coins required?",
    "codeSnippet": "function coinChange(coins, amount) {\n  let dp = new Array(amount + 1).fill(0);\n  for (let i = 1; i <= amount; i++) {\n    for (let coin of coins) {\n      if (i - coin >= 0) {\n        dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n      }\n    }\n  }\n  return dp[amount];\n}",
    "options": [
      "dp array is initialized with 0, so Math.min(0, ...) always keeps 0; dp should be initialized with Infinity",
      "Loop condition should be i < amount",
      "coins array must be sorted in descending order",
      "dp[0] must be set to Infinity"
    ],
    "correctAnswer": 0,
    "explanation": "Because dp is filled with 0, Math.min(0, dp[i - coin] + 1) always yields 0. Initializing slots 1..amount with Infinity fixes it (and dp[0] = 0)."
  },
  {
    "id": "dp-5",
    "topic": "Dynamic Programming",
    "type": "MCQ",
    "question": "What is the key difference between Memoization (Top-down) and Tabulation (Bottom-up)?",
    "options": [
      "Memoization uses recursion + caching; Tabulation solves smaller subproblems iteratively in a table",
      "Memoization has O(2^N) time complexity while Tabulation is O(N)",
      "Memoization cannot handle overlapping subproblems",
      "Tabulation requires exponential memory space"
    ],
    "correctAnswer": 0,
    "explanation": "Memoization evaluates recursions on demand and stores results; Tabulation builds solutions iteratively starting from base cases."
  },
  {
    "id": "sort-1",
    "topic": "Sorting",
    "type": "MCQ",
    "question": "Which sorting algorithm has an average time complexity of O(N log N) but a worst-case time complexity of O(N^2) when poor pivots are chosen?",
    "options": [
      "Quick Sort",
      "Merge Sort",
      "Heap Sort",
      "Counting Sort"
    ],
    "correctAnswer": 0,
    "explanation": "Quick Sort partitions elements around a pivot. If pivot choices are consistently bad (e.g., sorted array with first element pivot), runtime degrades to O(N^2)."
  },
  {
    "id": "sort-2",
    "topic": "Sorting",
    "type": "CodeOutput",
    "question": "What is the printed array after 1 full pass of the inner loop in Bubble Sort on input [5, 1, 4, 28, 2]?",
    "codeSnippet": "let arr = [5, 1, 4, 28, 2];\nfor (let j = 0; j < arr.length - 1; j++) {\n  if (arr[j] > arr[j + 1]) {\n    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n  }\n}\nconsole.log(arr);",
    "options": [
      "[1, 4, 5, 2, 28]",
      "[1, 2, 4, 5, 28]",
      "[5, 1, 4, 2, 28]",
      "[28, 5, 4, 2, 1]"
    ],
    "correctAnswer": 0,
    "explanation": "Bubble Sort compares adjacent pairs and swaps if out of order: 5 vs 1 -> [1,5,4,28,2]; 5 vs 4 -> [1,4,5,28,2]; 5 vs 28 -> no swap; 28 vs 2 -> [1,4,5,2,28]. End result is [1, 4, 5, 2, 28]."
  },
  {
    "id": "sort-3",
    "topic": "Sorting",
    "type": "Complexity",
    "question": "What is the worst-case space complexity of standard Merge Sort on an array of length N?",
    "options": [
      "O(N)",
      "O(1)",
      "O(log N)",
      "O(N^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Merge Sort creates auxiliary arrays during the merge step to combine sorted subarrays, requiring O(N) auxiliary space."
  },
  {
    "id": "sort-4",
    "topic": "Sorting",
    "type": "Debugging",
    "question": "Why does this Selection Sort implementation fail to sort properly?",
    "codeSnippet": "function selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let minIdx = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[minIdx]) minIdx = j;\n    }\n    arr[i] = arr[minIdx];\n  }\n  return arr;\n}",
    "options": [
      "It overwrites arr[i] without swapping arr[i] and arr[minIdx] (loses original value at arr[i])",
      "Inner loop should start at j = 0",
      "minIdx should initialize to 0",
      "Loop condition should be i <= arr.length"
    ],
    "correctAnswer": 0,
    "explanation": "Assigning arr[i] = arr[minIdx] directly overwrites the element at index i. A proper swap via destructuring [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]] is required."
  },
  {
    "id": "sort-5",
    "topic": "Sorting",
    "type": "MCQ",
    "question": "What does it mean for a sorting algorithm to be 'stable'?",
    "options": [
      "It preserves the relative order of elements with equal key values",
      "It operates in O(1) space complexity",
      "Its worst-case runtime never exceeds O(N log N)",
      "It works equally well on numbers and strings"
    ],
    "correctAnswer": 0,
    "explanation": "Stability means if two elements have identical comparison keys, their relative order in output matches their relative order in original input."
  },
  {
    "id": "search-1",
    "topic": "Searching",
    "type": "MCQ",
    "question": "What prerequisite must be satisfied before Binary Search can be performed on an array?",
    "options": [
      "The array must be sorted",
      "The array must contain only positive integers",
      "The array size must be a power of 2",
      "The array must not contain duplicate values"
    ],
    "correctAnswer": 0,
    "explanation": "Binary Search repeatedly eliminates half of the search space based on comparisons, which requires the array elements to be sorted."
  },
  {
    "id": "search-2",
    "topic": "Searching",
    "type": "Complexity",
    "question": "What is the time complexity of searching for an element in a sorted array of length N using Binary Search?",
    "options": [
      "O(log N)",
      "O(N)",
      "O(1)",
      "O(N log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Binary Search divides the remaining search interval in half at each step, taking O(log N) operations."
  },
  {
    "id": "search-3",
    "topic": "Searching",
    "type": "CodeOutput",
    "question": "How many comparisons will this Binary Search loop output in the worst case for size N = 1024?",
    "codeSnippet": "let count = 0, low = 0, high = 1023;\nwhile (low <= high) {\n  count++;\n  let mid = Math.floor((low + high) / 2);\n  low = mid + 1;\n}\nconsole.log(count);",
    "options": [
      "11",
      "1024",
      "512",
      "100"
    ],
    "correctAnswer": 0,
    "explanation": "log2(1024) = 10, so 11 comparisons are performed before low > high."
  },
  {
    "id": "search-4",
    "topic": "Searching",
    "type": "Debugging",
    "question": "Find the bug in this Binary Search implementation.",
    "codeSnippet": "function binarySearch(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low < high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}",
    "options": [
      "The while loop condition low < high skips checking when low === high (fails when target is at that index)",
      "Math.floor should be Math.ceil",
      "high should initialize to arr.length",
      "low should initialize to 1"
    ],
    "correctAnswer": 0,
    "explanation": "If low < high is used instead of low <= high, the loop terminates when low === high without evaluating arr[mid], missing targets at single-element intervals."
  },
  {
    "id": "search-5",
    "topic": "Searching",
    "type": "MCQ",
    "question": "What is Ternary Search and when can it be used?",
    "options": [
      "Divides search space into 3 parts; used to find maximum/minimum of a unimodal function",
      "Searches 3 elements at a time in unsorted arrays",
      "A search algorithm that only works on ternary trees",
      "A string matching algorithm using 3 hashes"
    ],
    "correctAnswer": 0,
    "explanation": "Ternary Search splits interval into 3 equal parts to locate extreme values (maxima/minima) of unimodal functions in logarithmic time."
  },
  {
    "id": "hash-1",
    "topic": "Hashing",
    "type": "MCQ",
    "question": "What is a Hash Collision in a Hash Table?",
    "options": [
      "When two different keys map to the exact same bucket/index",
      "When a key is looked up but does not exist",
      "When the hash table runs out of allocated memory",
      "When a key is overwritten by null"
    ],
    "correctAnswer": 0,
    "explanation": "A hash collision happens when hashFunction(key1) === hashFunction(key2) for two distinct keys key1 != key2."
  },
  {
    "id": "hash-2",
    "topic": "Hashing",
    "type": "Complexity",
    "question": "What is the average-case time complexity for lookup, insertion, and deletion in a Hash Table?",
    "options": [
      "O(1)",
      "O(N)",
      "O(log N)",
      "O(N^2)"
    ],
    "correctAnswer": 0,
    "explanation": "With a good hash function and reasonable load factor, hashing provides O(1) constant time operations on average."
  },
  {
    "id": "hash-3",
    "topic": "Hashing",
    "type": "Complexity",
    "question": "What is the worst-case time complexity of lookup in a Hash Map if all keys collide into the same bucket in Separate Chaining without trees?",
    "options": [
      "O(N)",
      "O(1)",
      "O(log N)",
      "O(N^2)"
    ],
    "correctAnswer": 0,
    "explanation": "If all N elements hash to the same bucket index, Separate Chaining forms a linked list of length N, making lookup take O(N) worst-case time."
  },
  {
    "id": "hash-4",
    "topic": "Hashing",
    "type": "Debugging",
    "question": "What is the design flaw in this naive HashMap bucket storage?",
    "codeSnippet": "class SimpleHashMap {\n  constructor() { this.storage = new Array(10); }\n  _hash(key) { return key.length % 10; }\n  put(key, val) { this.storage[this._hash(key)] = val; }\n}",
    "options": [
      "Overwrites colliding values without chaining or open addressing",
      "Array size must be prime",
      "key.length is an invalid expression",
      "put method must be async"
    ],
    "correctAnswer": 0,
    "explanation": "When two keys have identical lengths (e.g. 'cat' and 'dog'), this.storage[3] gets overwritten, losing previous key-value pair."
  },
  {
    "id": "hash-5",
    "topic": "Hashing",
    "type": "MCQ",
    "question": "Which collision resolution strategy probes consecutive slots (index + 1, index + 2...) when a collision occurs?",
    "options": [
      "Linear Probing",
      "Separate Chaining",
      "Double Hashing",
      "Quadratic Probing"
    ],
    "correctAnswer": 0,
    "explanation": "Linear Probing checks subsequent array slots sequentially ((hash + i) % capacity) until an empty slot is found."
  },
  {
    "id": "rec-1",
    "topic": "Recursion",
    "type": "MCQ",
    "question": "What causes a 'Maximum call stack size exceeded' / Stack Overflow error in a recursive function?",
    "options": [
      "Absence of a base case or unreachable base case causing infinite recursive calls",
      "Declaring too many local variables inside a loop",
      "Dividing a floating point number by zero",
      "Passing an array as a parameter"
    ],
    "correctAnswer": 0,
    "explanation": "Each recursive call adds a frame to the execution call stack. Without reaching a base case, call stack exceeds maximum limit."
  },
  {
    "id": "rec-2",
    "topic": "Recursion",
    "type": "CodeOutput",
    "question": "What is the return value of calling factorial(4)?",
    "codeSnippet": "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}",
    "options": [
      "24",
      "12",
      "16",
      "4"
    ],
    "correctAnswer": 0,
    "explanation": "factorial(4) = 4 * factorial(3) = 4 * 3 * 2 * 1 = 24."
  },
  {
    "id": "rec-3",
    "topic": "Recursion",
    "type": "Complexity",
    "question": "What is the auxiliary space complexity of a recursive algorithm with maximum recursion depth N?",
    "options": [
      "O(N)",
      "O(1)",
      "O(N^2)",
      "O(2^N)"
    ],
    "correctAnswer": 0,
    "explanation": "Each active recursive invocation pushes a frame onto the call stack. A recursion depth of N uses O(N) call stack memory space."
  },
  {
    "id": "rec-4",
    "topic": "Recursion",
    "type": "Debugging",
    "question": "Identify why this recursive function causes infinite recursion for positive inputs.",
    "codeSnippet": "function sumToN(n) {\n  if (n === 0) return 0;\n  return n + sumToN(n);\n}",
    "options": [
      "Passes n instead of n - 1 to sumToN, never reducing n towards base case 0",
      "Base condition should be n < 0",
      "return statement missing addition",
      "Syntax error on function call"
    ],
    "correctAnswer": 0,
    "explanation": "Calling sumToN(n) with the identical value of n never moves toward base case n === 0, causing stack overflow."
  },
  {
    "id": "rec-5",
    "topic": "Recursion",
    "type": "MCQ",
    "question": "What is Tail Recursion?",
    "options": [
      "A recursive function call where the recursive call is the very last operation performed before returning",
      "A recursive function with multiple base cases at the tail",
      "Recursion that works only on linked list tails",
      "Recursion that returns an array from the end"
    ],
    "correctAnswer": 0,
    "explanation": "Tail recursion occurs when no computations follow the recursive call, allowing call stack frame reuse optimization (Tail Call Optimization)."
  },
  {
    "id": "bt-1",
    "topic": "Backtracking",
    "type": "MCQ",
    "question": "How does Backtracking improve upon exhaustive Brute Force search?",
    "options": [
      "By pruning (cutting off) search branches that violate constraints early",
      "By storing results in a hash table",
      "By converting recursion into iterative while loops",
      "By sorting candidates in ascending order"
    ],
    "correctAnswer": 0,
    "explanation": "Backtracking builds candidates incrementally and abandons ('prunes') a partial candidate as soon as it determines it cannot complete a valid solution."
  },
  {
    "id": "bt-2",
    "topic": "Backtracking",
    "type": "MCQ",
    "question": "Which classic problem places N chess queens on an N\u00d7N chessboard such that no two queens attack each other using Backtracking?",
    "options": [
      "N-Queens Problem",
      "Travelling Salesperson Problem",
      "Knapsack Problem",
      "Shortest Path Problem"
    ],
    "correctAnswer": 0,
    "explanation": "The N-Queens problem is a fundamental backtracking benchmark problem where queens are placed row-by-row and pruned on collision."
  },
  {
    "id": "bt-3",
    "topic": "Backtracking",
    "type": "Complexity",
    "question": "What is the worst-case time complexity of generating all permutations of an array of length N?",
    "options": [
      "O(N!)",
      "O(2^N)",
      "O(N^2)",
      "O(N log N)"
    ],
    "correctAnswer": 0,
    "explanation": "An array of N distinct elements has N! possible permutations, requiring O(N!) work to generate all of them."
  },
  {
    "id": "bt-4",
    "topic": "Backtracking",
    "type": "Debugging",
    "question": "What essential backtracking step is missing in this permutation generator snippet?",
    "codeSnippet": "function permute(nums, path, res) {\n  if (path.length === nums.length) {\n    res.push([...path]);\n    return;\n  }\n  for (let num of nums) {\n    if (path.includes(num)) continue;\n    path.push(num);\n    permute(nums, path, res);\n    // Missing step here!\n  }\n}",
    "options": [
      "path.pop() to undo the choice after returning from recursion",
      "res.clear() to empty results",
      "path.shift() to remove front element",
      "nums.sort() to arrange numbers"
    ],
    "correctAnswer": 0,
    "explanation": "Backtracking requires restoring state before exploring alternate choices. path.pop() un-chooses the appended number after the recursive call finishes."
  },
  {
    "id": "bt-5",
    "topic": "Backtracking",
    "type": "Complexity",
    "question": "What is the time complexity of generating all subsets (Power Set) of a set with N elements?",
    "options": [
      "O(2^N)",
      "O(N!)",
      "O(N^2)",
      "O(N^3)"
    ],
    "correctAnswer": 0,
    "explanation": "A set of size N has 2^N subsets, because for each element we have 2 choices: include or exclude."
  },
  {
    "id": "bit-1",
    "topic": "Bit Manipulation",
    "type": "MCQ",
    "question": "What does the expression x & (x - 1) do to an integer x in binary representation?",
    "options": [
      "Clears (turns off) the lowest set bit (rightmost 1-bit) of x",
      "Sets the lowest 0-bit to 1",
      "Flips all bits of x",
      "Multiplies x by 2"
    ],
    "correctAnswer": 0,
    "explanation": "Subtracting 1 flips all bits after the lowest 1-bit (including that 1-bit itself). ANDing with original x clears that lowest 1-bit."
  },
  {
    "id": "bit-2",
    "topic": "Bit Manipulation",
    "type": "CodeOutput",
    "question": "What is the output of the following bitwise XOR snippet?",
    "codeSnippet": "console.log(7 ^ 7);",
    "options": [
      "0",
      "7",
      "14",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "Any number XORed with itself produces 0 (a ^ a = 0)."
  },
  {
    "id": "bit-3",
    "topic": "Bit Manipulation",
    "type": "CodeOutput",
    "question": "What is the result of the following bitwise left shift snippet?",
    "codeSnippet": "console.log(5 << 2);",
    "options": [
      "20",
      "10",
      "25",
      "2"
    ],
    "correctAnswer": 0,
    "explanation": "Left shift by k bits multiplies the integer by 2^k. 5 << 2 = 5 * 4 = 20."
  },
  {
    "id": "bit-4",
    "topic": "Bit Manipulation",
    "type": "Debugging",
    "question": "Why does (n & (n - 1)) === 0 incorrectly report 0 as a power of two?",
    "codeSnippet": "function isPowerOfTwo(n) {\n  return (n & (n - 1)) === 0;\n}",
    "options": [
      "Because 0 & -1 evaluates to 0, but 0 is not a positive power of two (requires n > 0)",
      "The subtraction operator takes higher precedence",
      "0 is considered a power of two in binary",
      "Bitwise AND does not accept 0"
    ],
    "correctAnswer": 0,
    "explanation": "When n = 0, 0 & -1 equals 0, satisfying === 0. A valid check must include n > 0 && (n & (n - 1)) === 0."
  },
  {
    "id": "bit-5",
    "topic": "Bit Manipulation",
    "type": "MCQ",
    "question": "How can you check if the k-th bit (0-indexed from right) of integer n is set to 1?",
    "options": [
      "(n & (1 << k)) !== 0",
      "(n | (1 << k)) === 0",
      "(n ^ (1 << k)) === 0",
      "(n >> k) === 0"
    ],
    "correctAnswer": 0,
    "explanation": "1 << k creates a bitmask with only the k-th bit set. ANDing n with this bitmask produces non-zero if the k-th bit in n is 1."
  },
  {
    "id": "stack-1",
    "topic": "Stack",
    "type": "MCQ",
    "question": "What ordering principle does a Stack data structure enforce?",
    "options": [
      "LIFO (Last In First Out)",
      "FIFO (First In First Out)",
      "FILO (First In Last Out)",
      "Random Access"
    ],
    "correctAnswer": 0,
    "explanation": "Stack is a Last In First Out (LIFO) data structure where the last inserted element is the first to be removed."
  },
  {
    "id": "stack-2",
    "topic": "Stack",
    "type": "CodeOutput",
    "question": "What value is printed at the end of these stack operations?",
    "codeSnippet": "let stack = [];\nstack.push(10);\nstack.push(20);\nstack.push(30);\nstack.pop();\nstack.push(40);\nconsole.log(stack[stack.length - 1]);",
    "options": [
      "40",
      "30",
      "20",
      "10"
    ],
    "correctAnswer": 0,
    "explanation": "Stack state trace: push(10) -> [10]; push(20) -> [10,20]; push(30) -> [10,20,30]; pop() -> [10,20] (removes 30); push(40) -> [10,20,40]. Top element is 40."
  },
  {
    "id": "stack-3",
    "topic": "Stack",
    "type": "Complexity",
    "question": "What is the time complexity of push and pop operations on a standard Stack?",
    "options": [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Pushing and popping at the top of a stack takes O(1) constant time regardless of stack size."
  },
  {
    "id": "stack-4",
    "topic": "Stack",
    "type": "Debugging",
    "question": "Why does this bracket matching validator fail for input '('?",
    "codeSnippet": "function isValid(s) {\n  let stack = [];\n  for (let char of s) {\n    if (char === '(') stack.push(')');\n    else if (stack.pop() !== char) return false;\n  }\n  return true;\n}",
    "options": [
      "It returns true because loop finishes without checking if stack is empty (return stack.length === 0)",
      "stack.pop() throws error on empty string",
      "push(')') should be push('(')",
      "char iteration does not support string symbols"
    ],
    "correctAnswer": 0,
    "explanation": "For input '(', ')' is pushed to stack and loop ends. Returning true is wrong because stack still has unclosed bracket ')'. The function must return stack.length === 0."
  },
  {
    "id": "stack-5",
    "topic": "Stack",
    "type": "MCQ",
    "question": "What type of Stack maintains elements in strictly increasing or decreasing order to efficiently solve 'Next Greater Element' problems in O(N) time?",
    "options": [
      "Monotonic Stack",
      "Min Stack",
      "Double Stack",
      "Segment Stack"
    ],
    "correctAnswer": 0,
    "explanation": "A Monotonic Stack keeps elements sorted monotonically, enabling immediate lookup of nearest greater/smaller elements."
  },
  {
    "id": "queue-1",
    "topic": "Queue",
    "type": "MCQ",
    "question": "Which principle describes the element removal order in a standard Queue?",
    "options": [
      "FIFO (First In First Out)",
      "LIFO (Last In First Out)",
      "Priority Based",
      "Random"
    ],
    "correctAnswer": 0,
    "explanation": "Queue follows First In First Out (FIFO): elements are dequeued in the exact order they were enqueued."
  },
  {
    "id": "queue-2",
    "topic": "Queue",
    "type": "CodeOutput",
    "question": "What element remains at the front of the queue after these operations?",
    "codeSnippet": "let queue = [];\nqueue.push(10);\nqueue.push(20);\nqueue.push(30);\nqueue.shift(); // dequeue\nconsole.log(queue[0]);",
    "options": [
      "20",
      "10",
      "30",
      "null"
    ],
    "correctAnswer": 0,
    "explanation": "10 was enqueued first, so shift() removes 10. The new front element at queue[0] is 20."
  },
  {
    "id": "queue-3",
    "topic": "Queue",
    "type": "Complexity",
    "question": "In JavaScript, using Array.prototype.shift() to dequeue from an array-backed queue has what time complexity?",
    "options": [
      "O(N)",
      "O(1)",
      "O(log N)",
      "O(N^2)"
    ],
    "correctAnswer": 0,
    "explanation": "shift() removes index 0 and re-indexes all remaining N-1 elements, taking O(N) linear time."
  },
  {
    "id": "queue-4",
    "topic": "Queue",
    "type": "Debugging",
    "question": "What problem occurs in this Circular Queue implementation when enqueue is called without checking if full?",
    "codeSnippet": "class CircularQueue {\n  constructor(size) {\n    this.size = size;\n    this.items = new Array(size);\n    this.head = 0; this.tail = 0;\n  }\n  enqueue(val) {\n    this.items[this.tail] = val;\n    this.tail = (this.tail + 1) % this.size;\n  }\n}",
    "options": [
      "It overwrites existing un-dequeued elements at head without notice",
      "this.tail becomes negative",
      "Array automatically resizes",
      "Syntax error on modulo operator"
    ],
    "correctAnswer": 0,
    "explanation": "Without checking isFull(), pushing beyond capacity advances tail past head, overwriting unread elements in the queue."
  },
  {
    "id": "queue-5",
    "topic": "Queue",
    "type": "MCQ",
    "question": "What is a Deque (Double-Ended Queue)?",
    "options": [
      "A queue that allows insertion and deletion at both front and rear ends in O(1) time",
      "A queue with two parallel arrays",
      "A queue that automatically sorts elements",
      "A stack converted into a queue"
    ],
    "correctAnswer": 0,
    "explanation": "A Deque (Double-Ended Queue) generalizes queues and stacks by allowing efficient insertions and deletions at both head and tail ends."
  },
  {
    "id": "heap-1",
    "topic": "Heap",
    "type": "MCQ",
    "question": "In a Max-Heap binary tree property, what is the relation between any parent node and its children?",
    "options": [
      "Parent node key is greater than or equal to child node keys",
      "Parent node key is less than or equal to child node keys",
      "Parent node key equals left child plus right child",
      "Left child key is always greater than right child key"
    ],
    "correctAnswer": 0,
    "explanation": "Max-Heap property: for every node i other than root, A[Parent(i)] >= A[i]. Root holds maximum key."
  },
  {
    "id": "heap-2",
    "topic": "Heap",
    "type": "CodeOutput",
    "question": "In a 0-indexed array representation of a binary heap, what is returned for parent index i = 1 by this left child helper?",
    "codeSnippet": "function getLeftChildIndex(i) {\n  return 2 * i + 1;\n}\nconsole.log(getLeftChildIndex(1));",
    "options": [
      "3",
      "2",
      "4",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "For 0-based indexing: left child = 2 * 1 + 1 = 3."
  },
  {
    "id": "heap-3",
    "topic": "Heap",
    "type": "Complexity",
    "question": "What is the time complexity to build a Heap (Heapify) from an unsorted array of N elements?",
    "options": [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Bottom-up heap construction runs in O(N) linear time due to converging mathematical sum of tree heights."
  },
  {
    "id": "heap-4",
    "topic": "Heap",
    "type": "Debugging",
    "question": "Find the bug in this heap parent calculation for 0-indexed array representation.",
    "codeSnippet": "function bubbleUp(heap, i) {\n  while (i > 0) {\n    let parent = Math.floor(i / 2);\n    if (heap[i] > heap[parent]) {\n      [heap[i], heap[parent]] = [heap[parent], heap[i]];\n      i = parent;\n    } else break;\n  }\n}",
    "options": [
      "Parent formula for 0-indexed array should be Math.floor((i - 1) / 2)",
      "Swap syntax is invalid in JavaScript",
      "Loop condition should be i >= 0",
      "heap[i] > heap[parent] is inverted"
    ],
    "correctAnswer": 0,
    "explanation": "i / 2 is for 1-indexed heaps. For 0-indexed heaps, index 2 parent is Math.floor((2 - 1)/2) = 0, whereas Math.floor(2 / 2) = 1 which is wrong."
  },
  {
    "id": "heap-5",
    "topic": "Heap",
    "type": "MCQ",
    "question": "Which optimal algorithm finds the Top K Largest / Smallest elements in an unsorted stream or array of size N in O(N log K) time?",
    "options": [
      "Min-Heap (or Max-Heap) of size K",
      "Sorting the entire array in O(N log N)",
      "Linear Search K times",
      "Binary Search Tree insertion"
    ],
    "correctAnswer": 0,
    "explanation": "Maintaining a Min-Heap of capacity K processes all N elements in O(N log K) time and O(K) space."
  },
  {
    "id": "complexity-1",
    "topic": "Time/Space Complexity",
    "type": "MCQ",
    "question": "What does Big-O notation specify in computational complexity analysis?",
    "options": [
      "The tight upper bound on runtime or space required as input size approaches infinity",
      "The exact execution time in nanoseconds on a hardware CPU",
      "The minimum memory consumed in best-case scenarios",
      "The average lines of code executed"
    ],
    "correctAnswer": 0,
    "explanation": "Big-O measures worst-case asymptotic growth rate of time/space complexity as input size N grows indefinitely."
  },
  {
    "id": "complexity-2",
    "topic": "Time/Space Complexity",
    "type": "CodeOutput",
    "question": "What is the time complexity of the following logarithmic loop structure?",
    "codeSnippet": "let i = N;\nwhile (i > 1) {\n  i = Math.floor(i / 2);\n}",
    "options": [
      "O(log N)",
      "O(N)",
      "O(N^2)",
      "O(1)"
    ],
    "correctAnswer": 0,
    "explanation": "The variable i is halved at each iteration, taking log2(N) steps to reach 1, giving O(log N) time complexity."
  },
  {
    "id": "complexity-3",
    "topic": "Time/Space Complexity",
    "type": "Complexity",
    "question": "What is the worst-case space complexity of recursive Depth-First Search (DFS) on a balanced binary tree of height H?",
    "options": [
      "O(H) or O(log N)",
      "O(N^2)",
      "O(1)",
      "O(N!)"
    ],
    "correctAnswer": 0,
    "explanation": "The recursion call stack stores frames proportional to the height of the tree H = log N for balanced trees."
  },
  {
    "id": "complexity-4",
    "topic": "Time/Space Complexity",
    "type": "Debugging",
    "question": "What is the actual time complexity of this string concatenation inside a loop of length N in languages with immutable strings?",
    "codeSnippet": "let res = '';\nfor (let i = 0; i < N; i++) {\n  res += 'a';\n}",
    "options": [
      "O(N^2) time complexity because string concatenation creates a new string copy of length i each loop",
      "O(N) time complexity",
      "O(1) space complexity",
      "O(log N) time complexity"
    ],
    "correctAnswer": 0,
    "explanation": "In languages where strings are immutable, res += 'a' copies res of length i every step: 1 + 2 + ... + N = O(N^2) total string copy operations."
  },
  {
    "id": "complexity-5",
    "topic": "Time/Space Complexity",
    "type": "MCQ",
    "question": "Which of the following complexity classes represents the fastest (most efficient) growth rate for large inputs?",
    "options": [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Constant time O(1) runs in the same amount of time regardless of input size N, making it the most efficient."
  }
]

/**
 * Get all quiz questions for a given topic (case-insensitive search / match).
 */
export function getQuizByTopic(topic: string): QuizQuestion[] {
  if (!topic) return [];
  const normalized = topic.trim().toLowerCase().replace(/[-_]/g, ' ');
  return quizQuestions.filter((q) => {
    const qTopic = q.topic.trim().toLowerCase().replace(/[-_]/g, ' ');
    return qTopic === normalized || qTopic.includes(normalized) || normalized.includes(qTopic);
  });
}

/**
 * Get a specified count of random quiz questions, optionally filtered by topic.
 */
export function getRandomQuiz(count: number, topic?: string): QuizQuestion[] {
  let pool = quizQuestions;
  if (topic && topic.trim().length > 0) {
    const topicFiltered = getQuizByTopic(topic);
    if (topicFiltered.length > 0) {
      pool = topicFiltered;
    }
  }

  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(Math.max(1, count), shuffled.length));
}
