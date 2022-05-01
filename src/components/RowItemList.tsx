import {
  IonAlert,
  IonItem,
  IonLabel,
  IonNote,
  IonToast
} from '@ionic/react';
import { RowItem } from '../data/rowitem';
import './RowItemList.css';
import Avatar from 'react-avatar';
import { useState } from 'react';

interface RowItemListProps {
  rowItem: RowItem;
  searchText: string;
}
var randomColor = require('randomcolor');
const RowItemList: React.FC<RowItemListProps> = ({ rowItem, searchText }) => {
  const [open, setOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  if (rowItem && rowItem?.name?.toLowerCase().indexOf(searchText?.toLowerCase()) < 0) return <></>;
  var color = randomColor({ luminosity: 'dark' });

  const processClick = () => {
    if (rowItem.passcode) {
      setOpen(true);
    } else {
      window && window.open(rowItem.url, '_blank');
    }
  }
  return (
    <>
      <IonToast
        isOpen={isError}
        onDidDismiss={() => setIsError(false)}
        message="Incorrect passcode entered. Please try again..."
        color='danger'
        duration={1000}
        position="top"
      />
      <IonAlert
        isOpen={open}
        onDidDismiss={() => setOpen(false)}
        header={`Verification`}
        message={'Enter correct passcode to open `' + rowItem.name + '`'}
        inputs={[
          {
            name: 'passcode',
            type: 'text',
            placeholder: 'Enter Passcode'
          }
        ]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Verify',
            handler: (alertData) => {
              if (alertData.passcode != rowItem.passcode) {
                setIsError(true);
                return false;
              }
              // console.log('Confirm Ok',alertData.passcode);
              window && window.open(rowItem.url, '_blank');
            }
          }
        ]}
      />
      <IonItem lines={'full'} detail={true} button={true} target="_blank" disabled={!rowItem.isactive} onClick={() => processClick()}>
        <div slot="start" className={`dot dot-${rowItem.passcode?'warning':'secondary'}`}></div>
        <div slot="start"><Avatar name={rowItem.name} round={true} size="30px" style={{ paddingLeft: '1rem' }} color={color} /></div>
        <IonLabel className="ion-text-wrap">
          <h2>
            <span>{rowItem.name}</span>
            <span className="date">
              <IonNote>{rowItem.source}</IonNote>
            </span>
          </h2>
        </IonLabel>
      </IonItem>
    </>
  );
};

export default RowItemList;
