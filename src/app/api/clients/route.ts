import { firebase } from "@/lib/firebase-admin";
import { a } from "framer-motion/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {


    const db = firebase.firestore()

    const clientsSnapshot = await db.collection('clients').get();

    const clients = await Promise.all(
    clientsSnapshot.docs.map(async (doc) => {

        const userRefs = doc.data().users || [];

        const users = await Promise.all(
          userRefs.map(async (userRef: any) => {
            const userSnap = await userRef.get();
            return { id: userSnap.id, ...userSnap.data() };
          })
        );
    
        // const siteRefs = doc.data().sites || [];
        
        // const sites = await Promise.all(
        //     siteRefs.map(async (siteRef: any) => {
        //     const siteSnap = await siteRef?.get();
        //     return { id: siteSnap.id, ...siteSnap.data() };
        //   })
        // );
       
    
        return {
        id: doc.id,
        ...doc.data(),
        users,
        // sites
        };
    })
    );
      
    return NextResponse.json(clients, { status: 200 })

}


export async function POST(request: Request) {
    const db = firebase.firestore()
    const data = await request.json()
    const { name, email, contact_numbers, address, users } = data

    const clientRef = db.collection('clients').doc()

    await clientRef.set({
        name,
        email,
        contact_numbers,
        address
    })

    if (users && users.length > 0) {
        const usersRef = []
        for (const user of users) {
            
            const userRef = await db.collection('users').doc(user)
            usersRef.push(userRef)
        
        }
        
        await clientRef.set({users: usersRef}, { merge: true })
    }

    return NextResponse.json({ message: 'Client created successfully' }, { status: 201 })
}
export async function PUT(request: Request) {
    const db = firebase.firestore()
    const data = await request.json()
    const { id, name, email, contact_numbers,  users, status, address } = data

    let updateData: any = { id, name, email, contact_numbers,  users, status, address }

    for (const key in updateData) {
        if (updateData[key] === undefined || updateData[key] === null) {
            delete updateData[key];
        }
    }

    const clientRef = db.collection('clients').doc(id)

    await clientRef.update(updateData)
    if (users && users.length > 0) {
        const usersRef = []
        for (const user of users) {
            
            const userRef = await db.collection('users').doc(user)
            usersRef.push(userRef)
        
        }
        
        await clientRef.set({users: usersRef}, { merge: true })
    }

    // if (sites && sites.length > 0) {
    //     const sitesRef = []
    //     for (const user of sites) {
            
    //         const userRef = await db.collection('sites').doc(user)
    //         sitesRef.push(userRef)
        
    //     }
        
    //     await clientRef.set({sites: sitesRef}, { merge: true })
    // }


    return NextResponse.json({ message: 'Client updated successfully' }, { status: 200 })
}
export async function DELETE(request: Request) {    
    const db = firebase.firestore()
    const data = await request.json()
    const { id } = data

    const clientRef = db.collection('clients').doc(id)

    await clientRef.delete()

    return NextResponse.json({ message: 'Client deleted successfully' }, { status: 200 })
}
