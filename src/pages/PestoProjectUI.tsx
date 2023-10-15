import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  RequestProjectList,
  request_Output,
} from "../features/PestoApi/Projects/pestoProjectSlice"
import { CreateNewProject } from "../components/Project/CreateNewProject"
import { Feedbacks } from "../components/Feedbacks"
import "../components/Project/project.css"
import { UpdateProject } from "../components/Project/UpdateProject"
import { ProjectListCard } from "../components/Project/ProjectListCard"

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
  const requestOutput = useAppSelector(request_Output)

  // JS FOR MODAL
  let none: string[] = Array(requestOutput?.length)
  none.fill("none")
  const [modalDisplay, setModalDisplay] = useState<string[]>(none)

  function modal(index: number) {
    const tmp: string[] = [...none]
    tmp.splice(index, 1, modalDisplay[index] === "none" ? "block" : "none")
    setModalDisplay(tmp)
  }

  /* INITIALISE modalDisplay Array default "none" */
  useEffect(() => {
    setModalDisplay(none)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestOutput])
  /* REQUEST PROJECT-LIST @FIRST LOAD */
  useEffect(() => {
    dispatch(RequestProjectList())
  }, [dispatch])

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
