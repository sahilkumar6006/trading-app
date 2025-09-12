import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.ELASTIC_EMAIL_HOSTNAME,
  port: Number(process.env.ELASTIC_EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.ELASTIC_EMAIL_USERNAME,
    pass: process.env.ELASTIC_EMAIL_PASSWORD,
  },
});

const sendMail = async (sender: string, recipient: string, subject: string) => {
  try {
    transporter.sendMail({
      from: sender,
      to: recipient,
      subject: subject,
    });
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};

export { sendMail };
