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
  Select,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const ModalAddProductProp = (prop) => {
  const { show, onHide, onSave, onClose, productTypes } = prop
  const [modVars, setModVars] = useState({ title: '', type: '' })
  const [disabledBtn, setDisabledBtn] = useState(true)
  const productType = Object.keys(productTypes)

  const handleSave = () => {
    console.log(modVars)
    onSave(modVars)
    setDisabledBtn(true)
    onHide()
  }
  // const handleShow = () => {
  //   return (show)

  // }
  console.log('modVars.title')
  console.log(modVars.title)
  console.log('modVars.type')
  console.log(modVars.type)

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
                setModVars({ title: e.target.value, type: modVars.type })
                setDisabledBtn(e.target.value === '' || modVars.type === '' ? true : false)
              }}
            />
            <Select
              id="type"
              placeholder="Выберите тип продукта"
              onChange={(e) => {
                setModVars({ type: e.target.value, title: modVars.title })
                setDisabledBtn(e.target.value === '' || modVars.title === '' ? true : false)
                console.log(modVars.type)
              }}
            >
              {productType.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                )
              })}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button colorScheme="blue" isDisabled={disabledBtn} onClick={handleSave}>
              Сохранить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalAddProductProp
