import type { Phase } from '@/types';

export const phases: Phase[] = [
  {
    id: 0, name: 'Programming & Logic Building', description: 'Master the fundamentals',
    prerequisites: [], learningObjectives: ['Learn variables, loops, conditionals'], estimatedDuration: 7, order: 0,
    topics: [{ id: 'p0-t1', name: 'Variables & Data Types', difficulty: 'Beginner', estimatedHours: 2,
      subtopics: ['int', 'float', 'string', 'boolean'], theory: 'Learn the basic data types.',
      commonMistakes: ['Type confusion'], bestPractices: ['Use descriptive names'], revisionChecklist: ['Review types'] }]
  }
];
