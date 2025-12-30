import { 
  IonContent,
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButton
} from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import './Home.css'

/**
 * This is going to be the home page that will be used to navigate though the
 * application.
 * @returns 
 */
const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Main Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Main Menu</IonTitle>        
          </IonToolbar>
        </IonHeader>
        <IonButton>To Do List</IonButton>
        <IonButton>Play</IonButton>
        <IonButton>Collection</IonButton>
        <IonButton>Shop</IonButton>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home
