import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore/lite';
import { IMember } from '../interfaces/IMember';
import { db } from '../utils/firebase';
import { MEMBERS_COLLECTION } from '../utils/constants';

const collectionRef = () => {
    return collection(db, MEMBERS_COLLECTION);
};

const docRef = (id: string) => {
    return doc(db, MEMBERS_COLLECTION, id);
};

const getAllMembers = async () => {
    const q = query(collectionRef(), orderBy('firstName'));
    const data = await getDocs(q);
    return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
};

const getMemberById = async (id: string) => {
    const docSnap = await getDoc(docRef(id));
    return docSnap.data() as IMember;
};

const createMember = async (data: IMember) => {
    const newMember = await addDoc(collectionRef(), data);
    return newMember;
};

const updateMember = async (data: IMember) => {
    debugger;
    const member = await updateDoc(docRef(data.id!), { data });
    return member;
};

const deleteMember = async (id: string) => {
    await deleteDoc(docRef(id));
};

export { getAllMembers, getMemberById, createMember, updateMember, deleteMember };
