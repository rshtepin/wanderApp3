import { IEditorTab } from 'src/types'
import { Button, HStack, Center } from '@chakra-ui/react'
import EditorTabInput from './EditorTabInput'
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd'
import arrayReorder from 'src/products/helpers/arrayReorder'
interface EditorTypesProps {
  type: IEditorTab[]
  currentTab: IEditorTab
  reorderTypes?: (type: IEditorTab[]) => void
  add?: React.MouseEventHandler<HTMLButtonElement>
  onChange: (tab: IEditorTab) => void
  del: (tab: IEditorTab) => void
  upd: (tab: IEditorTab) => void
}
export function EditorTypesMenu({
  upd,
  add,
  del,
  reorderTypes,
  currentTab,
  onChange,
  type,
}: EditorTypesProps) {
  resetServerContext()
  const onDragEndTypes = (result) => {
    if (!result.destination) {
      return
    }

    const items = arrayReorder(type, result.source.index, result.destination.index)
    console.log(items)
    items.map((_type: IEditorGroup, i) => {
      _type.order = i + 1
    })
    reorderTypes(items)
  }
  return (
    <DragDropContext onDragEnd={onDragEndTypes}>
      <Droppable droppableId="droppableTabs" direction="horizontal">
        {(provided, snapshot) => (
          <HStack spacing="24px" {...provided.droppableProps} ref={provided.innerRef}>
            <Button size={'xs'} mt={2} onClick={add}>
              +
            </Button>

            {type.map((tab: IEditorTab, index) => (
              <Draggable key={tab.id} draggableId={tab.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <Center
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    //key={tab.id}
                    w="160px"
                    h="45px"
                    bg={currentTab.id == tab.id ? 'cyan.100' : 'blackAlpha.200'}
                    borderRadius={5}
                    border={currentTab.id == tab.id ? '1px' : '0'}
                    borderColor="blackAlpha.400"
                    onClick={() => {
                      onChange(tab)
                    }}
                    zIndex={0}
                  >
                    <Center>
                      <EditorTabInput
                        key={tab.id}
                        tab={tab}
                        isDisabled={tab.isDisabled}
                        del={del}
                        upd={upd}
                      />
                    </Center>
                  </Center>
                )}
              </Draggable>
            ))}
          </HStack>
        )}
      </Droppable>
    </DragDropContext>
  )
}
