import { Box, Button, Center, Spinner } from '@chakra-ui/react'
import React from 'react'
import { IEditorGroup, IEditorItem, IEditorTab } from 'src/types'
import EditorGroup from './EditorGroup'
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd'

import arrayReorder from 'src/products/helpers/arrayReorder'
interface EditorGroupsProps {
  currentTab: IEditorTab
  groups: IEditorGroup[]
  reorderGroups?: (groups: IEditorGroup[]) => void
  add?: React.MouseEventHandler<HTMLButtonElement>
  onChange?: (tab: IEditorTab) => void
  del: (group: IEditorGroup) => void
  upd: (group: IEditorGroup) => void
  addField: (group: IEditorGroup) => void
  updField: (field: IEditorItem) => void
  delField: (field: IEditorItem) => void
}
function EditorGroups({
  groups,
  reorderGroups,
  add,
  del,
  upd,
  addField,
  delField,
  updField,
}: EditorGroupsProps) {
  const onDragEndGroups = (result) => {
    resetServerContext()

    if (!result.destination) {
      return
    }

    const items: any = arrayReorder(groups, result.source.index, result.destination.index)
    console.log(items)
    items.map((group: IEditorGroup, i) => {
      group.order = i + 1

      console.log('upd(group)')
      console.log(items)
    })
    reorderGroups!(items!)
  }
  return (
    <>
      {groups != undefined ? (
        <DragDropContext onDragEnd={onDragEndGroups}>
          <Droppable droppableId="droppableEditor">
            {(provided, snapshot) => (
              <Box mt={2} {...provided.droppableProps} ref={provided.innerRef} color={'black'}>
                {groups.map((group, index) => (
                  <Draggable key={group.id} draggableId={group.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <Center
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        zIndex={0}
                      >
                        <EditorGroup
                          isDragging={snapshot.isDragging}
                          group={group}
                          isDisabled={group.isDisabled!}
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
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Spinner />
      )}
      <Button size={'xs'} mt={2} onClick={add} color={'black'}>
        +
      </Button>
    </>
  )
}

export default EditorGroups
