import { Button, FormControl, Input, Fle, Flexx, Flex, Center, ButtonGroup } from '@chakra-ui/react'
import React, { useState, useRef, Suspense } from 'react'

const FieldItem = (prop) => {
  const colomnInputVar = useRef(null)
  const colomnInputShow = useRef(null)
  // ///////////////////////////////////////////////////
  const {
    name,
    delItem,
    saveItem,
    btnPLusFlag,
    updateItem,
    dragStartHandler,
    onDragEndHandler,
    onDragOverHandler,
    dropHandler,
    id,
  } = prop

  const [disabledEdit, setDisabledEdit] = useState(btnPLusFlag)
  const [disabledSave, setDisabledSave] = useState(false)
  const [inputValueVar, setinputValueVar] = useState(name.var)
  const [inputValueShowVar, setinputValueShowVar] = useState(name.name)
  const [btnEditFlag, setBtnEditFlag] = useState(btnPLusFlag)

  const saveButton = () => {
    if (btnEditFlag) {
      console.log('UPDATE')
      setDisabledEdit(true)
      setinputValueVar(name.var)
      setinputValueShowVar(name.name)
      updateItem(name, inputValueVar)
    } else {
      console.log('SAVING')
      setDisabledEdit(true)
      setinputValueVar(name.var)
      setinputValueShowVar(name.name)
      saveItem(name)
    }
  }
  const editClick = () => {
    setDisabledEdit(false)
    setBtnEditFlag(true)
  }

  const onBlurVar = (val) => {
    if (val == '' && !btnEditFlag) {
      delItem(name.var)
    }
    if (val == '' && btnEditFlag) {
      colomnInputVar.current.value = inputValueVar
      colomnInputShow.current.value = inputValueShowVar
      name.var = inputValueVar
      setDisabledEdit(true)
      setDisabledSave(false)
    } else {
      // setDisabledEdit(true)
    }
  }
  const onBlurShowVar = (val) => {
    if (val == '' && !btnEditFlag) {
      delItem(name.name)
    }
    if ((val == '' && btnEditFlag) || name.var == '') {
      colomnInputVar.current.value = inputValueVar
      colomnInputShow.current.value = inputValueShowVar
      name.name = inputValueShowVar
      setDisabledEdit(true)
      setDisabledSave(false)
    } else {
      // setDisabledEdit(true)
    }
  }

  const onChangeInputVar = (val) => {
    name.var = val
    val == '' ? setDisabledSave(true) : setDisabledSave(false)
  }
  const onChangeInputShow = (val) => {
    name.name = val
    val == '' ? setDisabledSave(true) : setDisabledSave(false)
  }
  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        mt={2}
        border="1px"
        borderRadius="4px"
        p={1}
        borderColor="lightgrey"
        draggable={true}
        onDragStart={(e) => dragStartHandler(e, name.var, id)}
        onDragLeave={(e) => onDragEndHandler(e)}
        onDragEnd={(e) => onDragEndHandler(e)}
        onDragOver={(e) => onDragOverHandler(e, name.var, id)}
        onDrop={(e) => dropHandler(e, name.var, id)}
        gap={3}
      >
        <Center>
          <FormControl
            isDisabled={disabledEdit}
            minWidth="300px"
            onChange={(e) => onChangeInputVar(e.target.value)}
            onBlur={(e) => onBlurVar(e.target.value)}
          >
            <Input
              ref={colomnInputVar}
              defaultValue={name.var}
              type="text"
              minWidth="300px"
              placeholder="SQL переменная одним словом (ENG)"
              size="sm"
              width="auto"
            />
          </FormControl>
        </Center>
        <Center>
          <FormControl
            isDisabled={disabledEdit}
            minWidth="300px"
            className="me-auto"
            defaultValue={name.name}
            onChange={(e) => onChangeInputShow(e.target.value)}
            onBlur={(e) => onBlurShowVar(e.target.value)}
          >
            <Input
              defaultValue={name.name}
              ref={colomnInputShow}
              type="text"
              minWidth="300px"
              placeholder="Заголовок для пользователя"
              size="sm"
              width="auto"
            />
          </FormControl>
        </Center>
        <ButtonGroup>
          <Button
            isDisabled={disabledSave}
            width={'150px'}
            colorScheme={disabledEdit ? 'yellow' : 'blue'}
            size="sm"
            onClick={disabledEdit ? () => editClick() : () => saveButton()}
          >
            {disabledEdit ? 'Редактировать' : 'Сохранить'}
          </Button>

          <Suspense>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => {
                delItem(name.id, name.name)
              }}
            >
              Удалить
            </Button>
          </Suspense>
        </ButtonGroup>
      </Flex>
    </>
  )
}

export default FieldItem
