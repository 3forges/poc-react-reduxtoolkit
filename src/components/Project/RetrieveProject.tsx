import { useState, useEffect } from "react"
import { useAppSelector } from "../../app/hooks"
import { request_Output } from "../../features/PestoApi/Projects/pestoProjectSlice"
import "./project.css"
import { UpdateProject } from "./UpdateProject"
import { BasicListCard } from "../BasicListCard"

/**
 * RETRIEVE PROJECT COMPONENT
 *  RENDER PROJECTS RETURNED FROM YOUR REQUEST
 *    PROVIDE UPDATE / DELETE METHODS FOR EVERY PROJECT IN THE REQUEST
 * @returns PROJECT LIST <RetrieveProject />
 */
export function RetrieveProject() {
  const requestOutput = useAppSelector(request_Output)

  // JS FOR MODAL
  let none: string[] = Array(requestOutput?.length)
  none.fill("none")
  const [modalDisplay, setModalDisplay] = useState<string[]>(none)
  useEffect(() => {
    setModalDisplay(none)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestOutput])
  function modal(index: number) {
    const tmp: string[] = [...none]
    tmp.splice(index, 1, modalDisplay[index] === "none" ? "block" : "none")
    setModalDisplay(tmp)
  }

  // SI LE RETOUR DE REQUETE N'EST PAS VIDE
  if (requestOutput && requestOutput[0] && requestOutput[0]._id !== 0) {
    return requestOutput.map((item: any, index: number) => {
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

          <BasicListCard
            json={item}
            callback={() => {
              modal(index)
            }}
          />
          {/* WITHOUT CONTROLBAR (BUTTONS) <BasicListCard json={item} /> */}
        </div>
      )
    })
  } else {
    const div = [<div key={0}></div>]
    return div
  }
}
