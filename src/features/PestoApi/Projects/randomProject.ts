import { PestoProjectApiEntity } from "./pestoProjectSlice"
/**
 * FEED RANDOM JSON FOR NEW-PROJECT-REQUEST
 * @returns PestoProjectApiEntity json object
 */
export function randomProject(): PestoProjectApiEntity {
  function randomWords() {
    const char: string[] = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ]
    let word: string = ""
    for (let i: number = 0; i < 5 + Math.round(Math.random() * 5); i++) {
      word += char[Math.round(Math.random() * 25)]
    }
    return word
  }
  const ret: PestoProjectApiEntity = {
    name: randomWords(),
    description: randomWords() + " " + randomWords() + " " + randomWords(),
    git_ssh_uri: "git@github.com:" + randomWords() + "/" + randomWords(),
  }
  return ret
}
