import Tesseract from "tesseract.js";
import {getDmzKeysFromWords} from "./ocr.js";

export const recognize = async(base64Image, callback) => {
    return Tesseract.recognize(
        base64Image,
        'eng',
        { logger: m => {
                if (m.status === 'recognizing text') {
                    callback(parseInt(m.progress * 100))
                }
            }}).then((data) => {
        return getDmzKeysFromWords(data.data.words.map(word => word.text))
    })
}
