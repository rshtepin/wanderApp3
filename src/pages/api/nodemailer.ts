import * as nodemailer from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'src/blitz-server'

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  // console.log(req)
  class Emailer {
    private readonly transporter: nodemailer.Transporter

    // accessToken:
    //             'ya29.a0AVvZVsrbil7EWRfklicWjrB9lncsEnu696MXdYvmQvBPvHXgd9oZd11tMBx-dHjOT3FGHrwLbwAA8VdryfXuFjX7LT2kljrEfE1krWGudmZjiRNya4i1MR_QQTbg1t16zbLPCQuH0Or47Vxh4OuZmBI50QU1aCgYKAaASARISFQGbdwaI97-AhX_LtH0TXf35XUAgdA0163',

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
      this.sendEmail(newUserEmailTemplate(email))
    }
  }

  const emailer = new Emailer()

  const newUserEmailTemplate = (email: string) => {
    return {
      from: 'Разработчик<info@wwon.ru>',
      to: email,
      subject: 'Письмо с компьютера',
      text: 'Welcome to the our website',
      html: `
      <h1>РАБОТАЕТ!!!!!!</h1>
      <p>Поздравляю</p>
      <p>Письмо ушло из программы!</p>
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
