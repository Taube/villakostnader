import { useParams } from "react-router-dom"

export const useParamsId = () => {
  const params = useParams()
  const { id } = params

  if (!id) {
    throw new Error(":id parameter is required.")
  }

  return id
}
