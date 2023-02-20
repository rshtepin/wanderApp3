import { Box, Button, Center, Heading, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'
import { IEditorGroup, IEditorTab } from 'src/types'
import EditorGroup from './EditorGroup'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
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
        <DragDropContext>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Box mt={2} {...provided.droppableProps} ref={provided.innerRef}>
                {groups.map((group, index) => (
                  <Draggable key={group.id} draggableId={group.id.toPrecision()} index={index}>
                    {(provided, snapshot) => (
                      <Center
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
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
                    )}
                  </Draggable>
                ))}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
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
