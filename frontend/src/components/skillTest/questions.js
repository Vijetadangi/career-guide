const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: 0,
    category: "Frontend",
    difficulty: "Easy",
    explanation:
      "HTML is used to structure web pages and stands for Hyper Text Markup Language.",
  },
  {
    id: 2,
    question: "Which CSS property controls text color?",
    options: ["font-style", "color", "text-color", "background-color"],
    correctAnswer: 1,
    category: "Frontend",
    difficulty: "Easy",
    explanation:
      "The 'color' property in CSS defines the color of text content.",
  },
  {
    id: 3,
    question: "Which HTML tag is used to include JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    correctAnswer: 1,
    category: "Frontend",
    difficulty: "Easy",
    explanation:
      "The <script> tag is used to embed or reference JavaScript in HTML.",
  },
  {
    id: 4,
    question: "Which CSS layout is best for one-dimensional layouts?",
    options: ["Grid", "Flexbox", "Float", "Position"],
    correctAnswer: 1,
    category: "Frontend",
    difficulty: "Medium",
    explanation:
      "Flexbox is designed for one-dimensional layouts (row or column).",
  },
  {
    id: 5,
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!-- -->", "//", "/* */", "#"],
    correctAnswer: 1,
    category: "Logic",
    difficulty: "Easy",
    explanation:
      "// is used for single-line comments in JavaScript.",
  },
  {
    id: 6,
    question: "Which keyword declares a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    correctAnswer: 2,
    category: "Logic",
    difficulty: "Easy",
    explanation:
      "const is used to declare variables that cannot be reassigned.",
  },
  {
    id: 7,
    question: "What will `typeof null` return in JavaScript?",
    options: ["null", "object", "undefined", "number"],
    correctAnswer: 1,
    category: "Logic",
    difficulty: "Medium",
    explanation:
      "`typeof null` returns 'object' due to a historical JavaScript bug.",
  },
  {
    id: 8,
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: 1,
    category: "Fundamentals",
    difficulty: "Easy",
    explanation:
      "CSS stands for Cascading Style Sheets and controls styling of web pages.",
  },
  {
    id: 9,
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Digital Output Management",
      "Document Order Model",
    ],
    correctAnswer: 0,
    category: "Fundamentals",
    difficulty: "Medium",
    explanation:
      "DOM represents the structure of an HTML document as objects.",
  },
  {
    id: 10,
    question: "Which protocol is used to load websites?",
    options: ["FTP", "SMTP", "HTTP", "SSH"],
    correctAnswer: 2,
    category: "Fundamentals",
    difficulty: "Medium",
    explanation:
      "HTTP is the protocol used for communication between browsers and servers.",
  },
];

export default questions;
