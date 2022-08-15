import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import Supplier from "./supplier";
import { removeSupplier, saveSupplier, searchSuppliers } from './supplierApi';

const SupplierList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [clientes, setClientes] = useState<Supplier[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchSuppliers();
    setClientes(result);
  }

  const remove = async (id: string) => {
    await removeSupplier(id);
    search();
  }

  const addSupplier = () => {
    history.push('/page/supplier/new');
  }

  const editSupplier = (id: string) => {
    history.push('/page/supplier/' + id);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonCard>
          <IonTitle>Gestión de Proveedores</IonTitle>

          <IonItem>
            <IonButton onClick={addSupplier} color="primary" fill='solid' slot='end' size='default'>
              <IonIcon icon={add} />
              Agregar Proveedor
            </IonButton>
          </IonItem>

          <IonGrid className='table'>
            <IonRow>
              <IonCol>Nombre</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Teléfono</IonCol>
              <IonCol>Web</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>

            {clientes.map((cliente: Supplier) =>
              <IonRow>
                <IonCol>{cliente.name}</IonCol>
                <IonCol>{cliente.email}</IonCol>
                <IonCol>{cliente.phone}</IonCol>
                <IonCol>{cliente.web}</IonCol>
                <IonCol>
                  <IonButton fill='clear' color='primary'
                    onClick={() => editSupplier(String(cliente.id))}>
                    <IonIcon icon={pencil} slot='icon-only' />
                  </IonButton>

                  <IonButton fill='clear' color='danger'
                    onClick={() => remove(String(cliente.id))}>
                    <IonIcon icon={close} slot='icon-only' />
                  </IonButton>
                </IonCol>
              </IonRow>
            )}



          </IonGrid>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default SupplierList;