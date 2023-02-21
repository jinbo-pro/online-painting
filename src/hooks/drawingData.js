import { connectToChild } from 'penpal'
import { drawingBoardValidUrl, drawingBoardId } from '@/utils/constants'

const POST_MESSAGE = 'getDrawingData'

export async function useGetDrawingSubmitData() {
  const iframe = document.getElementById(drawingBoardId)
  iframe.contentWindow.postMessage(POST_MESSAGE, drawingBoardValidUrl)

  try {
    const connection = connectToChild({
      iframe,
      childOrigin: drawingBoardValidUrl,
      timeout: 5000,
      debug: true
    })

    const child = await connection.promise

    return child.getSubmitImageData().then((drawingSubmitData) => drawingSubmitData)
  } catch (e) {
    console.error(e)
  }
}

export async function useGetDrawingDraftData() {
  const iframe = document.getElementById(drawingBoardId)
  iframe.contentWindow.postMessage(POST_MESSAGE, drawingBoardValidUrl)

  try {
    const connection = connectToChild({
      iframe,
      childOrigin: drawingBoardValidUrl,
      timeout: 5000,
      debug: true
    })

    const child = await connection.promise

    return child.getDraftImageData().then((draftImage) => draftImage)
  } catch (e) {
    console.error(e)
  }
}
