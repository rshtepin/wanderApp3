import { Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { IEditorTab } from 'src/types'
interface IEditorTabInput {
  tab: IEditorTab
  isDisabled?: boolean
  upd: (tab: IEditorTab) => void
  del: (tab: IEditorTab) => void
}

function EditorTabInput({ upd, del, tab, isDisabled }: IEditorTabInput) {
  const [_isDisabled, setIsDisabled] = useState<boolean>(
    isDisabled != undefined ? isDisabled : true
  )

  return (
    <>
      <Input
        variant="unstyled"
        w={'80px'}
        bg={_isDisabled ? '' : 'gray.100'}
        borderRadius={5}
        textAlign="center"
        size="xs"
        defaultValue={tab.title}
        onChange={(event) => (tab.title = event.target.value)}
        cursor="pointer"
        zIndex={_isDisabled ? -1 : 1}
        isDisabled={_isDisabled}
        autoFocus
      ></Input>

      <Button
        ml={0.5}
        size={'xs'}
        type="submit"
        onClick={(e) => {
          if (!_isDisabled) upd(tab)
          setIsDisabled(!_isDisabled)
        }}
        colorScheme={_isDisabled ? 'gray' : 'green'}
      >
        {_isDisabled ? 'E' : 'S'}
      </Button>
      <Button
        isDisabled={tab.group!.length > 0 ? true : false}
        ml={0.5}
        size={'xs'}
        onClick={() => {
          del(tab)
        }}
        colorScheme={'red'}
        zIndex={0}
      >
        D
      </Button>
    </>
  )
}

export default EditorTabInput
