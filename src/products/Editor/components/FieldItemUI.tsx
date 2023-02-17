import { Button, ButtonGroup, Center, Flex, FormControl, Input, Spacer } from '@chakra-ui/react'
import { Suspense, useRef, useState } from 'react'

interface IFieldItemUI {
  id: Number
  title: String
  order: Number
  group?: Number
  btnPLusFlag: Boolean
  saveItem: (title: string) => void
  updateItem: (id: number, title: string) => void
  delItem: (id: number, title: string, flag?: boolean) => void
  dragStartHandler?: (e: DragEvent, id: number, order: number, group?: number) => void
  onDragEndHandler?: (e: DragEvent) => void
  onDragOverHandler?: (e: DragEvent) => void
  dropHandler?: (e: DragEvent, id: number, order: number, group?: number) => void
}
function FieldItemUI({
  id,
  title,
  order,
  group,
  btnPLusFlag,
  updateItem,
  saveItem,
  delItem,
  dragStartHandler,
  onDragEndHandler,
  onDragOverHandler,
  dropHandler,
}: IFieldItemUI) {
  const colomnInputShow = useRef<HTMLInputElement>(null)
  const [disabledEdit, setDisabledEdit] = useState<boolean>(btnPLusFlag)
  const [disabledSave, setDisabledSave] = useState<boolean>(false)
  const [inputValueShowVar, setinputValueShowVar] = useState<string>(title)
  const [btnEditFlag, setBtnEditFlag] = useState<boolean>(btnPLusFlag)
  const [draggble, setDraggble] = useState(true)

  const saveButton = async () => {
    if (btnEditFlag) {
      console.log('UPDATE')
      await setDisabledEdit(true)
      await setDisabledSave(false)

      await setinputValueShowVar(title)
      await updateItem(id, inputValueShowVar)
    } else {
      console.log('SAVING')
      await setDisabledEdit(true)
      await setDisabledSave(false)

      await setinputValueShowVar(title)
      await updateItem(id, inputValueShowVar)
    }
  }

  const editClick = () => {
    setDisabledEdit(false)
    setBtnEditFlag(true)
  }
  const onChangeInputShow = (val) => {
    title = val
    setDraggble(false)
    setinputValueShowVar(val)
    val == '' ? setDisabledSave(true) : setDisabledSave(false)
  }

  const onBlurShowVar = (val) => {
    if (val == '' && !btnEditFlag) {
      //  delItem({ id: id, flag: true, group: group })
    }
    if (val == '' && btnEditFlag) {
      colomnInputShow!.current!.value = inputValueShowVar
      title = inputValueShowVar
      setDisabledEdit(true)
      setDisabledSave(false)
    } else {
    }
  }

  return (
    <Flex
      draggable={true}
      width="100%"
      alignItems="center"
      mt={2}
      border="1px"
      borderRadius="4px"
      p={1}
      borderColor="lightgrey"
      gap={3}
      onDragStart={(e) => dragStartHandler(e, id, order, group)}
      onDragLeave={(e) => onDragEndHandler(e)}
      onDragEnd={(e) => onDragEndHandler(e)}
      onDragOver={(e) => onDragOverHandler(e)}
      onDrop={(e) => dropHandler(e, title, order, group)}
    >
      <Center>
        <FormControl
          isDisabled={disabledEdit}
          defaultValue={title}
          onChange={(e) => onChangeInputShow(e.target.value)}
          onBlur={(e) => onBlurShowVar(e.target.value)}
        >
          <Input
            ref={colomnInputShow}
            defaultValue={title}
            type="text"
            width="300px"
            placeholder="Введите название"
            size="sm"
            autoFocus
          />
        </FormControl>
      </Center>
      <Spacer />
      <ButtonGroup>
        <Suspense>
          <Button
            isDisabled={disabledSave}
            width={'150px'}
            colorScheme={disabledEdit ? 'yellow' : 'blue'}
            size="sm"
            onClick={disabledEdit ? () => editClick() : () => saveButton()}
          >
            {disabledEdit ? 'Редактировать' : 'Сохранить'}
          </Button>

          <Button colorScheme="red" size="sm" onClick={() => delItem(id, title)}>
            Удалить
          </Button>
        </Suspense>
      </ButtonGroup>
    </Flex>
  )
}

export default FieldItemUI
