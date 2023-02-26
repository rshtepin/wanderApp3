import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Button, Container, Flex, Heading, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ProductTypesMenu } from 'src/products/Editor/components/EditorTypesMenu'
import getProductGroups from 'src/products/mutations/getProductGroups'
import getTypes from 'src/products/mutations/getTypes'
import { IProductGroups, IProductTypes } from 'src/types'
import addUpdateProductGroup from '../mutations/addUpdateProductGroup'
import delProductGroup from '../mutations/delProductGroup'
import FieldItemUI from './FieldItemUI'

function GroupsEditor() {
  const [{ types }] = usePaginatedQuery(getTypes, {
    orderBy: { order: 'asc' },
  })

  const groups = usePaginatedQuery(getProductGroups, {})

  const [fVis, setFVis] = useState<boolean>(true)
  const [editorGroups, setEditorGroups] = useState<IProductGroups[]>([])
  const [currentField, setCurrnetField] = useState(null)
  const [currentTab, SetCurrnetTab] = useState<IProductTypes>(types[0])

  const [addUpdateProductGroupMutation] = useMutation(addUpdateProductGroup)
  const [delProductGroupMutation] = useMutation(delProductGroup)

  useEffect(() => {
    let arr: IProductGroups[] = []
    groups[0].map((group: IProductGroups) => {
      if (group.typeId == currentTab.id) {
        arr.push(group)
      }
    })
    return setEditorGroups(arr)
  }, [currentTab])

  const updateItem = async (id: number, title: string) => {
    await addUpdateProductGroupMutation({ id: id, title: title, typeId: currentTab.id })
    await setEditorGroups((prevState: IProductGroups) => {
      const newState = prevState.map((obj) => {
        if (obj.id == id) {
          return {
            ...obj,
            title: title,
            typeId: currentTab,
          }
        }
        return obj
      })
      return newState
    })
  }

  const addItem = async () => {
    await setFVis(false)
    const newField: IProductGroups = await addUpdateProductGroupMutation({
      id: -1,
      title: '',
      order: editorGroups.length + 1,
      typeId: currentTab.id,
    })
    setEditorGroups((prevVals: IProductGroups[]) => [
      ...prevVals,
      { id: newField.id, title: newField.title, order: newField.order, typeId: newField.typeId },
    ])
  }

  const saveItem = async (title) => {
    await addUpdateProductGroupMutation({ id: -1, title: title, typeId: currentTab.id })
    await updateStateOrder()
  }

  const updateStateOrder = async () => {
    setEditorGroups((prevState) => {
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
      let arr = [...editorGroups]
      arr = arr.filter((item) => item.id !== id)
      setEditorGroups([...arr])
      if (id != undefined) {
        await delProductGroupMutation({ id: id })
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
    setEditorGroups([...arrayMove(editorGroups, currentField - 1, id - 1)])
    await editorGroups.map(async (field) => {
      {
        if (field.order != editorGroups.indexOf(field) + 1) {
          await addUpdateProductGroupMutation({
            id: field.id,
            title: field.title,
            order: editorGroups.indexOf(field) + 1,
            typeId: currentTab.id,
          })
        }
      }
    })

    await updateStateOrder()
  }
  const tabsChange = async (type: IProductTypes) => {
    await SetCurrnetTab(() => {
      return type
    })
  }

  return (
    <>
      <Heading size={'xm'}>Группы характеристик</Heading>
      <div style={{ width: '50vw', padding: '4px 0 20px 0' }}>
        <ProductTypesMenu type={types} onChange={tabsChange} />
      </div>
      {editorGroups.map((group: IProductGroups) => (
        <FieldItemUI
          key={group.id}
          id={group.id}
          title={group.title}
          order={group.order}
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
export default GroupsEditor
