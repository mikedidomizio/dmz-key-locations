import Tesseract from "tesseract.js";
import {getDmzKeysFromWords} from "./ocr.js";

export const recognize = async(image, callback) => {
    return Tesseract.recognize(
        image,
        'eng',
        { logger: m => {
                if (m.status === 'recognizing text') {
                    callback(parseInt(m.progress * 100))
                }
            }}).then((data) => {
        return getDmzKeysFromWords(data.data.words.map(word => word.text))
    })
}
