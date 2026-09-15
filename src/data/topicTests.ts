import { TopicTest } from '../types/learning';

export const TOPIC_TESTS_DATA: TopicTest[] = [
  {
    id: 'test-variables',
    topicId: 'topic-variables',
    worldId: 'world-1',
    title: 'Python Basics & Variables Mastery Test',
    description: 'Verify your mastery over variable assignments, primitive types, dynamic typing, and memory model.',
    durationMinutes: 10,
    totalQuestions: 5,
    passPercentage: 80,
    xpReward: 200,
    coinsReward: 50,
    questions: [
      {
        id: 'q1',
        text: 'What is the output of the following Python code?',
        codeSnippet: `x = 10
y = x
x = 20
print(y)`,
        options: ['10', '20', 'None', 'NameError'],
        correctIndex: 0,
        explanation: 'In Python, `y = x` binds `y` to the integer object `10`. When `x = 20` executes, `x` is rebound to a new integer object `20`, leaving `y` referencing `10`.'
      },
      {
        id: 'q2',
        text: 'Which of the following creates a float in Python?',
        options: ['x = 5', 'x = float("3.5")', 'x = "12.4"', 'x = int(3.9)'],
        correctIndex: 1,
        explanation: '`float("3.5")` parses string "3.5" and returns a floating-point number.'
      },
      {
        id: 'q3',
        text: 'What does the `type(True)` call evaluate to?',
        options: ["<class 'int'>", "<class 'bool'>", "<class 'boolean'>", "<class 'truth'>"],
        correctIndex: 1,
        explanation: 'Booleans in Python are instances of `<class \'bool\'>`, which is a subclass of int.'
      },
      {
        id: 'q4',
        text: 'What will be printed by this code?',
        codeSnippet: `a, b = 5, 2
print(a // b, a % b)`,
        options: ['2.5 1', '2 1', '2 0.5', '3 1'],
        correctIndex: 1,
        explanation: '`5 // 2` is floor division resulting in `2`. `5 % 2` is remainder resulting in `1`.'
      },
      {
        id: 'q5',
        text: 'Which of the following is NOT a reserved keyword in Python 3?',
        options: ['pass', 'yield', 'variable', 'lambda'],
        correctIndex: 2,
        explanation: '`variable` is an ordinary identifier, not a reserved keyword in Python.'
      }
    ]
  },
  {
    id: 'test-conditions',
    topicId: 'topic-conditions',
    worldId: 'world-2',
    title: 'Decision Logic & Conditions Mastery Test',
    description: 'Test your understanding of branching logic, ternary expressions, and short-circuit evaluation.',
    durationMinutes: 12,
    totalQuestions: 5,
    passPercentage: 80,
    xpReward: 250,
    coinsReward: 60,
    questions: [
      {
        id: 'q1',
        text: 'What will be printed when this condition is evaluated?',
        codeSnippet: `x = 5
if x > 10:
    print("A")
elif x < 5:
    print("B")
elif x == 5:
    print("C")
else:
    print("D")`,
        options: ['A', 'B', 'C', 'D'],
        correctIndex: 2,
        explanation: 'Since `x == 5` is true, branch "C" executes.'
      },
      {
        id: 'q2',
        text: 'What is the value of `result`?',
        codeSnippet: `val = 15
result = "High" if val > 20 else "Normal"`,
        options: ['High', 'Normal', 'True', 'SyntaxError'],
        correctIndex: 1,
        explanation: 'This is Python\'s ternary conditional expression: since val is not > 20, the else expression "Normal" is returned.'
      },
      {
        id: 'q3',
        text: 'What does `print(False or 0 or "Python" or 42)` print?',
        codeSnippet: ``,
        options: ['False', '0', 'Python', '42'],
        correctIndex: 2,
        explanation: 'The `or` operator returns the first truthy operand. "Python" is the first truthy value in the chain.'
      },
      {
        id: 'q4',
        text: 'What is the output of `bool([]) and bool([0])`?',
        options: ['True', 'False', 'None', '[0]'],
        correctIndex: 1,
        explanation: 'An empty list `[]` is falsy (`bool([])` is `False`). Because of short-circuiting, the entire expression evaluates to `False`.'
      },
      {
        id: 'q5',
        text: 'Which operator checks if two variables reference the exact same memory location?',
        options: ['==', 'equals', 'is', '==='],
        correctIndex: 2,
        explanation: 'The `is` keyword tests object identity (whether two references point to the same memory object).'
      }
    ]
  },
  {
    id: 'test-loops',
    topicId: 'topic-for-loops',
    worldId: 'world-3',
    title: 'Loops & Iteration Mastery Test',
    description: 'Verify loop construction, range slicing, while loops, and break/continue flow control.',
    durationMinutes: 15,
    totalQuestions: 5,
    passPercentage: 80,
    xpReward: 280,
    coinsReward: 70,
    questions: [
      {
        id: 'q1',
        text: 'How many times will "PYQUEST" be printed?',
        codeSnippet: `for i in range(1, 10, 3):
    print("PYQUEST")`,
        options: ['3 times', '4 times', '9 times', '10 times'],
        correctIndex: 0,
        explanation: 'The values of `i` will be 1, 4, and 7 (next is 10 which is >= stop). Thus it prints 3 times.'
      },
      {
        id: 'q2',
        text: 'What is the output of this loop with break and else?',
        codeSnippet: `for i in range(3):
    if i == 1:
        break
else:
    print("Finished")
print("Done")`,
        options: ['Finished Done', 'Done', 'Finished', '1 Done'],
        correctIndex: 1,
        explanation: 'In Python, a loop\'s `else` block only executes if the loop terminates normally without hitting a `break` statement.'
      },
      {
        id: 'q3',
        text: 'What will `sum(range(1, 6))` evaluate to?',
        options: ['10', '15', '21', '6'],
        correctIndex: 1,
        explanation: '`range(1, 6)` generates 1, 2, 3, 4, 5. The sum is 1+2+3+4+5 = 15.'
      },
      {
        id: 'q4',
        text: 'What does the `continue` statement do?',
        options: [
          'Exits the loop entirely',
          'Skips the rest of the current iteration and begins the next',
          'Restarts the program',
          'Pauses loop execution for 1 second'
        ],
        correctIndex: 1,
        explanation: '`continue` aborts the current iteration step and jumps to the next loop evaluation.'
      },
      {
        id: 'q5',
        text: 'What happens if a while loop condition never becomes False and contains no break?',
        options: [
          'Python automatically stops it after 100 iterations',
          'It runs infinitely until interrupted or memory is exhausted',
          'SyntaxError',
          'It returns None'
        ],
        correctIndex: 1,
        explanation: 'It creates an infinite loop that continues until external interruption or termination.'
      }
    ]
  },
  {
    id: 'test-functions',
    topicId: 'topic-functions',
    worldId: 'world-4',
    title: 'Functions & Modularity Mastery Test',
    description: 'Test function definitions, keyword arguments, scope rules, and return values.',
    durationMinutes: 15,
    totalQuestions: 5,
    passPercentage: 80,
    xpReward: 300,
    coinsReward: 75,
    questions: [
      {
        id: 'q1',
        text: 'What is returned by a Python function that does not contain an explicit `return` statement?',
        options: ['0', 'False', 'None', '""'],
        correctIndex: 2,
        explanation: 'Python functions implicitly return `None` if no `return` expression is reached.'
      },
      {
        id: 'q2',
        text: 'What is the output of this code with default mutable arguments?',
        codeSnippet: `def add_item(item, box=[]):
    box.append(item)
    return box

print(add_item("sword"))
print(add_item("shield"))`,
        options: [
          "['sword'] then ['shield']",
          "['sword'] then ['sword', 'shield']",
          "Error",
          "None"
        ],
        correctIndex: 1,
        explanation: 'Default arguments in Python are evaluated once when the function is defined. A mutable default like `box=[]` persists across calls.'
      },
      {
        id: 'q3',
        text: 'What allows a function to accept an arbitrary number of positional arguments?',
        options: ['**kwargs', '*args', '&params', '...args'],
        correctIndex: 1,
        explanation: '`*args` collects arbitrary positional arguments into a tuple.'
      },
      {
        id: 'q4',
        text: 'What is the output of the following scope example?',
        codeSnippet: `x = 50
def test():
    x = 20
test()
print(x)`,
        options: ['20', '50', 'None', 'UnboundLocalError'],
        correctIndex: 1,
        explanation: 'Inside `test()`, assigning `x = 20` creates a local variable `x`, leaving the global `x = 50` untouched.'
      },
      {
        id: 'q5',
        text: 'What keyword allows modifying a global variable inside a local function scope?',
        options: ['extern', 'global', 'nonlocal', 'static'],
        correctIndex: 1,
        explanation: 'The `global` keyword declares that a variable refers to the module-level global namespace.'
      }
    ]
  }
];
