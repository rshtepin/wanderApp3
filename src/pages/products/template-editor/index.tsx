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
import getTypes from 'src/products/queries/getTypes'
import { IProductFields, IProductGroups, IProductTypes } from 'src/types'
import { ProductTypesMenu } from 'src/products/Editor/components/EditorTypesMenu'

const TemplatEditorList = () => {
  const [delProductFieldMutation] = useMutation(delProductField)
  const [addUpdateProductFieldMutation] = useMutation(addUpdateProductField)
  const pagination = usePagination()
  const [fVis, setFVis] = useState<boolean>(true)
  const [currentField, setCurrnetField] = useState<any>(null)
  const [currentGroup, setCurrnetGroup] = useState<any>(null)
  const [fieldGroups, setFieldGroups] = useState<IProductGroups[]>([])

  const [{ types }]: IProductTypes[] = usePaginatedQuery(getTypes, {
    where: {},
  })
  const [currentTab, SetCurrnetTab] = useState<IProductTypes>(types[0])

  const [{ fields, hasMore }] = usePaginatedQuery(getAllFields, {
    orderBy: { order: 'asc' },
  })

  const [{ groups }] = usePaginatedQuery<IProductGroups[]>(getAllGroupFields, {
    orderBy: { order: 'asc' },
  })

  useEffect(() => {
    let groupArr: IProductGroups[] = []
    groups.map((group) => {
      group.typeId === currentTab.id && groupArr.push(group)
    })
    console.log('fieldGroups')
    console.log(fieldGroups)
    return setFieldGroups(groupArr)
  }, [currentTab, groups])

  useEffect(() => {
    let mystate = []
    groups.map((itemG: IProductGroups) => {
      const addFileds = []
      fields.map((itemF: IProductFields) => {
        itemF.id_group == itemG.id ? addFileds.push(itemF) : next
      })
      mystate.push({ ...itemG, fields: addFileds })
    })
    setFieldGroups(mystate)
  }, [])

  const tabsChange = async ({ tabtitle }) => {
    await SetCurrnetTab(tabtitle)
  }

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
  function dragStartHandler(e, title, order, group) {
    setCurrnetField(title)
    setCurrnetGroup(group)
  }
  function onDragEndHandler(e) {}
  function onDragOverHandler(e) {
    e.preventDefault()
  }

  async function dropHandler(e, title, order, group) {
    e.preventDefault()
    const currentIndex = currentGroup.fields.indexOf(currentField)
    const dropIndex = group.fields.indexOf(title)
    currentGroup.fields.splice(currentIndex, 1)
    group.fields.splice(dropIndex + 1, 0, currentField)
    await addUpdateProductFieldMutation({
      oldVar: currentField.var,
      variable: currentField.var,
      title: currentField.title,
      id_group: group.id,
      order: dropIndex + 1,
    })
    group.fields.map(
      async (f, index) =>
        await addUpdateProductFieldMutation({
          oldVar: f.var,
          variable: f.var,
          title: f.title,
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
        title: currentField.title,
        id_group: group.id,
      })
      group.fields.map(
        async (f, index) =>
          await addUpdateProductFieldMutation({
            oldVar: f.var,
            variable: f.var,
            title: f.title,
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
    await addUpdateProductFieldMutation({ variable: id.var, title: id.title, oldVar: oldVar })
  }
  const saveItem = async (id) => {
    await addUpdateProductFieldMutation({ variable: id.var, title: id.title, oldVar: id.var }).then(
      setFVis(true)
    )
  }
  const delItem = async ({ id, title, flag, group }) => {
    let isDel: boolean
    flag ? (isDel = true) : (isDel = confirm('Удалить поле ' + title + ' ?'))
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

      if (title != undefined) {
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
              title: '',
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
      <div style={{ width: '50vw', padding: '4px 0 20px 0' }}>
        <ProductTypesMenu type={types} onChange={tabsChange} />
      </div>
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
            <div>{group.title}</div>
            {group.fields.map((field) => (
              <FieldItem
                key={field.var}
                order={field.order}
                title={field}
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
    <div id="app">
      <Layout>
        <Head>
          <title>TEMPLATE</title>
        </Head>

        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <div style={{ width: '50vw', padding: '4px 0 20px 0' }}></div>
            <TemplatEditorList />
          </Suspense>
        </div>
      </Layout>
    </div>
  )
}

export default TemplatEditorPage
