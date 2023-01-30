import { Suspense, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@blitzjs/rpc'
import Head from 'next/head'
import Layout from 'src/core/layouts/Layout'
import { Button, Container, Flex } from '@chakra-ui/react'
import FieldItem from 'src/products/template-editor/FieldItem'
import getAllFields from 'src/products/template-editor/queries/getAllFields'
import { usePagination } from 'src/core/hooks/usePagination'
import { usePaginatedQuery } from '@blitzjs/rpc'
import addUpdateProductField from 'src/products/template-editor/mutations/addUpdateProductField'
import delProductField from 'src/products/template-editor/mutations/delProductField'

const TemplatEditorList = () => {
  const [delProductFieldMutation] = useMutation(delProductField)
  const [addUpdateProductFieldMutation] = useMutation(addUpdateProductField)
  const pagination = usePagination()
  const [editorFields, setEditorFields] = useState<any>([])
  const [fVis, setFVis] = useState(true)
  const [currentField, setCurrnetField] = useState(null)

  const [{ fields, hasMore }] = usePaginatedQuery(getAllFields, {
    orderBy: { order: 'asc' },
    skip: 0 * pagination.page,
    take: 100,
  })

  useEffect(() => {
    console.log('Установка ФИЛД СТЕЙТА')
    setEditorFields(fields)
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
          console.log('Такое дело: ' + field.order)
          await addUpdateProductFieldMutation({
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
        {editorFields.map((fields: any) => (
          <FieldItem
            key={fields.id}
            order={fields.order}
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
