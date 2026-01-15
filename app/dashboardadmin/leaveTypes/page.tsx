import React from 'react'
import { leaveBalance } from '../../data/data'

function page() {
    return (
        <div> 
            <h1 className=' text-3xl border-b border-slate-700 pb-2  font-semibold text-center'>Leave Types</h1>
            {
                leaveBalance.map((leaveType) => (<div key={leaveType.leaveType} className=' border rounded-2xl p-4 mt-8 border-gray-700 py-4'>
                    <h2 className=' text-2xl font-semibold'>{leaveType.name}</h2>
                    <p className=' text-gray-400 mt-1'>{leaveType.description}</p>
                    <p className=' mt-2'>Balance: <span className=' font-medium'>{leaveType.total} days</span></p>
                </div>))
            }

        </div>
    )
}

export default page