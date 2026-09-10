import { World } from '../types/learning';

export const WORLDS_DATA: World[] = [
  {
    id: 'world-1',
    number: 1,
    title: 'Python Basics',
    subtitle: 'Variables, Types & Operators',
    badge: '🟢 World 1',
    color: 'emerald',
    description: 'Master the fundamental building blocks of Python: variables, memory, input/output, and arithmetic operations.',
    topics: [
      {
        id: 'topic-variables',
        worldId: 'world-1',
        title: 'Variables & Memory',
        order: 1,
        description: 'Understand how Python stores references to values in dynamic variables without explicit declarations.',
        iconName: 'Variable',
        estimatedTime: '25 mins',
        practiceProblemIds: ['prob-var-1', 'prob-var-2'],
        testId: 'test-variables',
        lessons: [
          {
            id: 'lesson-var-intro',
            topicId: 'topic-variables',
            worldId: 'world-1',
            title: 'Declaring & Assigning Variables',
            order: 1,
            difficulty: 'Easy',
            estimatedMinutes: 10,
            xpReward: 100,
            coinsReward: 25,
            steps: [
              {
                id: 'step-1',
                title: '📖 Concept Explanation',
                type: 'concept',
                content: `In Python, a variable is created the moment you first assign a value to it using the assignment operator (\`=\`). Unlike C or Java, you do **not** declare variable types explicitly—Python is dynamically typed.

When you write \`score = 100\`, Python allocates memory for an integer \`100\` and binds the name \`score\` to that memory location.`,
                codeExample: `# Variable Assignment
player_name = "Sree"
player_level = 18
is_active = True

print(player_name)
print(player_level)`,
                expectedOutput: `Sree\n18`
              },
              {
                id: 'step-2',
                title: '💡 Python Syntax Rules',
                type: 'syntax',
                content: `Variable naming rules in Python:
- Must begin with a letter (a-z, A-Z) or an underscore (\`_\`).
- Cannot start with a number.
- Can only contain alpha-numeric characters and underscores (\`A-z\`, \`0-9\`, and \`_\`).
- Variable names are case-sensitive (\`age\`, \`Age\`, and \`AGE\` are three different variables).
- Best practice: Use **snake_case** for variable names (e.g., \`user_score\`, \`total_items\`).`,
                codeExample: `valid_name = "Python"
_system_code = 404
total_gold_coins = 1250

# Invalid examples:
# 2player = "No"  # SyntaxError
# user-name = "No" # SyntaxError`
              },
              {
                id: 'step-3',
                title: '🧑‍💻 Try It Yourself',
                type: 'try_it',
                content: 'Assign your character name to `hero_name` and health to `hero_hp` with value 100. Then print both values.',
                starterCode: `# Create hero_name and hero_hp variables
hero_name = "PythonKnight"
hero_hp = 100

print(f"Hero: {hero_name} | HP: {hero_hp}")`,
                expectedOutput: 'Hero: PythonKnight | HP: 100'
              },
              {
                id: 'step-4',
                title: '🧩 Knowledge Check',
                type: 'quiz',
                content: 'Test your understanding of Python variable names.',
                quiz: {
                  question: 'Which of the following is a VALID variable name in Python?',
                  options: ['2nd_player', 'player-score', '_player_xp', 'class'],
                  correctIndex: 2,
                  explanation: 'Variable names cannot start with numbers, cannot have hyphens, and cannot be reserved keywords like `class`. An underscore prefix is valid.'
                }
              }
            ]
          },
          {
            id: 'lesson-data-types',
            topicId: 'topic-variables',
            worldId: 'world-1',
            title: 'Data Types & type()',
            order: 2,
            difficulty: 'Easy',
            estimatedMinutes: 12,
            xpReward: 120,
            coinsReward: 30,
            steps: [
              {
                id: 'step-dt-1',
                title: '📖 Built-in Primitive Types',
                type: 'concept',
                content: `Python provides four primary primitive data types:
1. **\`int\`**: Whole numbers (e.g. \`42\`, \`-7\`)
2. **\`float\`**: Decimal floating-point numbers (e.g. \`3.14159\`, \`-0.5\`)
3. **\`str\`**: Text sequences enclosed in quotes (e.g. \`"Hello World"\`)
4. **\`bool\`**: Logical truth values (\`True\` or \`False\`)

Use the built-in \`type()\` function to inspect any variable's data type at runtime.`,
                codeExample: `xp = 8420
multiplier = 1.75
hero = "Sree"
is_ready = True

print(type(xp))
print(type(multiplier))
print(type(hero))
print(type(is_ready))`,
                expectedOutput: `<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>`
              }
            ]
          }
        ]
      },
      {
        id: 'topic-input-output',
        worldId: 'world-1',
        title: 'Input / Output & Formatting',
        order: 2,
        description: 'Read user interaction via input() and format dynamic outputs with modern f-strings.',
        iconName: 'Terminal',
        estimatedTime: '20 mins',
        practiceProblemIds: ['prob-io-1'],
        testId: 'test-input-output',
        lessons: [
          {
            id: 'lesson-io-basics',
            topicId: 'topic-input-output',
            worldId: 'world-1',
            title: 'print() and F-Strings',
            order: 1,
            difficulty: 'Easy',
            estimatedMinutes: 10,
            xpReward: 90,
            coinsReward: 20,
            steps: [
              {
                id: 'step-io-1',
                title: '📖 Formatted Strings (f-strings)',
                type: 'concept',
                content: 'F-strings (introduced in Python 3.6) allow inline evaluation of variables and expressions inside string literals by prefixing with `f` and wrapping variables in `{}`.',
                codeExample: `player = "Alex"
score = 4820
print(f"Player {player} reached high score: {score} XP!")`,
                expectedOutput: 'Player Alex reached high score: 4820 XP!'
              }
            ]
          }
        ]
      },
      {
        id: 'topic-operators',
        worldId: 'world-1',
        title: 'Operators & Expressions',
        order: 3,
        description: 'Arithmetic, comparison, logical, and assignment operators in Python.',
        iconName: 'Calculator',
        estimatedTime: '30 mins',
        practiceProblemIds: ['prob-op-1', 'prob-op-2'],
        testId: 'test-operators',
        lessons: [
          {
            id: 'lesson-arithmetic-ops',
            topicId: 'topic-operators',
            worldId: 'world-1',
            title: 'Arithmetic & Modulo Operations',
            order: 1,
            difficulty: 'Easy',
            estimatedMinutes: 15,
            xpReward: 110,
            coinsReward: 25,
            steps: [
              {
                id: 'step-op-1',
                title: '📖 Python Arithmetic Operators',
                type: 'concept',
                content: `Python supports standard arithmetic:
- Addition: \`+\`
- Subtraction: \`-\`
- Multiplication: \`*\`
- True Division: \`/\` (always returns float)
- Floor Division: \`//\` (truncates decimal)
- Modulo: \`%\` (remainder after division)
- Exponentiation: \`**\` (power)`,
                codeExample: `print(17 // 3)  # Floor division -> 5
print(17 % 3)   # Modulo remainder -> 2
print(2 ** 4)   # 2 to the power of 4 -> 16`,
                expectedOutput: `5\n2\n16`
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'world-2',
    number: 2,
    title: 'Decision Making',
    subtitle: 'if, elif, else & Logic',
    badge: '🟡 World 2',
    color: 'amber',
    description: 'Direct code execution flow using conditional statements, compound logical operators, and branch decision trees.',
    topics: [
      {
        id: 'topic-conditions',
        worldId: 'world-2',
        title: 'if, elif, else Statements',
        order: 1,
        description: 'Evaluate Boolean expressions to branch code paths based on state.',
        iconName: 'GitFork',
        estimatedTime: '35 mins',
        practiceProblemIds: ['prob-cond-1', 'prob-cond-2'],
        testId: 'test-conditions',
        lessons: [
          {
            id: 'lesson-if-elif-else',
            topicId: 'topic-conditions',
            worldId: 'world-2',
            title: 'Branching Logic in Python',
            order: 1,
            difficulty: 'Easy',
            estimatedMinutes: 15,
            xpReward: 130,
            coinsReward: 35,
            steps: [
              {
                id: 'step-cond-1',
                title: '📖 The if-elif-else Structure',
                type: 'concept',
                content: `Python uses indentation (typically 4 spaces) rather than curly braces \`{}\` to define blocks of code following a condition.

Only the first condition evaluating to \`True\` executes; remaining branches are skipped.`,
                codeExample: `score = 85

if score >= 90:
    rank = "S-Rank"
elif score >= 80:
    rank = "A-Rank"
elif score >= 70:
    rank = "B-Rank"
else:
    rank = "Needs Practice"

print(f"Result: {rank}")`,
                expectedOutput: 'Result: A-Rank'
              }
            ]
          }
        ]
      },
      {
        id: 'topic-nested-conditions',
        worldId: 'world-2',
        title: 'Nested Conditions & Logical Chaining',
        order: 2,
        description: 'Combine conditions using and, or, not, and nested decision hierarchies.',
        iconName: 'Network',
        estimatedTime: '25 mins',
        practiceProblemIds: ['prob-nested-1'],
        testId: 'test-nested',
        lessons: [
          {
            id: 'lesson-logical-chaining',
            topicId: 'topic-nested-conditions',
            worldId: 'world-2',
            title: 'Logical Operators (and, or, not)',
            order: 1,
            difficulty: 'Medium',
            estimatedMinutes: 15,
            xpReward: 140,
            coinsReward: 35,
            steps: [
              {
                id: 'step-log-1',
                title: '📖 Short-circuit Logic',
                type: 'concept',
                content: `Python's \`and\` and \`or\` operators evaluate from left to right and short-circuit:
- \`A and B\`: If \`A\` is False, \`B\` is never evaluated.
- \`A or B\`: If \`A\` is True, \`B\` is never evaluated.`,
                codeExample: `has_key = True
door_unlocked = False
mana = 50

if has_key and (door_unlocked or mana >= 40):
    print("Entered the Dragon Chamber!")
else:
    print("Door remains sealed.")`,
                expectedOutput: 'Entered the Dragon Chamber!'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'world-3',
    number: 3,
    title: 'Loops & Iteration',
    subtitle: 'for, while, range() & Control',
    badge: '🔵 World 3',
    color: 'blue',
    description: 'Automate repetitive workflows with counting loops, sentinel-controlled loops, break, and continue.',
    topics: [
      {
        id: 'topic-for-loops',
        worldId: 'world-3',
        title: 'for Loops & range()',
        order: 1,
        description: 'Iterate over sequences, generator ranges, and collections cleanly.',
        iconName: 'Repeat',
        estimatedTime: '40 mins',
        practiceProblemIds: ['prob-loop-1', 'prob-loop-2'],
        testId: 'test-loops',
        lessons: [
          {
            id: 'lesson-range-loop',
            topicId: 'topic-for-loops',
            worldId: 'world-3',
            title: 'Mastering the range() Function',
            order: 1,
            difficulty: 'Easy',
            estimatedMinutes: 15,
            xpReward: 150,
            coinsReward: 40,
            steps: [
              {
                id: 'step-loop-1',
                title: '📖 Syntax: range(start, stop, step)',
                type: 'concept',
                content: `The \`range()\` type generates a sequence of integers:
- \`range(5)\`: 0, 1, 2, 3, 4 (stop is exclusive!)
- \`range(2, 7)\`: 2, 3, 4, 5, 6
- \`range(10, 0, -2)\`: 10, 8, 6, 4, 2 (counting down)`,
                codeExample: `# Counting down for arena countdown
for count in range(3, 0, -1):
    print(f"Starting in {count}...")
print("ARENA BATTLE START!")`,
                expectedOutput: `Starting in 3...\nStarting in 2...\nStarting in 1...\nARENA BATTLE START!`
              }
            ]
          }
        ]
      },
      {
        id: 'topic-while-loops',
        worldId: 'world-3',
        title: 'while Loops & Flow Control',
        order: 2,
        description: 'Execute blocks while condition holds true; break out or skip iterations with continue.',
        iconName: 'RotateCw',
        estimatedTime: '30 mins',
        practiceProblemIds: ['prob-while-1'],
        testId: 'test-while',
        lessons: [
          {
            id: 'lesson-while-break',
            topicId: 'topic-while-loops',
            worldId: 'world-3',
            title: 'break and continue in Loops',
            order: 1,
            difficulty: 'Medium',
            estimatedMinutes: 15,
            xpReward: 160,
            coinsReward: 45,
            steps: [
              {
                id: 'step-wb-1',
                title: '📖 Loop Interruption',
                type: 'concept',
                content: `- \`break\`: Immediately terminates the innermost loop.
- \`continue\`: Skips the remainder of the current iteration and jumps to the next iteration.`,
                codeExample: `boss_hp = 50

while boss_hp > 0:
    boss_hp -= 20
    if boss_hp <= 0:
        print("Boss defeated with critical strike!")
        break
    print(f"Boss HP remaining: {boss_hp}")`,
                expectedOutput: `Boss HP remaining: 30\nBoss HP remaining: 10\nBoss defeated with critical strike!`
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'world-4',
    number: 4,
    title: 'Functions & Scope',
    subtitle: 'Parameters, Return & Modularity',
    badge: '🟣 World 4',
    color: 'purple',
    description: 'Organize logic into clean, reusable functions with positional, keyword, and default parameters.',
    topics: [
      {
        id: 'topic-functions',
        worldId: 'world-4',
        title: 'Functions, Parameters & Return',
        order: 1,
        description: 'Define functions using def, pass arguments, return values, and understand local vs global scope.',
        iconName: 'Box',
        estimatedTime: '45 mins',
        practiceProblemIds: ['prob-func-1', 'prob-func-2', 'prob-func-3'],
        testId: 'test-functions',
        lessons: [
          {
            id: 'lesson-func-def',
            topicId: 'topic-functions',
            worldId: 'world-4',
            title: 'Defining Functions & Return Values',
            order: 1,
            difficulty: 'Medium',
            estimatedMinutes: 20,
            xpReward: 180,
            coinsReward: 50,
            steps: [
              {
                id: 'step-fn-1',
                title: '📖 Creating Reusable Functions',
                type: 'concept',
                content: `Functions encapsulate code blocks that perform a specific task. Use the \`def\` keyword followed by the function name and parameter list.

Use \`return\` to send data back to the caller. If no return statement is specified, Python implicitly returns \`None\`.`,
                codeExample: `def calculate_arena_xp(base_xp, multiplier=1.5):
    """Calculate final XP with multiplier bonus."""
    total = base_xp * multiplier
    return int(total)

match_xp = calculate_arena_xp(500, 2.0)
print(f"Victory Earned: {match_xp} XP")`,
                expectedOutput: 'Victory Earned: 1000 XP'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'world-5',
    number: 5,
    title: 'Data Collections',
    subtitle: 'Lists, Tuples, Sets & Dicts',
    badge: '🟠 World 5',
    color: 'orange',
    description: 'Store, manipulate, slice, and query collections using Python’s native rich data structures.',
    topics: [
      {
        id: 'topic-lists-tuples',
        worldId: 'world-5',
        title: 'Lists & Tuples',
        order: 1,
        description: 'Ordered mutable lists vs immutable tuples, slicing syntax, and list comprehensions.',
        iconName: 'ListOrdered',
        estimatedTime: '45 mins',
        practiceProblemIds: ['prob-list-1', 'prob-list-2'],
        testId: 'test-collections',
        lessons: [
          {
            id: 'lesson-list-comprehension',
            topicId: 'topic-lists-tuples',
            worldId: 'world-5',
            title: 'List Slicing & Comprehensions',
            order: 1,
            difficulty: 'Medium',
            estimatedMinutes: 20,
            xpReward: 200,
            coinsReward: 55,
            steps: [
              {
                id: 'step-lc-1',
                title: '📖 Elegant List Comprehensions',
                type: 'concept',
                content: `List comprehensions provide a concise way to create lists based on existing iterables:
\`[expression for item in iterable if condition]\``,
                codeExample: `scores = [120, 450, 890, 320, 750]
# Filter scores above 400 and award 50 bonus points
high_scores = [s + 50 for s in scores if s > 400]
print(high_scores)`,
                expectedOutput: '[500, 940, 800]'
              }
            ]
          }
        ]
      },
      {
        id: 'topic-dicts-sets',
        worldId: 'world-5',
        title: 'Dictionaries & Sets',
        order: 2,
        description: 'Fast O(1) key-value hash maps and unique value sets with intersection and union.',
        iconName: 'Layers',
        estimatedTime: '40 mins',
        practiceProblemIds: ['prob-dict-1'],
        testId: 'test-dicts',
        lessons: [
          {
            id: 'lesson-dict-basics',
            topicId: 'topic-dicts-sets',
            worldId: 'world-5',
            title: 'Key-Value Mapping with Dicts',
            order: 1,
            difficulty: 'Medium',
            estimatedMinutes: 18,
            xpReward: 210,
            coinsReward: 60,
            steps: [
              {
                id: 'step-db-1',
                title: '📖 Dictionary Operations',
                type: 'concept',
                content: 'Dictionaries store mappings of unique keys to values. Keys must be immutable types (strings, ints, tuples).',
                codeExample: `player_stats = {
    "username": "Sree",
    "level": 18,
    "xp": 8420,
    "coins": 1250
}

# Safe lookup using .get()
rank = player_stats.get("rank", "Unranked")
print(f"{player_stats['username']} is level {player_stats['level']} ({rank})")`,
                expectedOutput: 'Sree is level 18 (Unranked)'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'world-6',
    number: 6,
    title: 'Advanced Python',
    subtitle: 'Strings, Files, OOP & Exceptions',
    badge: '🔴 World 6',
    color: 'rose',
    description: 'Master Object-Oriented Programming, classes, inheritance, dunder methods, and exception handling.',
    topics: [
      {
        id: 'topic-oop',
        worldId: 'world-6',
        title: 'Classes, Objects & OOP',
        order: 1,
        description: 'Design robust object hierarchies with __init__, self, encapsulation, and inheritance.',
        iconName: 'Shield',
        estimatedTime: '60 mins',
        practiceProblemIds: ['prob-oop-1', 'prob-oop-2'],
        testId: 'test-oop',
        lessons: [
          {
            id: 'lesson-oop-classes',
            topicId: 'topic-oop',
            worldId: 'world-6',
            title: 'Classes, Instances and Methods',
            order: 1,
            difficulty: 'Hard',
            estimatedMinutes: 25,
            xpReward: 250,
            coinsReward: 75,
            steps: [
              {
                id: 'step-oop-1',
                title: '📖 Building Classes with __init__',
                type: 'concept',
                content: `Classes act as blueprints for creating objects. The \`__init__\` method initializes instance attributes when an object is instantiated.
The first parameter \`self\` refers to the specific instance.`,
                codeExample: `class ArenaGladiator:
    def __init__(self, name, health=100):
        self.name = name
        self.health = health
        self.wins = 0

    def attack(self, target, damage):
        target.health -= damage
        print(f"{self.name} strikes {target.name} for {damage} damage!")

p1 = ArenaGladiator("PythonWarrior")
p2 = ArenaGladiator("DragonBoss", health=200)
p1.attack(p2, 35)
print(f"{p2.name} remaining HP: {p2.health}")`,
                expectedOutput: `PythonWarrior strikes DragonBoss for 35 damage!\nDragonBoss remaining HP: 165`
              }
            ]
          }
        ]
      },
      {
        id: 'topic-exceptions',
        worldId: 'world-6',
        title: 'Exception Handling & Files',
        order: 2,
        description: 'Catch and handle errors gracefully using try, except, else, finally, and context managers.',
        iconName: 'AlertCircle',
        estimatedTime: '40 mins',
        practiceProblemIds: ['prob-exc-1'],
        testId: 'test-advanced',
        lessons: [
          {
            id: 'lesson-try-except',
            topicId: 'topic-exceptions',
            worldId: 'world-6',
            title: 'Robust Error Handling',
            order: 1,
            difficulty: 'Medium',
            estimatedMinutes: 20,
            xpReward: 220,
            coinsReward: 65,
            steps: [
              {
                id: 'step-exc-1',
                title: '📖 The try-except-finally Block',
                type: 'concept',
                content: `Use \`try-except\` to prevent program crashes from runtime errors like \`ZeroDivisionError\` or \`KeyError\`.`,
                codeExample: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Division by zero blocked!"

print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
                expectedOutput: `5.0\nDivision by zero blocked!`
              }
            ]
          }
        ]
      }
    ]
  }
];

export interface LessonContextItem {
  lesson: World['topics'][0]['lessons'][0];
  topic: World['topics'][0];
  world: World;
}

export const getAllLessonsInOrder = (): LessonContextItem[] => {
  return WORLDS_DATA.flatMap((world) =>
    world.topics.flatMap((topic) =>
      topic.lessons.map((lesson) => ({
        lesson,
        topic,
        world
      }))
    )
  );
};

export const getNextUncompletedLesson = (completedLessonIds: string[]): LessonContextItem | null => {
  const all = getAllLessonsInOrder();
  return all.find((item) => !completedLessonIds.includes(item.lesson.id)) || null;
};

export const getNextLesson = (currentLessonId: string): LessonContextItem | null => {
  const all = getAllLessonsInOrder();
  const currentIndex = all.findIndex((item) => item.lesson.id === currentLessonId);
  if (currentIndex !== -1 && currentIndex < all.length - 1) {
    return all[currentIndex + 1];
  }
  return null;
};

export const getPreviousLesson = (currentLessonId: string): LessonContextItem | null => {
  const all = getAllLessonsInOrder();
  const currentIndex = all.findIndex((item) => item.lesson.id === currentLessonId);
  if (currentIndex > 0) {
    return all[currentIndex - 1];
  }
  return null;
};
