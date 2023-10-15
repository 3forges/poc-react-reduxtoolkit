import { useAppDispatch } from "../../app/hooks"
import {
  RequestProjectList,
  PestoProjectApiEntity,
  DeleteProjectById,
} from "../../features/PestoApi/Projects/pestoProjectSlice"

interface ListProps {
  json: object | PestoProjectApiEntity
  callback: Function
}

/**
 * RENDER JSON TO PROJECT-CARD
 * @param props
 *  json: PestoProjectApiEntity => data to render
 *
 *  callback: FUNCTION  => (optional) parent javascript for buttons
 * @returns PROJECT-CARD + BUTTONS (optional)
 */
export function ProjectListCard(props: ListProps): JSX.Element {
  //console.log(props)
  const dispatch = useAppDispatch()
  const item: any = props.json
  let keys = []
  for (let key in item) {
    keys.push(key)
  }

  return (
    <div className="ProjectCard">
      <ul>
        {keys.map((k: string) => {
          return (
            <li key={k}>
              <span>{k}:</span>
              <span>{item[k]}</span>
            </li>
          )
        })}
      </ul>
      {/* CONTROLBAR IF CALLBACK PROVIDED */}
      {typeof props.callback != "undefined" && (
        <div className="controlBar">
          <button
            className="button"
            aria-label="Edit"
            onClick={() => {
              props.callback() //modal(index)
            }}
          >
            Edit
          </button>
          <button
            className="button"
            aria-label="Edit"
            onClick={async () => {
              await dispatch(DeleteProjectById(item._id))
              dispatch(RequestProjectList())
            }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  )
}
