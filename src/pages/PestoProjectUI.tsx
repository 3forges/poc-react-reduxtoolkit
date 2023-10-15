import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  RequestProjectList,
  PestoProjectApiEntity,
  request_Output,
} from "../features/PestoApi/Projects/pestoProjectSlice"
import { CreateNewProject } from "../components/Project/CreateNewProject"
import { UpdateProject } from "../components/Project/UpdateProject"
import { ProjectListCard } from "../components/Project/ProjectListCard"
import { Feedbacks } from "../components/Feedbacks"
import "../components/Project/project.css"

interface Filter {
  target: number
  value: string
}

/**
 * PROJECT MAIN COMPONENT
 *
 * LIST PROJECT / CREATE PROJECT
 *
 *  PROVIDE CREATE PROJECT FORM
 *
 *  PROVIDE LIST WITH OPTIONAL BUTTONS (EDIT|REMOVE)
 * @returns PROJECT USER INTERFACE MANAGEMENT
 */
export function PestoProjectUI(): JSX.Element {
  const dispatch = useAppDispatch()
  let requestOutput: PestoProjectApiEntity[] | any =
    useAppSelector(request_Output)
  const [filter, SetFilter] = useState<Filter>({ target: 0, value: "" })

  // JS FOR MODAL
  let none: string[] = Array(requestOutput?.length)
  none.fill("none")
  const [modalDisplay, setModalDisplay] = useState<string[]>(none)
  function modal(index: number) {
    const tmp: string[] = [...none]
    tmp.splice(index, 1, modalDisplay[index] === "none" ? "block" : "none")
    setModalDisplay(tmp)
  }
  /* INITIALISE modalDisplay Array with default "none" */
  useEffect(() => {
    setModalDisplay(none)
    // eslint-disable-next-line
  }, [requestOutput])

  /* REQUEST PROJECT-LIST @FIRST LOAD */
  useEffect(() => {
    dispatch(RequestProjectList())
  }, [dispatch])

  /* FILTERS [_id, name, git_ssh_uri, description, createdAt, __v] */
  const filters: Function[] = [
    (item: PestoProjectApiEntity | any) => {
      return item._id.replace(filter.value, "") !== item._id
    },
    (item: PestoProjectApiEntity | any) => {
      return item.name.replace(filter.value, "") !== item.name
    },
    (item: PestoProjectApiEntity | any) => {
      return item.git_ssh_uri.replace(filter.value, "") !== item.git_ssh_uri
    },
    (item: PestoProjectApiEntity | any) => {
      return item.description.replace(filter.value, "") !== item.description
    },
    (item: PestoProjectApiEntity | any) => {
      return item.createdAt.replace(filter.value, "") !== item.createdAt
    },
    (item: PestoProjectApiEntity | any) => {
      // eslint-disable-next-line
      return item.__v == filter.value
    },
  ]
  if (filter.value !== "" && requestOutput.length > 0) {
    requestOutput = requestOutput.filter(filters[filter.target])
  }

  /* ----------------------- JSX ----------------------- */
  return (
    <div>
      <Feedbacks />
      <CreateNewProject />
      <hr />
      <div>
        <button
          className="button"
          aria-label="List entities"
          onClick={() => dispatch(RequestProjectList())}
        >
          LIST PROJECTS
        </button>
        <input
          type="text"
          id="filter"
          onChange={(e: any) =>
            SetFilter({ target: filter.target, value: e.target.value })
          }
        />
        <select
          id="filterTarget"
          onChange={(e: any) =>
            SetFilter({
              target: Math.floor(e.target.value * 1),
              value: filter.value,
            })
          }
        >
          <option value="0">_id</option>
          <option value="1">name</option>
          <option value="2">git_ssh_uri</option>
          <option value="3">description</option>
          <option value="4">createdAt</option>
          <option value="5">__v</option>
        </select>
        <div className="projects">
          {requestOutput &&
            requestOutput[0] &&
            requestOutput[0]._id !== 0 &&
            requestOutput.map((item: any, index: number) => {
              return (
                <div key={item._id}>
                  {/* MODAL FOR UPDATE FORM */}
                  <div
                    id={`modal_${index}`}
                    className="modal"
                    style={{ display: `${modalDisplay[index]}` }}
                  >
                    <UpdateProject
                      data={item}
                      mode="modal"
                      callback={() => {
                        modal(index)
                      }}
                    />
                  </div>
                  {/* WITHOUT MODAL: <div> <UpdateProject data={item} /> </div> */}

                  <ProjectListCard
                    json={item}
                    callback={() => {
                      modal(index)
                    }}
                  />
                  {/* WITHOUT CONTROLBAR (BUTTONS) <BasicListCard json={item} /> */}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
