"use client";

import { questionsByWeek } from "@/data/questions";
import { ArrowLeft, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Question = {
  question: string;
  options: string[];
  answer: string;
};


export default function PracticePage() {
  const { week } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const allQuestions =
      week === "all" ? Object.values(questionsByWeek).flat() : questionsByWeek[week as string] || [];

    const shuffled = allQuestions.map((q) => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5),
    }));

    setQuestions(shuffled);
    setUserAnswers({});
  }, [week]);

  const handleAnswer = (questionIndex: number, option: string) => {
    if (userAnswers[questionIndex]) return;
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const getNavigationButtons = () => {
    if (week === "all") {
      return (
        <Link
          href="/quiz/all"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Test Mode
        </Link>
      );
    }

    const currentWeekNum = parseInt((week as string).replace("week", ""), 10);
    const hasNextWeek = !!questionsByWeek[`week${currentWeekNum + 1}`];

    return (
      <div className="flex gap-4">
        {currentWeekNum > 0 && (
          <Link
            href={`/practice/week${currentWeekNum - 1}`}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Previous Week
          </Link>
        )}
        {hasNextWeek ? (
          <Link
            href={`/practice/week${currentWeekNum + 1}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next Week
          </Link>
        ) : currentWeekNum === 12 ? (
          <Link
            href="/quiz/all"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            All Quiz
          </Link>
        ) : null}
      </div>
    );
  };


  const formatQuestion = (q: string) => {
    return q
      .replace(/-->/g, "→")
      .replace(/"([^"]*)"/g, '"<i>$1</i>"')
      .replace(/\(Fill in the blanks?\)/i, "");
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0 text-white">
            {week === "all" ? "All Weeks Practice" : `Week ${String(week).replace("week", "")} Practice`}
          </h1>
          <Link
            href="/practice"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Week Selection
          </Link>
        </div>

        {questions.map((question, index) => {
          const selected = userAnswers[index];

          return (
            <div key={index} className="mb-10 border-2 border-gray-700 rounded">
              <div className="bg-gray-900/50 p-4 border-b-2 border-gray-700">
                <h2 className="text-lg text-white">
                  <span className="text-xl font-bold ml-2 mr-3">{index + 1}.</span>
                  <span
                    dangerouslySetInnerHTML={{ __html: formatQuestion(question.question) }}
                  />
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {question.options.map((option: string, optionIndex: number) => {
                    const isSelected = selected === option;
                    const isAnswer = question.answer === option;
                    const showFeedback = selected;

                    let classes = "p-3 text-left border-2 transition-colors ";

                    if (!showFeedback) {
                      classes += "border-gray-700 hover:bg-gray-800";
                    } else if (isAnswer) {
                      classes += "bg-green-900 border-green-600";
                    } else if (isSelected && !isAnswer) {
                      classes += "bg-red-900 border-red-600";
                    } else {
                      classes += "border-gray-700";
                    }

                    return (
                      <button
                        key={optionIndex}
                        className={classes}
                        onClick={() => handleAnswer(index, option)}
                        disabled={!!selected}
                      >
                        <span className="flex justify-between items-center">
                          {option}
                          {showFeedback && isAnswer && <Check className="text-green-400" size={20} />}
                          {showFeedback && isSelected && !isAnswer && (
                            <X className="text-red-400" size={20} />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {selected && selected !== question.answer && (
                  <div className="mt-2 text-sm text-red-400">
                    Correct Answer:{" "}
                    <span className="text-green-400">{question.answer}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="mt-8 flex justify-center">{getNavigationButtons()}</div>
      </div>
    </div>
  );
}
