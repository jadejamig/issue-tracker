import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div>
        <Heading>{issue.title}</Heading>
        <Flex className='space-x-3' my='2' align='center'>
            <IssueStatusBadge status={issue.status}/>
            <Text className='md'>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card mt='4'>
            {issue.description}
        </Card>
    </div>
  )
}

export default IssueDetails