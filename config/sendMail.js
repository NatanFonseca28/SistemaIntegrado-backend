const nodemailer = require("nodemailer");

module.exports = (userTo, subjectMail, contentMail) => {

    const config = {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "d7d3461ae565fd",
            pass: "6358698bca804a"
        }
    };
    const transporter = nodemailer.createTransport(config);

    const sendMail = (req, res) => {
        /*         const message = {
                    "from": "natanfs28@gmail.com",
                    "to": "natanfs28@gmail.com",
                    "subject": "TESTE TESTE",
                    "text": "Lorem TESTE"
                } */

        const message = {
            from: "natanfs28@gmail.com",
            to: req.body.to,
            subject: req.body.subtitle,
            text: req.body.content
        }

        transporter.sendMail(message, (err, info) => {
            if (err) {
                return res.status(400).send("Erro no envio.")
            }
            return res.status(200).send("E-mail enviado.")
        })

    }

    return {
        sendMail,
    };
};