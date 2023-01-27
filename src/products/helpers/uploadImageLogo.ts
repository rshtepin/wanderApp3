// Примает файл изображения и ID продукта и делает запрос
const uploadImageFile = async (i, idproduct): Promise<boolean> => {
  let result: boolean = false
  console.log('Размер файла: ' + i.size + ' байт')
  console.log('Имя файла: ' + i.name)
  console.log('Расширение файла: ' + i.name.split('.').pop())
  console.log('Тип файла: ' + i.type)
  const maxSize = 1 * 1024 * 1024
  const maxWidth = 400
  if (
    (i.type == 'image/png' ||
      i.type == 'image/gif' ||
      i.type == 'image/jpeg' ||
      i.type == 'image/svg+xml') &&
    i.size < maxSize
  ) {
    const img = new Image()
    img.onload = async () => {
      if (img.width < maxWidth) {
        result = true
        const body = new FormData()
        body.append('idproduct', idproduct)
        body.append('file', i)

        const response = await fetch('/api/upload', {
          headers: {
            idproduct: 'secret',
          },
          method: 'POST',
          body,
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
    alert('Неподходящая картинка')
  }
  return result
}
export default uploadImageFile
