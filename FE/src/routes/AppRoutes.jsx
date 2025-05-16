import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Các trang (các phần này sẽ thêm sau)
import HomePage from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";

// Layout
import { PATH_CONSTANTS } from "../api/PathConstant";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/Admin/Dashboard/Dashboard";
import SectionDetailsManagement from "../pages/Admin/SectionManagement/SectionDetailsManagement";
import SectionManagementPage from "../pages/Admin/SectionManagement/SectionManagement";
import UserManagementPage from "../pages/Admin/UserManagement/UserManagement";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import History from "../pages/History/History";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import { MockTest } from "../pages/MockTest/MockTest";
import Result from "../pages/MockTest/Result";
import Payment from "../pages/Payment/Payment";
import PaymentForm from "../pages/Payment/PaymentForm/PaymentForm"; // Giả lập trạng thái Auth
import { Practice } from "../pages/Practice/Practice";
import { PracticeDetailsPage } from "../pages/Practice/PracticeDetailsPage";
import { PracticePage } from "../pages/Practice/PracticePage";
import Register from "../pages/Register/Register";
import Resource from "../pages/Resource/Resource";
import ResourceDetail from "../pages/Resource/ResourceDetail";
import EditSettings from "../pages/Settings/EditSettings/EditSettings";
import Settings from "../pages/Settings/Settings";
import ExternalLoginComponent from "./../components/ExternalLoginComponent";
import PaymentSuccessComponent from "./../components/PaymentSuccessComponent";
import UserRankComponent from "./../components/UserRankComponent";
import TestManagementPage from "./../pages/Admin/TestManagement/TestManagement";
import { DoExamPage } from "./../pages/Exam/DoExamPage";
import ExamPageDetails from "./../pages/Exam/ExamPageDetails";
import { TestTemp } from "./../pages/MockTest/TestTemp";
import PartDetailsPage from "./../pages/Part/PartDetailsPage";
import TestPage from "./../pages/Test/TestPage";
const isAuthenticated = false; // Kiểm tra trạng thái đăng nhập

// Cấu hình routes
const routes = [
  {
    path: PATH_CONSTANTS.ROOT.ROOT,
    element: (
      <MainLayout>
        <HomePage />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.AUTH.LOGIN,
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated} guestOnly>
        <MainLayout>
          <Login />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: PATH_CONSTANTS.AUTH.EXTERNAL,
    element: <ExternalLoginComponent />,
  },
  {
    path: PATH_CONSTANTS.AUTH.FORGOT_PASSWORD,
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated} guestOnly>
        <MainLayout>
          <ForgotPassword />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: PATH_CONSTANTS.AUTH.RESET_PASSWORD,
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated} guestOnly>
        <MainLayout>
          <ResetPassword />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: PATH_CONSTANTS.AUTH.REGISTER,
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated} guestOnly>
        <MainLayout>
          <Register />
        </MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: PATH_CONSTANTS.MOCK_TEST.MOCK_TEST,
    element: (
      <MainLayout>
        <MockTest />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.MOCK_TEST.MOCK_TEST_BY_ID(":id"),
    element: (
      <MainLayout>
        <TestTemp isView={false} />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.MOCK_TEST.MOCK_TEST_VIEW_BY_ID(":id"),
    element: (
      <MainLayout>
        <TestTemp isView={true} />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.EXAM.TEST,
    element: (
      <MainLayout>
        <MockTest />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.EXAM.EXAMS,
    element: (
      <MainLayout>
        <ExamPageDetails />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.EXAM.EXAMS_DO_BY_ID,
    element: (
      <MainLayout>
        <DoExamPage isView={false} />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.EXAM.EXAMS_VIEW_BY_ID(":attemptIdView"),
    element: (
      <MainLayout>
        <DoExamPage isView={true} />
      </MainLayout>
    ),
  },
  {
    path: "*",
    element: (
      <MainLayout>
        <NotFound />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.LEADERBOARD,
    element: (
      <MainLayout>
        <Leaderboard />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.RESULT.BY_ID(":id"),
    element: (
      <MainLayout>
        <Result
          totalQuestions={100}
          correctAnswers={90}
          wrongAnswers={10}
          skippedQuestions={0}
          score={90}
        />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.SETTING.SETTING,
    element: (
      <MainLayout>
        <Settings />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.SETTING.ADD,
    element: (
      <MainLayout>
        <EditSettings />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.PAYMENT.ROOT,
    element: (
      <MainLayout>
        <Payment />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.PAYMENT.FORM,
    element: (
      <MainLayout>
        <PaymentForm />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.PAYMENT.CALL_BACK,
    element: <PaymentSuccessComponent />,
  },
  {
    path: PATH_CONSTANTS.RESOURCE.ROOT,
    element: (
      <MainLayout>
        <Resource />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.RESOURCE.DETAIL(":id"),
    element: (
      <MainLayout>
        <ResourceDetail />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.HISTORY.HISTORY,
    element: (
      <MainLayout>
        <History />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.PRACTICE.ROOT,
    element: (
      <MainLayout>
        <Practice />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.ADMIN.ADMIN_DASHBOARD,
    element: (
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.ADMIN.ADMIN_USERMANAGEMENT,
    element: (
      <MainLayout>
        <UserManagementPage />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.ADMIN.TEST_MANAGEMENT,
    element: (
      <MainLayout>
        <TestManagementPage />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.ADMIN.SECTION_MANAGEMENT,
    element: (
      <MainLayout>
        <SectionManagementPage />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.SECTION.DETAIL_MANAGEMENT,
    element: (
      <MainLayout>
        <SectionDetailsManagement />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.SECTION.LIST,
    element: (
      <MainLayout>
        <PracticePage />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.SECTION.DETAIL(":sectionId"),
    element: (
      <MainLayout>
        <PracticeDetailsPage />
      </MainLayout>
    ),
  },
  {
    path: PATH_CONSTANTS.LESSON.GET_BY_ID(":lessonId"),
    element: <PartDetailsPage />,
  },
  {
    path: PATH_CONSTANTS.PART.DETAIL_PATH,
    element: <PartDetailsPage />,
  },

  {
    path: PATH_CONSTANTS.TEST.TESTS,
    element: (
      <MainLayout>
        <TestPage />
      </MainLayout>
    ),
  },

  {
    path: PATH_CONSTANTS.USER_TEST.RANK,
    element: (
      <MainLayout>
        <UserRankComponent />
      </MainLayout>
    ),
  },
];

const AppRoutes = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
