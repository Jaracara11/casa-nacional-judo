import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore/lite';
import { db } from '../utils/firebase';

const membersCollection = 'members';
const collectionRef = (colRef: string) => {
  return collection(db, colRef);
};

const docRef = (id: string, colRef: string) => {
  return doc(db, colRef, id);
};

async function getAllMembers() {
  const q = query(collectionRef(membersCollection), orderBy('firstName'));
  const data = await getDocs(q);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

async function getAppointmentById(id: string, colRef: string) {
  const docSnap = await getDoc(docRef(id, colRef));
  return docSnap.data();
}

// async function createAppointment(data: IAppointment, colRef: string) {
//   data.createdAt = Timestamp.fromDate(new Date(Date.now()));
//   const newAppointment = await addDoc(collectionRef(colRef), data);
//   return newAppointment;
// }

// async function updateAppointment(colRef: string, data: IAppointment) {
//   const appointment = await updateDoc(docRef(data.id, colRef), { data });
//   return appointment;
// }

async function deleteAppointment(id: string, colRef: string) {
  await deleteDoc(docRef(id, colRef));
}

export { getAllMembers, getAppointmentById, deleteAppointment };
