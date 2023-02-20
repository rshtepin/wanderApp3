import { Button, ButtonGroup, Input } from '@chakra-ui/react'
import { render } from '@testing-library/react'
import { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
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
        bg={_isDisabled ? 'blackAlpha.0' : 'white'}
        borderRadius={5}
        textAlign="center"
        size="xs"
        defaultValue={tab.title}
        onChange={(event) => (tab.title = event.target.value)}
        cursor="pointer"
        zIndex={1}
        isDisabled={_isDisabled}
        autoFocus
      ></Input>

      <Button
        ml={0.5}
        size={'xs'}
        type="submit"
        onClick={(e) => {
          upd(tab)
          setIsDisabled(!_isDisabled)
        }}
        colorScheme={_isDisabled ? 'gray' : 'green'}
      >
        {_isDisabled ? 'E' : 'S'}
      </Button>
      <Button
        ml={0.5}
        size={'xs'}
        onClick={() => {
          del(tab)
        }}
        colorScheme={'red'}
      >
        D
      </Button>
    </>
  )
}

export default EditorTabInput
