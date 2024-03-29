'use client'

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillInfoCircle } from 'react-icons/ai';
import { z } from 'zod';

// interface IssueFormData {
//     title: string;
//     description: string;
// }


// Get schema from zod issue validation schema
// instead of declaring another interface
type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue}) => {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema) 
    });

    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            
            if (issue) {
                console.log('updating issue...')
                await axios.patch(`/api/issues/${issue.id}`, data)
            } 
            else {
                console.log('creating new issue...')
                await axios.post('/api/issues', data)
            }

            router.push('/issues');
            // Force router to refresh content of current route/page
            router.refresh();

        } catch (error) {
            setSubmitting(false);
            setError('An unexpected error occured.');
        }
    });

    return (
        <div className='max-w-xl'>
            {
                error &&
                <Callout.Root color="red" className='mb-5'>
                <Callout.Icon>
                    <AiFillInfoCircle/>
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
              </Callout.Root>
            }

            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')}></TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <TextArea defaultValue={issue?.description} placeholder='Description' {...register('description')}/>
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    { issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                    { isSubmitting && <Spinner/>}
                </Button>

            </form>
        </div>
    )
}

export default IssueForm