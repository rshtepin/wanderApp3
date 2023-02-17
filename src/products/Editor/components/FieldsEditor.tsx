import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Button, Container, Flex, Heading, Spacer, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ProductTypesMenu } from 'src/products/components/productTypesMenu'
import getAllFields from 'src/products/queries/getAllFields'

import getProductGroups from 'src/products/queries/getProductGroups'
import getTypes from 'src/products/queries/getTypes'
import { IProductFields, IProductGroups, IProductTypes } from 'src/types'
import addUpdateProductField from '../mutations/addUpdateProductField'
import delProductType from '../mutations/delProductType'
import FieldItemUI from './FieldItemUI'

function FieldsEditor() {
  const [{ types }] = usePaginatedQuery(getTypes, {})
  const groups = useQuery(getProductGroups, {})

  const [{ fields }] = usePaginatedQuery(getAllFields, { orderBy: { order: 'asc' } })

  const [fVis, setFVis] = useState<boolean>(true)
  const [editorGroups, setEditorGroups] = useState<IProductGroups[]>([])
  const [currentField, setCurrnetField] = useState(null)
  const [currentTab, SetCurrnetTab] = useState<IProductTypes>(types[0])

  const [addUpdateProductFieldMutation] = useMutation(addUpdateProductField)
  const [delProductTypeMutation] = useMutation(delProductType)

  useEffect(() => {
    let mystate = []
    groups[0].map((itemG: IProductGroups) => {
      if (itemG.typeId == currentTab.id) {
        const addFileds = []
        fields.map((itemF: IProductFields) => {
          itemF.id_group == itemG.id ? addFileds.push(itemF) : next
        })
        mystate.push({ ...itemG, fields: addFileds })
      }
    })
    setEditorGroups(mystate)
    console.log('mystate')
    console.log(mystate)
  }, [currentTab])

  const updateItem = async (id: number, title: string) => {
    await addUpdateProductFieldMutation({ id: id, title: title, typeId: currentTab.id })
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
      console.log(newState)
      return newState
    })
  }

  const addItem = async (idGroup) => {
    await setFVis(false)
    console.log('PLUS')
    console.log(idGroup)

    // const newField: IProductFields = await addUpdateProductFieldMutation({
    //   id: -1,
    //   title: '',
    //   id_group: editorGroups[0]!.id,
    //   order: editorGroups[0]!.fields!.length + 1,
    // })
    // console.log(newField)
    // setEditorGroups((prevVals: IProductGroups[]) => [
    //   ...prevVals,
    //   { id: newField.id, title: newField.title, order: newField.order, typeId: newField.typeId },
    // ])
  }

  const saveItem = async (title) => {
    await addUpdateProductFieldMutation({ id: -1, title: title, typeId: currentTab.id })
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
    setEditorGroups([...arrayMove(editorGroups, currentField - 1, id - 1)])
    await editorGroups.map(async (field) => {
      {
        if (field.order != editorGroups.indexOf(field) + 1) {
          await addUpdateProductFieldMutation({
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
      <Heading size={'xm'}>Поля групп</Heading>
      <div style={{ width: '50vw', padding: '4px 0 20px 0' }}>
        <ProductTypesMenu type={types} onChange={tabsChange} />
      </div>
      {editorGroups.map((group: IProductGroups) => (
        <VStack
          p={2}
          border="1px"
          borderRadius="5px"
          borderColor="#FFFFF0"
          boxShadow="base"
          minH={20}
          mt={4}
          key={group.id}
          draggable={true}
          // onDragStart={(e) => dragStartHandlerGroup(e, group)}
          onDrop={(e) => dropHandlerGroup(e, group)}
          onDragOver={(e) => onDragOverHandler(e)}
        >
          <div>{group.title}</div>
          {group.fields.map((field) => (
            <FieldItemUI
              key={field.id}
              id={field.id}
              title={field.title}
              order={field.order}
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
          <Button key={group.id} mt={2} onClick={() => addItem(group.id)}>
            +
          </Button>
        </VStack>
      ))}
      <Container>
        <Flex>
          <Spacer />
        </Flex>
      </Container>
    </>
  )
}
export default FieldsEditor
