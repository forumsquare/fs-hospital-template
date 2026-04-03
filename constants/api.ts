export const apiEndpoints = {
  auth: {
    signUp: "/auth/user/signUp",
    signInWithGoogle: "/auth/social/signIn",
    accessToken: "/auth/accessToken",
    templateSignin: "/auth/template/signIn",
    verifyTemplateOtp: "/auth/template/verifyOtp"
  },
  base: {
    blob: "/blob-upload",
  },
  user: {
    update: "/user",
  },
  chat: {
    getChats: "/chat/:chatId/messages",
    sendMessage: "/chat/send",
    getUnreadCount: "/chat/unread-count",
    updateSeen: "/chat/:chatId/user-seen"
  },
  consultant: {
    list: "/public/consultant/:storeId/list",
    getDoctor: "/public/consultant/:consultantId/info",
    getReviews: "/public/consultant/:consultantId/reviews",
    getSlots: "/public/consultant/:consultantId/slots",
    getAddresses: "/public/consultant/:consultantId/addresses",
  },
  appointMents: {
    bookSlot: "/user/:consultantId/bookAppointment",
    getAppointments: "/user/appointmentList",
    getAppointmentById: "/public/appointments/:appointmentId",
    cancelAppointment: "/user/appointments/:appointmentId/cancel",
    raiseComplaint: "/user/appointments/:appointmentId/raiseComplaint",
    rateAppointment: "/user/appointments/:appointmentId/setRating",
  },
  reviews: {
    submit: "/reviews/submit",
  },
  notification: {
    history: "/notifications/history",
    unreadCount: "/notifications/count",
    updateSingle: "/notifications/updateStatus/:notificationId",
    updateAll: "/notifications/updateAllStatus",
  },
  categories: {
    list: "/public/consultant/:storeId/categories",
  },
  services: {
    list: "/public/services/:storeId/list",
  },
  procedures: {
    list: "/public/procedure/:storeId/list",
    getProcedure: "/public/procedure/:procedureId/info",
  },
  facilities: {
    list: "/public/facility/:storeId/list",
  },
  testimonials: {
    list: "/public/testimonials/:storeId",
  },
  store: {
    get: "/public/store/:storeId",
  },
};

export const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  SERVER_ERROR: 500,
  CREATED: 201,
  UNAUTHORIZED: 401,
} as const;
