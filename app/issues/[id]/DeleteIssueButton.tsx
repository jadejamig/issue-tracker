'use client';

import Spinner from '@/app/components/Spinner';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';



const EditIssueButton = ({ issueId }: { issueId: number}) => {
    const router = useRouter();
    const [isDeleting, setDeleting] = useState(false);
    
    const onDelete = async (issueId: number) => {
        try {
            setDeleting(true);
            await axios.delete(`/api/issues/${issueId}`, {data: {}})
    
            router.push('/issues');
            // Force router to refresh content of current route/page
            router.refresh();
    
        } catch (error) {
            setDeleting(false);
            // setError('An unexpected error occured.');
            console.log(error)
        }
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>Delete Issue</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this issue? This Action cannot be undone.
                </AlertDialog.Description>
                <Flex mt='4' gap='4'>
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='gray'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color='red' onClick={() => onDelete(issueId)} disabled={isDeleting}>
                            Delete Issue
                            { isDeleting && <Spinner/>}
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

    )
}

export default EditIssueButton