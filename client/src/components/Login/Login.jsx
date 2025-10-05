import React from 'react'
import { useState } from 'react'
import '../../App.css'

export default function Login({onSubmit}) {
    const [Username, SetName] = useState("") 
    
    return (
        <div className='login-container'>
            <h2 className='pop' dir='rtl'>مرحباً بك! 👋</h2>
            <h4>ماذا تريد أن يناديك الآخرون؟</h4> 
            <form onSubmit={(e)=>{
                e.preventDefault() 
                onSubmit(Username)
            }}>
                <input 
                    type="text" 
                    value={Username} 
                    onChange={(e)=>SetName(e.target.value)}
                    placeholder="أدخل اسمك هنا"
                    required
                />
                <input type="submit" value="ابدأ الآن"/>
            </form>   
        </div>
    )
}