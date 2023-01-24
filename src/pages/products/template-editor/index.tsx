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
import deleteProductField from 'src/products/template-editor/mutations/deleteProductField'

const TemplatEditorList = () => {
  const [delProductFieldMutation] = useMutation(deleteProductField)
  const [addProductFieldMutation] = useMutation(addUpdateProductField)
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
    setEditorFields(fields)
  }, [])

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
  function dropHandler(e, name, id) {
    e.preventDefault()
    console.log(currentField + ' droped to ' + name + ' id: ' + id)
    setEditorFields([...arrayMove(editorFields, currentField - 1, id - 1)])
    console.log('OLD editorFields')
    console.log(editorFields)

    editorFields.map((field) => {
      if (field.order != editorFields.indexOf(field) + 1) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        updateIdRecord(field, editorFields.indexOf(field) + 1)
        console.log('АЙди ' + field.order + ' на позицию ' + (editorFields.indexOf(field) + 1))
      }
    })
    const updateState = async () => {
      setEditorFields((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.order != prevState.indexOf(obj) + 1) {
            console.log('obj.order=' + obj.order + ' index=' + (prevState.indexOf(obj) + 1))
            return {
              ...obj,
              id: prevState.indexOf(obj) + 1,
            }
          }
          return obj
        })
        console.log(newState)
        return newState
      })
    }
    updateState()
  }

  const updateItem = async (id: any, oldVar) => {
    console.log(JSON.stringify(id) + ' ' + oldVar)
    await addProductFieldMutation({ variable: id.var, name: id.name, oldVar })
  }

  const saveItem = async (id) => {
    const variable = id.var
    const name = id.name
    console.log(variable + ' ' + name)
    await addProductFieldMutation({ variable, name, oldVar: variable })
  }

  const delItem = async (id: string) => {
    let arr = [...editorFields]
    arr = arr.filter((item) => item.var !== id)
    setEditorFields([...arr])
    if (id != '') {
      console.log('на удаление уходт ' + id)

      await delProductFieldMutation({ id: id })
    }
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
            key={fields.var}
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
