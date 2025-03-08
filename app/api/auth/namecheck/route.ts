import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

export interface namecheckresponse {
  success: boolean;
}

export interface namecheckrequest {
  username: string;
}

async function checkUsername(username: string) {
  const connection: PoolConnection = await pool.getConnection();

  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM users WHERE username = ?",
      [username]
    );

    if (rows[0].count > 0) {
      return NextResponse.json({ success: true } as namecheckresponse, { status: 200 });
    }

    return NextResponse.json({ success: false } as namecheckresponse, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false } as namecheckresponse, { status: 500 });
  } finally {
    connection.release();
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as namecheckrequest;
    const { username } = body;
    const result = await checkUsername(username);
    return result;
  } catch (err) {
    console.error("error came when :", err);
    return NextResponse.json({ success: false } as namecheckresponse, { status: 500 });
  }
}
