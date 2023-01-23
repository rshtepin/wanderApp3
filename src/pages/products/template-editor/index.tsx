import { Suspense, useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from 'src/core/layouts/Layout'
import { Button, Container, Flex } from '@chakra-ui/react'
import FieldItem from 'src/products/template-editor/FieldItem'
import getAllFields from 'src/products/template-editor/queries/getAllFields'
import { usePagination } from 'src/core/hooks/usePagination'
import { usePaginatedQuery } from '@blitzjs/rpc'
import addProductField from 'src/products/template-editor/queries/addProductField'

const ITEMS_PER_PAGE = 100

const TemplatEditorList = () => {
  const pagination = usePagination()
  const [editorFields, setEditorFields] = useState([])
  const [fVis, setFVis] = useState(true)
  const [currentField, setCurrnetField] = useState(null)

  const [{ fields, hasMore }] = usePaginatedQuery(getAllFields, {
    orderBy: { order: 'asc' },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    setEditorFields(fields)
  }, [])
  console.log(editorFields)

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
      if (field.id != editorFields.indexOf(field) + 1) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        updateIdRecord(field, editorFields.indexOf(field) + 1)
        console.log('АЙди ' + field.id + ' на позицию ' + (editorFields.indexOf(field) + 1))
      }
    })
    const updateState = async () => {
      setEditorFields((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.id != prevState.indexOf(obj) + 1) {
            console.log('obj.id=' + obj.id + ' index=' + (prevState.indexOf(obj) + 1))
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

  const updateItem = (field, oldVar) => {
    console.log(JSON.stringify(field) + ' ' + oldVar)
    updateRecord(field, oldVar)
  }

  const saveItem = async (id) => {
    const variable = toString(id.var)
    const name = toString(id.name)
    await addProductField(variable, name)
  }

  const delItem = (id) => {
    let arr = [...editorFields]
    arr = arr.filter((item) => item.sqlVar !== id)
    setEditorFields([...arr])

    if (id != '') {
      dropColumn(id)
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
        {editorFields.map((fields) => (
          <FieldItem
            key={fields.var}
            id={fields.id}
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
