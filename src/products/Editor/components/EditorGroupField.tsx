import { Button, ButtonGroup, Flex, Input, Spacer } from '@chakra-ui/react'
import { useState } from 'react'
import { IEditorItem } from 'src/types'

interface EditorGroupFieldProps {
  field: IEditorItem
  isDisabled: boolean
  upd: (field: IEditorItem) => void
  del: (field: IEditorItem) => void
}
function EditorGroupField({ field, isDisabled, upd, del }: EditorGroupFieldProps) {
  const [_isDisabled, setIsDisabled] = useState<boolean>(
    isDisabled != undefined ? isDisabled : true
  )

  return (
    <Flex w={'90%'} borderRadius={4} borderColor="blackAlpha.200">
      <ButtonGroup spacing="1" mr={1}>
        <Button
          size={'xs'}
          type="submit"
          onClick={(e) => {
            upd(field)
            field.isDisabled = !_isDisabled
            setIsDisabled(!_isDisabled)
          }}
          colorScheme={_isDisabled ? 'gray' : 'green'}
        >
          {_isDisabled ? 'E' : 'S'}
        </Button>
        <Button
          size={'xs'}
          onClick={() => {
            del(field)
          }}
          colorScheme={'red'}
          zIndex={1000}
        >
          D
        </Button>
      </ButtonGroup>
      <Flex
        p={1}
        w={'90%'}
        border={'1px'}
        mb={2}
        borderRadius={4}
        borderColor="blackAlpha.200"
        boxShadow="sm"
      >
        <Input
          variant="unstyled"
          bg="blackAlpha.0"
          borderRadius={5}
          textAlign="left"
          size="xs"
          defaultValue={field.title}
          onChange={(event) => (field.title = event.target.value)}
          cursor="pointer"
          isDisabled={_isDisabled}
          zIndex={1}
          autoFocus
        ></Input>

        <Spacer />
        <Input
          variant="unstyled"
          w={'30px'}
          bg="blackAlpha.400"
          fontWeight={700}
          borderRadius={5}
          textAlign="center"
          size="xs"
          defaultValue={field.unit}
          onChange={(event) => (field.unit = event.target.value)}
          cursor="pointer"
          isDisabled={_isDisabled}
          zIndex={1}
        ></Input>
      </Flex>
    </Flex>
  )
}

export default EditorGroupField
