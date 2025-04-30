import { firebase } from "@/lib/firebase-admin";
import { getfilterQuery } from "@/services/api.service";
import { NextRequest, NextResponse } from "next/server";
const db = firebase.firestore();
export async function GET(request: NextRequest) {


  let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
    getfilterQuery(request, db.collection("maintenance_reports")); // FIXED typing

  const reportsSnapshot = await query.get();

  const reports = await Promise.all(
    reportsSnapshot.docs.map(async (doc) => {
      const siteRef = doc.data().site;
      const clientRef = doc.data().client;

      let site = null;
      let client = null;

      if (siteRef) {
        const siteSnap = await siteRef.get();
        site = { id: siteSnap.id, ...siteSnap.data() };
      }

      if (clientRef) {
        const clientSnap = await clientRef.get();
        client = { id: clientSnap.id, ...clientSnap.data() };
      }

      return {
        id: doc.id,
        ...doc.data(),
        site,
        client,
      };
    })
  );

  return NextResponse.json(reports, { status: 200 });
}
export async function POST(request: Request) {

  const data = await request.json();
  const {
    client,
    site,
    failure_datetime,
    restart_datetime,
    weg_type,
    weg_no,
    loc_no,
    service_type,
    complaint,
    work_performed,
    remarks,
    pwse_name,
    pwse_date,
    site_incharge_name,
    site_incharge_date,
    status
  } = data;

  const reportRef = db.collection("maintenance_reports").doc();
  const clientRef = db.collection("clients").doc(client);
  const siteRef = db.collection("sites").doc(site);
 
  // Set the rest of the fields
  let updateData: any = {
 
    failure_datetime,
    restart_datetime,
    weg_type,
    weg_no,
    loc_no,
    service_type,
    complaint,
    work_performed,
    remarks,
    pwse_name,
    pwse_date,
    site_incharge_name,
    site_incharge_date,
    status
  };

  for (const key in updateData) {
    if (updateData[key] === undefined || updateData[key] === null) {
      delete updateData[key];
    }
  }
  await reportRef.set({client: clientRef, site: siteRef, ...updateData});
  const reportData = await reportRef.get();
  return NextResponse.json(
    { message: "Report created successfully", data: {id: reportData.id, ...data} },
    { status: 201 }
  );
}
export async function PUT(request: Request) {

  const data = await request.json();
  const {
    id,
    client,
    site,
    failure_datetime,
    restart_datetime,
    weg_type,
    weg_no,
    loc_no,
    service_type,
    complaint,
    work_performed,
    remarks,
    pwse_name,
    pwse_date,
    site_incharge_name,
    site_incharge_date,
    status
  } = data;

  const reportRef = db.collection("maintenance_reports").doc(id);

  let updateData: any = {
    client,
    site,
    failure_datetime,
    restart_datetime,
    weg_type,
    weg_no,
    loc_no,
    service_type,
    complaint,
    work_performed,
    remarks,
    pwse_name,
    pwse_date,
    site_incharge_name,
    site_incharge_date,
    status
  };

  for (const key in updateData) {
    if (updateData[key] === undefined || updateData[key] === null) {
      delete updateData[key];
    }
  }

  await reportRef.set(updateData, { merge: true });
  if (client) {
    const clientRef = db.collection("clients").doc(client);
    await reportRef.set({ client: clientRef }, { merge: true });
  }
  if (site) {
    const siteRef = db.collection("sites").doc(site);
    await reportRef.set({ site: siteRef }, { merge: true });
  }

  return NextResponse.json(
    { message: "Report updated successfully" },
    { status: 200 }
  );
}
export async function DELETE(request: Request) {

  const data = await request.json();
  const { id } = data;

  const reportRef = db.collection("maintenance_reports").doc(id);

  await reportRef.delete();

  return NextResponse.json(
    { message: "Report deleted successfully" },
    { status: 200 }
  );
}
