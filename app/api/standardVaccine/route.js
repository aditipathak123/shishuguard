// app/api/vaccines/route.js
import { NextResponse } from 'next/server';
import standardVaccines from '@/lib/standardVaccines'; // adjust path as needed
import { authenticateToken } from '@/lib/auth';
import User from '@/app/models/User.model';

// ======================= POST =======================
export async function GET(req) {
  try {
    const user = await authenticateToken(req);
    const userId = user.user.id;

    const baby = await User.findById(userId);
    // console.log(baby);
    if(!baby) return NextResponse.json({ error: 'No such baby exists!' }, { status: 404 });
    
    const birthDate = baby.BabyDet[0].dateOfBirth;
    // console.log(birthDate);

    if (!birthDate) return NextResponse.json({ error: 'Birthdate required' }, { status: 400 });

     const birth = new Date(birthDate);
    const now = new Date();
    const ageInMonths = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());

    const upcomingVaccines = standardVaccines.filter(v => v.ageMonths >= ageInMonths);

    return NextResponse.json({
      ageInMonths,
      upcomingVaccines,
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
