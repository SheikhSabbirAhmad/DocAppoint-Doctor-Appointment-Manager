import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div>
            <nav className='flex justify-between p-5'>
                <ul className='flex gap-3'>
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>

                     <li>
                        <Link href={"/all-appointments"}>All-Appointments</Link>
                    </li>
                     <li>
                        <Link href={"/my-bookings"}>My Bookings</Link>
                    </li>
                </ul>

                  <ul className='flex gap-3'>
                    <li>
                        <Link href={"/profile"}>Profile</Link>
                    </li>

                     <li>
                        <Link href={"/login"}>Login</Link>
                    </li>
                     <li>
                        <Link href={"/signup"}>Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;