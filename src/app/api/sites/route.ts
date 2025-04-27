import { firebase } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET(request: Request) {


    const db = firebase.firestore()

    const sitesSnapshot = await db.collection('sites').get();

    const sites = await Promise.all(
    sitesSnapshot.docs.map(async (doc) => {

        const clientRefs = doc.data().client ;
        if (!clientRefs) {
            return {
                id: doc.id,
                ...doc.data(),
                client: null,
            };
        }
        const clientSnap =  await clientRefs.get();
        const client = { id: clientSnap.id, ...clientSnap.data() };
     
    
        return {
        id: doc.id,
        ...doc.data(),
        client,
        
        };
    })
    );
      
      
    return NextResponse.json(sites, { status: 200 })

}

export async function POST(request: Request) {
    const db = firebase.firestore()
    const data = await request.json()
    const { name, location, status , client } = data

    const siteRef = db.collection('sites').doc()

    await siteRef.set({
        location, name, status
    })

    if(client){
        const clientRef = db.collection('clients').doc(client)
        await siteRef.set({client: clientRef}, { merge: true })
    
    }
    
   

    return NextResponse.json({ message: 'Client created successfully' }, { status: 201 })
}
export async function PUT(request: Request) {   
    const db = firebase.firestore()
    const data = await request.json()
    const { id,name, location, status, client  } = data

    const siteRef = db.collection('sites').doc(id)

    await siteRef.update({
        name, location , status
    })

    if(client){
        const clientRef = db.collection('clients').doc(client)
        await siteRef.set({client: clientRef}, { merge: true })
    
    }

    return NextResponse.json({ message: 'Client updated successfully' }, { status: 200 })
}
export async function DELETE(request: Request) {
    const db = firebase.firestore()
    const data = await request.json()
    const { id } = data

    const siteRef = db.collection('sites').doc(id)

    await siteRef.delete()

    return NextResponse.json({ message: 'Client deleted successfully' }, { status: 200 })
}