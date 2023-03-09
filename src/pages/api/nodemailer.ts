import * as nodemailer from 'nodemailer'
import { IncomingForm } from 'formidable'
import { MailOptions } from 'nodemailer/lib/json-transport'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'src/blitz-server'

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  const data: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true })

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err })
      resolve({ err, fields, files })
    })
  })
  class Emailer {
    private readonly transporter: nodemailer.Transporter

    constructor() {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_USER,
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        },
      })
    }

    public sendEmail(mailOptions: MailOptions) {
      return this.transporter.sendMail(mailOptions)
    }

    public notifyUserForSignup(email: string) {
      void this.sendEmail(newUserEmailTemplate(email))
    }
  }

  const emailer = new Emailer()

  const newUserEmailTemplate = (email: string) => {
    return {
      from: 'Разработчик<info@wwon.ru>',
      to: email,
      subject: 'Письмо от Wonder Digital',
      text: '',
      html:
        `
      <p>Имя отправителя: <b>` +
        data!.fields.name +
        `</b></p>
      <p>Email отправителя: <b>` +
        data!.fields.email +
        `</b></p>
        <p>Телефон отправителя: <b>` +
        data!.fields.tel +
        `</b></p>
        <p>Комментарий: <b>` +
        data!.fields.comment +
        `</b></p>
    `,
    } as MailOptions
  }

  emailer.notifyUserForSignup('info@wwon.ru')
  res.status(200).end(JSON.stringify({ value: 1 }))
})

export const config = {
  api: {
    bodyParser: false,
  },
}
