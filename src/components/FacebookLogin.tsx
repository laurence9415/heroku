import { useNavigate } from 'react-router-dom'
import { useIntegrateAccount } from '../api/integrateAccount'
import ReactFacebookLogin from '@greatsumini/react-facebook-login'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Facebook as FacebookIcon } from '@mui/icons-material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login'
import { useSignIn } from "react-auth-kit";

const APP_ID = process.env.REACT_APP_FACEBOOK_CLIENT_ID ?? '';

export const FacebookLogin = ({
  iconOnly,
  textOnly,
  redirect
}: {
  iconOnly?: boolean,
  textOnly?: boolean,
  redirect?: string
}) => {
  const navigate = useNavigate()
  const signIn = useSignIn();


  const { mutate: integrate } = useIntegrateAccount({
    onSuccess: (data: any): any => {
      if (redirect) {

        signIn({
          token: data.data.token,
          expiresIn: 60,
          tokenType: 'Bearer',
          authState: { email: data.data.email }
        })

        navigate(redirect)
      }
    },
  })

  const onSuccess = (response: any) => {
    let responseData: any = {
      ...response,
      provider: 'facebook'
    }

    FacebookLoginClient.getProfile((profile) => {
      responseData = {
        ...responseData,
        profile
      }

      integrate(responseData)
    }, {
      fields: 'id,name,picture'
    })
  }

  return (
    <>
      <ReactFacebookLogin
        appId={ APP_ID }
        onSuccess={response => onSuccess(response)}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        render={({ onClick }) => {
          if (iconOnly) {
            return (
              <IconButton aria-label="facebook" size="large" onClick={onClick}>
                <FacebookIcon />
              </IconButton>
            )
          }

          if (textOnly) {
            return (
              <Button
                variant="outlined"
                size="small"
                onClick={ onClick }
              >
                Integrate
              </Button>
            )
          }

          return (
            <Button
              variant='contained'
              startIcon={<FacebookRoundedIcon />}
              onClick={onClick}
            >
              Integrate with Facebook
            </Button>
          )
        }}
      />
    </>
  )
}
