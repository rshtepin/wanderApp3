import { Box, Button, Center, Heading, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'
import { IEditorGroup, IEditorTab } from 'src/types'
import EditorGroup from './EditorGroup'
import FieldItemUI from './FieldItemUI'

interface EditorGroupsProps {
  currentTab: IEditorTab
  groups: IEditorGroup[]
  add?: React.MouseEventHandler<HTMLButtonElement>
  onChange?: (tab: IEditorTab) => void
  del?: () => void
  upd?: () => void
  addField?: () => void
  updField?: () => void
  delField?: () => void
}

function EditorGroups({ groups, add, del, upd, addField, delField, updField }: EditorGroupsProps) {
  return (
    <>
      {groups != undefined ? (
        <Box mt={2}>
          {groups.map((group) => (
            <Center key={group.id}>
              <EditorGroup
                group={group}
                isDisabled={group.isDisabled}
                del={del}
                upd={upd}
                addField={addField}
                updField={updField}
                delField={delField}
              />
            </Center>
          ))}
        </Box>
      ) : (
        <Spinner />
      )}
      <Button size={'xs'} mt={2} onClick={add}>
        +
      </Button>
    </>
  )
}

export default EditorGroups
