export interface BusPositions {
    Timestamp: string
    Result: Result
  }
  
  export interface Result {
    busPositions: BusPosition[]
  }
  
  export interface BusPosition {
    busId: string
    currsegment: number
    formattedLastModified: string
    heading: string
    lastModified: number
    latitude: number
    longitude: number
    remainonsegment: number
    routecode: string
  }