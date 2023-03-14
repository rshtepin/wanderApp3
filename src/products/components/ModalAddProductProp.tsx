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
import { type } from 'os'
import React, { useState } from 'react'
import { IProduct, IProductGroups, IProductTypes } from 'src/types'

interface ModalAddProductProps {
  show: boolean
  onHide: () => void
  onSave: (newProduct: IProduct) => void
  onClose: () => void
  types: IProductTypes[]
}

const ModalAddProductProp = (prop: ModalAddProductProps) => {
  const { show, onHide, onSave, onClose, types } = prop
  const [modVars, setModVars] = useState<IProduct>({ id: -1, typeId: -1, title: '', order: -1 })
  const [disabledBtn, setDisabledBtn] = useState(true)

  const handleSave = () => {
    onSave(modVars)
    setDisabledBtn(true)
    onHide()
  }
  return (
    <>
      <Modal isOpen={show} onClose={onHide}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить продукт</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              id="newProductTitle"
              color={'black'}
              placeholder="Введите название продукта"
              onChange={(e) => {
                setModVars({
                  id: modVars.id,
                  typeId: modVars.typeId,
                  title: e.target.value,
                  order: modVars.order,
                })
                setDisabledBtn(e.target.value === '' || modVars.typeId === -1 ? true : false)
              }}
            />
            <Select
              id="type"
              color={'black'}
              placeholder="Выберите тип продукта"
              onChange={(e) => {
                setModVars({
                  id: modVars.id,
                  title: modVars.title,
                  typeId: parseInt(e.currentTarget.value),
                  order: modVars.order,
                })
                setDisabledBtn(e.currentTarget.value === '' || modVars.title === '' ? true : false)
              }}
            >
              {types.map((i: IProductTypes) => {
                return (
                  <option key={i.id} value={i.id}>
                    {i.title}
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
