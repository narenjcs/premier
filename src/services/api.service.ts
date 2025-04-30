import { firebase } from "@/lib/firebase-admin";
import { NextRequest } from "next/server"

const db = firebase.firestore();
export const getfilterQuery = (request:NextRequest, query:FirebaseFirestore.Query<FirebaseFirestore.DocumentData> ) => {
    const queryParams = request.nextUrl.searchParams
        const filterField = queryParams.getAll('filter_field')||[]
        const filterValue = queryParams.getAll('filter_value')||[]
        const filterOperator = queryParams.getAll('filter_operator')||[]
    
        for (let i = 0; i < filterField.length; i++) {
            let operator = i < filterOperator.length  ? String(filterOperator[i]) : '==';
            let value: any = i < filterValue.length  ? filterValue[i] : undefined;
            if(operator === 'in' && value !== undefined) {
                value = value.split(',').map((item: string) => item.trim());
            }
           
            if (value !== undefined) {
                let field = filterField[i];
                
               if(field === 'client' ) {
                    if (Array.isArray(value)) {
                        value = value.map((item: string) => {
                            const clientRef =db.collection('clients').doc(item);
                            return clientRef;
                        });
                    }else {
                        const clientRef = db.collection('clients').doc(value);
                        value = clientRef;
                    }
                }
                if(field === 'site' ) {
                    if (Array.isArray(value)) {
                        value = value.map((item: string) => {
                            const siteRef = db.collection('sites').doc(item);
                            return siteRef;
                        });
                    }else {
                        const siteRef = db.collection('sites').doc(value);
                        value = siteRef;
                    }
                }
                if(field === 'maintenance' ) {
                    if (Array.isArray(value)) {
                        value = value.map((item: string) => {
                            const maintananceRef = db.collection('maintenance_reports').doc(item);
                            return maintananceRef;
                        });
                    }else {
                        const maintananceRef = db.collection('maintenance_reports').doc(value);
                        value = maintananceRef;
                    }
                }
                if(field === 'users' ) {
                    if (Array.isArray(value)) {
                        value = value.map((item: string) => {
                            const userRef = db.collection('users').doc(item);
                            return userRef;
                        });
                    }else {
                        const userRef = db.collection('users').doc(value);
                        value = userRef;
                    }
                }
                if(field === 'parts' ) {
                    if (Array.isArray(value)) {
                        value = value.map((item: string) => {
                            const partRef = db.collection('maintenance_report_parts').doc(item);
                            return partRef;
                        });
                    }else {
                        const partRef = db.collection('maintenance_report_parts').doc(value);
                        value = partRef;
                    }
                }
                query = query.where(filterField[i], operator as FirebaseFirestore.WhereFilterOp, value);
            }
        }
        return query
    }