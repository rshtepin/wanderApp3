import { Box, Button, ButtonGroup, Center, Flex, Input, Spacer, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IEditorGroup, IEditorItem } from 'src/types'
import EditorGroupField from './EditorGroupField'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import arrayReorder from 'src/products/helpers/arrayReorder'

interface EditorGroupProps {
  group: IEditorGroup
  isDisabled: boolean
  isDragging: boolean
  upd: (group: IEditorGroup) => void
  del: (group: IEditorGroup) => void
  addField: (group: IEditorGroup) => void
  updField: (field: IEditorItem) => void
  delField: (field: IEditorItem) => void
}

function EditorGroup({
  group,
  isDisabled,
  del,
  upd,
  addField,
  updField,
  delField,
  isDragging,
}: EditorGroupProps) {
  const [_isDisabled, setIsDisabled] = useState<boolean>(
    isDisabled != undefined ? isDisabled : true
  )

  const onDragEndFields = (result) => {
    if (!result.destination) {
      return
    }

    const items: any = arrayReorder(group.field, result.source.index, result.destination.index)
    console.log(items)
    items.map((field: IEditorItem, i) => {
      field.order = i + 1
    })
    group.field = items
    upd(group)
  }

  return (
    <DragDropContext onDragEnd={onDragEndFields} mode="virtual">
      <Droppable droppableId="droppableGroup">
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            bg={isDragging ? '#f9f9f9' : 'white'}
            w={'100%'}
            //h={group.field.length * 35 + 110}
            border={'1px'}
            mb={2}
            borderRadius={4}
            borderColor="blackAlpha.200"
            boxShadow="sm"
            zIndex={1}
          >
            <Flex p={1}>
              <Box w={'60px'}></Box>
              <Spacer />
              <Box>
                <Input
                  variant="unstyled"
                  w={'280px'}
                  bg={_isDisabled ? 'blackAlpha.0' : 'blackAlpha.200'}
                  borderRadius={5}
                  textAlign="center"
                  size="xs"
                  fontWeight={700}
                  fontSize={16}
                  defaultValue={group.title}
                  onChange={(event) => (group.title = event.target.value)}
                  cursor="pointer"
                  isDisabled={_isDisabled}
                  zIndex={_isDisabled ? '-1' : 1}
                  autoFocus
                ></Input>
              </Box>
              <Spacer />
              <Box w={'60px'}>
                <ButtonGroup spacing="1">
                  <Button
                    size={'xs'}
                    type="submit"
                    onClick={(e) => {
                      if (!_isDisabled) upd(group)
                      group.isDisabled = !_isDisabled
                      setIsDisabled(!_isDisabled)
                    }}
                    colorScheme={_isDisabled ? 'gray' : 'green'}
                  >
                    {_isDisabled ? 'E' : 'S'}
                  </Button>
                  <Button
                    isDisabled={group.field.length > 0 ? true : false}
                    size={'xs'}
                    onClick={() => {
                      del(group)
                    }}
                    colorScheme={'red'}
                    zIndex={1}
                  >
                    D
                  </Button>
                </ButtonGroup>
              </Box>
            </Flex>

            {group.field != undefined ? (
              <Box mt={2}>
                {group.field.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <Center
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        zIndex={10000}
                      >
                        <EditorGroupField
                          isDragging={snapshot.isDragging}
                          field={field}
                          isDisabled={field.isDisabled!}
                          //  add={addField}
                          upd={updField}
                          del={delField}
                        />
                      </Center>
                    )}
                  </Draggable>
                ))}
              </Box>
            ) : (
              <Spinner />
            )}
            {provided.placeholder}
            <Button size={'xs'} mt={2} onClick={() => addField!(group)} m={1}>
              +
            </Button>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default EditorGroup
