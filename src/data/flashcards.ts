export type FlashcardCategory =
  | 'Definition'
  | 'Algorithm'
  | 'Complexity'
  | 'Formula'
  | 'Trick'
  | 'Concept';

export type FlashcardDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface Flashcard {
  id: string;
  topic: string;
  front: string;
  back: string;
  category: FlashcardCategory;
  difficulty: FlashcardDifficulty;
}

export const flashcards: Flashcard[] = [
  {
    "id": "arr-1",
    "topic": "Arrays",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "What is an Array and how is memory allocated for it?",
    "back": "An Array is a linear data structure that stores elements of the same data type in contiguous memory locations. Because memory is contiguous, any element can be accessed in O(1) constant time using its index: Address = Base_Address + Index * Element_Size."
  },
  {
    "id": "arr-2",
    "topic": "Arrays",
    "category": "Complexity",
    "difficulty": "Easy",
    "front": "What are the Time Complexities for basic Array operations?",
    "back": "\u2022 Access by Index: O(1)\n\u2022 Search (Unsorted): O(N)\n\u2022 Search (Sorted): O(log N) via Binary Search\n\u2022 Insertion / Deletion at End: Amortized O(1)\n\u2022 Insertion / Deletion at Beginning or Middle: O(N) due to element shifting."
  },
  {
    "id": "arr-3",
    "topic": "Arrays",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How does Kadane's Algorithm find the Maximum Subarray Sum?",
    "back": "Kadane's algorithm uses dynamic programming in O(N) time and O(1) space. At each index i, it updates `max_ending_here = max(nums[i], max_ending_here + nums[i])` and tracks global maximum `max_so_far = max(max_so_far, max_ending_here)`. If all numbers are negative, it returns the maximum single element."
  },
  {
    "id": "arr-4",
    "topic": "Arrays",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "Explain the Dutch National Flag Algorithm (3-way Partitioning).",
    "back": "Used to sort an array of 0s, 1s, and 2s in O(N) time and O(1) space using three pointers: `low` (boundary for 0s), `mid` (current element), and `high` (boundary for 2s). Swap nums[mid] with nums[low] if 0 (increment both), swap with nums[high] if 2 (decrement high), or advance mid if 1."
  },
  {
    "id": "arr-5",
    "topic": "Arrays",
    "category": "Trick",
    "difficulty": "Medium",
    "front": "How do you rotate an array of size N by K steps in O(N) time and O(1) space?",
    "back": "1. Normalize k: `k = k % N`.\n2. Reverse the entire array: `reverse(nums, 0, N - 1)`.\n3. Reverse the first k elements: `reverse(nums, 0, k - 1)`.\n4. Reverse the remaining N - k elements: `reverse(nums, k, N - 1)`."
  },
  {
    "id": "arr-6",
    "topic": "Arrays",
    "category": "Concept",
    "difficulty": "Easy",
    "front": "How does dynamic array capacity expansion work (e.g., std::vector or ArrayList)?",
    "back": "When a dynamic array exceeds its capacity, a new contiguous block with double (or 1.5x) the original capacity is allocated, existing elements are copied over, and the old memory is freed. The reallocation cost is amortized O(1) per push operation over time."
  },
  {
    "id": "str-1",
    "topic": "Strings",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "Why are Strings immutable in languages like Java/Python, and what are the implications?",
    "back": "Immutability means string instances cannot be altered after creation. Benefits include thread safety, security (for keys/URIs), and hashcode caching. Side effect: Concatenating strings in a loop creates new string objects each time, turning O(N) operations into O(N^2). Use StringBuilder / list joins to fix this."
  },
  {
    "id": "str-2",
    "topic": "Strings",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "What is the Knuth-Morris-Pratt (KMP) string matching algorithm and its time complexity?",
    "back": "KMP searches for occurrences of a pattern P of length M in a text T of length N in O(N + M) time. It avoids redundant comparisons by precomputing a Longest Prefix Suffix (LPS) array for P, which indicates how many characters can be skipped when a mismatch occurs."
  },
  {
    "id": "str-3",
    "topic": "Strings",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "How does the Rabin-Karp Algorithm perform pattern matching?",
    "back": "Rabin-Karp computes a rolling hash of pattern P (length M) and text substrings of length M. If hash values match, it performs a character-by-character check to guard against hash collisions. Average time complexity is O(N + M), with O(N * M) worst case."
  },
  {
    "id": "str-4",
    "topic": "Strings",
    "category": "Trick",
    "difficulty": "Medium",
    "front": "How do you find the Longest Palindromic Substring using Expand Around Center?",
    "back": "A palindrome mirrors around its center. There are 2N - 1 possible centers (N single characters for odd-length palindromes, N - 1 gaps between adjacent characters for even-length). Expand outward from each center while characters match. Time: O(N^2), Space: O(1)."
  },
  {
    "id": "str-5",
    "topic": "Strings",
    "category": "Concept",
    "difficulty": "Easy",
    "front": "How do you check if two strings are valid Anagrams in O(N) time?",
    "back": "If string lengths differ, return false. Count character frequencies using a fixed frequency array of size 26 (for lowercase English) or a Hash Map. Increment count for characters in string S and decrement for string T. Return true if all counts are zero."
  },
  {
    "id": "str-6",
    "topic": "Strings",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "What is the Z-Algorithm for pattern matching?",
    "back": "The Z-algorithm produces a Z-array where Z[i] is the length of the longest substring starting from string index i that is also a prefix of the string. By running it on string `P + '$' + T`, pattern matches occur where Z[i] == length(P). Runs in linear O(N + M) time."
  },
  {
    "id": "ll-1",
    "topic": "Linked Lists",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "Compare Singly Linked List and Doubly Linked List in terms of memory and operations.",
    "back": "Singly Linked List: Each node has data + `next` pointer (1 pointer overhead). Traversal is uni-directional.\nDoubly Linked List: Each node has data + `next` + `prev` pointers (2 pointer overhead). Allows bi-directional traversal and O(1) node deletion if the node pointer is known."
  },
  {
    "id": "ll-2",
    "topic": "Linked Lists",
    "category": "Algorithm",
    "difficulty": "Easy",
    "front": "Explain Floyd's Cycle Detection Algorithm (Tortoise and Hare).",
    "back": "Use two pointers: `slow` moving 1 step and `fast` moving 2 steps. If a cycle exists, `fast` will eventually meet `slow` inside the loop in O(N) time and O(1) space. To find the cycle start, reset `slow` to head and move both pointers 1 step at a time until they meet."
  },
  {
    "id": "ll-3",
    "topic": "Linked Lists",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do you reverse a Singly Linked List iteratively?",
    "back": "Maintain three pointers: `prev = null`, `curr = head`, `next = null`.\nWhile `curr` is not null: store `next = curr.next`, point `curr.next = prev`, shift `prev = curr`, shift `curr = next`. Finally, return `prev` as the new head. Time O(N), Space O(1)."
  },
  {
    "id": "ll-4",
    "topic": "Linked Lists",
    "category": "Trick",
    "difficulty": "Easy",
    "front": "How do you find the middle element of a Linked List in a single pass?",
    "back": "Use Fast & Slow pointers: initialize `slow = head` and `fast = head`. Advance `slow` by 1 step and `fast` by 2 steps in each iteration. When `fast` reaches null (or `fast.next` is null), `slow` points to the middle node."
  },
  {
    "id": "ll-5",
    "topic": "Linked Lists",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do you merge two sorted Linked Lists into a single sorted list?",
    "back": "Use a dummy node and a pointer `tail`. Compare nodes of list1 and list2; append the smaller node to `tail.next` and advance that list pointer and `tail`. Once one list empties, attach remaining nodes of the non-empty list to `tail.next`. Time O(N + M), Space O(1)."
  },
  {
    "id": "ll-6",
    "topic": "Linked Lists",
    "category": "Concept",
    "difficulty": "Hard",
    "front": "How do you implement an LRU Cache with O(1) get and put operations?",
    "back": "Combine a Hash Map with a Doubly Linked List (DLL).\n\u2022 Map stores `key -> Node pointer` for O(1) lookups.\n\u2022 DLL maintains usage order (Most Recently Used at head, Least Recently Used at tail).\n\u2022 `get`: Move accessed node to head.\n\u2022 `put`: Add node at head. If capacity exceeded, remove node from tail and delete key from map."
  },
  {
    "id": "tree-1",
    "topic": "Trees",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "What defines a Binary Search Tree (BST) and what is its main traversal property?",
    "back": "A BST is a binary tree where for every node: all keys in its left subtree are strictly smaller, and all keys in its right subtree are strictly larger. Key Property: An **Inorder Traversal** (Left, Root, Right) of a BST visits nodes in strictly ascending sorted order."
  },
  {
    "id": "tree-2",
    "topic": "Trees",
    "category": "Concept",
    "difficulty": "Easy",
    "front": "Explain Preorder, Inorder, and Postorder Tree Traversals.",
    "back": "\u2022 Preorder (Root, Left, Right): Useful for tree cloning / serialization.\n\u2022 Inorder (Left, Root, Right): Returns sorted sequence for BSTs.\n\u2022 Postorder (Left, Right, Root): Useful for tree deletion / bottom-up calculations (e.g., node height)."
  },
  {
    "id": "tree-3",
    "topic": "Trees",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "What is an AVL Tree and how does it maintain O(log N) balance?",
    "back": "An AVL tree is a self-balancing BST where the height difference (Balance Factor = height(Left) - height(Right)) of subtrees for any node is at most 1 (-1, 0, +1). Rebalancing is triggered during insertions/deletions using Single Rotations (LL, RR) or Double Rotations (LR, RL)."
  },
  {
    "id": "tree-4",
    "topic": "Trees",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do you find the Lowest Common Ancestor (LCA) of two nodes in a Binary Tree?",
    "back": "Recursive approach: If current node is null, p, or q, return current node. Recurse on left and right subtrees. If both recursive calls return non-null, current node is the LCA. If only one call returns non-null, return that non-null node. Time O(N), Space O(H)."
  },
  {
    "id": "tree-5",
    "topic": "Trees",
    "category": "Formula",
    "difficulty": "Medium",
    "front": "What is the Diameter of a Binary Tree and how is it calculated?",
    "back": "The Diameter is the length of the longest path between any two nodes in a tree (path may or may not pass through root). At any node, max path passing through it is `left_height + right_height`. Total diameter is the maximum path found across all nodes. Calculated in O(N) time."
  },
  {
    "id": "tree-6",
    "topic": "Trees",
    "category": "Concept",
    "difficulty": "Hard",
    "front": "What are the 4 fundamental invariants of a Red-Black Tree?",
    "back": "1. Every node is either Red or Black.\n2. The root is always Black.\n3. Every leaf (NULL node) is Black.\n4. No two Red nodes can be adjacent (a Red node cannot have a Red parent/child).\n5. Every simple path from a node to descendant NULL leaves contains the same number of Black nodes."
  },
  {
    "id": "graph-1",
    "topic": "Graphs",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "Compare Adjacency Matrix vs Adjacency List for Graph representation.",
    "back": "\u2022 Adjacency Matrix: V x V 2D array. Memory O(V^2). Edge lookup O(1). Best for dense graphs.\n\u2022 Adjacency List: Array of linked lists/vectors of length V. Memory O(V + E). Edge lookup O(degree). Best for sparse graphs."
  },
  {
    "id": "graph-2",
    "topic": "Graphs",
    "category": "Algorithm",
    "difficulty": "Easy",
    "front": "Compare Depth First Search (DFS) and Breadth First Search (BFS).",
    "back": "\u2022 BFS: Explores level by level using a Queue. Time O(V + E), Space O(V). Guaranteed to find shortest path in unweighted graphs.\n\u2022 DFS: Explores deep along branches using a Stack / Recursion. Time O(V + E), Space O(V). Excellent for pathfinding, topological sort, cycle detection."
  },
  {
    "id": "graph-3",
    "topic": "Graphs",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How does Dijkstra's Shortest Path Algorithm work?",
    "back": "Finds shortest path from single source to all vertices in weighted graphs with NON-NEGATIVE edges. Uses a Priority Queue (Min-Heap) to greedily pick vertex `u` with minimal distance, relaxes adjacent edges `(u, v, w)`: if `dist[u] + w < dist[v]`, update `dist[v]` and push to PQ. Time O((V + E) log V)."
  },
  {
    "id": "graph-4",
    "topic": "Graphs",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "What is Topological Sorting and when can it be applied?",
    "back": "Topological Sort produces a linear ordering of vertices such that for every directed edge u -> v, vertex u comes before v. Applies ONLY to Directed Acyclic Graphs (DAGs). Implementations: Kahn's Algorithm (BFS with in-degrees) or DFS post-order stack reversal. Time O(V + E)."
  },
  {
    "id": "graph-5",
    "topic": "Graphs",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "Compare Minimum Spanning Tree (MST) algorithms: Kruskal's vs Prim's.",
    "back": "\u2022 Kruskal's Algorithm: Sorts all edges by weight, adds edge to MST if it doesn't form a cycle using Disjoint Set Union (DSU). Best for sparse graphs, Time O(E log E).\n\u2022 Prim's Algorithm: Grows MST from a seed vertex by greedily adding lightest edge connecting tree to non-tree vertex using Min-Heap. Best for dense graphs, Time O(E log V)."
  },
  {
    "id": "graph-6",
    "topic": "Graphs",
    "category": "Trick",
    "difficulty": "Medium",
    "front": "How do you detect cycles in Directed vs Undirected graphs?",
    "back": "\u2022 Undirected Graph: DFS/BFS tracking parent node. Cycle exists if an adjacent visited vertex is NOT the parent.\n\u2022 Directed Graph: DFS tracking recursion call stack (`inStack` boolean array / 3-color states: Unvisited, Visiting, Visited). Cycle exists if back-edge to a node currently in `Visiting` state is found."
  },
  {
    "id": "dp-1",
    "topic": "Dynamic Programming",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "What two key properties must a problem have to be solved with Dynamic Programming?",
    "back": "1. **Overlapping Subproblems**: The recursive solution computes the exact same subproblems repeatedly.\n2. **Optimal Substructure**: An optimal solution to the problem can be constructed from optimal solutions of its subproblems."
  },
  {
    "id": "dp-2",
    "topic": "Dynamic Programming",
    "category": "Concept",
    "difficulty": "Easy",
    "front": "Compare Top-Down (Memoization) vs Bottom-Up (Tabulation) DP.",
    "back": "\u2022 Top-Down (Memoization): Recursive approach enhanced by storing computed results in a hash table or array. Easy to write, computes only required states, carries call-stack overhead.\n\u2022 Bottom-Up (Tabulation): Iterative approach starting from base cases, filling a table sequentially. Avoids call stack overflow and allows space optimizations."
  },
  {
    "id": "dp-3",
    "topic": "Dynamic Programming",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "State the DP Recurrence and Space Optimization for 0/1 Knapsack.",
    "back": "State: `dp[i][w]` = max value considering first `i` items with capacity `w`.\nRecurrence: `dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w - wt[i-1]])` if `wt[i-1] <= w`, else `dp[i-1][w]`.\nSpace Optimization: Can be reduced to 1D array `dp[w]` iterated BACKWARDS from capacity W down to weight `wt[i]`. Time O(N * W), Space O(W)."
  },
  {
    "id": "dp-4",
    "topic": "Dynamic Programming",
    "category": "Formula",
    "difficulty": "Medium",
    "front": "What is the Longest Common Subsequence (LCS) DP recurrence?",
    "back": "Given strings S1 (len M) and S2 (len N):\nIf `S1[i-1] == S2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]`\nElse: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`\nBase cases: `dp[0][j] = dp[i][0] = 0`. Time O(M * N), Space O(M * N) (optimizable to O(min(M,N)))."
  },
  {
    "id": "dp-5",
    "topic": "Dynamic Programming",
    "category": "Trick",
    "difficulty": "Hard",
    "front": "How can Longest Increasing Subsequence (LIS) be solved in O(N log N) time?",
    "back": "Maintain an array `tails` where `tails[k]` stores the smallest tail of all increasing subsequences of length `k+1`. For each x in nums: binary search (std::lower_bound) for x in `tails`. If x is larger than all elements, append x. Otherwise replace first element >= x with x. Length of `tails` array is LIS."
  },
  {
    "id": "dp-6",
    "topic": "Dynamic Programming",
    "category": "Concept",
    "difficulty": "Hard",
    "front": "What is the Interval DP pattern and Matrix Chain Multiplication strategy?",
    "back": "Interval DP solves problems on contiguous ranges `[i, j]`. Iterate over interval lengths from 1 to N, then pick start point `i`, end point `j = i + len - 1`, and iterate split point `k` from `i` to `j-1`. Recurrence: `dp[i][j] = min_{k}(dp[i][k] + dp[k+1][j] + cost)`. Time complexity is typically O(N^3)."
  },
  {
    "id": "sort-1",
    "topic": "Sorting",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "Explain QuickSort partition logic and its best, average, and worst-case time complexities.",
    "back": "QuickSort picks a pivot, partitions elements into `< pivot` and `> pivot`, and recursively sorts sub-arrays.\n\u2022 Best / Avg Time: O(N log N) when pivot divides array evenly.\n\u2022 Worst Time: O(N^2) when array is already sorted and first/last element is picked as pivot.\n\u2022 Space: O(log N) auxiliary call stack space (Randomized pivot avoids worst-case in practice)."
  },
  {
    "id": "sort-2",
    "topic": "Sorting",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How does MergeSort work and what are its time/space bounds?",
    "back": "MergeSort is a stable divide-and-conquer algorithm. It recursively splits the array into two halves, sorts each half, and merges the sorted halves using O(N) temporary space.\n\u2022 Time Complexity: O(N log N) across Best, Average, and Worst cases.\n\u2022 Space Complexity: O(N) auxiliary space."
  },
  {
    "id": "sort-3",
    "topic": "Sorting",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "Explain HeapSort: steps, stability, and time/space complexity.",
    "back": "1. Build Max-Heap from input array: O(N).\n2. Repeatedly swap root (max) with last array element, decrease heap size, and call heapify down on root: O(N log N).\n\u2022 Time Complexity: O(N log N) in all cases.\n\u2022 Auxiliary Space: O(1) in-place.\n\u2022 Stability: Unstable sorting algorithm."
  },
  {
    "id": "sort-4",
    "topic": "Sorting",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do non-comparison sorting algorithms like Counting Sort and Radix Sort achieve O(N) time?",
    "back": "They do not compare elements directly.\n\u2022 Counting Sort counts element frequencies in range [0, K], computing prefix sums to place items. Time O(N + K), Space O(N + K).\n\u2022 Radix Sort sorts digit-by-digit from LSD to MSD using a stable sort (Counting Sort). Time O(d * (N + K)), where d is max digits."
  },
  {
    "id": "sort-5",
    "topic": "Sorting",
    "category": "Concept",
    "difficulty": "Easy",
    "front": "What does Stability in a sorting algorithm mean and why is it useful?",
    "back": "A sorting algorithm is Stable if elements with equal keys maintain their relative original order after sorting.\nCrucial when sorting objects by multiple criteria (e.g., sorting student records first by name, then by grade level without destroying name order)."
  },
  {
    "id": "sort-6",
    "topic": "Sorting",
    "category": "Formula",
    "difficulty": "Hard",
    "front": "Why is \u03a9(N log N) the lower bound for comparison-based sorting algorithms?",
    "back": "Any comparison sort can be modeled as a decision tree with N! leaves (all possible permutations). A binary tree with N! leaves must have height at least `log2(N!)`. By Stirling's Approximation, `log2(N!) \u2248 N log2(N) - N log2(e) = \u03a9(N log N)`. Thus, no comparison sort can run faster than O(N log N) in worst case."
  },
  {
    "id": "search-1",
    "topic": "Searching",
    "category": "Algorithm",
    "difficulty": "Easy",
    "front": "How does standard Binary Search work on a sorted array?",
    "back": "Initialize `low = 0`, `high = n - 1`. While `low <= high`: compute `mid = low + (high - low) / 2`. If `arr[mid] == target`, return `mid`. If `arr[mid] < target`, set `low = mid + 1`. Otherwise set `high = mid - 1`. Time: O(log N), Space: O(1)."
  },
  {
    "id": "search-2",
    "topic": "Searching",
    "category": "Trick",
    "difficulty": "Medium",
    "front": "What is 'Binary Search on Answer Space' and how do you identify it?",
    "back": "Used when searching directly for an optimal value X in a monotonic search space where a condition `check(X)` evaluates to boolean `[true, true, ..., false, false]`. Identify it when problem asks for 'Minimize maximum X' or 'Maximize minimum X' with clear bounds `[low, high]`."
  },
  {
    "id": "search-3",
    "topic": "Searching",
    "category": "Algorithm",
    "difficulty": "Easy",
    "front": "Explain Lower Bound and Upper Bound operations in Binary Search.",
    "back": "\u2022 Lower Bound: Finds the index of the FIRST element that is >= target.\n\u2022 Upper Bound: Finds the index of the FIRST element that is > target.\n\u2022 Equal range / target frequency = `upper_bound - lower_bound`. Both run in O(log N) time."
  },
  {
    "id": "search-4",
    "topic": "Searching",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "What is Exponential Search and when is it preferred over Binary Search?",
    "back": "Exponential Search finds range `[2^(k-1), 2^k]` containing target by doubling index step (1, 2, 4, 8...), then performs Binary Search within that range. Runs in O(log i) time, where i is target index. Ideal for unbounded/infinite arrays or when target is close to array start."
  },
  {
    "id": "search-5",
    "topic": "Searching",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "What is Ternary Search and when is it used?",
    "back": "Ternary Search divides the search space into 3 equal parts using 2 midpoints `m1` and `m2`. Used to find the peak / extremum of unimodal functions (strictly increasing then strictly decreasing). Recurrence: `T(N) = T(2N/3) + O(1)`, leading to O(log3 N) time complexity."
  },
  {
    "id": "search-6",
    "topic": "Searching",
    "category": "Complexity",
    "difficulty": "Medium",
    "front": "How does Interpolation Search achieve O(log log N) time on uniformly distributed data?",
    "back": "Interpolation search estimates target location like searching a phonebook using formula: `pos = low + ((target - arr[low]) * (high - low) / (arr[high] - arr[low]))`. Time is O(log log N) for uniformly distributed data, but degrades to O(N) if distribution is skewed."
  },
  {
    "id": "hash-1",
    "topic": "Hashing",
    "category": "Concept",
    "difficulty": "Easy",
    "front": "What is a Hash Function and Hash Collision?",
    "back": "A Hash Function maps data of arbitrary size to fixed-size integer values (hash keys) used as array indices. A Hash Collision occurs when two distinct keys yield the exact same hash output: `hash(k1) == hash(k2)` where `k1 != k2`."
  },
  {
    "id": "hash-2",
    "topic": "Hashing",
    "category": "Definition",
    "difficulty": "Medium",
    "front": "Compare Collision Resolution: Separate Chaining vs Open Addressing.",
    "back": "\u2022 Separate Chaining: Each bucket holds a linked list/tree of colliding entries. Degrades to O(N) if poor hash function, easily resizes, handles high load factors.\n\u2022 Open Addressing: Stores all entries inside the array itself. Resolves collisions probing next slots (Linear Probing, Quadratic Probing, Double Hashing). Requires low load factor (< 0.7)."
  },
  {
    "id": "hash-3",
    "topic": "Hashing",
    "category": "Formula",
    "difficulty": "Easy",
    "front": "What is the Load Factor of a Hash Table and how does it trigger dynamic resizing?",
    "back": "Load Factor \u03b1 = `N / M` (Number of stored entries N / Number of buckets M). When \u03b1 exceeds a threshold (typically 0.75), table capacity M is doubled and all entries are re-hashed. Re-hashing takes O(N) time but ensures lookup remains amortized O(1)."
  },
  {
    "id": "hash-4",
    "topic": "Hashing",
    "category": "Trick",
    "difficulty": "Easy",
    "front": "How do you solve Two Sum in O(N) time using Hashing?",
    "back": "Iterate through array while maintaining a map `val -> index`.\nFor each element `nums[i]`, compute `complement = target - nums[i]`.\nIf `complement` exists in map, return indices `[map.get(complement), i]`. Otherwise store `map[nums[i]] = i`."
  },
  {
    "id": "hash-5",
    "topic": "Hashing",
    "category": "Concept",
    "difficulty": "Hard",
    "front": "What is Consistent Hashing and why is it used in distributed caches?",
    "back": "Consistent Hashing maps both servers and keys onto a virtual 360\u00b0 hash ring. When a cache server is added or removed, only `1/k` fraction of keys need to be remapped (where k is total servers), preventing massive cache miss storms standard modulo `hash(key) % N` would cause."
  },
  {
    "id": "hash-6",
    "topic": "Hashing",
    "category": "Concept",
    "difficulty": "Hard",
    "front": "What is a Bloom Filter and what are its guarantees?",
    "back": "A Bloom Filter is a space-efficient probabilistic data structure using a bit array and k independent hash functions to check set membership.\nGuarantees: No False Negatives (if it returns false, element is definitely NOT in set). Might have False Positives (if true, element PROBABLY in set). Does NOT support deletions."
  },
  {
    "id": "rec-1",
    "topic": "Recursion",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "What are the two mandatory components of every Recursive Function?",
    "back": "1. **Base Case**: Condition under which recursion terminates without making further recursive calls, preventing infinite loops and stack overflow.\n2. **Recursive Step**: Reduces problem into smaller subproblems and calls itself until base case is met."
  },
  {
    "id": "rec-2",
    "topic": "Recursion",
    "category": "Concept",
    "difficulty": "Medium",
    "front": "What is Call Stack overhead and Stack Overflow error in recursion?",
    "back": "Each recursive call allocates a stack frame storing local variables, parameters, and return address on the system call stack. If recursion depth is too deep (lacks base case or N is large), system memory allocated for stack space exhausts, causing Stack Overflow (typically ~10,000 frames in JS/Python)."
  },
  {
    "id": "rec-3",
    "topic": "Recursion",
    "category": "Trick",
    "difficulty": "Medium",
    "front": "What is Tail Call Optimization (TCO)?",
    "back": "A recursive call is a Tail Call if it is the absolute final statement executed before function return. Tail Call Optimization enables compilers/interpreters to reuse current stack frame instead of creating a new one, reducing stack space complexity from O(N) to O(1)."
  },
  {
    "id": "rec-4",
    "topic": "Recursion",
    "category": "Formula",
    "difficulty": "Medium",
    "front": "State the Recurrence relation and Solution for Tower of Hanoi.",
    "back": "Recurrence: `T(N) = 2 * T(N - 1) + 1` with base case `T(1) = 1`.\nClosed-form Solution: `T(N) = 2^N - 1` operations.\nMinimum moves required for 3 pegs and N disks grows exponentially in O(2^N) time and O(N) call stack space."
  },
  {
    "id": "rec-5",
    "topic": "Recursion",
    "category": "Formula",
    "difficulty": "Hard",
    "front": "State the Master Theorem formula for Divide and Conquer recurrences.",
    "back": "For recurrence `T(N) = a * T(N / b) + O(N^d)` where a >= 1, b > 1:\n1. If `d < log_b(a)`: `T(N) = O(N^(log_b a))`\n2. If `d == log_b(a)`: `T(N) = O(N^d * log N)`\n3. If `d > log_b(a)`: `T(N) = O(N^d)`"
  },
  {
    "id": "bt-1",
    "topic": "Backtracking",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "What is Backtracking and what is the standard state pattern?",
    "back": "Backtracking is an algorithmic paradigm that searches for solutions by incrementally building candidates and abandoning ('backtracking') a candidate as soon as it determines candidate cannot lead to valid solution. Pattern:\n`1. Choose option` -> `2. Recurse` -> `3. Unchoose (undo state changes)`."
  },
  {
    "id": "bt-2",
    "topic": "Backtracking",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "How do you solve N-Queens using Backtracking with O(1) conflict validation?",
    "back": "Place queens column by column. Validate placement in O(1) time using 3 boolean lookup sets:\n\u2022 `cols[c]` for column conflicts.\n\u2022 `diag1[row - col]` for main diagonals.\n\u2022 `diag2[row + col]` for anti-diagonals.\nIf valid, mark set elements, recurse to next row, and unmark on backtrack."
  },
  {
    "id": "bt-3",
    "topic": "Backtracking",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "Explain the Sudoku Solver backtracking algorithm.",
    "back": "Iterate through cells (0..81). For empty cell '.', try digits '1' through '9'. Check if digit is valid in current row, column, and 3x3 subgrid. If valid, place digit and recursively call solver for remaining grid. If recursion fails, reset cell to '.' and try next digit."
  },
  {
    "id": "bt-4",
    "topic": "Backtracking",
    "category": "Concept",
    "difficulty": "Medium",
    "front": "How do you generate all Subsets (Power Set) using Backtracking?",
    "back": "At each index i from 0 to N-1, make a 2-way choice:\n1. Include `nums[i]` in current subset, recurse on `i + 1`, then pop `nums[i]`.\n2. Exclude `nums[i]` and recurse on `i + 1`.\nGenerates total 2^N subsets in O(N * 2^N) time complexity."
  },
  {
    "id": "bt-5",
    "topic": "Backtracking",
    "category": "Trick",
    "difficulty": "Medium",
    "front": "How do you generate Permutations vs Combinations with Backtracking?",
    "back": "\u2022 Permutations: Order matters! Pass a `visited` boolean array / swap elements in place. Loop from `index 0 to N-1` in every recursive frame.\n\u2022 Combinations: Order does not matter! Pass a `startIndex` parameter and loop from `startIndex to N-1` to avoid duplicates."
  },
  {
    "id": "bit-1",
    "topic": "Bit Manipulation",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "List the basic bitwise operators and their truth tables.",
    "back": "\u2022 AND (`&`): 1 if both bits are 1.\n\u2022 OR (`|`): 1 if at least one bit is 1.\n\u2022 XOR (`^`): 1 if bits are DIFFERENT (1^1=0, 0^0=0, 1^0=1).\n\u2022 NOT (`~`): Inverts all bits (0 -> 1, 1 -> 0).\n\u2022 Left Shift (`<<`): Multiply by 2^k.\n\u2022 Right Shift (`>>`): Divide by 2^k."
  },
  {
    "id": "bit-2",
    "topic": "Bit Manipulation",
    "category": "Trick",
    "difficulty": "Easy",
    "front": "How does Brian Kernighan's Algorithm count set bits in an integer?",
    "back": "Expression `n = n & (n - 1)` clears the lowest set bit (rightmost 1) of `n` in O(1) time. Repeatedly apply this in a while loop (`n > 0`) incrementing a counter. Runs in O(number of set bits), faster than checking all 32 bits."
  },
  {
    "id": "bit-3",
    "topic": "Bit Manipulation",
    "category": "Formula",
    "difficulty": "Easy",
    "front": "How do you check if an integer N is a power of 2 using bit tricks?",
    "back": "Condition: `N > 0 && (N & (N - 1)) == 0`.\nExplanation: A power of 2 has exactly ONE set bit (e.g., 8 = 1000_2). Subtracting 1 flips that set bit and all 0s after it (8 - 1 = 7 = 0111_2). Bitwise AND yields 0."
  },
  {
    "id": "bit-4",
    "topic": "Bit Manipulation",
    "category": "Trick",
    "difficulty": "Easy",
    "front": "How do you find the single non-repeating element when every other element appears twice?",
    "back": "XOR all array elements together. Properties of XOR:\n1. `a ^ a = 0` (cancels paired elements)\n2. `a ^ 0 = a` (leaves single element)\n3. Commutative and Associative.\nResult of XORing all numbers in array is the single unique element in O(N) time and O(1) space."
  },
  {
    "id": "bit-5",
    "topic": "Bit Manipulation",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do you generate all 2^N subsets using Bitmasking?",
    "back": "Iterate bitmask `i` from 0 to `(1 << N) - 1` (total 2^N masks).\nFor each mask `i`, check bit `j` (0 to N-1) using `(i & (1 << j)) != 0`. If true, include `nums[j]` in current subset. Takes O(N * 2^N) time and O(1) auxiliary space."
  },
  {
    "id": "bit-6",
    "topic": "Bit Manipulation",
    "category": "Trick",
    "difficulty": "Easy",
    "front": "How do you swap two variables A and B without using extra memory?",
    "back": "`A = A ^ B;` \n`B = A ^ B;`  // B becomes original A \n`A = A ^ B;`  // A becomes original B\nNote: Fails if A and B refer to the exact same memory location!"
  },
  {
    "id": "greedy-1",
    "topic": "Greedy",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "What is a Greedy Algorithm and when does it guarantee an optimal solution?",
    "back": "A Greedy algorithm makes the locally optimal choice at each step hoping it leads to global optimum. Guaranteed optimal ONLY IF problem satisfies:\n1. **Greedy Choice Property**: Locally optimal choice leads to global solution without backtracking.\n2. **Optimal Substructure**: Optimal solution contains optimal sub-solutions."
  },
  {
    "id": "greedy-2",
    "topic": "Greedy",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do Fractional Knapsack and 0/1 Knapsack differ in solution strategy?",
    "back": "\u2022 Fractional Knapsack: Can break items into fractions. Solved using GREEDY by sorting items by `value / weight` ratio in O(N log N) time.\n\u2022 0/1 Knapsack: Items cannot be broken. Greedy FAILS; must use DYNAMIC PROGRAMMING in O(N * W) time."
  },
  {
    "id": "greedy-3",
    "topic": "Greedy",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do you solve the Activity Selection / Interval Scheduling problem?",
    "back": "Sort activities by FINISH TIME in ascending order. Select first activity. For subsequent activities, pick activity if its start time >= finish time of last selected activity. Greedily leaving maximum remaining room for future activities maximizes total count. Time O(N log N)."
  },
  {
    "id": "greedy-4",
    "topic": "Greedy",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "Explain Huffman Coding algorithm for data compression.",
    "back": "Greedy prefix coding technique.\n1. Count character frequencies.\n2. Put frequencies into Min-Heap.\n3. Repeatedly pop 2 lowest frequency nodes, create parent node with sum frequency, push parent back into heap.\n4. Resulting binary tree assigns shorter variable-length bit codes to frequent characters."
  },
  {
    "id": "greedy-5",
    "topic": "Greedy",
    "category": "Concept",
    "difficulty": "Medium",
    "front": "Why is Dijkstra's algorithm considered a Greedy Algorithm?",
    "back": "At each step, Dijkstra greedily picks the unvisited node with smallest tentatively known distance from source, locks in its distance permanently (claiming no shorter path to it exists assuming positive edge weights), and relaxes its neighbors."
  },
  {
    "id": "stack-1",
    "topic": "Stack",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "What is the LIFO principle and primary Stack operations?",
    "back": "Stack follows Last-In, First-Out (LIFO) order.\n\u2022 `push(x)`: Insert element at top - O(1)\n\u2022 `pop()`: Remove top element - O(1)\n\u2022 `peek()` / `top()`: View top element without removing - O(1)\n\u2022 `isEmpty()`: Check if empty - O(1)."
  },
  {
    "id": "stack-2",
    "topic": "Stack",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "What is a Monotonic Stack and how is it used for 'Next Greater Element'?",
    "back": "A Monotonic Stack keeps elements in strictly increasing or decreasing order.\nTo find Next Greater Element: Traverse array right to left (or left to right maintaining indices). Pop stack while `stack.top() <= nums[i]`. Top of stack is now Next Greater Element. Push `nums[i]` onto stack. Runs in O(N) total time."
  },
  {
    "id": "stack-3",
    "topic": "Stack",
    "category": "Algorithm",
    "difficulty": "Easy",
    "front": "How do you validate balanced parentheses using a Stack?",
    "back": "Iterate through string characters:\n\u2022 If opening bracket (`(`, `{`, `[`), push corresponding closing bracket onto stack.\n\u2022 If closing bracket, pop from stack. Return false if stack is empty or popped character doesn't match current character.\n\u2022 After string traversal, return true if stack is empty."
  },
  {
    "id": "stack-4",
    "topic": "Stack",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "What is the Shunting-Yard Algorithm?",
    "back": "Dijkstra's Shunting-yard algorithm converts Infix expressions (e.g. `3 + 4 * 2`) to Postfix/Reverse Polish Notation (`3 4 2 * +`) using an operator stack and output queue based on operator precedence and associativity rules in O(N) time."
  },
  {
    "id": "stack-5",
    "topic": "Stack",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do you evaluate a Reverse Polish Notation (Postfix) expression using Stack?",
    "back": "Iterate tokens: If token is a number, push to stack. If token is an operator (`+`, `-`, `*`, `/`), pop two top numbers `b` (second operand) and `a` (first operand), evaluate `a operator b`, and push result back onto stack. Final answer remains on stack."
  },
  {
    "id": "queue-1",
    "topic": "Queue",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "What is the FIFO principle and primary Queue operations?",
    "back": "Queue follows First-In, First-Out (FIFO) order.\n\u2022 `enqueue(x)` / `offer(x)`: Add element to rear - O(1)\n\u2022 `dequeue()` / `poll()`: Remove element from front - O(1)\n\u2022 `peek()` / `front()`: Inspect front element - O(1)."
  },
  {
    "id": "queue-2",
    "topic": "Queue",
    "category": "Concept",
    "difficulty": "Medium",
    "front": "How is a Circular Queue implemented using a fixed-size array?",
    "back": "Uses pointers `front` and `rear` with capacity `N`.\n\u2022 Advance pointers using modulo arithmetic: `rear = (rear + 1) % N` and `front = (front + 1) % N`.\n\u2022 Full condition: `(rear + 1) % N == front`.\n\u2022 Empty condition: `front == -1`."
  },
  {
    "id": "queue-3",
    "topic": "Queue",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "What is a Monotonic Deque and how is it used in Sliding Window Maximum?",
    "back": "A Double-Ended Queue (Deque) storing indices in monotonic decreasing order of values.\nFor each element `nums[i]`:\n1. Remove elements from back of deque while `nums[deque.back()] <= nums[i]`.\n2. Push `i` to back.\n3. Remove front of deque if it fell out of current window (`deque.front() <= i - k`).\nFront of deque is window maximum in O(N) total time."
  },
  {
    "id": "queue-4",
    "topic": "Queue",
    "category": "Trick",
    "difficulty": "Medium",
    "front": "How do you implement a Queue using two Stacks?",
    "back": "Maintain `instack` and `outstack`.\n\u2022 `enqueue(x)`: Push `x` to `instack` - O(1).\n\u2022 `dequeue()`: If `outstack` is empty, pop all elements from `instack` and push to `outstack` (reversing order). Pop top of `outstack`. Amortized O(1) time."
  },
  {
    "id": "queue-5",
    "topic": "Queue",
    "category": "Concept",
    "difficulty": "Easy",
    "front": "Why is a Queue the standard data structure for Breadth-First Search (BFS)?",
    "back": "Queue's FIFO property guarantees vertices are processed strictly in increasing order of their distance from start node. All vertices at distance `d` are processed before any vertex at distance `d + 1`."
  },
  {
    "id": "heap-1",
    "topic": "Heap",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "What is a Binary Heap and how is it stored in an Array?",
    "back": "A Binary Heap is a complete binary tree where every node satisfies Heap Property (Min-Heap: `parent <= children`, Max-Heap: `parent >= children`).\nStored compactly in array with 0-based indexing:\n\u2022 Parent of `i`: `(i - 1) / 2`\n\u2022 Left Child: `2 * i + 1`\n\u2022 Right Child: `2 * i + 2`."
  },
  {
    "id": "heap-2",
    "topic": "Heap",
    "category": "Complexity",
    "difficulty": "Medium",
    "front": "What is the time complexity of building a heap from an array (`buildHeap`)?",
    "back": "Time Complexity: **O(N)** (NOT O(N log N)).\nBy calling `heapifyDown` starting from the last non-leaf node `(N/2 - 1)` up to root `0`, majority of nodes lie near leaf level requiring few comparisons. Mathematically bounded by sum `N * \\sum (h / 2^h) = O(N)`."
  },
  {
    "id": "heap-3",
    "topic": "Heap",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do you find Top K Frequent Elements or Kth Largest Element using Heap?",
    "back": "\u2022 Kth Largest Element: Use a **Min-Heap** of size K. Iterate array elements, push to heap. If heap size > K, pop minimum. Top of Min-Heap holds Kth largest element in O(N log K) time.\n\u2022 Top K Frequent Elements: Count frequencies using Hash Map, then insert into Min-Heap of size K based on frequency."
  },
  {
    "id": "heap-4",
    "topic": "Heap",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "How do you find Median in a Data Stream using Two Heaps?",
    "back": "Maintain two heaps:\n1. `maxHeap` for lower half of numbers.\n2. `minHeap` for upper half of numbers.\nInvariants: `maxHeap.size()` equal to or 1 greater than `minHeap.size()`, and `maxHeap.top() <= minHeap.top()`.\n\u2022 `addNum`: O(log N) time.\n\u2022 `findMedian`: O(1) time (top of maxHeap if odd, average of tops if even)."
  },
  {
    "id": "heap-5",
    "topic": "Heap",
    "category": "Complexity",
    "difficulty": "Easy",
    "front": "What are the Time Complexities for standard Heap operations?",
    "back": "\u2022 `insert`: O(log N) via heapify up\n\u2022 `getMin` / `getMax`: O(1)\n\u2022 `extractMin` / `extractMax`: O(log N) via heapify down\n\u2022 `buildHeap`: O(N)\n\u2022 Space: O(N) storing array."
  },
  {
    "id": "trie-1",
    "topic": "Trie",
    "category": "Definition",
    "difficulty": "Medium",
    "front": "What is a Trie (Prefix Tree) and how is each node structured?",
    "back": "A Trie is a tree data structure used for efficient prefix matching and retrieval of keys/strings.\nNode structure:\n\u2022 `children`: HashMap or fixed array of size 26 (pointing to child nodes).\n\u2022 `isEndOfWord`: Boolean flag indicating if node marks the completion of a valid word."
  },
  {
    "id": "trie-2",
    "topic": "Trie",
    "category": "Complexity",
    "difficulty": "Easy",
    "front": "What are the Time and Space Complexities for Trie operations?",
    "back": "For a word of length L:\n\u2022 `insert(word)`: O(L) time\n\u2022 `search(word)`: O(L) time\n\u2022 `startsWith(prefix)`: O(L) time\n\u2022 Space Complexity: O(N * L * ALPHABET_SIZE) where N is number of inserted words."
  },
  {
    "id": "trie-3",
    "topic": "Trie",
    "category": "Concept",
    "difficulty": "Medium",
    "front": "Why use Trie instead of Hash Map for Autocomplete / Prefix Search?",
    "back": "While Hash Map checks exact string match in average O(L) time, it cannot efficiently perform prefix searches like 'find all words starting with 'app''. A Trie shares common prefixes among words, allowing prefix lookups and finding all prefix-matching suggestions in O(L + output_size) time."
  },
  {
    "id": "trie-4",
    "topic": "Trie",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "How do you solve Word Search II (Grid Word Search) using Trie + Backtracking?",
    "back": "1. Build Trie from word dictionary.\n2. Run DFS backtracking from each grid cell `(r, c)`.\n3. Traverse Trie along with grid step. If Trie path doesn't exist, prune search branch immediately.\n4. If `node.isEndOfWord` is true, collect word and set flag to false to prevent duplicate results. Pruning greatly improves performance over plain DFS."
  },
  {
    "id": "trie-5",
    "topic": "Trie",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "How do Bitwise Tries find Maximum XOR Pair in an array?",
    "back": "Represent 32-bit integers as binary strings in a Bitwise Trie (branching on 0 or 1 bits from MSB to LSB).\nFor each number X, traverse Trie greedily picking opposite bit (`1 - bit`) if child exists to maximize bitwise XOR result. Runs in O(N * 32) = O(N) time."
  },
  {
    "id": "tp-1",
    "topic": "Two Pointers",
    "category": "Concept",
    "difficulty": "Easy",
    "front": "What is the Two Pointers technique and when should it be applied?",
    "back": "Uses two index pointers moving through a linear data structure (Array/String) in synchronized fashion.\nPatterns:\n1. **Opposite Ends**: `left = 0`, `right = n - 1` moving toward center (Sorted arrays, palindrome check, container water).\n2. **Same Direction**: Fast/Slow or Read/Write pointers (detecting cycles, in-place array modification)."
  },
  {
    "id": "tp-2",
    "topic": "Two Pointers",
    "category": "Algorithm",
    "difficulty": "Easy",
    "front": "How do you solve Two Sum II (Sorted Array) using Two Pointers?",
    "back": "Initialize `left = 0`, `right = arr.length - 1`.\nWhile `left < right`:\n\u2022 Calculate `sum = arr[left] + arr[right]`.\n\u2022 If `sum == target`, return indices.\n\u2022 If `sum < target`, increment `left++` (to increase sum).\n\u2022 If `sum > target`, decrement `right--` (to decrease sum). Time O(N), Space O(1)."
  },
  {
    "id": "tp-3",
    "topic": "Two Pointers",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "Explain Container With Most Water algorithm.",
    "back": "Pointers `left = 0`, `right = n - 1`. Track `maxArea = 0`.\nAt each step: `area = min(height[left], height[right]) * (right - left)`. Update `maxArea`. Shift pointer pointing to smaller height inward (since width decreases, keeping smaller height guarantees area cannot increase). Time O(N), Space O(1)."
  },
  {
    "id": "tp-4",
    "topic": "Two Pointers",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "How do you solve Trapping Rain Water in O(N) time and O(1) space?",
    "back": "Initialize `left = 0`, `right = n - 1`, `leftMax = 0`, `rightMax = 0`.\nWhile `left < right`:\n\u2022 If `height[left] <= height[right]`:\n  - If `height[left] >= leftMax`: update `leftMax = height[left]`.\n  - Else: add `leftMax - height[left]` to total water.\n  - `left++`.\n\u2022 Else do symmetrical logic for `right` pointer. Time O(N), Space O(1)."
  },
  {
    "id": "tp-5",
    "topic": "Two Pointers",
    "category": "Trick",
    "difficulty": "Easy",
    "front": "How do you remove duplicates from a sorted array in-place?",
    "back": "Maintain slow write pointer `i = 0`. Iterate fast pointer `j = 1` through N-1.\nIf `nums[j] != nums[i]`, increment `i++` and set `nums[i] = nums[j]`.\nReturn `i + 1` as the new length of distinct elements in O(N) time and O(1) space."
  },
  {
    "id": "sw-1",
    "topic": "Sliding Window",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "What is the Sliding Window pattern and what are its two variants?",
    "back": "Sliding Window converts nested loops O(N^2) over contiguous subarrays/substrings into single pass O(N) by sliding a window `[L, R]`.\nVariants:\n1. **Fixed Size K**: Window size constant. Slide by incrementing both L and R.\n2. **Variable Size**: Dynamically expand R to satisfy condition, then contract L to optimize."
  },
  {
    "id": "sw-2",
    "topic": "Sliding Window",
    "category": "Algorithm",
    "difficulty": "Easy",
    "front": "How do you find Maximum Sum Subarray of Fixed Size K?",
    "back": "1. Compute sum of first K elements: `windowSum`.\n2. Slide window from `i = K` to `N - 1`:\n   `windowSum += nums[i] - nums[i - K]`.\n3. Track maximum `windowSum` seen. Time O(N), Space O(1)."
  },
  {
    "id": "sw-3",
    "topic": "Sliding Window",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do you solve Longest Substring Without Repeating Characters?",
    "back": "Use variable window `[L, R]` and Hash Map/Set tracking character positions.\nExpand `R`: If `s[R]` already present in set/map at index >= `L`, move `L = last_seen[s[R]] + 1`. Update `last_seen[s[R]] = R` and update `maxLen = max(maxLen, R - L + 1)`. Time O(N), Space O(min(N, M))."
  },
  {
    "id": "sw-4",
    "topic": "Sliding Window",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "Explain Minimum Window Substring algorithm.",
    "back": "Given string S and target T:\n1. Count character frequencies of T in map `targetCount`, track `requiredMatches = targetCount.size`.\n2. Expand right pointer `R`. If character satisfies frequency requirement, increment `formedMatches`.\n3. While `formedMatches == requiredMatches`, update min window candidate, then shrink left pointer `L` to find minimum valid window. Time O(|S| + |T|)."
  },
  {
    "id": "sw-5",
    "topic": "Sliding Window",
    "category": "Trick",
    "difficulty": "Medium",
    "front": "How do you handle 'Exact K' subarray counting using Sliding Window?",
    "back": "Calculating exact condition `AtExact(K)` directly with sliding window can be tricky. Use the identity:\n`Exact(K) = AtMost(K) - AtMost(K - 1)`.\nSince `AtMost(K)` is monotonically helper-friendly for sliding window, solving twice yields exact count in O(N) time."
  },
  {
    "id": "pref-1",
    "topic": "Prefix Sum",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "What is a 1D Prefix Sum Array and how is range sum computed in O(1) time?",
    "back": "A Prefix Sum array `P` stores cumulative sums: `P[i] = nums[0] + nums[1] + ... + nums[i-1]` with `P[0] = 0`.\nRange sum query `sum(L, R)` from index L to R inclusive is computed in O(1) time as:\n`sum(L, R) = P[R + 1] - P[L]`."
  },
  {
    "id": "pref-2",
    "topic": "Prefix Sum",
    "category": "Formula",
    "difficulty": "Medium",
    "front": "How do you compute 2D Submatrix Range Sum Query in O(1) time?",
    "back": "Precompute 2D prefix table `P[r][c]` (sum of rectangle from (0,0) to (r-1,c-1)).\nFor submatrix from `(r1, c1)` to `(r2, c2)`:\n`Sum = P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]`\nUses Principle of Inclusion-Exclusion."
  },
  {
    "id": "pref-3",
    "topic": "Prefix Sum",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do you count Subarrays with Sum Equals K in O(N) time?",
    "back": "Maintain running `prefixSum` and a Hash Map storing `prefixSum -> frequency` initialized with `{0: 1}`.\nFor each element `x`:\n1. `prefixSum += x`.\n2. If `(prefixSum - K)` exists in map, add its frequency to total count.\n3. Increment frequency of `prefixSum` in map."
  },
  {
    "id": "pref-4",
    "topic": "Prefix Sum",
    "category": "Trick",
    "difficulty": "Medium",
    "front": "What is the Difference Array technique for multiple Range Update operations?",
    "back": "Given array and multiple update queries 'Add V to range [L, R]':\nCreate difference array `D` where `D[i] = A[i] - A[i-1]`.\nFor query `[L, R, V]`: perform `D[L] += V` and `D[R + 1] -= V` in O(1) time.\nFinally, compute prefix sum of `D` to recover final array values in O(N) total time."
  },
  {
    "id": "pref-5",
    "topic": "Prefix Sum",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "How do you compute Product of Array Except Self without division in O(N) time and O(1) auxiliary space?",
    "back": "1. Fill output array `res` with prefix products from left to right (`res[i] = prefix`).\n2. Iterate right to left keeping running `suffix` product variable, setting `res[i] *= suffix` and updating `suffix *= nums[i]`."
  },
  {
    "id": "bigo-1",
    "topic": "Big-O Complexity",
    "category": "Definition",
    "difficulty": "Easy",
    "front": "Define Big-O (O), Big-Omega (\u03a9), and Big-Theta (\u0398) asymptotic notations.",
    "back": "\u2022 **Big-O (O)**: Asymptotic UPPER bound. Represents worst-case performance guarantee.\n\u2022 **Big-Omega (\u03a9)**: Asymptotic LOWER bound. Represents best-case performance guarantee.\n\u2022 **Big-Theta (\u0398)**: Asymptotic TIGHT bound. Performance is bounded both above and below by same order."
  },
  {
    "id": "bigo-2",
    "topic": "Big-O Complexity",
    "category": "Complexity",
    "difficulty": "Easy",
    "front": "Order standard Time Complexities from fastest to slowest growth.",
    "back": "1. O(1) Constant\n2. O(log N) Logarithmic\n3. O(N) Linear\n4. O(N log N) Linearithmic\n5. O(N^2) Quadratic\n6. O(N^3) Cubic\n7. O(2^N) Exponential\n8. O(N!) Factorial"
  },
  {
    "id": "bigo-3",
    "topic": "Big-O Complexity",
    "category": "Concept",
    "difficulty": "Easy",
    "front": "Distinguish between Auxiliary Space Complexity and Total Space Complexity.",
    "back": "\u2022 **Auxiliary Space**: Temporary or extra space used by the algorithm excluding the input payload size.\n\u2022 **Total Space Complexity**: Total space required including both the input size and auxiliary space."
  },
  {
    "id": "bigo-4",
    "topic": "Big-O Complexity",
    "category": "Formula",
    "difficulty": "Medium",
    "front": "Why do algorithms that divide problem size in half repeatedly run in O(log N) time?",
    "back": "Starting with N elements and halving at each step k: `N / (2^k) = 1` => `2^k = N` => `k = log2(N)`. Hence, loop executes log2(N) times."
  },
  {
    "id": "bigo-5",
    "topic": "Big-O Complexity",
    "category": "Concept",
    "difficulty": "Medium",
    "front": "What is Amortized Analysis and why is std::vector push_back O(1) amortized?",
    "back": "Amortized analysis calculates average execution time per operation over a worst-case sequence of operations.\nFor dynamic array insertion: N-1 insertions cost O(1), and the N-th causes doubling array reallocation cost O(N). Total cost for N insertions is `O(N) + O(N) = O(2N)`, resulting in `O(2N) / N = O(1)` amortized per insert."
  },
  {
    "id": "bigo-6",
    "topic": "Big-O Complexity",
    "category": "Complexity",
    "difficulty": "Medium",
    "front": "What determines Space Complexity in recursive algorithms?",
    "back": "Determined by the **Maximum Depth of the Call Stack** at any point during execution.\nFor example: A balanced binary tree traversal has stack depth O(log N), while a skewed linear tree has stack depth O(N)."
  },
  {
    "id": "algo-1",
    "topic": "Algorithm Summaries",
    "category": "Algorithm",
    "difficulty": "Medium",
    "front": "Shortest Path Algorithms Summary: Compare Dijkstra, Bellman-Ford, and Floyd-Warshall.",
    "back": "\u2022 **Dijkstra**: Single-source shortest path, non-negative edge weights. Time O((V+E) log V), Space O(V).\n\u2022 **Bellman-Ford**: Single-source, handles negative edge weights & detects negative cycles. Time O(V * E), Space O(V).\n\u2022 **Floyd-Warshall**: All-pairs shortest path, DP matrix formulation. Time O(V^3), Space O(V^2)."
  },
  {
    "id": "algo-2",
    "topic": "Algorithm Summaries",
    "category": "Complexity",
    "difficulty": "Medium",
    "front": "Sorting Algorithms Comparison Matrix (Time, Space, Stability).",
    "back": "\u2022 QuickSort: Avg O(N log N), Worst O(N^2), Space O(log N), Unstable\n\u2022 MergeSort: Worst O(N log N), Space O(N), Stable\n\u2022 HeapSort: Worst O(N log N), Space O(1), Unstable\n\u2022 Insertion Sort: Best O(N), Worst O(N^2), Space O(1), Stable\n\u2022 Counting Sort: Worst O(N + K), Space O(N + K), Stable"
  },
  {
    "id": "algo-3",
    "topic": "Algorithm Summaries",
    "category": "Concept",
    "difficulty": "Medium",
    "front": "Summary of Core Algorithmic Paradigms and when to choose each.",
    "back": "\u2022 **Divide & Conquer**: Independent subproblems (MergeSort, Binary Search).\n\u2022 **Dynamic Programming**: Overlapping subproblems + Optimal substructure (Knapsack, LCS).\n\u2022 **Greedy**: Locally optimal step yields global optimum without backtracking (Dijkstra, Activity Selection).\n\u2022 **Backtracking**: Exhaustive search over decision state space with pruning (N-Queens, Sudoku)."
  },
  {
    "id": "algo-4",
    "topic": "Algorithm Summaries",
    "category": "Algorithm",
    "difficulty": "Hard",
    "front": "String Pattern Matching Algorithms Matrix: KMP vs Rabin-Karp vs Z-Algorithm vs Aho-Corasick.",
    "back": "\u2022 **KMP**: Single pattern matching via LPS array. Time O(N + M).\n\u2022 **Rabin-Karp**: Single/multi-pattern via rolling hash. Time Avg O(N + M).\n\u2022 **Z-Algorithm**: Prefix matching via Z-box. Time O(N + M).\n\u2022 **Aho-Corasick**: Multi-pattern search using Trie + Automaton failure links. Time O(N + M + occurrences)."
  },
  {
    "id": "algo-5",
    "topic": "Algorithm Summaries",
    "category": "Concept",
    "difficulty": "Easy",
    "front": "Tree Traversal Choice Guide: Which traversal should you use when?",
    "back": "\u2022 **Inorder**: When working on BSTs to process elements in sorted order.\n\u2022 **Preorder**: When cloning trees, creating expression trees, or serializing/deserializing structure.\n\u2022 **Postorder**: When deleting nodes or computing bottom-up properties (e.g. subtree heights, tree diameter).\n\u2022 **Level-Order (BFS)**: When processing nodes level-by-level or finding shortest path in unweighted tree."
  },
  {
    "id": "algo-6",
    "topic": "Algorithm Summaries",
    "category": "Trick",
    "difficulty": "Medium",
    "front": "Graph Problem Identification Cheatsheet: Problem keywords to Algorithm selection.",
    "back": "\u2022 Unweighted Shortest Path -> BFS\n\u2022 Weighted Shortest Path (positive weights) -> Dijkstra\n\u2022 Negative weights / Negative cycle -> Bellman-Ford\n\u2022 All-pairs Shortest Path -> Floyd-Warshall\n\u2022 Minimum Cost Spanning Tree -> Kruskal / Prim\n\u2022 Dependency ordering / Scheduling -> Topological Sort (Kahn / DFS)\n\u2022 Connected components / Cycle in undirected -> Disjoint Set Union (DSU) / DFS"
  }
];

