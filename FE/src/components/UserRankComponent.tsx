import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { API_URIS } from "../api/URIConstant";
import crown1 from "../assets/crown1.png";
import crown2 from "../assets/crown2.png";
import crown3 from "../assets/crown3.png";
import { http } from "../service/Http";
import { UserRank } from "../types/userTest";

const UserRankComponent = () => {
  const [rankings, setRankings] = useState<UserRank[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    http
      .get(API_URIS.USER_TEST.RANK, {
        params: { examId: id },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setRankings(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch rankings", err);
      });
  }, [id]);

  useEffect(() => {
    scroll.scrollToTop({ smooth: true, duration: 500 });
  }, []);

  const getCrown = (index: number) => {
    if (index === 0) return crown1;
    if (index === 1) return crown2;
    if (index === 2) return crown3;
    return null;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">BẢNG XẾP HẠNG</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100 text-sm text-gray-700 font-semibold">
            <tr>
              <th className="w-32 py-3 text-center ">Hạng</th>
              <th className="py-3 text-left">Thành viên</th>
              <th className="w-32 py-3 text-center">Tổng điểm</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {rankings.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-150 h-16 shadow-xl"
              >
                <td className="py-3 text-center font-bold">
                  {index < 3 ? (
                    <img
                      src={getCrown(index) || ""}
                      alt={`Rank ${index + 1}`}
                      className="w-6 h-6 mx-auto"
                    />
                  ) : (
                    <span>{String(index + 1).padStart(3, "0")}</span>
                  )}
                </td>

                <td className="py-3 flex items-center space-x-3">
                  <img
                    src={
                      user.avatarUrl || "https://avatar.iran.liara.run/public"
                    }
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {user.username}
                  </span>
                </td>

                <td className="py-3 text-center font-semibold text-gray-800">
                  {user.totalScore} điểm
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRankComponent;
