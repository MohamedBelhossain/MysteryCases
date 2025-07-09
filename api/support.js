import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, message } = req.body;
  console.log('Received support request:', { email, message });

  if (!email || !message) {
    return res.status(400).json({ error: 'Missing fields.' });
  }

  try {
   const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_PORT === '465', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,  
  },
});


    const mailOptions = {
      from: `"Mystery Cases Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Support request from ${email}`,
      text: message,
      replyTo: email,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    res.status(200).json({
  success: true,
 message: 'Message sent successfully.' });

  } catch (error) {
    console.error('Error sending email:', error);
   return res.status(500).json({
  success: false,
  error: 'Échec de l’envoi du message.'
});
  }
}
