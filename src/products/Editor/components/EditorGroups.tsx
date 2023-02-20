import React from 'react'
import { IEditorGroup, IEditorTab } from 'src/types'

interface EditorGroupsProps {
  currentTab: IEditorTab
  groups: IEditorGroup[]
  add?: React.MouseEventHandler<HTMLButtonElement>
  onChange?: (tab: IEditorTab) => void
  del?: () => void
  upd?: (tab: IEditorTab) => void
}

function EditorGroups({ currentTab, groups }: EditorGroupsProps) {
  return (
    <div>
      {currentTab.title}
      {/* <div>{groups.map((group) => group.title)}</div> */}
    </div>
  )
}

export default EditorGroups
