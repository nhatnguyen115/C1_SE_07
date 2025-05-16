import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { QuestionType } from "../types/part";

// Thêm khai báo để tránh lỗi TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
  }
}

type Props = {
  question: QuestionType;
  index: number;
  answer?: string;
  onAnswer: (answer: string) => void;
};

const QuestionSpeakComponent: React.FC<Props> = ({
  question,
  index,
  answer,
  onAnswer,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Trình duyệt không hỗ trợ nhận diện giọng nói.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
      setSpokenText("");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isRecording) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    }
  };
  useEffect(() => {
    setSpokenText(answer || "");
  }, []);
  useEffect(() => {
    onAnswer(spokenText);
  }, [spokenText]);
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="font-bold mb-2 text-gray-800">{`Câu ${index + 1}`}</h2>

      <p className="text-base mb-4 text-gray-700">{question.content}</p>

      <button
        onClick={handleMicClick}
        className={`flex items-center gap-2 px-4 py-2 rounded ${
          isRecording ? "bg-red-600" : "bg-blue-600"
        } text-white hover:opacity-90 transition`}
      >
        <FaMicrophone className="text-lg" />
        {isRecording ? "Đang ghi..." : "Bấm để nói"}
      </button>

      {spokenText && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-600">Bạn đã nói:</p>
          <p className="text-base text-black italic">"{spokenText}"</p>
        </div>
      )}
    </div>
  );
};

export default QuestionSpeakComponent;
