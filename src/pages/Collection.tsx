import {
  IonPage,
  IonHeader,
  IonContent,
  IonImg,
  IonSpinner,
  IonToolbar,
  IonTitle,
  IonSelect,
  IonSelectOption
} from '@ionic/react'
import { useEffect, useState } from 'react'
import CardModalComponent from '../components/CardViewModal'
import './Collection.css'
import { Card, Set } from '../interface/CollectionInterfaces'

/**
 * This is the collection page that will showcase the users decks and card
 * collection. This is the page where the user can customize their decks
 * and create them
 * @returns 
 */
const Collection: React.FC = () => {
  const [cards, setCards] = useState<Array<Card>>([])
  const [viewedSet, setViewedSet] = useState<string>('OP-01')
  const [sets, setSets] = useState<Set[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  /**
   * This use effect will grab the cards from the one piece tcg api so that
   * it can display it on to the collection screen.
   */
  useEffect(() => {
    fetch('https://www.optcgapi.com/api/allSets')
      .then(res => res.json())
      .then((result: Set[]) => setSets(result))
      .catch(err => console.error(err))
  }, [])

  // load cards whenever viewedSet changes
  useEffect(() => {
    if (!viewedSet) return
    setLoading(true)
    fetch(`https://www.optcgapi.com/api/sets/${viewedSet}`)
      .then(res => res.json())
      .then((result: Card[]) => setCards(result))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [viewedSet])

  const changeHandler = (e: CustomEvent) => {
    const value = e.detail?.value ?? ''
    // clear current cards immediately so the UI reflects a full swap
    setCards([])
    setViewedSet(value)
  }

  /**
   * This method will be used to open the modal and allow the user to view
   * the details of the card that they have selected.
   */
  const handleCardClick = (card: Card) => {
    setSelectedCard(card)
    setModalOpen(true)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Collection</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonSelect value={viewedSet} onIonChange={changeHandler} interface="popover">
        {sets.map((s) => (
          <IonSelectOption key={s.set_id} value={s.set_id}>{`${s.set_id}: ${s.set_name}`}</IonSelectOption>
        ))}
      </IonSelect>
      <IonContent>
        {loading ? (
          <div id='loading'>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          cards.map((card) => (
            <IonImg key={card.card_set_id} src={card.card_image} onClick={() => handleCardClick(card)} />
          ))
        )}
        <CardModalComponent isOpen={modalOpen} onClose={() => setModalOpen(false)} card={selectedCard} />
      </IonContent>
    </IonPage>
  )
}

export default Collection
