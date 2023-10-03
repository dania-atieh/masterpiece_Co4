const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async ({ email, resetToken }) => {
  const msg = {
    to: email,
    from: process.env.EMAIL_USERNAME,
    subject: 'Your password reset token (valid for 10 min)',
    html: `
        <div>
            <h1>Forgot Your Password?</h1>
            <p>The code to restore your password is </p>
            <h4>${resetToken}</h4>
            <p>If you didn't forget your password, please ignore this email!</p>
        </div>
    `
  };
  try {
    const result = await transporter.sendMail(msg);
    return result;
  } catch (error) {
    throw new Error('not_able_email');
  }
};

module.exports = sendEmail;
