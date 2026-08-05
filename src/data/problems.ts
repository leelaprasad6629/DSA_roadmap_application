import type { Problem } from '@/types';

export const problems: Problem[] = [
  {
    id: 'prob-1', number: 1, name: 'Two Sum', difficulty: 'Easy', topic: 'Arrays',
    pattern: 'Hashing', prerequisites: [], similarProblems: ['prob-167'], tags: ['array', 'hash-table'],
    isPremium: false, link: 'https://leetcode.com/problems/two-sum/',
    hints: ['Try a hash map', 'Store indices'], optimalApproach: 'Use a hash map to store complements.',
    timeComplexity: 'O(n)', spaceComplexity: 'O(n)',
    solutions: { python: 'class Solution:\n    def twoSum(self, nums, target):\n        seen = {}\n        for i, n in enumerate(nums):\n            if target - n in seen:\n                return [seen[target - n], i]\n            seen[n] = i' }
  }
];

export function getProblemsByTopic(topic: string) { return problems.filter(p => p.topic === topic); }
export function getProblemsByDifficulty(difficulty: string) { return problems.filter(p => p.difficulty === difficulty); }
export function getProblemsByPhase(phaseId: number) { return problems; }
