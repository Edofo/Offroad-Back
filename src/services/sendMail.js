import mailgun from 'mailgun-js'

export default async function sendMail({ from = process.env.MAILER_FROM, to, subject, text }) {
  
  let mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});

  let data = {
    from,
    to,
    subject,
    text,
  };

  mg.messages().send(data, function (error, body) {
    console.log(body);
  })
}