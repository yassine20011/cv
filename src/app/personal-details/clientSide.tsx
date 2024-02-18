"use client"
import { useFormStatus} from 'react-dom'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'


function Submit() {

    const { pending } = useFormStatus()

    useEffect(() => {
        if(pending) {
            toast.success("Resume updated successfully")
        }
    }, [pending])
    


    return (<>
        <Button type="submit" className="w-full mt-4" variant="outline"
            disabled={pending} 
        > Update </Button>

    </>);
}

export default Submit;
