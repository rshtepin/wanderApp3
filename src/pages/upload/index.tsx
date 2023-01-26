import { createRef, useState } from 'react'

export default function PrivatePage(props) {
  const [image, setImage] = useState(null)
  const [createObjectURL, setCreateObjectURL] = useState(null)
  const imgRef = createRef()

  const uploadToClient = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      setImage(i)

      setCreateObjectURL(URL.createObjectURL(i))
      const img = new Image()
      img.onload = () => {
        console.log(img.width)
      }
      img.src = await URL.createObjectURL(i)
    }
  }

  const uploadToServer = async (event) => {
    const body = new FormData()

    body.append('file', image)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body,
    })
  }

  return (
    <div>
      <div>
        <img src={createObjectURL} ref={imgRef} />
        <h4>Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button className="btn btn-primary" type="submit" onClick={uploadToServer}>
          Send to server
        </button>
      </div>
      <div></div>
    </div>
  )
}
