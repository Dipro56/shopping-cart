import { useUser } from '@/hooks/useUsers';
import notifications from '@/lib/notification';
import { Button, Popover } from '@radix-ui/themes'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { startTransition, useState } from 'react'
import { removeCookie } from 'typescript-cookie';

function UserDropdown({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [open, setopen] = useState(false)
    let router = useRouter()
    let { revalidate, user } = useUser()


    const handleLogout = () => {
        removeCookie("amh"); // Remove the token cookie
        removeCookie("ramh"); // Remove the token cookie
        notifications.success("You have been logged out")
        setopen(false)
        revalidate();

        startTransition(() => {
            router.refresh();
        });; // Redirect to the login page
    };

    return (
        <Popover.Root open={open} onOpenChange={() => {
            setopen(!open)
        }}>
            <Popover.Trigger>
                {children}
            </Popover.Trigger>
            <Popover.Content width="360px">
                <>
                    <div className="flex items-center mb-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                            {
                                user?.image === null ? (
                                    <div className="w-full h-full bg-gray-200"></div>
                                ) : <Image
                                    src={user?.image || "vercel.svg"}
                                    alt={`${user?.firstName} ${user?.lastName}`}
                                    fill

                                />
                            }

                        </div>
                        <div className="ml-4">
                            <h2 className="text-2xl font-semibold">{user?.firstName} {user?.lastName}</h2>
                            <p className="text-gray-400">@{user?.username}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Phone:</strong> {user?.phone}</p>
                        <p><strong>Address:</strong> {user?.address.address}, {user?.address.city}, {user?.address.state} {user?.address.postalCode}</p>
                    </div>




                    <Button onClick={handleLogout} variant="classic">Logout</Button>
                </>
            </Popover.Content>
        </Popover.Root>
    )
}

export default UserDropdown