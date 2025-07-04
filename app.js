`use strict`;

const { createSecureServer } = require(`http2`);

const { createHash } = require(`crypto`);

const { readFileSync, statSync, writeFileSync } = require(`fs`);

const { Sql, Tools } = require(`./tools`);

const { Call, io, pollPay} = require(`./route`);

//const { SMTPServer } = require(`smtp-server`);

//const { simpleParser } = require(`mailparser`);

Sql.Sql([readFileSync(`bin/sql.sql`, {encoding: `utf8`}), () => {}]);

let App = createSecureServer({
  	key: readFileSync(`http2/ssl/privkey.pem`),
  	cert: readFileSync(`http2/ssl/fullchain.pem`),
  	allowHTTP1: true}, (call, put) => {Call([call, put])});

App.on(`error`, (err) => console.error(err));

App.listen(8124);

io(require(`socket.io`)(App));

Tools.csv();

pollPay();

/**

let Mail = new SMTPServer({

	onData(via, state, call) {

		simpleParser(via, (fail, Value) => {

			if (fail) {

				console.error(`Mail fail:`, fail);

				return call(fail);
			}

			console.log(`Mail from:`, Value.from.text);

			console.log(`Subject:`, Value.subject);

			call();
		});
	}
});

Mail.listen(2525, `0.0.0.0`, () => {console.log(`Plug SMTP on port 2525`)});

Mail.on(`fail`, fail => console.error(fail));

**/

        const nodemailer = require(`nodemailer`);

        async function sendEmail() {
            // Create a transporter object using your SMTP details
            let transporter = nodemailer.createTransport({
                host: `smtp.eatso.store`,
                port: 587, //465 587
                secure: false,
                auth: {user: `mailto@eatso.store`, pass: `Mann2asugo`}
            });

            // Define mail options
            let mailOptions = {
                from: `"eatSO Grit & Grub" <mailto@eatso.store>`, // Sender address
                to: `mannasugo@gmail.com`, // List of recipients
                subject: "Hello from Node.js!", // Subject line
                text: "This is a test email sent from Node.js.", // Plain text body
                html: "<b>This is a test email sent from Node.js!</b>", // HTML body
            };

            // Send the email
            try {
                let info = await transporter.sendMail(mailOptions);
                console.log("Message sent: %s", info.messageId);
            } catch (error) {
                console.error("Error sending email:", error);
            }
        }

        sendEmail();