import { SimpleRolesIsAuthorized } from '@blitzjs/auth'
import { Field_group, User } from 'db'

export type Role = 'ADMIN' | 'USER'

export interface IEditorUI {
  id: number
  title: string
  tab: IEditorTab[]
}

export interface IEditorTab extends IProductTypes {
  isDisabled?: boolean
  group: IEditorGroup[]
  add?: () => void
  del?: () => void
  upd?: () => void
}
export interface IEditorGroup extends Field_group {
  field: IEditorItem[]
  add?: () => void
  del?: () => void
  upd?: () => void
}
export interface IEditorItem extends IProductFields {
  isDisabled?: boolean
  add?: () => void
  del?: () => void
  upd?: () => void
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
  title: string
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
