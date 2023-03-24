/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useMutation, usePaginatedQuery, useQuery } from '@blitzjs/rpc'
import { Heading, VStack } from '@chakra-ui/react'
import { EditorTypesMenu } from 'src/products/Editor/components/EditorTypesMenu'
import getAllFields from 'src/products/queries/getAllFields'
import getProductGroups from 'src/products/queries/getProductGroups'

import getTypes from 'src/products/queries/getTypes'
import { IEditorGroup, IEditorItem, IEditorTab, IEditorUI, IProductFields } from 'src/types'
import addUpdateProductField from '../mutations/addUpdateProductField'
import addUpdateProductGroup from '../mutations/addUpdateProductGroup'
import addUpdateProductType from '../mutations/addUpdateProductType'
import delProductField from '../mutations/delProductField'
import delProductGroup from '../mutations/delProductGroup'
import delProductType from '../mutations/delProductType'
import EditorGroups from './EditorGroups'

const EditorUI = () => {
  const [{ types }] = usePaginatedQuery(getTypes, { orderBy: { order: 'asc' } })
  const [{ groups }] = useQuery(getProductGroups, {})
  const [{ fields }] = usePaginatedQuery(getAllFields, { orderBy: { order: 'asc' } })

  const [updProductTypeMutation] = useMutation(addUpdateProductType)
  const [delProductTypeMutation] = useMutation(delProductType)
  const [updProductGroupMutation] = useMutation(addUpdateProductGroup)
  const [deleteProductGroupMutation] = useMutation(delProductGroup)
  const [updProductFieldMutation] = useMutation(addUpdateProductField)
  const [deleteProductFieldMutation] = useMutation(delProductField)

  let EditorTab: any = []

  const [currentTab, SetCurrnetTab] = useState<IEditorTab>(
    types.length > 0 ? types![0]! : { id: 0, title: '', order: 1, group: [] }
  )

  useEffect(() => {
    console.log('GET DATABASE')
    //sort groups to tabs
    EditorTab = types!.map((v: any, i) => {
      EditorTab[i] = v
      EditorTab[i]!['group'] = []
      groups.map((group: IEditorGroup, k) => {
        if (group.typeId == v.id) {
          EditorTab[i]!.group!.push(group)
          EditorTab[i]!.group![k]!['field'] = []
          fields.map((field, j) => {
            if (field.id_group == group.id) EditorTab[i]!.group![k]!.field.push(field)
          })
        }
      })
    })
  }, [])

  const [interfaceState, setInterfaceState] = useState<IEditorUI>({
    id: 1,
    title: 'Редактор всего',
    tab: EditorTab,
  })

  let Editor: IEditorUI = interfaceState
  const reorderTypes = async (type: IEditorTab[]) => {
    Editor.tab = type
    Editor.tab.map((tab, i) => updProductTypeMutation(tab))

    setInterfaceState({ ...Editor })
  }
  const tabsChange = (tab: IEditorTab) => {
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
    tabsChange(Editor!.tab[indxToChange]!)
    delete Editor.tab[Editor.tab.indexOf(tab)]
    Editor.tab = Editor.tab.filter(function () {
      return true
    })

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
    const crntTabIndx = Editor.tab.indexOf(currentTab)
    Editor.tab[crntTabIndx]!.group = _groups
    setInterfaceState({ ...Editor })
    Editor.tab[crntTabIndx]!.group!.map((group, i) =>
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
    const crntTabIndx = Editor.tab.indexOf(currentTab)

    delete Editor.tab[crntTabIndx]!.group![
      Editor.tab[crntTabIndx]!.group!.indexOf(
        Editor.tab[crntTabIndx]!.group![Editor.tab[crntTabIndx]!.group!.indexOf(group)]!
      )
    ]

    Editor.tab[crntTabIndx]!.group = Editor.tab[crntTabIndx]!.group!.filter(function () {
      return true
    })

    setInterfaceState({ ...Editor })
    await deleteProductGroupMutation({ id: group.id })
    await reorderGroups(Editor.tab[crntTabIndx]!.group!)
  }

  const updGroup = async (group: IEditorGroup) => {
    const crntTabIndx = Editor.tab.indexOf(currentTab)

    Editor.tab[crntTabIndx]!.group!.map((_group, i) => {
      if (_group.id == group.id) Editor.tab[crntTabIndx]!.group![i] = group
    })
    setInterfaceState({ ...Editor })
    await updProductGroupMutation(group)
    group.field.map((field, i) => updProductFieldMutation(field))
  }

  const updField = async (field: IEditorItem) => {
    const crntTabIndx = Editor.tab.indexOf(currentTab)

    let crntGroupIndx
    Editor.tab[crntTabIndx]?.group?.map((_group, i) => {
      if (_group.id == field.id_group) return (crntGroupIndx = i)
    })

    Editor.tab[crntTabIndx]!.group![crntGroupIndx]!.field.map((_field, i) => {
      if (_field.id_group == field.id)
        Editor.tab[crntTabIndx]!.group![crntGroupIndx]!.field[i] = field
    })
    setInterfaceState({ ...Editor })
    await updProductFieldMutation(field)
  }

  const addField = async (group: IEditorGroup) => {
    const crntTabIndx = Editor.tab.indexOf(currentTab)
    const crntGroupIndx = Editor.tab[crntTabIndx]!.group!.indexOf(group)

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
    Editor.tab[crntTabIndx]!.group![crntGroupIndx]!.field.push(newField)
    setInterfaceState({ ...Editor })
  }

  const delField = async (field: IEditorItem) => {
    const crntTabIndx = Editor.tab.indexOf(currentTab)

    let crntGroupIndx

    Editor.tab[crntTabIndx]?.group?.map((_group, i) => {
      if (_group.id == field.id_group) return (crntGroupIndx = i)
    })

    delete Editor.tab[crntTabIndx]!.group![crntGroupIndx]!.field[
      Editor.tab[crntTabIndx]!.group![crntGroupIndx]!.field.indexOf(field)
    ]
    Editor.tab[crntTabIndx]!.group![crntGroupIndx]!.field = Editor.tab[crntTabIndx]!.group![
      crntGroupIndx
    ]!.field.filter(function () {
      return true
    })

    Editor.tab[crntTabIndx]!.group![crntGroupIndx]!.field.map(async (field, i) => {
      Editor.tab[crntTabIndx]!.group![crntGroupIndx]!.field[i]!.order = i + 1
      await updProductFieldMutation(Editor.tab[crntTabIndx]!.group![crntGroupIndx]!.field[i])
    })
    await deleteProductFieldMutation({ id: field.id })

    setInterfaceState({ ...Editor })
  }

  return (
    <>
      <VStack>
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
          {/* <div>
          <b>STATE:</b> {JSON.stringify(interfaceState)}
        </div> */}
        </div>
      </VStack>
    </>
  )
}

export default EditorUI
