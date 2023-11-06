module.exports = function makeSendOtpMail({ random, nodemailer }) {
    return async function sendOtpMail({ }) {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
                port: 465, // Port for SMTP (usually 465)
                secure: true, // Usually true if connecting to port 465
                auth: {
                    user: "linkdiesotp44@gmail.com", // Your email address
                    pass: "ohrz mrgz zyxd dkmz", // Password (for gmail, your app password)
                },
            });
            const otp = random.randomNumber(4)
              const info = await transporter.sendMail({
                from: 'Link Laser Die <linkdiesotp44@gmail.com>',
                to: "linkdiesotp44@gmail.com",
                subject: "Your One-Time Password (OTP) for Secure Login",
                html: `Your One-Time Password is: <b>${otp}</b>.<br>Use it to securely access your website.`,
              });

            return otp;
        } catch (error) {
            console.error(`Error in send-otp-mail ${error}`);
        }
    }
}