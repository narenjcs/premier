import { firebase } from "@/lib/firebase-admin";
import { getfilterQuery } from "@/services/api.service";
import { NextRequest, NextResponse } from "next/server";
const db = firebase.firestore();
export async function GET(request: NextRequest) {
  let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
    getfilterQuery(request, db.collection("maintenance_report_parts")); // FIXED typing

  const reportsSnapshot = await query.get();

  const reports = await Promise.all(
    reportsSnapshot.docs.map(async (doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        // site,
        // client,
      };
    })
  );

  return NextResponse.json(reports, { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();
  
    const { parts, maintenance, client, site } = data;
    let clientRef = null;
    let siteRef = null;
    let maintenanceRef = null;
    if (client) {
      clientRef = db.collection("clients").doc(client);
    }
    if (site) {
      siteRef = db.collection("sites").doc(site);
    }
    if (maintenance) {
      maintenanceRef = db.collection("maintenance_reports").doc(maintenance);
    }

  
    for (const part_report of parts) {
      const {  partNo, description, itemSlNo, qty } = part_report;
      const reportRef = db.collection("maintenance_report_parts").doc();
  
      await reportRef.set({
        partNo,
        description,
        itemSlNo,
        qty,
      });
  
      await reportRef.set(
        { client: clientRef, site: siteRef, maintenance: maintenanceRef },
        { merge: true }
      );
    }
  return NextResponse.json(
    { message: "Part created successfully" },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  const data = await request.json();
  const { parts, maintenance, client, site } = data;
  let clientRef = null;
  let siteRef = null;
  let maintenanceRef = null;
  if (client) {
    clientRef = db.collection("clients").doc(client);
  }
  if (site) {
    siteRef = db.collection("sites").doc(site);
  }
  if (maintenance) {
    maintenanceRef = db.collection("maintenance_reports").doc(maintenance);
  }
  const existingPartRef = await db
    .collection("maintenance_report_parts")
    .where("maintenance", "==", maintenanceRef).get();
    existingPartRef.forEach((doc) => {
      doc.ref.delete();
    });

  for (const part_report of parts) {
    const {  partNo, description, itemSlNo, qty } = part_report;
    const reportRef = db.collection("maintenance_report_parts").doc();

    await reportRef.set({
      partNo,
      description,
      itemSlNo,
      qty,
    });

    await reportRef.set(
      { client: clientRef, site: siteRef, maintenance: maintenanceRef },
      { merge: true }
    );
  }
  return NextResponse.json(
    { message: "Part updated successfully" },
    { status: 200 }
  );
}
export async function DELETE(request: Request) {
  const data = await request.json();
  const { id } = data;

  const reportRef = db.collection("maintenance_report_parts").doc(id);

  await reportRef.delete();

  return NextResponse.json(
    { message: "Part deleted successfully" },
    { status: 200 }
  );
}
// export async function GET(request: NextRequest) {
