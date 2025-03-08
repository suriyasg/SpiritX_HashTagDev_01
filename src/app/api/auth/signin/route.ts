import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

import { pool } from "../../../../../lib/db";
import bcrypt from 'bcrypt';
import { userinputdata } from "../signup/route";
import jwt from 'jsonwebtoken';


export interface signinresponse{
    message:string;
    data:null;
}
export interface useroutput{
    username:string;
    hashedpassword:string;
}

async function signinUser(username:string,password:string) {


    const connection: PoolConnection = await pool.getConnection();

    try {
        const [rows] = await connection.execute<RowDataPacket[]>(
            'SELECT username,password as hashedpassword FROM users WHERE username = ?',
            [username]
        );
        if (rows.length > 0){
            const user = rows[0] as useroutput;
            const isPasswordValid = await bcrypt.compare(password, user.hashedpassword);
            if (isPasswordValid) {
                const secret = process.env.SECRET_KEY as string;
                const token = jwt.sign({ username: user.username }, secret, { expiresIn: '1h' });
                const response = NextResponse.json({ message: 'User signed in successfully', data: null } as signinresponse, { status: 200 });
                response.cookies.set('token', token, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600 });

                return response;
            } else {
                return NextResponse.json({message: 'User signed in unsuccessfully', data: null} as signinresponse,{status: 402} )
            }
        }else{
            return NextResponse.json({message: 'User signed in unsuccessfully', data: null} as signinresponse,{status: 402} )
        }
    } catch (error) {
        console.error('Database error:', error);
        //return { statuscode: 500, message: 'Internal server error' };
        return NextResponse.json({message: 'internal server error', data: null} as signinresponse,{status: 500} )
    } finally {
        connection.release();
    }

    
}



export async function POST(req:NextRequest){
    try{
        const body = await req.json() as userinputdata;
        const {username,password} = body;
        if(!username || !password){
            return NextResponse.json({message:'email and password are required',data:null} as signinresponse,{status:400});
        }
        return await signinUser(username, password);

    }catch(err){
        console.error('error came when :',err);
        return NextResponse.json({message:"server error",data:null} as signinresponse,{status:500});
    }
    

}
