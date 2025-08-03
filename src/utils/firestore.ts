import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  type QueryDocumentSnapshot,
  type DocumentData,
  type Timestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { type FormState } from "../types/rsvp-form";

// Types
export interface RSVPDocument extends FormState {
  id: string;
  submittedAt: Timestamp; // Firestore Timestamp
}

const rsvpCollectionRef = collection(db, "rsvps");

// Function to submit RSVP data to Firestore
export const submitRSVP = async (formData: FormState) => {
  try {
    await addDoc(rsvpCollectionRef, {
      ...formData,
      submittedAt: serverTimestamp(), // Adds a server-side timestamp
    });
    // Implement any additional logic after successful submission, like showing a success message
    console.log("RSVP submitted successfully!");
  } catch (error) {
    // Implement error handling, like showing an error message
    console.error("Error submitting RSVP: ", error);
    // Re-throw the error to be handled by the component
    throw new Error("Failed to submit RSVP.");
  }
};

// Function to fetch RSVPs from Firestore
export const fetchRSVPs = async (): Promise<RSVPDocument[]> => {
  try {
    const snapshot = await getDocs(rsvpCollectionRef);
    const rsvps: RSVPDocument[] = snapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as RSVPDocument)
    );
    return rsvps;
  } catch (error) {
    console.error("Error fetching RSVPs: ", error);
    throw new Error("Failed to fetch RSVPs.");
  }
};
