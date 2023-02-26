import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Button, Container, Flex, Heading, Spacer, VStack } from '@chakra-ui/react'
import { group } from 'console'
import { useEffect, useState } from 'react'
import { ProductTypesMenu } from 'src/products/Editor/components/EditorTypesMenu'
import getAllFields from 'src/products/queries/getAllFields'

import getProductGroups from 'src/products/mutations/getProductGroups'
import getTypes from 'src/products/mutations/getTypes'
import { IProductFields, IProductGroups, IProductTypes } from 'src/types'
import addUpdateProductField from '../mutations/addUpdateProductField'
import delProductField from '../mutations/delProductField'

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
  const [delProductFieldMutation] = useMutation(delProductField)

  useEffect(() => {
    let mystate: IProductGroups[] = []
    groups[0].map((itemG: IProductGroups) => {
      if (itemG.typeId == currentTab.id) {
        const addFileds: IProductFields[] = []
        fields.map((itemF: IProductFields) => {
          itemF.id_group == itemG.id ? addFileds.push(itemF) : {}
        })
        mystate.push({ ...itemG, fields: addFileds })
      }
    })
    setEditorGroups(mystate)
    console.log('mystate')
    console.log(mystate)
  }, [currentTab])

  const updateItem = async (id: number, title: string, group: IProductGroups) => {
    await addUpdateProductFieldMutation({ id: id, title: title, id_group: group.id })
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

  const addItem = async (group: IProductGroups) => {
    await setFVis(false)
    console.log('PLUS')
    console.log(group)

    const newField: IProductFields = await addUpdateProductFieldMutation({
      id: -1,
      title: '',
      id_group: group.id,
      order: group!.fields!.length + 1,
    })
    console.log(newField)
    setEditorGroups((prev) => [
      ...prev.map((_group: IProductGroups) => {
        _group.id === newField.id_group
          ? _group.fields!.push({
              id: _group.fields!.length + 1,
              title: '',
              id_group: newField.id_group,
              order: _group.fields!.length + 1,
            })
          : {}
        return _group
      }),
    ])

    // setEditorGroups((prevVals: IProductGroups[]) => [
    //   ...prevVals,
    //   { id: newField.id, title: newField.title, order: newField.order, typeId: newField.typeId },
    // ])
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

  const delItem = async (id: number, title: string, group: IProductGroups) => {
    let isDel = confirm('Удалить поле ' + title + ' ?')
    if (isDel) {
      let arr: JSON = []
      arr = JSON.parse(JSON.stringify(editorGroups))
      delProductFieldMutation({ id: id })

      delete arr[editorGroups.indexOf(group)].fields[
        editorGroups[editorGroups.indexOf(group)]?.fields?.findIndex(
          (field: IProductFields, index) => field.id == id
        )
      ]
      let room = {
        number: 23,
      }

      let meetup = {
        title: 'Conference',
        participants: [{ name: 'John' }, { name: 'Alice' }],
        place: room, // meetup ссылается на room
      }

      room.occupiedBy = meetup // room ссылается на meetup

      alert(
        JSON.stringify(meetup, function replacer(key, value) {
          alert(`${key}: ${value}`)
          return key == 'occupiedBy' ? undefined : value
        })
      )
      setEditorGroups(arr)
    }
    // await updateStateOrder()
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
    editorGroups.map(async (field) => {
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
              group={group}
              unit="g"
              delItem={delItem}
              btnPLusFlag={fVis}
              dragStartHandler={dragStartHandler}
              onDragEndHandler={onDragEndHandler}
              onDragOverHandler={onDragOverHandler}
              dropHandler={dropHandler}
            />
          ))}
          <Button key={group.id} mt={2} onClick={() => addItem(group)}>
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
