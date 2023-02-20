import { usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Button, Heading } from '@chakra-ui/react'
import { render } from '@testing-library/react'
import { group } from 'console'

import React, { Suspense, useEffect, useState } from 'react'
import { EditorTypesMenu } from 'src/products/Editor/components/EditorTypesMenu'
import getAllFields from 'src/products/queries/getAllFields'
import getProductGroups from 'src/products/queries/getProductGroups'

import getTypes from 'src/products/queries/getTypes'
import { IEditorGroup, IEditorTab, IEditorUI, IProductTypes } from 'src/types'
import EditorGroups from './EditorGroups'

function EditorUI() {
  const [{ types }] = usePaginatedQuery(getTypes, {})
  const groups = useQuery(getProductGroups, {})
  const [{ fields }] = usePaginatedQuery(getAllFields, { orderBy: { order: 'asc' } })

  let EditorGroup: IEditorGroup[] = groups[0].map((v: IEditorGroup, i) => v)
  let EditorTab: IEditorTab[] = types.map((v: IEditorTab, i) => v)

  const [interfaceState, setInterfaceState] = useState<IEditorUI>({
    id: 1,
    title: 'Редактор всего',
    tab: EditorTab,
  })
  let Editor: IEditorUI = interfaceState
  const [currentTab, SetCurrnetTab] = useState<IEditorTab>(types[0])

  useEffect(() => {
    //sort groups to tabs
    EditorTab.map((tab, i) => {
      Editor.tab[i]['group'] = []
      EditorGroup.map((group, k) => {
        if (group.typeId == tab.id) Editor.tab[i]?.group.push(group)
      })
    })
    console.log('arara')
    console.log(EditorTab)
    SetCurrnetTab(types[0])
  }, [interfaceState])

  const tabsChange = (tab: IEditorTab) => {
    console.log('change to')
    console.log(tab)
    //if tab==[] console.log('EMPTY')
    SetCurrnetTab(() => {
      return tab
    })
  }

  const addTab = async () => {
    const newTab: IEditorTab = {
      id: Math.random(10) * 1000000,
      title: '',
      order: Editor.tab.length + 1,
      isDisabled: false,
    }
    Editor.tab.push(newTab)
    console.log('interfaceState')
    console.log(interfaceState)
    // setInterfaceState((()))
    setInterfaceState({ ...Editor })
  }

  const delTab = (tab: IEditorTab) => {
    console.log('del')
    console.log(Editor.tab.indexOf(tab))
    delete Editor.tab[Editor.tab.indexOf(tab)]
    const arr = Editor.tab.filter(function () {
      return true
    })
    Editor.tab = arr
    console.log(Editor)
    setInterfaceState({ ...Editor })
  }
  const updTab = (tab: IEditorTab) => {
    console.log('upd')
    console.log(tab)

    Editor.tab.map((_tab: IEditorTab, i) => {
      if (_tab.id == tab.id) Editor.tab[i] = tab
    })
    setInterfaceState({ ...Editor })
  }

  return (
    <>
      <Heading size={'xm'}>{interfaceState.title}</Heading>

      <div style={{ width: '50vw', padding: '4px 0 20px 0' }}>
        <EditorTypesMenu
          type={interfaceState.tab}
          add={addTab}
          del={delTab}
          upd={updTab}
          currentTab={currentTab}
          onChange={tabsChange}
        />
        <EditorGroups currentTab={currentTab} groups={currentTab.group} />
        {JSON.stringify(interfaceState)}
      </div>
    </>
  )
}

export default EditorUI
