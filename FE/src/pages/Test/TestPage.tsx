import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_CONSTANTS } from "../../api/PathConstant";
import { API_URIS } from "../../api/URIConstant";
import { SRC_IMAGE } from "../../constant/SrcImage";
import { http } from "../../service/Http";
import { TestType } from "../../types/test";

const TestPage: React.FC = () => {
  const [tests, setTests] = useState<TestType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await http.get(API_URIS.TEST.TESTS);
        if (response.status === 200) {
          setTests(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch tests", error);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="p-4 max-w-4xl flex flex-col justify-center items-center min-h-screen mx-auto">
      <div>
        <h1 className="text-xl font-bold mb-4">Danh sách bài test</h1>
      </div>
      <div className="">
        {tests.map((test) => (
          <div
            key={test.id}
            className="px-5 py-5 mb-10 flex flex-col rounded-2xl bg-gradient-to-r from-yellow-100 via-yellow-200 to-red-200 transform transition duration-300 hover:scale-105"
          >
            <img
              src={SRC_IMAGE.TEST}
              alt={test.testType}
              className="w-full h-40 object-cover rounded-md mb-5"
            />
            <h1>{test.testType}</h1>
            <span className="text-xs">
              Luyện thi mô phỏng trên máy tính như thi thật giúp bạn làm quen
              khi bước vào kì thi chính thức
            </span>
            <button
              className="p-4 ml-80 mt-5 bg-blue-300 rounded-2xl"
              onClick={() =>
                navigate(PATH_CONSTANTS.EXAM.EXAMS_BY_TEST_ID(test.id))
              }
            >
              Làm bài thi ngay
            </button>
          </div>
        ))}
      </div>
      <div className="text-justify space-y-4 p-4 rounded-2xl shadow-xl">
        <p>
          Làm đề thi thử TOEIC® trực tuyến là một trong những cách tốt nhất để
          làm quen với dạng đề thi cũng như biết được trình độ hiện tại của bạn,
          từ đó lập kế hoạch ôn thi phù hợp để đạt điểm cao.
        </p>

        <h2 className="font-semibold text-lg">
          1. Ai nên thi thử TOEIC® online?
        </h2>
        <p>
          Bất cứ ai chuẩn bị thi TOEIC® đều nên luyện tập thi thử TOEIC® online.
          Làm bài thi thử giúp bạn xác định được trình độ hiện tại của mình. Bên
          cạnh đó, những ai muốn kiểm tra trình độ tiếng Anh của mình cũng có
          thể thi thử TOEIC® online.
        </p>

        <h2 className="font-semibold text-lg">
          2. Lợi ích của việc làm đề thi thử TOEIC® online là gì?
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>2.1 Giúp nâng cao năng lực tiếng Anh:</strong> Sau khi làm
            xong mỗi đề thi thử TOEIC® online, bạn chắc chắn sẽ học được điều gì
            đó từ nó, ví dụ như học thêm được từ vựng, cấu trúc hoặc cụm từ hay.
            Ngoài ra, bạn có thể biết được điểm mạnh, điểm yếu của mình và tránh
            những lỗi tương tự trong bài thi tiếp theo cũng như bài thi thật.
          </li>
          <li>
            <strong>2.2 Thực hành dưới áp lực thời gian:</strong> Quản lý thời
            gian là vô cùng quan trọng trong bất kỳ kỳ thi nào. Việc làm bài thi
            thử online dưới áp lực thời gian giúp bạn biết mình nên dành bao
            nhiêu thời gian cho mỗi phần.
          </li>
          <li>
            <strong>2.3 Ngân hàng đề thi đa dạng:</strong> Đề thi thử TOEIC®
            online rất đa dạng và bao gồm cả câu dễ và khó. Các câu hỏi được
            biên soạn kỹ lưỡng theo cấu trúc đề thi thật.
          </li>
          <li>
            <strong>2.4 Sự tiện lợi:</strong> Bạn có thể thi thử TOEIC® online ở
            bất cứ đâu, chỉ cần một thiết bị có kết nối Internet. Điều này giúp
            tiết kiệm thời gian di chuyển và linh hoạt trong việc học.
          </li>
        </ul>

        <h2 className="font-semibold text-lg">
          3. Tại sao bạn nên luyện đề thi thử TOEIC® online của TOEIC® TEST PRO?
        </h2>
        <p>
          Giữa vô số trang web và ứng dụng học TOEIC®, TOEIC® TEST PRO được
          nhiều người học ưa thích vì những lý do sau:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Các đề thi thử được chia thành <strong>Full tests</strong> (120
            phút) và <strong>Mini tests</strong> (60 phút), phù hợp với nhu cầu
            khác nhau.
          </li>
          <li>
            Câu hỏi được biên soạn cẩn thận và cập nhật theo cấu trúc mới, bao
            gồm:
            <ul className="list-disc list-inside pl-5">
              <li>Phần 1: Mô tả tranh</li>
              <li>Phần 2: Hỏi - Đáp</li>
              <li>Phần 3: Đoạn hội thoại</li>
              <li>Phần 4: Bài nói ngắn</li>
              <li>Phần 5: Hoàn thành câu</li>
              <li>Phần 6: Hoàn thành văn</li>
              <li>Phần 7: Đọc hiểu - Đoạn đơn</li>
              <li>Phần 7: Đọc hiểu - Đoạn kép</li>
              <li>Phần 7: Đọc hiểu - Đoạn ba</li>
            </ul>
          </li>
          <li>
            Mỗi câu hỏi đều có đáp án đúng và giải thích chi tiết giúp bạn học
            từ vựng, cấu trúc, cụm từ liên quan.
          </li>
          <li>
            Giao diện TOEIC® TEST PRO được thiết kế bắt mắt, dễ sử dụng, mang
            lại trải nghiệm học tập tuyệt vời.
          </li>
        </ul>

        <p>
          Tải xuống <strong>TOEIC® TEST PRO</strong> ngay để học nội dung hay và
          tận dụng các tính năng ưu việt.
        </p>
      </div>
    </div>
  );
};

export default TestPage;
