import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonText
} from '@ionic/react'
import { Card } from '../interface/CollectionInterfaces'

type Props = {
  isOpen: boolean
  onClose: () => void
  card?: Card | null
}

/**
 * Modal that displays full card details when a card is clicked in the collection
 */
const CardModalComponent: React.FC<Props> = ({ isOpen, onClose, card }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{card?.card_name ?? 'Card Details'}</IonTitle>
          <IonButton slot="end" onClick={onClose}>Close</IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {card ? (
          <>
            <IonImg src={card.card_image} alt={card.card_name} />
            <IonList>
              <IonItem>
                <IonLabel>
                  <h3>{card.card_name}</h3>
                  <p>{card.set_name} — {card.rarity}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <strong>Cost:</strong> <IonText>{card.card_cost}</IonText>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <strong>Power:</strong> <IonText>{card.card_power}</IonText>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <strong>Color:</strong> <IonText>{card.card_color}</IonText>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <strong>Text:</strong>
                  <p>{card.card_text}</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </>
        ) : (
          <p>No card selected.</p>
        )}
      </IonContent>
    </IonModal>
  )
}

export default CardModalComponent
