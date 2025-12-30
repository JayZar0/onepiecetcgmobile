import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonInput,
  IonButton
} from '@ionic/react'
import * as react from 'react'

/**
 * This is the authentication page where the user will enter their credentials
 * to access their account that will contain the users card collection along
 * with the decks that they have created
 * @returns 
 */
const AuthenticationPage: React.FC = () => {
  const [username, setUsername] = react.useState<string>('')
  const [password, setPassword] = react.useState<string>('')

  /**
   * This function will be used to submit the authentication form to the server
   * to perform authentication
   */
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput
          value={username}
          onIonChange={(e) => {setUsername(e.detail.value ?? '')}}
          placeholder='username'
        />
        <IonInput
          value={password}
          onIonChange={(e) => setPassword(e.detail.value ?? '')}
          placeholder='password'
        />
        <IonButton type='submit'>Login</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default AuthenticationPage
