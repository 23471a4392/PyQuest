import { Boss, SpeedRunProblem, SurvivalQuestion, CodeBattleMatch, Competition } from '../types/arena';

export const ARENA_BOSSES_DATA: Boss[] = [
  {
    id: 'boss-loop-dragon',
    name: 'Pyrax the Loop Dragon',
    title: 'Guardian of Iteration',
    avatar: '🐉',
    worldId: 'world-3',
    maxHp: 100,
    currentHp: 100,
    themeColor: '#10B981',
    description: 'A terrifying serpentine dragon that traps unready coders in infinite loops. Strike with precise range() and break statements to pierce its scaly armor!',
    weakness: 'range() expressions and while loops',
    rewardXP: 500,
    rewardCoins: 200,
    rewardBadgeId: 'badge-dragon-slayer',
    challenges: [
      {
        id: 'dragon-q1',
        title: 'Chamber 1 — The Range Strike',
        prompt: 'Defeat the dragon\'s front claw by writing code that generates a list of numbers from 1 to 10 inclusive.',
        hint: 'Use `list(range(1, 11))`',
        starterCode: `def strike_dragon():
    # Return list of numbers 1 to 10 inclusive
    return list(range(1, 11))
`,
        testInput: 'None',
        expectedOutput: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]',
        damageToBoss: 25
      },
      {
        id: 'dragon-q2',
        title: 'Chamber 2 — Flame Extinguisher',
        prompt: 'The dragon breathes fire of values `[12, 45, 60, 22, 90]`. Sum only the values greater than 30 to extinguish the blaze.',
        hint: 'Use a loop with `if num > 30` or `sum(x for x in flames if x > 30)`',
        starterCode: `def extinguish_flames(flames=[12, 45, 60, 22, 90]):
    total = sum(x for x in flames if x > 30)
    return total
`,
        testInput: '[12, 45, 60, 22, 90]',
        expectedOutput: '195',
        damageToBoss: 25
      },
      {
        id: 'dragon-q3',
        title: 'Chamber 3 — Tail Counter',
        prompt: 'Count how many even numbers exist in the dragon\'s spike array `spikes = [1, 2, 3, 4, 6, 7, 8, 10]`.',
        hint: 'Filter with `num % 2 == 0`',
        starterCode: `def count_spikes(spikes=[1, 2, 3, 4, 6, 7, 8, 10]):
    return len([s for s in spikes if s % 2 == 0])
`,
        testInput: '[1, 2, 3, 4, 6, 7, 8, 10]',
        expectedOutput: '5',
        damageToBoss: 25
      },
      {
        id: 'dragon-q4',
        title: 'Final Chamber — Sever the Infinite Loop',
        prompt: 'The dragon casts an infinite curse. Return the string "LOOP_BROKEN" to deliver the finishing blow!',
        hint: 'Simply return "LOOP_BROKEN"',
        starterCode: `def break_loop():
    # Deliver the fatal blow!
    return "LOOP_BROKEN"
`,
        testInput: 'None',
        expectedOutput: 'LOOP_BROKEN',
        damageToBoss: 25
      }
    ]
  },
  {
    id: 'boss-oop-titan',
    name: 'Goliath the Object Titan',
    title: 'Monolith of Inheritance',
    avatar: '👹',
    worldId: 'world-6',
    maxHp: 100,
    currentHp: 100,
    themeColor: '#8B5CF6',
    description: 'Constructed from pure abstract base classes and deep inheritance hierarchies. Overpower it by mastering class polymorphism and method overriding!',
    weakness: 'Polymorphism and Encapsulation',
    rewardXP: 750,
    rewardCoins: 350,
    rewardBadgeId: 'badge-oop-master',
    challenges: [
      {
        id: 'titan-q1',
        title: 'Shield Break — Class Instantiation',
        prompt: 'Instantiate a hero object with name="TitanSlayer" and weapon="Excalibur". Return its weapon attribute.',
        hint: 'Define class with `__init__` or return property',
        starterCode: `def attack_titan():
    class Hero:
        def __init__(self, name, weapon):
            self.name = name
            self.weapon = weapon
    h = Hero("TitanSlayer", "Excalibur")
    return h.weapon
`,
        testInput: 'None',
        expectedOutput: 'Excalibur',
        damageToBoss: 50
      },
      {
        id: 'titan-q2',
        title: 'Core Breach — Method Override',
        prompt: 'Override the Titan\'s defense method to return True for victory.',
        hint: 'Return True',
        starterCode: `def defeat_titan():
    return True
`,
        testInput: 'None',
        expectedOutput: 'True',
        damageToBoss: 50
      }
    ]
  }
];

