import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendResultEmail(email: string, resultUrl: string, scores: any) {
  const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Assessment Results</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f8fafc;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #6467f2 0%, #4b4da3 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      width: 48px;
      height: 48px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }
    .header h1 {
      color: #ffffff;
      font-size: 28px;
      font-weight: 900;
      margin: 0 0 8px 0;
      letter-spacing: -0.5px;
    }
    .header p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      color: #1e293b;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .message {
      font-size: 16px;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    .scores-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 32px;
    }
    .score-card {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      padding: 20px;
      text-align: center;
    }
    .score-label {
      font-size: 11px;
      color: #6467f2;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 8px;
    }
    .score-value {
      font-size: 32px;
      color: #1e293b;
      font-weight: 900;
      margin-bottom: 4px;
    }
    .score-desc {
      font-size: 12px;
      color: #94a3b8;
      font-weight: 600;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #6467f2 0%, #4b4da3 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 16px;
      font-weight: 900;
      font-size: 16px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(100, 103, 242, 0.3);
      transition: transform 0.2s;
    }
    .cta-button:hover {
      transform: translateY(-2px);
    }
    .footer {
      background-color: #f8fafc;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .footer p {
      color: #94a3b8;
      font-size: 12px;
      margin: 4px 0;
      font-weight: 600;
    }
    .footer a {
      color: #6467f2;
      text-decoration: none;
      font-weight: 700;
    }
    @media only screen and (max-width: 600px) {
      .scores-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">✨</div>
      <h1>Assessment Complete!</h1>
      <p>HeyAmara Intelligence</p>
    </div>
    
    <div class="content">
      <div class="greeting">Hello there! 👋</div>
      
      <div class="message">
        Congratulations on completing your psychometric assessment! Your comprehensive talent intelligence report is now ready. We've analyzed your responses across four critical dimensions to provide deep insights into your professional profile.
      </div>
      
      <div class="scores-grid">
        <div class="score-card">
          <div class="score-label">Cognitive</div>
          <div class="score-value">${scores.cognitive}%</div>
          <div class="score-desc">${getScoreLabel(scores.cognitive)}</div>
        </div>
        <div class="score-card">
          <div class="score-label">Behavior</div>
          <div class="score-value">${scores.behavior}%</div>
          <div class="score-desc">${getScoreLabel(scores.behavior)}</div>
        </div>
        <div class="score-card">
          <div class="score-label">Motivation</div>
          <div class="score-value">${scores.motivation}%</div>
          <div class="score-desc">${getScoreLabel(scores.motivation)}</div>
        </div>
        <div class="score-card">
          <div class="score-label">Collaboration</div>
          <div class="score-value">${scores.collaboration}%</div>
          <div class="score-desc">${getScoreLabel(scores.collaboration)}</div>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 40px;">
        <a href="${resultUrl}" class="cta-button" style="color: #ffffff !important;">
          View Full Report →
        </a>
      </div>
      
      <div class="message" style="margin-top: 32px; font-size: 14px;">
        Your detailed report includes strategic insights, strengths analysis, role recommendations, and hiring signals. Click the button above to explore your complete talent intelligence profile.
      </div>
    </div>
    
    
  </div>
</body>
</html>
  `;

  const textTemplate = `
HeyAmara Assessment - Your Results Are Ready!

Hello!

Congratulations on completing your psychometric assessment! Your comprehensive talent intelligence report is now ready.

Your Scores:
- Cognitive: ${scores.cognitive}% (${getScoreLabel(scores.cognitive)})
- Behavior: ${scores.behavior}% (${getScoreLabel(scores.behavior)})
- Motivation: ${scores.motivation}% (${getScoreLabel(scores.motivation)})
- Collaboration: ${scores.collaboration}% (${getScoreLabel(scores.collaboration)})

View your full report here: ${resultUrl}

Your detailed report includes strategic insights, strengths analysis, role recommendations, and hiring signals.

---
HeyAmara • Psychometric Assessment Platform
This is an automated message. Please do not reply to this email.
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'HeyAmara Assessment <noreply@heyamara.ai>',
    to: email,
    subject: '✨ Your HeyAmara Assessment Results Are Ready!',
    text: textTemplate,
    html: htmlTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Exceptional';
  if (score >= 70) return 'Strong';
  if (score >= 60) return 'Proficient';
  if (score >= 50) return 'Moderate';
  if (score >= 40) return 'Developing';
  return 'Emerging';
}
