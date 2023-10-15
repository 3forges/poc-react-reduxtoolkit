import { useAppSelector } from "../app/hooks"
import { request_Feedback } from "../features/PestoApi/Projects/pestoProjectSlice"

/**
 * REQUEST FEEDBACKS COMPONENT
 * @returns feedback list (string[])
 */
export function Feedbacks(): JSX.Element {
  const requestFeedback: string[] = useAppSelector(request_Feedback)

  return (
    <div className="feedback">
      <b>
        <u>Feed-Back:</u>
      </b>
      <br />
      <div>
        {requestFeedback?.map((item: string, index: number) => {
          return <div key={`feedbacks_${index}`}> {item} </div>
        })}
      </div>
    </div>
  )
}
