import { getAntiCSRFToken } from '@blitzjs/auth' // Примает файл изображения и ID продукта и делает запрос
const uploadImageFile = async (
  i,
  idproduct: string,
  productitle: string,
  oldfile: string,
  { pass }
): Promise<boolean> => {
  let result: boolean = false
  // console.log('Размер файла: ' + i.size + ' байт')
  // console.log('Имя файла: ' + i.name)
  // console.log('Расширение файла: ' + i.name.split('.').pop())
  // console.log('Тип файла: ' + i.type)
  const maxSize = 1 * 1024 * 1024
  const maxWidth = 800
  if (
    i.type == 'image/png' ||
    i.type == 'image/gif' ||
    i.type == 'image/jpeg' ||
    i.type == 'image/svg+xml'
  ) {
    const img = new Image()

    // Асинхронная функция
    img.onload = async () => {
      if (img.width < maxWidth && i.size < maxSize) {
        const antiCSRFToken = getAntiCSRFToken()
        result = true
        pass(i)
        const body = new FormData()

        //pass(true, fileName, oUrl)
        //console.log('новый файл: ' + fileName)
        body.append('idproduct', idproduct)
        body.append('productitle', productitle)
        body.append('oldfile', oldfile)
        console.log('LJ ' + oldfile)
        body.append('file', i)

        const response = await fetch('/api/upload', {
          headers: {
            'anti-csrf': antiCSRFToken,
          },
          method: 'POST',

          body,
        }).then((res) => {
          console.log('Ответ: ' + JSON.stringify(res.json()))
        })
      } else
        alert(
          'Неподходящее изображение. Размер файла должен быть не больше ' +
            maxSize / 1024 / 1024 +
            ' Мбайт. Размер вашего файла: ' +
            i.size +
            ' байт. Ширина изображения не больше ' +
            maxWidth +
            'px. Ширина вашего изображения ' +
            img.width +
            'px'
        )
    }
    img.src = await URL.createObjectURL(i)
  } else {
    alert('Неподходящий файл')
  }
  return result
}
export default uploadImageFile
