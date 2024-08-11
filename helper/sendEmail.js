import nodemailer from "nodemailer";
export const sendEmail = async (email, token) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "km775.ali@gmail.com",
      pass: "rptg eoeg msya cyto",
    },
  });

  var mailOptions = {
    from: "km775.ali@gmail.com",
    to: email,
    subject: "ResetPassword",
    html:
      "<b> Hello  " +
      " " +
      'please Copy the Link <a href="http://localhost:5173/reset_password?token=' +
      token +
      '">reset your password</a>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};


//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: email,
//     subject: 'Your Random Password',
//     html: `Hy <strong>${name}</strong> Welcome!!<br><br>Your random password is: <strong>${password}</strong>`,
//   };


//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };