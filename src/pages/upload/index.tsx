import { createRef, useState } from 'react'
import uploadImageFile from 'src/products/helpers/uploadImageLogo'

export default function PrivatePage() {
  const uploadToClient = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      const f = await uploadImageFile(i, 4)
    }
  }

  return (
    <div>
      <div>
        <h4>Select Image</h4>
        <input
          type="file"
          name="myImage"
          accept="image/png, image/gif, image/jpeg, image/svg+xml"
          onChange={uploadToClient}
        />
        <button className="btn btn-primary" type="submit">
          Send to server
        </button>
      </div>
      <div></div>
    </div>
  )
}
