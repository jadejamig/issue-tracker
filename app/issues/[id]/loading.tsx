import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Heading, Flex, Card } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetails = () => {
  return (
    <div className='max-w-xl'>
        <Heading>
            <Skeleton/>
        </Heading>
        <Flex gap='3' my='2'>
            <Skeleton width='5rem'/>
            <Skeleton width='5rem'/>
        </Flex>
        <Card mt='4'>
            <Skeleton count={5}/>
        </Card>
    </div>
  )
}

export default LoadingIssueDetails