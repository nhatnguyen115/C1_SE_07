import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { API_URIS } from "../../api/URIConstant";
import HistoryTestCard from "../../components/HistoryTestCard";
import LeftSidebarUser from "../../components/LeftSidebarUser";
import { SRC_IMAGE } from "../../constant/SrcImage";
import { http } from "../../service/Http";
import { HistoryTestType } from "../../types/test";
import ProgressCard from "./components/ProgressCard";

// Đăng ký các thành phần cần thiết của ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
const HistoryPage: React.FC = () => {
  // Tạo dữ liệu cố định 6 item
  const historyTests = [
    {
      id: 1,
      imageSrc: "src/assets/images/toeic-online-full-test.png",
      title: "TOEIC Full Test 01",
      score: "25 / 100",
      time: "2h20'",
    },
    {
      id: 2,
      imageSrc: "src/assets/images/toeic-online-full-test.png",
      title: "TOEIC Full Test 02",
      score: "30 / 100",
      time: "1h45'",
    },
    {
      id: 3,
      imageSrc: "src/assets/images/toeic-online-full-test.png",
      title: "TOEIC Full Test 03",
      score: "40 / 100",
      time: "2h10'",
    },
    {
      id: 4,
      imageSrc: "src/assets/images/toeic-online-full-test.png",
      title: "TOEIC Full Test 04",
      score: "50 / 100",
      time: "2h00'",
    },
    {
      id: 5,
      imageSrc: "src/assets/images/toeic-online-full-test.png",
      title: "TOEIC Full Test 05",
      score: "60 / 100",
      time: "2h25'",
    },
    {
      id: 6,
      imageSrc: "src/assets/images/toeic-online-full-test.png",
      title: "TOEIC Full Test 06",
      score: "70 / 100",
      time: "2h15'",
    },
  ];
  const chartData = {
    labels: [
      "Test 01",
      "Test 02",
      "Test 03",
      "Test 04",
      "Test 05",
      "Test 06",
      "Test 07",
      "Test 08",
      "Test 09",
    ],
    datasets: [
      {
        label: "Reading",
        data: [25, 30, 20, 50, 70, 80, 50],
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.5)",
        tension: 0.4,
      },
      {
        label: "Listening",
        data: [10, 20, 50, 60, 50, 40, 100, 43, 5, 10],
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.5)",
        tension: 0.4,
      },
    ],
  };

  // Tùy chọn cho biểu đồ
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Tiến độ điểm số",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Điểm số",
        },
      },
      x: {
        title: {
          display: true,
          text: "Bài kiểm tra",
        },
      },
    },
  };

  const [historyTest, setHistoryTest] = useState<HistoryTestType[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await http.get(API_URIS.USER_TEST.HISTORY);
        const rawData = res.data.data;

        const processedData: HistoryTestType[] = rawData.map((item: any) => {
          const start = new Date(item.startTime);
          const end = new Date(item.endTime);
          const durationMs = end.getTime() - start.getTime();

          const totalMinutes = Math.floor(durationMs / 1000 / 60);
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;

          const formattedTime = `${hours}h${minutes}`;

          return {
            id: item.id,
            imageSrc: SRC_IMAGE.HISTORY_TEST,
            examName: item.examName,
            startTime: item.startTime,
            endTime: item.endTime,
            totalScore: item.totalScore,
            time: formattedTime,
          };
        });

        setHistoryTest(processedData);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Phần trên: LeftSidebar + Biểu đồ */}
      <div className="flex-1 flex pl-8 pr">
        {/* Left Sidebar */}
        <LeftSidebarUser customHeight="h-auto w-64" />

        {/* Khu vực Biểu đồ (Tổng quan) */}
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Lịch sử làm bài
          </h1>

          <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-4">
            {/* Placeholder Biểu đồ */}
            <div className="flex-1 flex flex-col items-center justify-center border-r border-gray-200 pr-4">
              <h2 className="text-xl font-semibold mb-2">Tổng quan</h2>
              <div className="w-full h-40 bg-blue-50 flex items-center justify-center text-blue-400">
                <Line data={chartData} options={chartOptions} />
              </div>
              <div className="flex space-x-4 mt-3 text-sm"></div>
            </div>

            {/* Thông tin thống kê */}
            <div className="flex-1 flex flex-col items-center justify-center md:justify-around">
              <ProgressCard
                progress={32} // Tiến độ
                level="A1" // Cấp độ hiện tại
                totalTests={10} // Số bài thi đã thực hiện
                averageScore={75} // Điểm trung bình
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phần dưới: Danh sách bài test */}
      <div className="bg-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {historyTest.map((item) => (
            <HistoryTestCard
              key={item.id}
              id={item.id}
              imageSrc={item.imageSrc}
              examName={item.examName}
              totalScore={item.totalScore}
              time={item.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
