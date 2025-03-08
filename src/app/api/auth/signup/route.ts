import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

import { pool } from "../../../../../db";
import bcrypt from 'bcrypt';

export interface userinputdata{
    username:string,
    password:string
}

export interface signupresponse{
    message:string;
    data:null;
}

async function registerUser(username:string,password:string) {
    const saltRounds = 10;

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const connection: PoolConnection = await pool.getConnection();

    try {
        const [rows] = await connection.execute<RowDataPacket[]>(
            'SELECT COUNT(*) as count FROM users WHERE username = ?',
            [username]
        );

        if (rows[0].count > 0) {
            return { statuscode: 401, message: 'Username already exists' };
        }

        await connection.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, encryptedPassword]
        );

        return { statuscode: 200, message: 'User registered successfully' };
    } catch (error) {
        console.error('Database error:', error);
        return { statuscode: 500, message: 'Internal server error' };
    } finally {
        connection.release();
    }

    
}



export async function POST(req:NextRequest){
    try{
        const body = await req.json() as userinputdata;
        const {username,password} = body;
        if(!username || !password){
            return NextResponse.json({message:'email and password are required',data:null} as signupresponse,{status:400});
        }
        const result = await registerUser(username, password);
        return NextResponse.json({message:result.message,data:null} as signupresponse,{status:result.statuscode});

    }catch(err){
        console.error('error came when :',err);
        return NextResponse.json({message:"server error",data:null} as signupresponse,{status:500});
    }
    

}
