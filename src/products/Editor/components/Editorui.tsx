import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { EditorTypesMenu } from 'src/products/Editor/components/EditorTypesMenu'
import getAllFields from 'src/products/queries/getAllFields'
import getProductGroups from 'src/products/queries/getProductGroups'

import getTypes from 'src/products/queries/getTypes'
import {
  IEditorGroup,
  IEditorItem,
  IEditorTab,
  IEditorUI,
  IProductFields,
  IProductTypes,
} from 'src/types'
import addUpdateProductField from '../mutations/addUpdateProductField'
import addUpdateProductGroup from '../mutations/addUpdateProductGroup'
import addUpdateProductType from '../mutations/addUpdateProductType'
import delProductField from '../mutations/delProductField'
import delProductGroup from '../mutations/delProductGroup'
import delProductType from '../mutations/delProductType'
import EditorGroups from './EditorGroups'

function EditorUI() {
  const [{ types }] = usePaginatedQuery(getTypes, {})
  const _groups = useQuery(getProductGroups, {})
  const [{ fields }] = usePaginatedQuery(getAllFields, { orderBy: { order: 'asc' } })
  const [updProductTypeMutation] = useMutation(addUpdateProductType)
  const [delProductTypeMutation] = useMutation(delProductType)
  const [updProductGroupMutation] = useMutation(addUpdateProductGroup)
  const [deleteProductGroupMutation] = useMutation(delProductGroup)
  const [updProductFieldMutation] = useMutation(addUpdateProductField)
  const [deleteProductFieldMutation] = useMutation(delProductField)

  let EditorTab: IEditorTab[] = []

  useEffect(() => {
    //sort groups to tabs
    // eslint-disable-next-line react-hooks/exhaustive-deps
    EditorTab = types.map((v: IEditorTab, i) => {
      EditorTab[i] = v
      EditorTab[i]!['group'] = []
      _groups[0].map((group) => {
        if (group.typeId == v.id) {
          EditorTab[i]!.group!.push(group)
          EditorTab[i]!.group![EditorTab[i]!.group!.indexOf(group)]!['field'] = []
          fields.map((field) => {
            if (field.id_group == group.id)
              EditorTab[i]!.group![EditorTab[i]!.group!.indexOf(group)]!.field.push(field)
          })
        }
      })
    })

    //setInterfaceState({ ...Editor })
  }, [])

  const [interfaceState, setInterfaceState] = useState<IEditorUI>({
    id: 1,
    title: 'Редактор',
    tab: EditorTab,
  })

  let Editor: IEditorUI = interfaceState

  const [currentTab, SetCurrnetTab] = useState<IEditorTab>(types[0])

  const reorderTypes = async (type: IEditorTab[]) => {
    Editor.tab = type
    Editor.tab.map((tab, i) => updProductTypeMutation(tab))

    setInterfaceState({ ...Editor })
  }
  const tabsChange = (tab: IEditorTab) => {
    console.log('change to')
    console.log(tab)
    //if tab==[] console.log('EMPTY')
    SetCurrnetTab(tab)
  }

  const addTab = async () => {
    const newtype = await updProductTypeMutation({ id: -1, title: '' })

    const newTab: IEditorTab = {
      id: newtype.id,
      title: newtype.title,
      order: newtype.order,
      isDisabled: false,
      group: [],
    }
    Editor.tab.push(newTab)
    setInterfaceState({ ...Editor })
  }

  const delTab = async (tab: IEditorTab) => {
    const indxToChange = Editor.tab.indexOf(tab) - 1 > -1 ? Editor.tab.indexOf(tab) - 1 : 0
    tabsChange(Editor.tab[indxToChange])
    delete Editor.tab[Editor.tab.indexOf(tab)]
    const arr = Editor.tab.filter(function () {
      return true
    })
    Editor.tab = arr

    setInterfaceState({ ...Editor })
    await delProductTypeMutation({ id: tab.id })
    await reorderTypes(Editor.tab)
  }
  const updTab = async (tab: IEditorTab) => {
    Editor.tab.map((_tab, i) => {
      if (_tab.id == tab.id) Editor.tab[i] = tab
    })
    await updProductTypeMutation(tab)
    setInterfaceState({ ...Editor })
  }
  const reorderGroups = async (_groups: IEditorGroup[]) => {
    const currentTabIndex = Editor.tab.indexOf(currentTab)
    Editor.tab[currentTabIndex]!.group = _groups
    setInterfaceState({ ...Editor })
    Editor.tab[currentTabIndex]?.group.map((group, i) =>
      updProductGroupMutation({
        id: group.id,
        typeId: currentTab.id,
        title: group.title,
        order: i + 1,
      })
    )
  }

  const addGroup = async () => {
    const grp = await updProductGroupMutation({ id: -1, title: '', typeId: currentTab.id })
    const newGroup: IEditorGroup = {
      id: grp.id,
      title: grp.title,
      order: grp.order,
      isDisabled: false,
      typeId: currentTab.id,
      field: [],
    }

    Editor.tab[Editor.tab.indexOf(currentTab)]!.group!.push(newGroup)
    setInterfaceState({ ...Editor })
  }

  const delGroup = async (group: IEditorGroup) => {
    const currentTabIndex = Editor.tab.indexOf(currentTab)

    delete Editor.tab[currentTabIndex]!.group![
      Editor.tab[currentTabIndex]!.group!.indexOf(
        Editor.tab[currentTabIndex]!.group![Editor.tab[currentTabIndex]!.group!.indexOf(group)]!
      )
    ]

    const arr = Editor.tab[currentTabIndex]!.group.filter(function () {
      return true
    })
    Editor.tab[currentTabIndex]!.group = arr

    setInterfaceState({ ...Editor })
    await deleteProductGroupMutation({ id: group.id })
    await reorderGroups(Editor.tab[currentTabIndex]!.group)
  }

  const updGroup = async (group: IEditorGroup) => {
    const currentTabIndex = Editor.tab.indexOf(currentTab)

    Editor.tab[currentTabIndex]!.group!.map((_group, i) => {
      if (_group.id == group.id) Editor.tab[currentTabIndex]!.group![i] = group
    })
    setInterfaceState({ ...Editor })
    await updProductGroupMutation(group)
    group.field.map((field, i) => updProductFieldMutation(field))
  }

  const updField = async (field: IEditorItem) => {
    const currentTabIndex = Editor.tab.indexOf(currentTab)

    let currentGroupIndex
    Editor.tab[currentTabIndex]?.group?.map((_group, i) => {
      if (_group.id == field.id_group) return (currentGroupIndex = i)
    })

    Editor.tab[currentTabIndex]!.group![currentGroupIndex]!.field.map((_field, i) => {
      if (_field.id_group == field.id)
        Editor.tab[currentTabIndex]!.group![currentGroupIndex]!.field[i] = field
    })
    setInterfaceState({ ...Editor })
    await updProductFieldMutation(field)
  }

  const addField = async (group: IEditorGroup) => {
    const currentTabIndex = Editor.tab.indexOf(currentTab)
    const currentGroupIndex = Editor.tab[currentTabIndex]!.group.indexOf(group)

    const fld: IProductFields = await updProductFieldMutation({
      id: -1,
      title: '',
      id_group: group.id,
    })

    const newField: IEditorItem = {
      id: fld.id,
      id_group: fld.id_group,
      title: fld.title,
      unit: fld.unit,
      isDisabled: false,
      order: fld.order,
    }
    Editor.tab[currentTabIndex]!.group[currentGroupIndex]!.field.push(newField)
    setInterfaceState({ ...Editor })
  }

  const delField = async (field: IEditorItem) => {
    const currentTabIndex = Editor.tab.indexOf(currentTab)

    let currentGroupIndex

    Editor.tab[currentTabIndex]?.group?.map((_group, i) => {
      if (_group.id == field.id_group) return (currentGroupIndex = i)
    })

    delete Editor.tab[currentTabIndex]!.group[currentGroupIndex]!.field[
      Editor.tab[currentTabIndex]!.group[currentGroupIndex]!.field.indexOf(field)
    ]
    const arr = Editor.tab[currentTabIndex]!.group[currentGroupIndex]!.field.filter(function () {
      return true
    })
    Editor.tab[currentTabIndex]!.group[currentGroupIndex]!.field = arr

    Editor.tab[currentTabIndex]!.group[currentGroupIndex]!.field.map(async (field, i) => {
      Editor.tab[currentTabIndex]!.group[currentGroupIndex]!.field[i]!.order = i + 1
      await updProductFieldMutation(Editor.tab[currentTabIndex]!.group[currentGroupIndex]!.field[i])
    })
    await deleteProductFieldMutation({ id: field.id })

    setInterfaceState({ ...Editor })
  }

  return (
    <>
      <Heading size={'xm'}>{interfaceState.title}</Heading>
      <div>
        <b> {currentTab.title}</b>
      </div>
      <div style={{ width: '50vw', padding: '4px 0 20px 0' }}>
        <EditorTypesMenu
          type={interfaceState.tab}
          add={addTab}
          del={delTab}
          upd={updTab}
          currentTab={currentTab}
          reorderTypes={reorderTypes}
          onChange={tabsChange}
        />
        <EditorGroups
          currentTab={currentTab}
          groups={currentTab.group!}
          reorderGroups={reorderGroups}
          add={addGroup}
          del={delGroup}
          upd={updGroup}
          updField={updField}
          addField={addField}
          delField={delField}
        />
        <div>
          <b>STATE:</b> {JSON.stringify(interfaceState)}
        </div>
      </div>
    </>
  )
}

export default EditorUI