export const SPEED_RUN_PROBLEMS: SpeedRunProblem[] = [
  {
    id: 'sr-1',
    prompt: 'What does `len("PyQuest")` return?',
    snippet: 'len("PyQuest")',
    type: 'quick_choice',
    options: ['6', '7', '8', '5'],
    expectedAnswer: '7',
    points: 100
  },
  {
    id: 'sr-2',
    prompt: 'What is the type of `{"a": 1, "b": 2}`?',
    snippet: 'type({"a": 1, "b": 2})',
    type: 'quick_choice',
    options: ['list', 'tuple', 'dict', 'set'],
    expectedAnswer: 'dict',
    points: 120
  },
  {
    id: 'sr-3',
    prompt: 'Evaluate: `10 // 3`',
    snippet: 'print(10 // 3)',
    type: 'quick_choice',
    options: ['3.33', '3', '1', '4'],
    expectedAnswer: '3',
    points: 100
  },
  {
    id: 'sr-4',
    prompt: 'What is the output of `[1, 2] * 2`?',
    snippet: 'print([1, 2] * 2)',
    type: 'quick_choice',
    options: ['[2, 4]', '[1, 2, 1, 2]', '[[1, 2], [1, 2]]', 'Error'],
    expectedAnswer: '[1, 2, 1, 2]',
    points: 150
  },
  {
    id: 'sr-5',
    prompt: 'Which method adds an element to the end of a list?',
    snippet: 'my_list = [1, 2]\nmy_list.?(3)',
    type: 'quick_choice',
    options: ['push', 'append', 'insert', 'add'],
    expectedAnswer: 'append',
    points: 100
  },
  {
    id: 'sr-6',
    prompt: 'What does `"hello"[::-1]` evaluate to?',
    snippet: '"hello"[::-1]',
    type: 'quick_choice',
    options: ['"hello"', '"olleh"', '"h"', 'IndexError'],
    expectedAnswer: '"olleh"',
    points: 150
  }
];

export const SURVIVAL_QUESTIONS: SurvivalQuestion[] = [
  {
    id: 'surv-1',
    level: 1,
    difficulty: 'Easy',
    question: 'Which symbol is used for single-line comments in Python?',
    options: ['//', '/*', '#', '--'],
    correctIndex: 2,
    explanation: 'The hash symbol `#` starts a single line comment in Python.',
    xpValue: 30
  },
  {
    id: 'surv-2',
    level: 2,
    difficulty: 'Easy',
    question: 'What is the result of `2 ** 3`?',
    codeSnippet: 'print(2 ** 3)',
    options: ['5', '6', '8', '9'],
    correctIndex: 2,
    explanation: 'The `**` operator represents exponentiation: 2^3 = 8.',
    xpValue: 40
  },
  {
    id: 'surv-3',
    level: 3,
    difficulty: 'Medium',
    question: 'What does `bool("False")` evaluate to in Python?',
    codeSnippet: 'print(bool("False"))',
    options: ['False', 'True', 'None', 'ValueError'],
    correctIndex: 1,
    explanation: 'Any non-empty string in Python evaluates to `True`, regardless of its text content.',
    xpValue: 60
  },
  {
    id: 'surv-4',
    level: 4,
    difficulty: 'Medium',
    question: 'What will be printed by this slice: `numbers = [0, 1, 2, 3, 4][1:4]`?',
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[0, 1, 2, 3]', '[2, 3, 4]'],
    correctIndex: 0,
    explanation: 'Slice `[1:4]` includes indices 1, 2, and 3 (the stop index 4 is excluded).',
    xpValue: 75
  },
  {
    id: 'surv-5',
    level: 5,
    difficulty: 'Hard',
    question: 'What is the output of the following dictionary comprehension?',
    codeSnippet: `d = {x: x**2 for x in (1, 2, 3)}
print(d[2])`,
    options: ['2', '4', '8', 'KeyError'],
    correctIndex: 1,
    explanation: 'For key 2, value is 2**2 = 4.',
    xpValue: 100
  },
  {
    id: 'surv-6',
    level: 6,
    difficulty: 'Expert',
    question: 'What occurs when using `is` vs `==` on two small integers `a = 256` and `b = 256`?',
    codeSnippet: 'a = 256; b = 256; print(a is b)',
    options: ['True (Python interns integers from -5 to 256)', 'False (different memory always)', 'SyntaxError', 'Depends on CPU arch'],
    correctIndex: 0,
    explanation: 'CPython pre-allocates and caches integer objects in the range -5 through 256, so `a is b` evaluates to True.',
    xpValue: 150
  }
];

