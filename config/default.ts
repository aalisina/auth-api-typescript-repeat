export default {
  port: 3000,
  dbUri: "mongodb://localhost:27017/auth-api-repeat",
  logLevel: "info",
  smtp: {
    // just for testing purposes
    user: "yuvgttytb6m3ecxt@ethereal.email",
    pass: "KaXKmDfjE23XWs9zSU",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
  },
};

// const testCreds = {
//   user: "ujw2wejakuux7bhg@ethereal.email",
//   pass: "mWKGKadMf5ZAhSwqw2",
//   smtp: { host: "smtp.ethereal.email", port: 587, secure: false },
//   imap: { host: "imap.ethereal.email", port: 993, secure: true },
//   pop3: { host: "pop3.ethereal.email", port: 995, secure: true },
//   web: "https://ethereal.email",
// };

// creds: {
//   user: 'yuvgttytb6m3ecxt@ethereal.email',
//   pass: 'KaXKmDfjE23XWs9zSU',
//   smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//   imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//   pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//   web: 'https://ethereal.email'
// }