import CartItems from '@/components/CartItems'
import React from 'react'

function Page() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center">Checkout</h1>
                <CartItems />
            </div>
        </div>
    )
}

export default Page