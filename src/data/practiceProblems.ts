import { PracticeProblem } from '../types/learning';

export const PRACTICE_PROBLEMS_DATA: PracticeProblem[] = [
  {
    id: 'prob-var-1',
    title: 'Sum of Two Numbers',
    topicId: 'topic-variables',
    worldId: 'world-1',
    difficulty: 'Easy',
    description: 'Write a function `add_numbers(a, b)` that takes two numeric arguments and returns their sum.',
    inputFormat: 'Two numbers `a` and `b` (integers or floats).',
    outputFormat: 'Return the numeric sum of `a` and `b`.',
    constraints: ['-10^6 <= a, b <= 10^6'],
    examples: [
      {
        input: 'add_numbers(3, 5)',
        output: '8',
        explanation: '3 + 5 = 8'
      },
      {
        input: 'add_numbers(-10, 25)',
        output: '15',
        explanation: '-10 + 25 = 15'
      }
    ],
    starterCode: `def add_numbers(a, b):
    # Return the sum of a and b
    pass
`,
    testCases: [
      { id: 'tc-1', input: '3, 5', expectedOutput: '8' },
      { id: 'tc-2', input: '-10, 25', expectedOutput: '15' },
      { id: 'tc-3', input: '0, 0', expectedOutput: '0' },
      { id: 'tc-4', input: '999, 1', expectedOutput: '1000', isHidden: true }
    ],
    hints: [
      'Use the standard addition operator `+`.',
      'Remember to return the value with the `return` keyword instead of printing.'
    ],
    xpReward: 50,
    coinsReward: 15,
    skillPoints: 5
  },
  {
    id: 'prob-var-2',
    title: 'Celsius to Fahrenheit Converter',
    topicId: 'topic-variables',
    worldId: 'world-1',
    difficulty: 'Easy',
    description: 'Write a function `celsius_to_fahrenheit(c)` that converts a temperature from Celsius to Fahrenheit using the formula `(c * 9/5) + 32`.',
    inputFormat: 'A number `c` representing degrees Celsius.',
    outputFormat: 'Return the temperature in Fahrenheit rounded or as float.',
    constraints: ['-273.15 <= c <= 1000'],
    examples: [
      { input: 'celsius_to_fahrenheit(0)', output: '32.0' },
      { input: 'celsius_to_fahrenheit(100)', output: '212.0' }
    ],
    starterCode: `def celsius_to_fahrenheit(c):
    # Your conversion code here
    return (c * 9/5) + 32
`,
    testCases: [
      { id: 'tc-1', input: '0', expectedOutput: '32.0' },
      { id: 'tc-2', input: '100', expectedOutput: '212.0' },
      { id: 'tc-3', input: '-40', expectedOutput: '-40.0', isHidden: true }
    ],
    hints: ['Multiply by 9/5 first, then add 32.'],
    xpReward: 60,
    coinsReward: 15,
    skillPoints: 5
  },
  {
    id: 'prob-cond-1',
    title: 'Even or Odd Determiner',
    topicId: 'topic-conditions',
    worldId: 'world-2',
    difficulty: 'Easy',
    description: 'Write a function `check_even_odd(n)` that returns the string `"Even"` if the integer `n` is divisible by 2, and `"Odd"` otherwise.',
    inputFormat: 'An integer `n`.',
    outputFormat: 'Return string "Even" or "Odd".',
    constraints: ['-10^9 <= n <= 10^9'],
    examples: [
      { input: 'check_even_odd(4)', output: '"Even"' },
      { input: 'check_even_odd(7)', output: '"Odd"' }
    ],
    starterCode: `def check_even_odd(n):
    # Check if number is even or odd
    if n % 2 == 0:
        return "Even"
    return "Odd"
`,
    testCases: [
      { id: 'tc-1', input: '4', expectedOutput: 'Even' },
      { id: 'tc-2', input: '7', expectedOutput: 'Odd' },
      { id: 'tc-3', input: '0', expectedOutput: 'Even' },
      { id: 'tc-4', input: '-5', expectedOutput: 'Odd', isHidden: true }
    ],
    hints: ['Use the modulo operator `% 2` to test divisibility.'],
    xpReward: 60,
    coinsReward: 20,
    skillPoints: 6
  },
  {
    id: 'prob-cond-2',
    title: 'Arena Gladiator Tier Evaluator',
    topicId: 'topic-conditions',
    worldId: 'world-2',
    difficulty: 'Medium',
    description: 'Write a function `arena_rank(rating)`: rating >= 2000 -> "Master", >= 1500 -> "Gold", >= 1000 -> "Silver", else -> "Bronze".',
    inputFormat: 'An integer rating.',
    outputFormat: 'Return corresponding tier string.',
    examples: [
      { input: 'arena_rank(2200)', output: '"Master"' },
      { input: 'arena_rank(1200)', output: '"Silver"' }
    ],
    starterCode: `def arena_rank(rating):
    if rating >= 2000:
        return "Master"
    elif rating >= 1500:
        return "Gold"
    elif rating >= 1000:
        return "Silver"
    return "Bronze"
`,
    testCases: [
      { id: 'tc-1', input: '2200', expectedOutput: 'Master' },
      { id: 'tc-2', input: '1200', expectedOutput: 'Silver' },
      { id: 'tc-3', input: '850', expectedOutput: 'Bronze' }
    ],
    hints: ['Check the highest tier first to prevent premature matches.'],
    xpReward: 90,
    coinsReward: 30,
    skillPoints: 8
  },
  {
    id: 'prob-loop-1',
    title: 'Countdown Blastoff Sequence',
    topicId: 'topic-for-loops',
    worldId: 'world-3',
    difficulty: 'Easy',
    description: 'Write a function `countdown_list(start)` that returns a list counting down from `start` to 1 inclusive.',
    inputFormat: 'A positive integer `start`.',
    outputFormat: 'A list of integers from start down to 1.',
    examples: [
      { input: 'countdown_list(5)', output: '[5, 4, 3, 2, 1]' }
    ],
    starterCode: `def countdown_list(start):
    return list(range(start, 0, -1))
`,
    testCases: [
      { id: 'tc-1', input: '5', expectedOutput: '[5, 4, 3, 2, 1]' },
      { id: 'tc-2', input: '3', expectedOutput: '[3, 2, 1]' },
      { id: 'tc-3', input: '1', expectedOutput: '[1]' }
    ],
    hints: ['Use `range(start, 0, -1)` with a negative step.'],
    xpReward: 70,
    coinsReward: 20,
    skillPoints: 6
  },
  {
    id: 'prob-list-1',
    title: 'Find the Largest Number in a List',
    topicId: 'topic-lists-tuples',
    worldId: 'world-5',
    difficulty: 'Medium',
    description: 'Write a function `find_largest(numbers)` that returns the largest number in a non-empty list without using the built-in max().',
    inputFormat: 'A non-empty list of integers.',
    outputFormat: 'The maximum integer in the list.',
    constraints: ['1 <= len(numbers) <= 10^5'],
    examples: [
      { input: 'find_largest([3, 11, 7, 2, 9])', output: '11' },
      { input: 'find_largest([-50, -10, -25])', output: '-10' }
    ],
    starterCode: `def find_largest(numbers):
    # Find largest without max()
    largest = numbers[0]
    for num in numbers[1:]:
        if num > largest:
            largest = num
    return largest
`,
    testCases: [
      { id: 'tc-1', input: '[3, 11, 7, 2, 9]', expectedOutput: '11' },
      { id: 'tc-2', input: '[-50, -10, -25]', expectedOutput: '-10' },
      { id: 'tc-3', input: '[42]', expectedOutput: '42' }
    ],
    hints: ['Initialize `largest` with the first element `numbers[0]`.', 'Iterate through and update if a larger number is found.'],
    xpReward: 120,
    coinsReward: 40,
    skillPoints: 12
  },
  {
    id: 'prob-dict-1',
    title: 'Word Frequency Counter',
    topicId: 'topic-dicts-sets',
    worldId: 'world-5',
    difficulty: 'Hard',
    description: 'Write a function `count_word_frequency(sentence)` that counts the frequency of each word in a string, ignoring case. Return a dictionary of word to count.',
    inputFormat: 'A string sentence.',
    outputFormat: 'A dictionary with lowercase words as keys and integers as counts.',
    examples: [
      {
        input: 'count_word_frequency("Python is fun and Python is powerful")',
        output: '{"python": 2, "is": 2, "fun": 1, "and": 1, "powerful": 1}'
      }
    ],
    starterCode: `def count_word_frequency(sentence):
    words = sentence.lower().split()
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts
`,
    testCases: [
      {
        id: 'tc-1',
        input: '"Python is fun and Python is powerful"',
        expectedOutput: '{"python": 2, "is": 2, "fun": 1, "and": 1, "powerful": 1}'
      },
      {
        id: 'tc-2',
        input: '"battle battle victory"',
        expectedOutput: '{"battle": 2, "victory": 1}'
      }
    ],
    hints: [
      'Convert the sentence to lowercase first with `.lower()`.',
      'Split into tokens using `.split()`.',
      'Use `counts.get(word, 0) + 1` to increment safely.'
    ],
    xpReward: 200,
    coinsReward: 60,
    skillPoints: 20
  },
  {
    id: 'prob-oop-1',
    title: 'Design Player Class',
    topicId: 'topic-oop',
    worldId: 'world-6',
    difficulty: 'Hard',
    description: 'Create a class `Gladiator` with `__init__(self, name, hp)`, and a method `take_damage(self, amount)` that reduces hp (cannot drop below 0). Add property `is_alive` returning True if hp > 0.',
    inputFormat: 'Method calls on instance of Gladiator.',
    outputFormat: 'Updated object health status.',
    examples: [
      {
        input: 'g = Gladiator("Thor", 100); g.take_damage(30); g.hp',
        output: '70'
      }
    ],
    starterCode: `class Gladiator:
    def __init__(self, name, hp=100):
        self.name = name
        self.hp = hp

    def take_damage(self, amount):
        self.hp = max(0, self.hp - amount)

    @property
    def is_alive(self):
        return self.hp > 0
`,
    testCases: [
      { id: 'tc-1', input: 'Gladiator("Thor", 100), damage 30', expectedOutput: '70' },
      { id: 'tc-2', input: 'Gladiator("Thor", 50), damage 80', expectedOutput: '0' }
    ],
    hints: ['Use `max(0, self.hp - amount)` to prevent health from becoming negative.'],
    xpReward: 220,
    coinsReward: 70,
    skillPoints: 22
  }
];
