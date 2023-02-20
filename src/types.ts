import { SimpleRolesIsAuthorized } from '@blitzjs/auth'
import { User } from 'db'

export type Role = 'ADMIN' | 'USER'

export interface IEditorUI {
  id: number
  title: string
  tab: IEditorTab[]
}

export interface IEditorTab {
  id: number
  title: string
  order: number
  add?: () => void
  del?: () => void
  upd?: () => void
  isDisabled?: boolean
  group?: IEditorGroup[]
}
export interface IEditorGroup {
  id: number
  title: string
  order: number
  typeId: Number
  add?: () => void
  del?: () => void
  upd?: () => void
  group?: IEditorGroup[]
  item?: IEditorItem[]
}
export interface IEditorItem {
  id: number
  title: string
  order: number
  add?: () => void
  del?: () => void
  upd?: () => void
  group?: IEditorGroup[]
  item?: IEditorItem[]
}
export interface IProduct {
  id: Number
  logo?: String
  longdesc?: String
  order: Number
  shortdesc?: Number
  title: String
  typeId: number
  Variable_value?: []
}
export interface IProductTypes {
  id: number
  title: string
  order?: number
}

export interface IProductGroups {
  id: number
  typeId: Number
  order?: Number
  title: String
  fields?: IProductFields[]
}
export interface IProductFields {
  id: Number
  id_group: number
  order?: Number
  title: String
  unit?: String
}

declare module '@blitzjs/auth' {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User['id']
      role: Role
    }
  }
}
