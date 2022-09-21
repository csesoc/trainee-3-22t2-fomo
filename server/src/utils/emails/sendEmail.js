import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import dotenv from 'dotenv';
dotenv.config();

export async function sendEmail (email, subject, vars, template) {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
			service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

		const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const emailTemplate = fs.readFileSync(path.join(__dirname, template), "utf8");
		const compiledTemplate = handlebars.compile(emailTemplate);
    const options = {
			from: process.env.EMAIL_USERNAME,
			to: email,
			subject: subject,
			html: compiledTemplate(vars),
    };

    // Send email
    let info = await transporter.sendMail(options);
		return info.messageId;
  } catch (err) {
    return err;
  }
};
