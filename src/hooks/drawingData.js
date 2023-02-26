import { connectToChild } from 'penpal'
import { drawingBoardValidUrl, drawingBoardId } from '@/config/constants'

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

/**
 * Pass draft image to iframe to be uploaded to canvas
 * @param {string} draftImageData - base64 image data of draft
 */
export function useLoadDraftDrawing(draftImageData) {
  const iframe = document.getElementById(drawingBoardId)
  iframe.contentWindow.postMessage({ draft: draftImageData }, drawingBoardValidUrl)
}
