"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

function Submit() {

    const { pending } = useFormStatus()


    return (<>
        <Button type="submit" className="w-full mt-4" variant="outline"
            disabled={pending}
        > Update </Button>

    </>);
}

export default Submit;
