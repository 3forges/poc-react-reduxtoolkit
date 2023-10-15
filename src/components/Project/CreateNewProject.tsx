import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import {
  RequestProjectList,
  PestoProjectApiEntity,
  CreateProject,
} from "../../features/PestoApi/Projects/pestoProjectSlice"
import { randomProject } from "../../features/PestoApi/Projects/randomProject" // DEVMODE USEFULL
import "./project.css"

/**
 * CREATE PROJECT FORM
 * @returns RANDOM|EDITED PestoProjectApiEntity
 */
export function CreateNewProject(): JSX.Element {
  const [inputValue, setInputValue] = useState<PestoProjectApiEntity>(
    randomProject(),
  )
  const dispatch = useAppDispatch()

  return (
    <>
      <div>
        <br />
        <textarea
          id="source_new"
          cols={50}
          rows={5}
          value={JSON.stringify(inputValue)}
          onChange={(e) => setInputValue(JSON.parse(e.target.value))}
        />
      </div>
      <button
        className="button"
        aria-label="Create Content-Type"
        onClick={async () => {
          const data: any = document.getElementById("source_new")
          await dispatch(CreateProject(JSON.parse(data.value)))
          setInputValue(randomProject())
          dispatch(RequestProjectList())
        }}
      >
        NEW PROJECT
      </button>
    </>
  )
}
