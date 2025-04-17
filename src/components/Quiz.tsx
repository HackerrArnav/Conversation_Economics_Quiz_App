import React, { useState, useEffect } from "react";
import { Question } from "@/types/Question";
import { Check, X, RefreshCcw } from "lucide-react";

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    shuffleQuestions();
  }, [questions]);

  const shuffleQuestions = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(
      shuffled.map((q) => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5),
      }))
    );
    setUserAnswers({});
    setQuizCompleted(false);
    setScore(0);
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleQuizSubmit = () => {
    const newScore = shuffledQuestions.reduce((acc, question, index) => {
      return acc + (userAnswers[index] === question.answer ? 1 : 0);
    }, 0);
    setScore(newScore);
    setQuizCompleted(true);
    onComplete(newScore);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="text-4xl font-bold">
          <span className="text-6xl text-blue-600">{score}</span>
          <span className="text-2xl text-gray-500">/{shuffledQuestions.length}</span>
        </div>
        {quizCompleted && (
          <button
            onClick={shuffleQuestions}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <RefreshCcw className="mr-2" size={20} />
            Retake Quiz
          </button>
        )}
      </div>

      {shuffledQuestions.map((question, index) => (
        <div key={index} className="mb-8 p-4 border-2 border-black rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            Question {index + 1}: {question.question}
          </h2>
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                className={`w-full p-3 text-left rounded-md transition-colors ${
                  quizCompleted && userAnswers[index] === option && option !== question.answer
                    ? "bg-red-100"
                    : quizCompleted && option === question.answer
                    ? "bg-green-100"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => !quizCompleted && handleAnswerSelect(index, option)}
                disabled={quizCompleted}
              >
                {option}
                {quizCompleted && option === question.answer && (
                  <Check className="inline-block ml-2 text-green-600" size={20} />
                )}
                {quizCompleted && userAnswers[index] === option && option !== question.answer && (
                  <X className="inline-block ml-2 text-red-600" size={20} />
                )}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!quizCompleted && (
        <button
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleQuizSubmit}
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
};

export default Quiz;
