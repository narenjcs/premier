import { firebase } from "@/lib/firebase-admin";
import { getfilterQuery } from "@/services/api.service";
import { NextRequest, NextResponse } from "next/server";
const db = firebase.firestore()
export async function GET(request: NextRequest) {



    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = getfilterQuery(request, db.collection('users')); // FIXED typing

    const users = (await query.get()).docs.map((doc) => ( { id: doc.id, ...doc.data() }))
      
    return NextResponse.json(users, { status: 200 })

}

export async function PUT(request: Request) {   
   
    const data = await request.json()
    const { id,role  } = data

    const clientRef = db.collection('users').doc(id)

    await clientRef.update({
        role
    })

    return NextResponse.json({ message: 'Client updated successfully' }, { status: 200 })
}