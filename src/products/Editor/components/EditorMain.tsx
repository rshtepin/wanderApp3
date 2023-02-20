import { usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Button, Heading } from '@chakra-ui/react'
import { render } from '@testing-library/react'

import React, { Suspense, useEffect, useState } from 'react'
import { ProductTypesMenu } from 'src/products/Editor/components/EditorTypesMenu'
import getAllFields from 'src/products/queries/getAllFields'
import getProductGroups from 'src/products/queries/getProductGroups'

import getTypes from 'src/products/queries/getTypes'
import { IEditorGroup, IEditorTab, IEditorUI, IProductTypes } from 'src/types'

function EditorMain() {
  const [{ types }] = usePaginatedQuery(getTypes, {})
  const groups = useQuery(getProductGroups, {})
  const [{ fields }] = usePaginatedQuery(getAllFields, { orderBy: { order: 'asc' } })

  let EditorTab: IEditorTab[] = types.map((v: IEditorTab, i) => v)

  const [interfaceState, setInterfaceState] = useState<IEditorUI>({
    id: 1,
    title: 'Редактор всего',
    tab: EditorTab,
  })

  let Editor: IEditorUI = interfaceState

  const [currentTab, SetCurrnetTab] = useState<IEditorTab>(types[0])
  useEffect(() => {
    setInterfaceState((prev) => prev)
  }, [currentTab])
  // useEffect(() => {
  //   types.map((v: IProductTypes, i) => Editor.tab.push(v))
  //   console.log(Editor)
  //   setInterfaceState(Editor)
  // }, [])

  const tabsChange = async (tab: IEditorTab) => {
    await SetCurrnetTab(() => {
      return tab
    })
  }
  useEffect(() => {
    console.log('render')
    setInterfaceState((i) => i)
  }, [interfaceState])

  const addTemp = async () => {
    const addt: IEditorTab = { id: Math.random(10), title: 'GGG', order: 3 }
    Editor.tab.push(addt)
    console.log('click')
    console.log(Editor)
    setInterfaceState(Editor)
  }

  return (
    <>
      <Heading size={'xm'}>{interfaceState.title}</Heading>
      {interfaceState.tab.map((i: IEditorTab) => (
        <div>{i.title}</div>
      ))}
      <div style={{ width: '50vw', padding: '4px 0 20px 0' }}>
        <Suspense>
          <ProductTypesMenu type={interfaceState.tab} onChange={tabsChange} add={addTemp} />
          {JSON.stringify(interfaceState)}
        </Suspense>
      </div>
      <Button mt={2} onClick={addTemp}>
        +
      </Button>
    </>
  )
}

export default EditorMain
