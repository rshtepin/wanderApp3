import { IncomingForm } from 'formidable'
import { resolver } from '@blitzjs/rpc'
import { Ctx } from 'blitz'
import addUpdateProduct from 'src/products/mutations/addUpdateProduct'

const path = './public/media/images/productlogo/'

const uuid = require('uuid')
var mv = require('mv')
export const config = {
  api: {
    bodyParser: false,
  },
}
var fileName
const files = []
const form = new IncomingForm()
export default resolver.pipe(
  async (input, ctx: Ctx) => {
    console.log('Creating project...', input.idproduct)
  },
  async (req, res) => {
    fileName = uuid.v4()
    const data = await new Promise((resolve, reject) => {
      // Запись файла на сервер

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        if (files.file.originalFilename.match(/\.(svg|jpg|jpeg|png)$/i)) {
          fileName += '.' + files.file.originalFilename.split('.').pop()
          // files.push({ fileName })
          var oldPath = files.file.filepath
          var newPath = path + `${fileName}`
          mv(oldPath, newPath, (err) => {})
          return files.file.originalFilename + ' NICE'
        } else {
          return reject(files.file.originalFilename + ' is not allowed')
        }
      })

      // Запись имени файла в базу
      form.on('field', (fieldName, value) => {
        switch (fieldName) {
          case 'idproduct':
            console.log('idproduct ' + value)
            console.log('fileName ' + fileName)
            break
        }
      })
    })
    return fileName
  }
)
