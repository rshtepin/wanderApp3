import { Suspense, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@blitzjs/rpc'
import Head from 'next/head'
import Layout from 'src/core/layouts/Layout'
import { Button, Container, Flex, Select } from '@chakra-ui/react'
import FieldItem from 'src/products/template-editor/FieldItem'
import getAllFields from 'src/products/template-editor/queries/getAllFields'

import { usePagination } from 'src/core/hooks/usePagination'
import { usePaginatedQuery } from '@blitzjs/rpc'
import addUpdateProductField from 'src/products/template-editor/mutations/addUpdateProductField'

import delProductField from 'src/products/template-editor/mutations/delProductField'
import getAllGroupFields from 'src/products/template-editor/groupseditor/queries/getAllGroupFields'
import { A } from 'vitest/dist/index-9f5bc072'
import next from 'next'

const TemplatEditorList = () => {
  const [delProductFieldMutation] = useMutation(delProductField)
  const [addUpdateProductFieldMutation] = useMutation(addUpdateProductField)
  const pagination = usePagination()

  const [editorFields, setEditorFields] = useState<any>([])
  const [fVis, setFVis] = useState(true)
  const [currentField, setCurrnetField] = useState(null)
  const [currentGroup, setCurrnetGroup] = useState<any>(null)
  const [fieldGroups, setFieldGroups] = useState<any>([])

  const [{ fields, hasMore }] = usePaginatedQuery(getAllFields, {
    orderBy: { order: 'asc' },
    skip: 0 * pagination.page,
    take: 100,
  })
  const [{ groups }] = usePaginatedQuery(getAllGroupFields, {
    orderBy: { order: 'asc' },
    skip: 0 * pagination.page,
    take: 100,
  })
  useEffect(() => {
    setEditorFields(fields)
    let mystate = []
    groups.map((itemG: any, index) => {
      const addFileds = []
      fields.map((itemF) => {
        itemF.id_group == itemG.id ? addFileds.push(itemF) : console.log()
      })
      mystate.push({ ...itemG, fields: addFileds })
    })
    setFieldGroups(mystate)
    console.log('STATE:')
    console.log(mystate)
  }, [])
  // console.log('Группы: ' + JSON.stringify(groups))
  // console.log('Поля: ' + JSON.stringify(fields))
  const updateState = async () => {
    setEditorFields((prevState) => {
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
  function dragStartHandler(e, name, order, group) {
    console.log(
      'Схватили поле с именем: ' +
        name.name +
        ' из группы: ' +
        group.name +
        ' Порядковый норме: ' +
        order
    )
    setCurrnetField(name)
    setCurrnetGroup(group)
  }
  function onDragEndHandler(e) {}
  function onDragOverHandler(e) {
    e.preventDefault()
  }

  async function dropHandler(e, name, order, group) {
    e.preventDefault()
    console.log('Name в dropHandler: ' + JSON.stringify(name))
    const currentIndex = currentGroup.fields.indexOf(currentField)
    const dropIndex = group.fields.indexOf(name)
    console.log('currentIndex: ' + currentIndex)
    currentGroup.fields.splice(currentIndex, 1)
    console.log('dropIndex: ' + dropIndex)
    console.log(
      'Бросили в поле с именем: ' +
        name.name +
        ' из группы: ' +
        group.name +
        ' Порядковый нормер: ' +
        dropIndex
    )
    group.fields.splice(dropIndex + 1, 0, currentField)
    setFieldGroups(
      fieldGroups.map((b) => {
        if (b.id === group.id) {
          return group
        }
        if (b.id === currentGroup.id) {
          return currentGroup
        }
        return b
      })
    )
    console.log('grous')
    console.log(fieldGroups)
    //console.log(fieldGroups)
    //setEditorFields([...arrayMove(editorFields, currentField - 1, id - 1)])

    // await editorFields.map(async (field) => {
    //   {
    //     if (field.order != editorFields.indexOf(field) + 1) {
    //       await addUpdateProductFieldMutation({
    //         variable: field.var,
    //         name: field.name,
    //         oldVar: field.var,
    //         order: editorFields.indexOf(field) + 1,
    //       })
    //     }
    //   }
    // })

    // await updateState()
  }
  async function dropHandlerGroup(e, group) {
    console.log(e)
    group.fields.push(currentField)
    const currentIndex = currentGroup.fields.indexOf(currentField)
    currentGroup.fields.splice(currentIndex, 1)
    console.log(group)
    setFieldGroups(
      fieldGroups.map((b) => {
        if (b.id === group.id) {
          return group
        }
        if (b.id === currentGroup.id) {
          return currentGroup
        }
        return b
      })
    )
  }
  const updateItem = async (id: any, oldVar) => {
    console.log(JSON.stringify(id) + ' ' + oldVar)
    await addUpdateProductFieldMutation({ variable: id.var, name: id.name, oldVar })
  }
  const saveItem = async (id) => {
    await addUpdateProductFieldMutation({ variable: id.var, name: id.name, oldVar: id.var })
  }
  const delItem = async (id: number, name: string) => {
    let isDel = confirm('Удалить поле ' + name + ' ?')
    if (isDel) {
      console.log('DELETE ' + id)
      let arr = [...editorFields]
      arr = arr.filter((item) => item.id !== id)
      setEditorFields([...arr])
      if (id != undefined) {
        await delProductFieldMutation({ id: id })
      }
    }
    await updateState()
  }
  const addItem = () => {
    setFVis(false)
    setFieldGroups((prev) => [
      ...prev.map((group) => {
        group.id === 1 ? group.fields.push({ id_group: 1 }) : next
        return group
      }),
    ])
    setEditorFields((prevVals) => [
      ...prevVals,
      {
        sqlVar: '',
        showVar: '',
      },
    ])
  }
  return (
    <>
      <Container centerContent>
        {fieldGroups.map((group) => (
          <div
            className="group-title"
            key={group.id}
            draggable={true}
            //onDragStart={(e) => dragStartHandlerGroup(e, group)}
            onDrop={(e) => dropHandlerGroup(e, group)}
            onDragOver={(e) => onDragOverHandler(e)}
          >
            <div>{group.name}</div>
            {group.fields.map((field) => (
              <FieldItem
                key={field.var}
                order={field.order}
                name={field}
                group={group}
                dragStartHandler={dragStartHandler}
                onDragEndHandler={onDragEndHandler}
                onDragOverHandler={onDragOverHandler}
                dropHandler={dropHandler}
                delItem={delItem}
                saveItem={saveItem}
                updateItem={updateItem}
                btnPLusFlag={fVis}
              />
            ))}
          </div>
        ))}
        {/* {editorFields.map((fields: any) => (
          <FieldItem
            key={fields.id}
            id={fields.order}
            name={fields}
            dragStartHandler={dragStartHandler}
            onDragEndHandler={onDragEndHandler}
            onDragOverHandler={onDragOverHandler}
            dropHandler={dropHandler}
            delItem={delItem}
            saveItem={saveItem}
            updateItem={updateItem}
            btnPLusFlag={fVis}
          />
        ))} */}
        <Container>
          <Flex>
            <Button mt={2} onClick={addItem}>
              +
            </Button>
          </Flex>
        </Container>
      </Container>
    </>
  )
}

const TemplatEditorPage = () => {
  return (
    <Layout>
      <Head>
        <title>TEMPLATE</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <TemplatEditorList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TemplatEditorPage
