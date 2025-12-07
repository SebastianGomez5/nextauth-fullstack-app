import { NextResponse } from 'next/server';
import User from '@/models/user';
import {connectToDatabase} from '@/libs/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {

  const { name, email, password } = await request.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  console.log(name, email, password);

  try {  
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    console.log('Saved user:', savedUser);
    return NextResponse.json({
      email: savedUser.email,
      name: savedUser.name,
      id: savedUser._id
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}