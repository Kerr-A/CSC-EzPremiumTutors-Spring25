// utils/reviewTemplate.js

export const generateReviewEmailHtml = (tutorEmail, studentEmail, sessionId) => {
    const link = `${process.env.BASE_URL}/review.html?tutor=${tutorEmail}&student=${studentEmail}&sessionId=${sessionId}`;
  
    return `
      <p>Hi,</p>
      <p>Thank you for attending your tutoring session.</p>
      <p>Please take a moment to <a href="${link}">rate your tutor and leave feedback</a>.</p>
      <p>Click here: <a href="${link}">${link}</a></p>
      <p>– EzPremium Tutors Team</p>
    `;
  };
  