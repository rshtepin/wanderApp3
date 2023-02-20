import { Suspense, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@blitzjs/rpc'
import Head from 'next/head'
import Layout from 'src/core/layouts/Layout'
import { Button, Container, Flex, Select, VStack } from '@chakra-ui/react'
import FieldItem from 'src/products/template-editor/FieldItem'
import getAllFields from 'src/products/template-editor/queries/_getAllFields'
import { usePagination } from 'src/core/hooks/usePagination'
import { usePaginatedQuery } from '@blitzjs/rpc'
import addUpdateProductField from 'src/products/template-editor/mutations/_addUpdateProductField'
import delProductField from 'src/products/template-editor/mutations/_delProductField'
import getAllGroupFields from 'src/products/template-editor/groupseditor/queries/getAllGroupFields'
import { ProductType } from '@prisma/client'
import next from 'next'
import Link from 'next/link'

const TemplatEditorList = () => {
  const [delProductFieldMutation] = useMutation(delProductField)
  const [addUpdateProductFieldMutation] = useMutation(addUpdateProductField)
  const pagination = usePagination()
  const [fVis, setFVis] = useState<boolean>(true)
  const [currentField, setCurrnetField] = useState<any>(null)
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
    let mystate = []
    groups.map((itemG: any) => {
      const addFileds = []
      fields.map((itemF) => {
        itemF.id_group == itemG.id ? addFileds.push(itemF) : next
      })
      mystate.push({ ...itemG, fields: addFileds })
    })
    setFieldGroups(mystate)
  }, [])

  const updateState = async () => {
    setFieldGroups((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.order != prevState.indexOf(obj) + 1) {
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
    setCurrnetField(name)
    setCurrnetGroup(group)
  }
  function onDragEndHandler(e) {}
  function onDragOverHandler(e) {
    e.preventDefault()
  }

  async function dropHandler(e, name, order, group) {
    e.preventDefault()
    const currentIndex = currentGroup.fields.indexOf(currentField)
    const dropIndex = group.fields.indexOf(name)
    currentGroup.fields.splice(currentIndex, 1)
    group.fields.splice(dropIndex + 1, 0, currentField)
    await addUpdateProductFieldMutation({
      oldVar: currentField.var,
      variable: currentField.var,
      name: currentField.name,
      id_group: group.id,
      order: dropIndex + 1,
    })
    group.fields.map(
      async (f, index) =>
        await addUpdateProductFieldMutation({
          oldVar: f.var,
          variable: f.var,
          name: f.name,
          order: index + 1,
        })
    )
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
  // async function dragStartHandlerGroup(e, group) {
  //    e.preventDefault()
  // }

  async function dropHandlerGroup(e, group) {
    if (group.fields.length < 1) {
      group.fields.push(currentField)
      const currentIndex = currentGroup.fields.indexOf(currentField)
      currentGroup.fields.splice(currentIndex, 1)
      await addUpdateProductFieldMutation({
        oldVar: currentField.var,
        variable: currentField.var,
        name: currentField.name,
        id_group: group.id,
      })
      group.fields.map(
        async (f, index) =>
          await addUpdateProductFieldMutation({
            oldVar: f.var,
            variable: f.var,
            name: f.name,
            order: index + 1,
          })
      )
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
  }
  const updateItem = async (id: any, oldVar) => {
    await addUpdateProductFieldMutation({ variable: id.var, name: id.name, oldVar: oldVar })
  }
  const saveItem = async (id) => {
    await addUpdateProductFieldMutation({ variable: id.var, name: id.name, oldVar: id.var }).then(
      setFVis(true)
    )
  }
  const delItem = async ({ id, name, flag, group }) => {
    let isDel: boolean
    flag ? (isDel = true) : (isDel = confirm('Удалить поле ' + name + ' ?'))
    if (isDel) {
      let arr = [...fieldGroups]
      arr = arr.map((item) => {
        if (item.id == group.id) {
          const nf = item.fields.filter((i) => i.id !== id)
          return { ...item, fields: nf }
        }
        return item
      })
      setFieldGroups([...arr])

      if (name != undefined) {
        await delProductFieldMutation({ id: id })
      }
    }
  }
  const addItem = async () => {
    await setFVis(false)
    setFieldGroups((prev) => [
      ...prev.map((group) => {
        group.id === 1
          ? group.fields.push({
              id: group.fields.length + 1,
              var: '',
              name: '',
              id_group: 1,
              order: group.fields.length + 1,
            })
          : next
        return group
      }),
    ])
  }
  return (
    <>
      <Container centerContent>
        {fieldGroups.map((group) => (
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
          </VStack>
        ))}
        <Container>
          <Flex>
            <Button mt={2} onClick={addItem}>
              Добавить новое поле
            </Button>
            <Link href="template-editor/groupseditor">
              <Button mt={2} ml={2}>
                Редактор групп
              </Button>
            </Link>
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
