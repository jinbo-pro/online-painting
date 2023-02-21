export const drawingBoardValidUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://ec2-35-88-251-74.us-west-2.compute.amazonaws.com:8080'
    : 'http://localhost:8080'

export const drawingBoardId = 'drawingBoard'
