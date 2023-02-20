import { IEditorTab } from 'src/types'
import { Button, HStack, Center } from '@chakra-ui/react'
import EditorTabInput from './EditorTabInput'

interface EditorTypesProps {
  type: IEditorTab[]
  currentTab: IEditorTab
  add?: React.MouseEventHandler<HTMLButtonElement>
  onChange: (tab: IEditorTab) => void
  del: () => void
  upd: (tab: IEditorTab) => void
}
export function EditorTypesMenu({ upd, add, del, currentTab, onChange, type }: EditorTypesProps) {
  return (
    <HStack spacing="24px">
      <Button size={'xs'} mt={2} onClick={add}>
        +
      </Button>
      {type.map((tab: IEditorTab, index) => (
        <Center
          key={tab.id}
          w="140px"
          h="40px"
          bg={currentTab.id == tab.id ? 'cyan.100' : 'blackAlpha.200'}
          borderRadius={5}
          onClick={() => {
            onChange(tab)
          }}
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
      ))}
    </HStack>
  )
}
