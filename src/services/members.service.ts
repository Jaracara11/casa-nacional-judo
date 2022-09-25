import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore/lite';
import { IMember } from '../interfaces/IMember';
import { db } from '../utils/firebase';

const membersCollection = 'members';
const collectionRef = (colRef: string) => {
    return collection(db, colRef);
};

const docRef = (id: string, colRef: string) => {
    return doc(db, colRef, id);
};

const getAllMembers = async () => {
    const q = query(collectionRef(membersCollection), orderBy('firstName'));
    const data = await getDocs(q);
    return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
};

const getMemberById = async (id: string) => {
    const docSnap = await getDoc(docRef(id, membersCollection));
    return docSnap.data() as IMember;
};

const createMember = async (data: IMember) => {
    const newMember = await addDoc(collectionRef(membersCollection), data);
    return newMember;
};

const updateMember = async (data: IMember) => {
    const member = await updateDoc(docRef(data.id!, membersCollection), { data });
    return member;
};

const deleteMember = async (id: string) => {
    await deleteDoc(docRef(id, membersCollection));
};

export { getAllMembers, getMemberById, createMember, updateMember, deleteMember };
