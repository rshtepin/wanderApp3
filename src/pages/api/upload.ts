import { IncomingForm } from 'formidable'
import addUpdateProduct from 'src/products/mutations/addUpdateProduct'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'src/blitz-server'
import { OK } from 'zod'

const path = './public/media/images/productlogo/'

const uuid = require('uuid')
var mv = require('mv')
const fs = require('fs')

const form = new IncomingForm({ multiples: true })

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  // Запись файла на сервер
  console.log('Не смогли удалить файл')
  form.parse(req, (err, fields, files) => {
    //console.log(JSON.stringify({ fields, files }, null, 2))
    if (files.file.originalFilename.match(/\.(svg|jpg|jpeg|png)$/i)) {
      const obj = JSON.parse(JSON.stringify({ fields, files }, null, 2))
      const idproduct: number = +obj.fields.idproduct
      const title: string = obj.fields.productitle
      const oldFileName = obj.fields.oldfile
      const fileName: string = uuid.v4() + '.' + files.file.originalFilename.split('.').pop()

      console.log('Файл: ' + fileName)

      const oldPath = files.file.filepath
      const newPath = path + `${fileName}`
      mv(oldPath, newPath, () => {})

      // Запись в базу и удаление старого файла
      addUpdateProduct({ id: idproduct, title: title, logo: fileName }, ctx)
      try {
        fs.unlinkSync(path + oldFileName)
        console.log('Файл ' + oldFileName + ' удален.')
      } catch {
        console.log('Не получилось удалить файл.')
      }
      console.log('Новый файл: ' + fileName)
    }
  })
  res.status(200).end(OK)
})
export const config = {
  api: {
    bodyParser: false,
  },
}