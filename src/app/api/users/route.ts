import { firebase } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const queryParams = request.nextUrl.searchParams
    const filterField = queryParams.getAll('filter_field')||[]
    const filterValue = queryParams.getAll('filter_value')||[]
    const filterOperator = queryParams.getAll('filter_operator')||[]

    const db = firebase.firestore()
    console.log('filterField', filterField, 'filterValue', filterValue, 'filterOperator', filterOperator)

    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = db.collection('users'); // FIXED typing

    for (let i = 0; i < filterField.length; i++) {
        let operator = i < filterOperator.length  ? String(filterOperator[i]) : '==';
        let value: any = i < filterValue.length  ? filterValue[i] : undefined;
        if(operator === 'in' && value !== undefined) {
            value = value.split(',').map((item: string) => item.trim());
        }
        console.log('filterField', filterField[i], 'operator', operator, 'value', value)
        if (value !== undefined) {
            console.log('filterField', filterField[i], 'operator', operator, 'value', value)
            query = query.where(filterField[i], operator as FirebaseFirestore.WhereFilterOp, value);
        }
    }

    const users = (await query.get()).docs.map((doc) => ( { id: doc.id, ...doc.data() }))
      
    return NextResponse.json(users, { status: 200 })

}

export async function PUT(request: Request) {   
    const db = firebase.firestore()
    const data = await request.json()
    const { id,role  } = data

    const clientRef = db.collection('users').doc(id)

    await clientRef.update({
        role
    })

    return NextResponse.json({ message: 'Client updated successfully' }, { status: 200 })
}