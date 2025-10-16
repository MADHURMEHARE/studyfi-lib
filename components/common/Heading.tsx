import React from 'react';
import { LucideIcon } from 'lucide-react'; 

interface Headingprops{

    primary:string;
    gradientText:string;
    subtitle?:string;
}


function Heading ({primary,gradientText,subtitle}:Headingprops)
{

    return (

<div className='text-center mb-16'>

    <h2 className='text'>
        </h2>


    </div>
    )
}