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
  const [disabledEdit, setDisabledEdit] = useState(!btnPLusFlag)
  const [disabledSave, setDisabledSave] = useState(true)
  const [showInput, setShowInput] = useState(btnPLusFlag)
  const [inputValueVar, setinputValueVar] = useState(name.var)
  const [inputValueShowVar, setinputValueShowVar] = useState(name.name)
  const [btnEditFlag, setBtnEditFlag] = useState(false)

  const saveButton = () => {
    if (btnEditFlag) {
      setShowInput(true)
      setinputValueVar(name.var)
      setinputValueShowVar(name.name)
      updateItem(name, inputValueVar)
      setDisabledEdit(false)
      setDisabledSave(true)
    } else {
      setShowInput(true)
      setinputValueVar(name.var)
      setinputValueShowVar(name.name)
      saveItem(name)
      setDisabledEdit(false)
      setDisabledSave(true)
    }
  }
  const editClick = () => {
    setDisabledEdit(true)
    setBtnEditFlag(true)
    setShowInput(false)

    setDisabledSave(false)
  }

  const onBlurVar = (val) => {
    console.log(inputValueVar)
    if (val == '' && !btnEditFlag) {
      delItem(name.var)
    }
    if (val == '' && btnEditFlag) {
      colomnInputVar.current.value = inputValueVar
      colomnInputShow.current.value = inputValueShowVar
      name.var = inputValueVar
      setDisabledEdit(false)
      setDisabledSave(true)
      setShowInput(true)
    } else {
      setDisabledEdit(true)
      setDisabledSave(false)
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
      setDisabledEdit(false)
      setDisabledSave(true)
      setShowInput(true)
    } else {
      setDisabledEdit(true)
      setDisabledSave(false)
    }
  }

  const onChangeInputVar = (val) => {
    console.log(inputValueShowVar)
    name.var = val
    if (name.name == '' || name.var == '') {
      setDisabledEdit(true)
      setDisabledSave(true)
    } else {
      setDisabledSave(false)
    }
  }
  const onChangeInputShow = (val) => {
    name.name = val
    if (name.name == '' || name.var == '') {
      setDisabledEdit(true)
      setDisabledSave(true)
    } else {
      setDisabledSave(false)
    }
  }
  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        mt={3}
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
            minWidth="300px"
            onChange={(e) => onChangeInputVar(e.target.value)}
            onBlur={(e) => onBlurVar(e.target.value)}
          >
            <Input
              ref={colomnInputVar}
              disabled={showInput}
              defaultValue={name.var}
              type="text"
              minWidth="300px"
              placeholder="SQL переменная одним словом (ENG)"
              size="sm"
              width="auto"
              autoFocus
            />
          </FormControl>
        </Center>
        <Center>
          <FormControl
            minWidth="300px"
            className="me-auto"
            defaultValue={name.name}
            onChange={(e) => onChangeInputShow(e.target.value)}
            onBlur={(e) => onBlurShowVar(e.target.value)}
          >
            <Input
              defaultValue={name.name}
              ref={colomnInputShow}
              disabled={showInput}
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
            colorScheme="yellow"
            size="sm"
            isDisabled={disabledEdit}
            onClick={() => editClick()}
          >
            Редактировать
          </Button>

          <Button
            colorScheme="blue"
            size="sm"
            isDisabled={disabledSave}
            onClick={() => saveButton()}
          >
            Сохранить
          </Button>
          <Suspense>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => {
                delItem(name.var)
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
