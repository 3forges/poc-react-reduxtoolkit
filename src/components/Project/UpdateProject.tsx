import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import {
  RequestProjectList,
  UpdateProjectById,
  PestoProjectApiEntity,
} from "../../features/PestoApi/Projects/pestoProjectSlice"

interface UpdateProps {
  data: PestoProjectApiEntity
  mode?: string
  callback?: Function
}

/**
 * RENDER JSON TO UPDATE FORM
 * @param props
 *  data: project (json)
 *
 *  mode: default | modal (optional string)
 *
 *  callback: function for my modal (optional Function)
 * @returns FORM (1 champs texte + 2 boutons)
 */
export function UpdateProject(props: UpdateProps): JSX.Element {
  const dispatch = useAppDispatch()
  const [modalValues, setModalValues] = useState<string>(
    JSON.stringify(props.data),
  )

  return (
    <div>
      <textarea
        id={`json_update_${props.data._id}`}
        rows={5}
        cols={80}
        value={modalValues}
        onChange={(e) => setModalValues(e.target.value)}
        onKeyDown={async (e) => {
          // ENTER TO VALID UPDATE
          if (e.key === "Enter") {
            if (props.callback) props.callback()
            const source: any = document.getElementById(
              "json_update_" + props.data._id,
            )
            const data: PestoProjectApiEntity = JSON.parse(source.value)
            await dispatch(UpdateProjectById(data))
            dispatch(RequestProjectList())
          }
        }}
      />
      <br />
      {props.mode && props.mode === "modal" && (
        <button
          className="button"
          onClick={() => {
            if (props.callback) props.callback()
          }}
        >
          CANCEL
        </button>
      )}
      <button
        className="button"
        onClick={async () => {
          if (props.callback) props.callback()
          const source: any = document.getElementById(
            "json_update_" + props.data._id,
          )
          const data: PestoProjectApiEntity = JSON.parse(source.value)
          await dispatch(UpdateProjectById(data))
          dispatch(RequestProjectList())
        }}
      >
        UPDATE
      </button>
    </div>
  )
}
