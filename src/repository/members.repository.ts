import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore/lite';
import { IMember } from '../interfaces/IMember';
import { db } from '../utils/firebase';
import { MEMBERS_COLLECTION } from '../utils/constants';

const collectionRef = (colRef: string) => {
    return collection(db, colRef);
};

const docRef = (id: string, colRef: string) => {
    return doc(db, colRef, id);
};

const getAllMembers = async () => {
    const q = query(collectionRef(MEMBERS_COLLECTION), orderBy('firstName'));
    const data = await getDocs(q);
    return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
};

const getMemberById = async (id: string) => {
    const docSnap = await getDoc(docRef(id, MEMBERS_COLLECTION));
    return docSnap.data() as IMember;
};

const createMember = async (data: IMember) => {
    const newMember = await addDoc(collectionRef(MEMBERS_COLLECTION), data);
    return newMember;
};

const updateMember = async (data: IMember) => {
    const member = await updateDoc(docRef(data.id!, MEMBERS_COLLECTION), { data });
    return member;
};

const deleteMember = async (id: string) => {
    await deleteDoc(docRef(id, MEMBERS_COLLECTION));
};

export { getAllMembers, getMemberById, createMember, updateMember, deleteMember };
