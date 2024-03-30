import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import DeleteIssueButton from './DeleteIssueButton';
import IssueDetails from './IssueDetails';

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {


    const issue = await prisma.issue.findUnique({where: { id: parseInt(params.id)}});

    if (!issue)
        notFound();

    // RadixUI md is lg in Tailwind
    return (
        <Grid columns={{ initial: '1', sm: '5'}} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue}/>
            </Box>
            <Box className='col-span-1'>
                <Flex direction='column' gap='3'>
                        <EditIssueButton issueId={issue.id}/>
                        <DeleteIssueButton/>
                </Flex>
            </Box>
        </Grid>
    )
    
}

export default IssueDetailPage