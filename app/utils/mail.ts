import nodemailer from "nodemailer";

// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_TEST_USER,
    pass: process.env.MAILTRAP_TEST_PASS,
  },
});

type Options = { name: string; to: string; link: string };

const sendVerificationMail = async (options: Options) => {
  const { to, name, link } = options;

  if (process.env.NODE_ENV === "development") {
    // send the test mails
    await transport.sendMail({
      to,
      from: process.env.VERIFICATION_MAIL,
      subject: "Welcome Email",
      html: `
        <div>
          <p>Dear ${name}, please click <a href="${link}">on this link</a> and verify your account.</p>
        </div>`,
    });
  } else {
    // send the real emails
  }
};

const mail = {
  sendVerificationMail,
};

export default mail;
