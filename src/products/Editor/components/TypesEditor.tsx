import { useMutation, usePaginatedQuery } from '@blitzjs/rpc'
import { Button, Container, Flex, Heading, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import getTypes from 'src/products/mutations/getTypes'
import { IProductTypes } from 'src/types'
import addUpdateProductType from '../mutations/addUpdateProductType'
import delProductType from '../mutations/delProductType'
import FieldItemUI from './FieldItemUI'

function TypesEditor() {
  const [{ types }] = usePaginatedQuery(getTypes, {
    where: {},
  })

  useEffect(() => {
    return setEditorTypes(types)
  }, [])

  const [fVis, setFVis] = useState<boolean>(true)
  const [editorTypes, setEditorTypes] = useState<IProductTypes[]>([])
  const [currentField, setCurrnetField] = useState(null)

  const [addUpdateProductTypeMutation] = useMutation(addUpdateProductType)
  const [delProductTypeMutation] = useMutation(delProductType)

  const updateItem = async (id: number, title: string) => {
    await addUpdateProductTypeMutation({ id: id, title: title })
    setEditorTypes((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id == id) {
          return {
            ...obj,
            title: title,
          }
        }
        return obj
      })
      console.log(newState)
      return newState
    })
  }

  const addItem = async () => {
    await setFVis(false)
    const newField: IProductTypes = await addUpdateProductTypeMutation({
      id: -1,
      title: '',
      order: editorTypes.length + 1,
    })
    setEditorTypes((prevVals: IProductTypes[]) => [
      ...prevVals,
      { id: newField.id, title: newField.title, order: newField.order },
    ])
  }

  const saveItem = async (title) => {
    await addUpdateProductTypeMutation({ id: -1, title: title })
    await updateStateOrder()
  }

  const updateStateOrder = async () => {
    setEditorTypes((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.order != prevState.indexOf(obj) + 1) {
          // console.log('obj.order=' + obj.order + ' index=' + (prevState.indexOf(obj) + 1))
          return {
            ...obj,
            order: prevState.indexOf(obj) + 1,
          }
        }
        return obj
      })
      return newState
    })
  }

  function arrayMove(arr, oldIndex: number, newIndex: number) {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1
      while (k--) {
        arr.push(undefined)
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
    return arr
  }

  const delItem = async (id: number, title: string) => {
    let isDel = confirm('Удалить поле ' + title + ' ?')
    if (isDel) {
      let arr = [...editorTypes]
      arr = arr.filter((item) => item.id !== id)
      setEditorTypes([...arr])
      if (id != undefined) {
        await delProductTypeMutation({ id: id })
      }
    }
    await updateStateOrder()
  }

  function dragStartHandler(id) {
    setCurrnetField(id)
  }

  function onDragEndHandler(e) {}

  function onDragOverHandler(e) {
    e.preventDefault()
  }

  async function dropHandler(e, name, id) {
    e.preventDefault()
    setEditorTypes([...arrayMove(editorTypes, currentField - 1, id - 1)])
    await editorTypes.map(async (field) => {
      {
        if (field.order != editorTypes.indexOf(field) + 1) {
          await addUpdateProductTypeMutation({
            id: field.id,
            title: field.title,
            order: editorTypes.indexOf(field) + 1,
          })
        }
      }
    })

    await updateStateOrder()
  }

  return (
    <>
      <Heading size={'xm'}>Типы продуктов</Heading>
      {editorTypes.map((type) => (
        <FieldItemUI
          key={type.id}
          id={type.id}
          title={type.title}
          order={type.order}
          updateItem={updateItem}
          saveItem={saveItem}
          delItem={delItem}
          btnPLusFlag={fVis}
          dragStartHandler={dragStartHandler}
          onDragEndHandler={onDragEndHandler}
          onDragOverHandler={onDragOverHandler}
          dropHandler={dropHandler}
        />
      ))}
      <Container>
        <Flex>
          <Spacer />
          <Button mt={2} onClick={addItem}>
            +
          </Button>
        </Flex>
      </Container>
    </>
  )
}
export default TypesEditor
