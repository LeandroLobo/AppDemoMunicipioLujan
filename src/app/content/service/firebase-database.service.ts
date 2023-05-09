import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {
    database: any;
    auth: any;

    constructor() {
        const app = initializeApp(environment.firebaseConfig);
        this.database = getFirestore(app);
        this.auth = getAuth(app);
    }

    public createUser(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    public login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    public async guardarDatos(col: string, doc: any) {
        try {
            const docRef = await addDoc(collection(this.database, col), doc);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    public async leerUltimoDocumento(col: string) {
        const querySnapshot = await getDocs(
          query(
            collection(this.database, col),
            orderBy("fechaSubida", "desc"),
            limit(1)
          )
        );
        const ultimoDocumento = querySnapshot.docs[0].data();
        return ultimoDocumento;
      }



    public guardarObjeto(objeto: any, ruta: string): Promise<any> {
        return this.database.ref(ruta).push(objeto);
    }

    public obtenerObjetos(ruta: string): Promise<any> {
        return this.database.ref(ruta).once('value').then((snapshot:any) => {
        return snapshot.val();
        });
    }

}
