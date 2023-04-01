import axios from 'axios'
import { useMutation } from 'react-query'
import { SetGetArgs } from 'types'

export const useIntegrateAccount = ({onSuccess} : SetGetArgs) => {
  return useMutation({
    mutationFn: (form: any) => {
      return axios.post(`/api/login/${form.provider}`, form)
    },
    onSuccess
  })
}