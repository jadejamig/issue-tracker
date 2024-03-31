import { Card, Flex, Heading } from '@radix-ui/themes'
import Skeleton from '@/app/components/Skeleton'

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
            <Skeleton count={3}/>
        </Card>
    </div>
  )
}

export default LoadingIssueDetails