import { usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Button, Heading } from '@chakra-ui/react'

import React, { Suspense, useEffect, useState } from 'react'

import { EditorTypesMenu } from 'src/products/Editor/components/EditorTypesMenu'
import getAllFields from 'src/products/queries/getAllFields'
import getProductGroups from 'src/products/queries/getProductGroups'

import getTypes from 'src/products/queries/getTypes'
import { IEditorGroup, IEditorItem, IEditorTab, IEditorUI, IProductTypes } from 'src/types'
import EditorGroups from './EditorGroups'

function EditorUI() {
  const [{ types }] = usePaginatedQuery(getTypes, {})
  const _groups = useQuery(getProductGroups, {})
  const [{ fields }] = usePaginatedQuery(getAllFields, { orderBy: { order: 'asc' } })

  let EditorTab: IEditorTab[] = []

  useEffect(() => {
    //sort groups to tabs
    // eslint-disable-next-line react-hooks/exhaustive-deps
    EditorTab = types.map((v: IEditorTab, i) => {
      EditorTab[i] = v
      EditorTab[i]!['group'] = []
      _groups[0].map((group, k) => {
        if (group.typeId == v.id) {
          EditorTab[i]!.group!.push(group)
          EditorTab[i]!.group![EditorTab[i]!.group!.indexOf(group)]!['field'] = []
          fields.map((field, j) => {
            if (field.id_group == group.id)
              EditorTab[i]!.group![EditorTab[i]!.group!.indexOf(group)]!.field.push(field)
          })
        }

        console.log('USEEFECT_EditorTab')
        console.log(EditorTab)
      })
    })

    //setInterfaceState({ ...Editor })
  }, [])

  const [interfaceState, setInterfaceState] = useState<IEditorUI>({
    id: 1,
    title: 'Редактор всего',
    tab: EditorTab,
  })

  let Editor: IEditorUI = interfaceState

  const [currentTab, SetCurrnetTab] = useState<IEditorTab>(types[0])

  const tabsChange = (tab: IEditorTab) => {
    console.log('change to')
    console.log(tab)
    //if tab==[] console.log('EMPTY')
    SetCurrnetTab(tab)
  }

  const addTab = async () => {
    const newTab: IEditorTab = {
      id: Math.random(10) * 1000000,
      title: '',
      order: Editor.tab.length + 1,
      isDisabled: false,
      group: [],
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
    tabsChange(Editor.tab[0])
  }
  const updTab = (tab: IEditorTab) => {
    console.log('upd')
    console.log(tab)

    Editor.tab.map((_tab, i) => {
      if (_tab.id == tab.id) Editor.tab[i] = tab
    })
    setInterfaceState({ ...Editor })
  }

  const addGroup = async () => {
    const newGroup: IEditorGroup = {
      id: Math.random(10) * 1000000,
      title: '',
      order: Editor.tab[interfaceState.tab.indexOf(currentTab)]!.group!.length + 1,
      isDisabled: false,
      typeId: currentTab.id,
      field: [],
    }
    Editor.tab[Editor.tab.indexOf(currentTab)]!.group!.push(newGroup)
    console.log('interfaceState')
    console.log(interfaceState)
    // setInterfaceState((()))
    setInterfaceState({ ...Editor })
  }
  const delGroup = (group: IEditorGroup) => {
    console.log('del group')
    console.log(group)
    const currentTabIndex = Editor.tab.indexOf(currentTab)
    delete Editor.tab[currentTabIndex]!.group![
      Editor.tab[currentTabIndex]!.group!.indexOf(
        Editor.tab[currentTabIndex]!.group![Editor.tab[currentTabIndex]!.group!.indexOf(group)]!
      )
    ]
    const arr = Editor.tab[currentTabIndex]?.group.filter(function () {
      return true
    })
    Editor.tab[currentTabIndex].group = arr
    setInterfaceState({ ...Editor })
  }
  const updGroup = (group: IEditorGroup) => {
    console.log('UPD group')
    console.log(group)
    const currnetTabIndex = Editor.tab.indexOf(currentTab)

    Editor.tab[currnetTabIndex]!.group!.map((_group, i) => {
      if (_group.id == group.id) Editor.tab[currnetTabIndex]!.group![i] = group
    })
    setInterfaceState({ ...Editor })
  }
  const updField = (field: IEditorItem) => {
    console.log('UPD field')
    const currnetTabIndex = Editor.tab.indexOf(currentTab)

    let currnetGroupIndex
    Editor.tab[currnetTabIndex]?.group?.map((_group, i) => {
      if (_group.id == field.id_group) return (currnetGroupIndex = i)
    })

    Editor.tab[currnetTabIndex]!.group![currnetGroupIndex]!.field.map((_field, i) => {
      if (_field.id_group == field.id)
        Editor.tab[currnetTabIndex]!.group![currnetGroupIndex]!.field[i] = field
    })
    setInterfaceState({ ...Editor })
  }

  const addField = (group: IEditorGroup) => {
    const currnetTabIndex = Editor.tab.indexOf(currentTab)

    let currnetGroupIndex = Editor.tab[currnetTabIndex]?.group?.indexOf(group)

    // Editor.tab[currnetTabIndex]?.group?.map((_group, i) => {
    //   if (_group.id == field.id_group) return (currnetGroupIndex = i)
    // })
    const newField: IEditorItem = {
      id: Math.random(10) * 1000000,
      id_group: group.id,
      title: '',
      unit: '',
      isDisabled: false,
      order: Editor.tab[currnetTabIndex]!.group![currnetGroupIndex]!.field.length + 1,
    }
    Editor.tab[currnetTabIndex]?.group[currnetGroupIndex].field.push(newField)
    setInterfaceState({ ...Editor })
    console.log('newField')
    console.log(Editor)
  }

  const delField = (field: IEditorItem) => {
    console.log('delField')
    console.log(field)

    const currnetTabIndex = Editor.tab.indexOf(currentTab)

    let currnetGroupIndex
    Editor.tab[currnetTabIndex]?.group?.map((_group, i) => {
      if (_group.id == field.id_group) return (currnetGroupIndex = i)
    })

    delete Editor.tab[currnetTabIndex]?.group[currnetGroupIndex]?.field[
      Editor.tab[currnetTabIndex]?.group[currnetGroupIndex]?.field.indexOf(field)
    ]

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
        <EditorGroups
          currentTab={currentTab}
          groups={currentTab.group!}
          add={addGroup}
          del={delGroup}
          upd={updGroup}
          updField={updField}
          addField={addField}
          delField={delField}
        />
        <div>{JSON.stringify(interfaceState)}</div>
      </div>
    </>
  )
}

export default EditorUI
