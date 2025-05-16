export const API_URIS = {
  AUTH: {
    LOGIN: "/auth/introspect",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    RESET_PASSWORD: "/auth/reset-password",
    EXTERNAL: "/auth/external/callback",
  },
  USER: {
    ADD: "/users",
    GET_PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/update",
    CHANGE_PASSWORD: "/users/change-password",
    INFO: "/users",
  },
  PRODUCT: {
    GET_ALL: "/products",
    GET_BY_ID: (id: number | string) => `/products/${id}`,
    CREATE: "/products",
    UPDATE: (id: number | string) => `/products/${id}`,
    DELETE: (id: number | string) => `/products/${id}`,
  },
  ORDER: {
    CREATE: "/orders",
    GET_ALL: "/orders",
    GET_BY_ID: (id: number | string) => `/orders/${id}`,
  },
  MODULE: {
    GET_ALL: "/modules",
    GET_BY_ID: (id: number | string) => `/modules/${id}`,
    CREATE: "/modules",
    UPDATE: (id: number | string) => `/modules/${id}`,
    DELETE: (id: number | string) => `/modules/${id}`,
  },
  SECTION: {
    GET_ALL_BY_MODULE: (moduleId: number | string) =>
      `/sections?moduleId=${moduleId}`,
    GET_BY_ID: (id: number | string) => `/sections/${id}`,
    GET_PAGING: (page: number) => `/sections?page=${page}`,
    ADD: (moduleId: number | string) => `/modules/${moduleId}/sections`,
    GET_ALL: "/sections",
  },
  PRACTICE: {
    GET_ALL_BY_SECTION: (sectionId: number | string) =>
      `/practice?sectionId=${sectionId}`,
    GET_BY_ID: (id: number | string) => `/practice/${id}`,
    SUBMIT_PART: "/practice/submit-part",
  },
  LESSON: {
    GET_BY_ID: (lessonId: number | string) => `/lessons/${lessonId}`,
    ADD: (sectionId: number | string) => `/sections/${sectionId}/lessons`,
    UPDATE: (lessonId: number | string) => `/lessons/${lessonId}`,
    DELETE: (lessonId: number | string) => `/lessons/${lessonId}`,
  },

  TEST: {
    TESTS: "/tests",
    UPLOAD_EXCEL: (testId: number) => `/tests/${testId}/upload/excel`,
  },

  EXAMS: {
    GET_BY_TEST_ID: (testId: number | string) => `/exams?testId=${testId}`,
    DO_BY_EXAM_ID: (examId: number | string) => `/exams/${examId}`,
  },

  PART: {
    PARTS: `/parts`,
    ADD_SECTION: (sectionId: number | string) => `/sections/${sectionId}/parts`,
    ADD_EXAM: (examId: number | string) => `/exams/${examId}/parts`,
    UPDATE: (partId: number | string) => `/parts/${partId}`,
    DELETE: (partId: number | string) => `/parts/${partId}`,

    QUESTION: {
      LIST: (partId: number | string, page: number, size?: number) => {
        let url = `/questions?partId=${partId}&page=${page}`;
        if (size !== undefined) {
          url += `&size=${size}`;
        }
        return url;
      },
    },
    QUESTION_ADD: (partId: number | string) => `/parts/${partId}/question`,
  },
  MENU: {
    GET_ALL: "/menu",
    GET_BY_ID: (id: number | string) => `/menu/${id}`,
    CREATE: "/menu",
    UPDATE: (id: number | string) => `/menu/${id}`,
    DELETE: (id: number | string) => `/menu/${id}`,
  },
  USER_TEST: {
    START: "/user-test/start-test",
    SUBMIT: "/user-test/submit-test",
    HISTORY: "/user-test",
    RANK: "/user-test/user-rank",
    RESULT: "/user-test/get-result",
  },

  PAYMENT: {
    PLAN: "/membership-plans",
    CALLBACK: "/user-memberships/payment/callback",
    SUBSCRIBE: (planId: number) => `/user-memberships?planId=${planId}`,
  },
};