export const CODE_BATTLE_MATCHES: CodeBattleMatch[] = [
  {
    id: 'battle-101',
    title: 'Speed Duel: Palindrome Checker',
    difficulty: 'Medium',
    topic: 'Strings & Slicing',
    opponent: {
      name: 'ViperBot_99',
      avatar: '🤖',
      rating: 1420,
      title: 'Algorithmic Duelist',
      speedFactor: 1.2
    },
    problem: {
      title: 'Valid Palindrome',
      description: 'Write `is_palindrome(s)` returning True if the string is identical forwards and backwards, ignoring casing and spaces.',
      starterCode: `def is_palindrome(s):
    cleaned = "".join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]
`,
      testCases: [
        { input: '"A man a plan a canal Panama"', expected: 'True' },
        { input: '"race a car"', expected: 'False' }
      ]
    },
    playerScore: 0,
    opponentScore: 0,
    status: 'ready'
  },
  {
    id: 'battle-102',
    title: 'Clash of Champions: Fibonacci Generator',
    difficulty: 'Hard',
    topic: 'Recursion & Dynamic Programming',
    opponent: {
      name: 'CyberKage',
      avatar: '🥷',
      rating: 1850,
      title: 'Grandmaster Ghost',
      speedFactor: 1.5
    },
    problem: {
      title: 'N-th Fibonacci Number',
      description: 'Write `fib(n)` to return the n-th Fibonacci number where fib(0)=0 and fib(1)=1.',
      starterCode: `def fib(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
`,
      testCases: [
        { input: '7', expected: '13' },
        { input: '10', expected: '55' }
      ]
    },
    playerScore: 0,
    opponentScore: 0,
    status: 'ready'
  }
];

export const COMPETITIONS_DATA: Competition[] = [
  {
    id: 'comp-weekly-1',
    title: '🏆 Weekly Python Championship — Season 4',
    category: 'Full Python Spectrum',
    difficulty: 'Hard',
    tierRequired: 'Bronze',
    participantsCount: 1420,
    durationMinutes: 60,
    problemCount: 4,
    status: 'active',
    startTime: '2026-09-14T00:00:00Z',
    endTime: '2026-09-21T23:59:59Z',
    prizeXP: 2500,
    prizeCoins: 1000,
    description: 'The premier weekly competition testing algorithms, data structures, and Pythonic speed. Solve 4 progressive challenges to climb the global leaderboard.',
    rules: [
      '60-minute time limit once initiated.',
      'Automated test runner scores correctness and runtime.',
      'Plagiarism or external AI usage leads to DQ.',
      'Tiebreakers decided by submission timestamp.'
    ],
    prerequisiteTopicTitle: 'Python Basics & Loops',
    isUnlocked: true
  },
  {
    id: 'comp-speed-sprint',
    title: '⚡ Lightning Syntax Sprint',
    category: 'Speed & Syntax',
    difficulty: 'Easy',
    tierRequired: 'Basic',
    participantsCount: 890,
    durationMinutes: 15,
    problemCount: 8,
    status: 'active',
    startTime: '2026-09-15T00:00:00Z',
    endTime: '2026-09-16T23:59:59Z',
    prizeXP: 1000,
    prizeCoins: 400,
    description: 'Rapid-fire coding dash! 8 short syntax challenges in 15 minutes. Pure speed and accuracy.',
    rules: [
      '15 minutes strictly enforced.',
      'Bonus points for consecutive streaks.'
    ],
    prerequisiteTopicTitle: 'Variables & Memory',
    isUnlocked: true
  },
  {
    id: 'comp-master-cup',
    title: '👑 Grandmaster Python Masters Cup',
    category: 'Advanced OOP & Architecture',
    difficulty: 'Extreme',
    tierRequired: 'Gold',
    participantsCount: 120,
    durationMinutes: 90,
    problemCount: 5,
    status: 'upcoming',
    startTime: '2026-09-25T14:00:00Z',
    endTime: '2026-09-25T18:00:00Z',
    prizeXP: 5000,
    prizeCoins: 2500,
    description: 'Exclusive tournament for Gold Tier coders. Advanced OOP patterns, metaprogramming, and concurrency.',
    rules: [
      'Must have Gold Tier or above to enter.',
      'All 6 Worlds must be mastered.'
    ],
    prerequisiteTopicTitle: 'Advanced Python (OOP)',
    isUnlocked: false
  },
  {
    id: 'comp-past-autumn',
    title: '🍂 Autumn Logic Scramble',
    category: 'Conditionals & Recursion',
    difficulty: 'Medium',
    tierRequired: 'Bronze',
    participantsCount: 2150,
    durationMinutes: 45,
    problemCount: 3,
    status: 'completed',
    startTime: '2026-09-01T10:00:00Z',
    endTime: '2026-09-01T11:00:00Z',
    prizeXP: 1800,
    prizeCoins: 600,
    description: 'Completed seasonal challenge. View the leaderboards and historical winning solutions.',
    rules: ['Event has concluded.'],
    isUnlocked: true
  }
];
