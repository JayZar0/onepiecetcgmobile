import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonModal,
  IonToast,
  IonImg,
  IonText
} from '@ionic/react'
import { useState } from 'react'
import { Set } from '../interface/CollectionInterfaces'
import { useEffect } from 'react'

type Pack = {
  id: string
  name: string
  price: number
  description?: string
  image?: string
}

const samplePacks: Pack[] = [
  { id: 'p1', name: 'Starter Pack', price: 100, description: 'A small pack with a chance for rares.', image: '/assets/pack-starter.png' },
  { id: 'p2', name: 'Brave Sailor Pack', price: 250, description: 'Medium pack — better odds.', image: '/assets/pack-brave.png' },
  { id: 'p3', name: 'Legendary Pack', price: 1000, description: 'Large pack with premium odds.', image: '/assets/pack-legend.png' }
]

/**
 * Shop page — displays packs and lets users open a modal to confirm opening.
 */
const Shop: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null)
  const [sets, setSets] = useState<Array<Set>>([])
  const [packs, setPacks] = useState<Array<Pack>>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

  useEffect(() => {
    const sets: Array<Set> = fetch('https://www.optcgapi.com/api/allSets')
      .then(res => res.json())
      .then((result: Set[]) => setSets(result))
      .catch(err => console.error(err))

    setPacks()
  }, [])

  function openPackModal(pack: Pack) {
    setSelectedPack(pack)
    setIsModalOpen(true)
  }

  function confirmOpenPack() {
    // TODO: integrate with backend / currency checks — for now just show confirmation
    setIsModalOpen(false)
    setToastOpen(true)
    setSelectedPack(null)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shop</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            {samplePacks.map((pack) => (
              <IonCol size="12" size-md="6" size-lg="4" key={pack.id}>
                <IonCard button onClick={() => openPackModal(pack)}>
                  {pack.image && <IonImg src={pack.image} />}
                  <IonCardHeader>
                    <IonCardTitle>{pack.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div>{pack.description}</div>
                    <IonText ><div style={{ marginTop: 8, fontWeight: 600 }}>{pack.price} Coins</div></IonText>
                    <div style={{ marginTop: 8 }}>
                      <IonButton size="small">View</IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
          <div style={{ padding: 16 }}>
            <h2>{selectedPack?.name ?? 'Open Pack'}</h2>
            {selectedPack?.image && <IonImg src={selectedPack.image} style={{ maxWidth: 200 }} />}
            <p>{selectedPack?.description}</p>
            <p><strong>Cost:</strong> {selectedPack?.price} Coins</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <IonButton color="primary" onClick={confirmOpenPack}>Open Pack</IonButton>
              <IonButton onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
            </div>
          </div>
        </IonModal>

        <IonToast
          isOpen={toastOpen}
          message="Pack opened! Check your collection to see new cards."
          duration={2000}
          onDidDismiss={() => setToastOpen(false)}
        />
      </IonContent>
    </IonPage>
  )
}

export default Shop