import { Suspense } from 'react'
import EditorUI from 'src/products/Editor/components/Editorui'

const menubuttons = () => {
  return <div>menubuttons</div>
}

const EditorPage = () => {
  return (
    <div id="app">
      <Suspense>
        <EditorUI menubuttons={menubuttons} />
      </Suspense>
    </div>
  )
}

export default EditorPage
