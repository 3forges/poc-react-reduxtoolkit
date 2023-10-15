import { useEffect } from "react"
import { useAppDispatch } from "../app/hooks"
import { RequestProjectList } from "../features/PestoApi/Projects/pestoProjectSlice"
import { RetrieveProject } from "../components/Project/RetrieveProject"
import { CreateNewProject } from "../components/Project/CreateNewProject"
import { Feedbacks } from "../components/Feedbacks"
import "../App.css"

export function PestoProject() {
  const dispatch = useAppDispatch()

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
          {/* ref: https://github.com/vercel/next.js/issues/42292 */}
          {/* @ts-expect-error Server Component */}
          <RetrieveProject />
        </div>
      </div>
    </div>
  )
}
