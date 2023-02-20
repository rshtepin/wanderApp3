import { Box, Button, ButtonGroup, Center, Flex, Input, Spacer, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IEditorGroup } from 'src/types'
import EditorGroupField from './EditorGroupField'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface EditorGroupProps {
  group: IEditorGroup
  isDisabled: boolean
  upd: (group: IEditorGroup) => void
  del: (group: IEditorGroup) => void
  addField?: (group: IEditorGroup) => void
  updField?: () => void
  delField?: () => void
}

function EditorGroup({
  group,
  isDisabled,
  del,
  upd,
  addField,
  updField,
  delField,
}: EditorGroupProps) {
  const [_isDisabled, setIsDisabled] = useState<boolean>(
    isDisabled != undefined ? isDisabled : true
  )
  return (
    <DragDropContext>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            w={'100%'}
            border={'1px'}
            mb={2}
            borderRadius={4}
            borderColor="blackAlpha.200"
            boxShadow="sm"
          >
            <Flex p={1}>
              <Box w={'60px'}></Box>
              <Spacer />
              <Box>
                <Input
                  variant="unstyled"
                  w={'280px'}
                  bg="blackAlpha.100"
                  borderRadius={5}
                  textAlign="center"
                  size="xs"
                  fontWeight={700}
                  fontSize={16}
                  defaultValue={group.title}
                  onChange={(event) => (group.title = event.target.value)}
                  cursor="pointer"
                  isDisabled={_isDisabled}
                  zIndex={1}
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
                      upd(group)
                      group.isDisabled = !_isDisabled
                      setIsDisabled(!_isDisabled)
                    }}
                    colorScheme={_isDisabled ? 'gray' : 'green'}
                  >
                    {_isDisabled ? 'E' : 'S'}
                  </Button>
                  <Button
                    size={'xs'}
                    onClick={() => {
                      del(group)
                    }}
                    colorScheme={'red'}
                    zIndex={1000}
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
                      >
                        <EditorGroupField
                          field={field}
                          isDisabled={field.isDisabled}
                          add={addField}
                          upd={updField}
                          del={delField}
                        />
                      </Center>
                    )}
                  </Draggable>
                ))}
                <Button size={'xs'} mt={2} onClick={() => addField(group)} m={1}>
                  +
                </Button>
              </Box>
            ) : (
              <Spinner />
            )}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default EditorGroup
