import { useMutation, usePaginatedQuery } from '@blitzjs/rpc'
import { Button, Container, Flex, Heading, Spacer } from '@chakra-ui/react'
import { title } from 'process'

import { useEffect, useRef, useState } from 'react'
import getTypes from 'src/products/queries/getTypes'
import { IProductTypes } from 'src/types'
import addUpdateProductType from '../mutations/addUpdateProductType'
import delProductType from '../mutations/delProductType'
import FieldItemUI from './FieldItemUI'

function TypesEditor() {
  const [{ types }]: IProductTypes[] = usePaginatedQuery(getTypes, {
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

  const updateItem = async (id, title) => {
    console.log(title)
    await addUpdateProductTypeMutation({ id: id, title: title })
  }
  const addItem = async () => {
    await setFVis(false)
    setEditorTypes((prevVals: IProductTypes[]) => [
      ...prevVals,
      { id: editorTypes.length + 1, title: '', order: editorTypes.length + 1 },
    ])

    await updateState()
  }

  const saveItem = async (title) => {
    await addUpdateProductTypeMutation({ id: -1, title: title })
    await updateState()
  }
  const updateState = async () => {
    setEditorTypes((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.order != prevState.indexOf(obj) + 1) {
          console.log('obj.order=' + obj.order + ' index=' + (prevState.indexOf(obj) + 1))
          return {
            ...obj,
            order: prevState.indexOf(obj) + 1,
          }
        }
        return obj
      })
      console.log(newState)
      return newState
    })
  }
  function arrayMove(arr, oldindex, newindex) {
    if (newindex >= arr.length) {
      let k = newindex - arr.length + 1
      while (k--) {
        arr.push(undefined)
      }
    }
    arr.splice(newindex, 0, arr.splice(oldindex, 1)[0])
    return arr
  }

  const delItem = async (id: number, title: string) => {
    let isDel = confirm('Удалить поле ' + title + ' ?')
    if (isDel) {
      console.log('DELETE ' + id)
      let arr = [...editorTypes]
      arr = arr.filter((item) => item.id !== id)
      setEditorTypes([...arr])
      if (id != undefined) {
        await delProductTypeMutation({ id: id })
      }
    }
    await updateState()
  }
  function dragStartHandler(e, name, id) {
    console.log('drag ' + name + ' id: ' + id)
    setCurrnetField(id)
  }
  function onDragEndHandler(e) {}
  function onDragOverHandler(e, name, id) {
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

    await updateState()
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