/**
 * Retrieves flashcards filtered by topic.
 * Performs a case-insensitive search. If topic is empty, whitespace, or 'all',
 * returns all flashcards.
 *
 * @param topic - The topic name to filter by (e.g., 'Arrays', 'Graphs', 'Dynamic Programming')
 * @returns Array of matching Flashcard objects
 */
export function getFlashcardsByTopic(topic: string): Flashcard[] {
  if (!topic || topic.trim() === '' || topic.toLowerCase() === 'all') {
    return flashcards;
  }
  const normalized = topic.trim().toLowerCase();
  return flashcards.filter(card => card.topic.toLowerCase() === normalized);
}

/**
 * Helper function to retrieve flashcards filtered by category.
 */
export function getFlashcardsByCategory(category: FlashcardCategory): Flashcard[] {
  return flashcards.filter(card => card.category === category);
}

/**
 * Helper function to retrieve flashcards filtered by difficulty level.
 */
export function getFlashcardsByDifficulty(difficulty: FlashcardDifficulty): Flashcard[] {
  return flashcards.filter(card => card.difficulty === difficulty);
}

/**
 * Helper function to get all unique topic names available in the flashcard dataset.
 */
export function getAllTopics(): string[] {
  const topicsSet = new Set<string>();
  flashcards.forEach(card => topicsSet.add(card.topic));
  return Array.from(topicsSet);
}
