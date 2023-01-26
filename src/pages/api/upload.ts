import { IncomingForm } from 'formidable'
import { resolver } from '@blitzjs/rpc'
import { z } from 'zod'
import { NotFoundError } from 'blitz'
const uuid = require('uuid')

var mv = require('mv')
export const config = {
  api: {
    bodyParser: false,
  },
}
export default resolver.pipe(async (req, res) => {
  let fileName = uuid.v4() + '.jpg'
  // console.log(fileName)
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()

    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err)

      if (files.file.originalFilename.match(/\.(svg|jpg|jpeg|png)$/i)) {
        console.log(files.file.originalFilename + ' is  allowed')
        var oldPath = files.file.filepath
        var newPath = `./public/uploads/${fileName}`
        mv(oldPath, newPath, (err) => {})
        res.status(200).json({ fields, files })
      } else {
        console.log(files.file.originalFilename + ' is not allowed')
        return reject(files.file.originalFilename + ' is not allowed')
      }
      //console.log(files.file.name)
    })
  })
})
