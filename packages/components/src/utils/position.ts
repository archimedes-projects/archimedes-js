export type ItemPosition = ItemPosition1D | ItemPosition2D | ItemPosition3D

export interface ItemPosition1D {
  x: number
}

export interface ItemPosition2D {
  x: number
  y: number
}

export interface ItemPosition3D {
  x: number
  y: number
  z: number
}

export function isPosition1D(position: ItemPosition): position is ItemPosition1D {
  return (position as ItemPosition1D).x !== undefined
}

export function isPosition2D(position: ItemPosition): position is ItemPosition2D {
  return (position as ItemPosition2D).x !== undefined && (position as ItemPosition2D).y !== undefined
}

export function isPosition3D(position: ItemPosition): position is ItemPosition3D {
  return (
    (position as ItemPosition3D).x !== undefined &&
    (position as ItemPosition3D).y !== undefined &&
    (position as ItemPosition3D).z !== undefined
  )
}
