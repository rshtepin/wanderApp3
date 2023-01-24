import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const ModalAddProductProp = (prop) => {
  const { show, onHide, onSave, onClose } = prop
  const [modVars, setModVars] = useState('')
  const [disabledBtn, setDisabledBtn] = useState(true)

  const handleSave = () => {
    console.log(modVars)
    onSave(modVars)
    setDisabledBtn(true)
    onHide()
  }
  // const handleShow = () => {
  //   return (show)
  // }

  return (
    <>
      <Modal isOpen={show} onClose={onHide}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить продукт</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Введите название продукта"
              onChange={(e) => {
                setDisabledBtn(e.target.value != '' ? false : true)
                setModVars(e.target.value)
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button colorScheme="blue" isDisabled={!modVars} onClick={handleSave}>
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalAddProductProp
