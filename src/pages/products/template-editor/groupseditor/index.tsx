import { Suspense, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@blitzjs/rpc'
import Head from 'next/head'
import Layout from 'src/core/layouts/Layout'
import { Button, Container, Flex, Select } from '@chakra-ui/react'
import GroupFieldItem from 'src/products/template-editor/groupseditor/GroupFieldItem'
import getAllGroupFields from 'src/products/template-editor/groupseditor/queries/getAllGroupFields'
import { usePagination } from 'src/core/hooks/usePagination'
import { usePaginatedQuery } from '@blitzjs/rpc'
import addUpdateProductGroupField from 'src/products/template-editor/groupseditor/mutations/addUpdateProductGroupField'
import delProductGroupField from 'src/products/template-editor/groupseditor/mutations/delProductGroupField'
import { ProductType } from '@prisma/client'
delProductGroupField
const TemplatGroupEditorList = () => {
  const [delProductFieldMutation] = useMutation(delProductGroupField)
  const [addUpdateProductGroupFieldMutation] = useMutation(addUpdateProductGroupField)
  const pagination = usePagination()
  const [editorFields, setEditorFields] = useState<any>([])
  const [fVis, setFVis] = useState(true)
  const [currentField, setCurrnetField] = useState(null)

  const productTypes = Object.keys(ProductType)
  const [{ groups }] = usePaginatedQuery(getAllGroupFields, {
    productType: ProductType.PAM,
    orderBy: { order: 'asc' },
    skip: 0 * pagination.page,
    take: 100,
  })

  useEffect(() => {
    console.log('Установка ФИЛД СТЕЙТА')
    setEditorFields(groups)
    console.log(groups)
  }, [])

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
    setEditorFields([...arrayMove(editorFields, currentField - 1, id - 1)])
    await editorFields.map(async (field) => {
      {
        if (field.order != editorFields.indexOf(field) + 1) {
          await addUpdateProductGroupFieldMutation({
            variable: field.var,
            name: field.name,
            oldVar: field.var,
            order: editorFields.indexOf(field) + 1,
          })
        }
      }
    })

    await updateState()
  }

  const updateItem = async (id: any, oldVar) => {
    console.log(JSON.stringify(id) + ' ' + oldVar)
    await addUpdateProductGroupFieldMutation({ variable: id.var, name: id.name, oldVar })
  }

  const saveItem = async (id) => {
    await addUpdateProductGroupFieldMutation({ variable: id.var, name: id.name, oldVar: id.var })
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
      <Select id="type" placeholder="Выберите тип продукта" defaultValue={productTypes[0]}>
        {productTypes.map((i) => {
          return (
            <option key={i} value={i}>
              {i}
            </option>
          )
        })}
      </Select>
      <Container centerContent>
        {editorFields.map((fields: any) => (
          <GroupFieldItem
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
        ))}
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

const TemplateEditorGroupPage = () => {
  return (
    <Layout>
      <Head>
        <title>GROUPS TEMPLATE</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <TemplatGroupEditorList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default TemplateEditorGroupPage
