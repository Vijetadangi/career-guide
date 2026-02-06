import { useState, useEffect } from "react";
import questions from "./questions";
import jsPDF from "jspdf";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./SkillTest.css";

const QUESTION_TIME = 15;

/* DIFFICULTY WEIGHTS */
const difficultyWeight = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

const SkillTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [showExplanation, setShowExplanation] = useState(false);

  /* NEW: TIME TRACKING */
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeTaken, setTimeTaken] = useState([]);

  /* CATEGORY SCORES */
  const [categoryScore, setCategoryScore] = useState({});

  /* CATEGORY TOTALS */
  const categoryTotals = questions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {});

  /* TIMER */
  useEffect(() => {
    if (showResult || showExplanation) return;

    if (timeLeft === 0) {
      goNext();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, showResult, showExplanation]);

  useEffect(() => {
    setTimeLeft(QUESTION_TIME);
    setQuestionStartTime(Date.now());
  }, [currentQuestion]);

  /* HANDLE ANSWER */
  const handleAnswer = (index) => {
    setSelectedOption(index);

    const currentQ = questions[currentQuestion];
    const timeSpent = Math.round(
      (Date.now() - questionStartTime) / 1000
    );
    setTimeTaken((prev) => [...prev, timeSpent]);

    if (index === currentQ.correctAnswer) {
      setScore(
        (prev) => prev + difficultyWeight[currentQ.difficulty]
      );

      const category = currentQ.category;
      setCategoryScore((prev) => ({
        ...prev,
        [category]: (prev[category] || 0) + 1,
      }));
    }

    setShowExplanation(true);
    setTimeout(() => {
      setShowExplanation(false);
      goNext();
    }, 1600);
  };

  /* NEXT QUESTION */
  const goNext = () => {
    setSelectedOption(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      finishTest();
    }
  };

  /* FINISH TEST */
  const finishTest = () => {
    const accuracyPercent = Math.round(
      (score /
        questions.reduce(
          (sum, q) => sum + difficultyWeight[q.difficulty],
          0
        )) *
        100
    );

    const avgTime =
      timeTaken.reduce((a, b) => a + b, 0) /
      timeTaken.length;

    let confidenceLevel = "Low";
    let confidenceText = "Needs more practice";

    if (avgTime <= 5 && accuracyPercent >= 75) {
      confidenceLevel = "High";
      confidenceText = "You answer fast & accurately 🚀";
    } else if (avgTime <= 8 && accuracyPercent >= 60) {
      confidenceLevel = "Medium";
      confidenceText = "Good speed with improving accuracy 👍";
    }

    /* RETAKE DATE */
    const retakeDate = new Date();
    retakeDate.setDate(retakeDate.getDate() + 14);

    const resultData = {
      score,
      total: questions.length,
      categoryScore,
      date: new Date().toLocaleString(),
      confidence: {
        level: confidenceLevel,
        text: confidenceText,
        avgTime: Math.round(avgTime),
      },
      retakeOn: retakeDate.toISOString(),
    };

    localStorage.setItem(
      "skillTestResult",
      JSON.stringify(resultData)
    );

    setShowResult(true);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setCategoryScore({});
    setShowResult(false);
    setSelectedOption(null);
    setShowExplanation(false);
    setTimeLeft(QUESTION_TIME);
    setTimeTaken([]);
  };

  /* CHART DATA */
  const chartData = Object.keys(categoryTotals).map((cat) => ({
    name: cat,
    score: categoryScore[cat] || 0,
  }));

  /* WEAKEST SKILL */
  const weakestSkill = Object.keys(categoryTotals).reduce((weakest, cat) => {
    const current = categoryScore[cat] || 0;
    const weakestVal = categoryScore[weakest] || 0;
    return current < weakestVal ? cat : weakest;
  }, Object.keys(categoryTotals)[0]);

  const learningPlan = {
    Frontend: [
      "Master semantic HTML & accessibility",
      "Practice Flexbox & Grid layouts",
      "Build responsive UI components",
    ],
    Logic: [
      "Revise JavaScript fundamentals",
      "Practice conditionals & loops",
      "Solve 5 logic challenges daily",
    ],
    Fundamentals: [
      "Understand browser rendering",
      "Learn HTTP & request lifecycle",
      "Study DOM manipulation deeply",
    ],
  };

  /* PDF */
  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text("Skill Assessment Report", 20, 20);
    doc.text(`Weighted Score: ${score}`, 20, 40);

    const result = JSON.parse(
      localStorage.getItem("skillTestResult")
    );

    doc.text(
      `Confidence: ${result.confidence.level}`,
      20,
      55
    );
    doc.text(result.confidence.text, 20, 65);

    let y = 85;
    doc.text("Skill Breakdown:", 20, y);

    Object.keys(categoryTotals).forEach((cat) => {
      y += 10;
      doc.text(
        `${cat}: ${categoryScore[cat] || 0} / ${categoryTotals[cat]}`,
        20,
        y
      );
    });

    doc.save("Skill_Report.pdf");
  };

  const progressPercent =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="skilltest-container">
      {!showResult ? (
        <div className="question-card">
          <div className="top-bar">
            <span>
              Question {currentQuestion + 1} / {questions.length}
            </span>
            <span className={`timer ${timeLeft <= 5 ? "danger" : ""}`}>
              ⏱ {timeLeft}s
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <h3 className="question-text">
            {questions[currentQuestion].question}
          </h3>

          <p className="difficulty-badge">
            Difficulty: {questions[currentQuestion].difficulty}
          </p>

          <div className="options">
            {questions[currentQuestion].options.map((option, index) => {
              let className = "option-btn";

              if (selectedOption !== null) {
                if (index === questions[currentQuestion].correctAnswer)
                  className += " correct";
                else if (index === selectedOption)
                  className += " wrong";
              }

              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="answer-explanation">
              <p className="explanation-text">
                {questions[currentQuestion].explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="result-card">
          <div className="result-hero">
            <h2>🎉 Skill Assessment Complete</h2>
            <p className="score-big">{score}</p>

            {JSON.parse(
              localStorage.getItem("skillTestResult")
            )?.confidence && (
              <>
                <p>
                  <strong>
                    {
                      JSON.parse(
                        localStorage.getItem("skillTestResult")
                      ).confidence.text
                    }
                  </strong>
                </p>
                <p>
                  🔁 Retake suggested on:{" "}
                  <strong>
                    {new Date(
                      JSON.parse(
                        localStorage.getItem("skillTestResult")
                      ).retakeOn
                    ).toDateString()}
                  </strong>
                </p>
              </>
            )}
          </div>

          <div className="result-grid">
            <div className="result-box">
              <h3>📊 Performance Overview</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="result-box">
              <h3>🧠 Skill Breakdown</h3>
              {Object.keys(categoryTotals).map((cat) => (
                <p key={cat}>
                  <strong>{cat}:</strong>{" "}
                  {categoryScore[cat] || 0} / {categoryTotals[cat]}
                </p>
              ))}
            </div>
          </div>

          <div className="result-box highlight">
            <h3>📌 Learning Plan</h3>
            <p>
              Focus Area: <strong>{weakestSkill}</strong>
            </p>
            <ul>
              {learningPlan[weakestSkill].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="result-actions">
            <button onClick={restartTest}>🔄 Restart</button>
            <button onClick={() => (window.location.href = "/predict")}>
              🎯 Career Prediction
            </button>
            <button onClick={downloadReport}>
              📄 Download Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillTest;
