import Skeleton from '@/app/components/Skeleton'

const IssueFormSkeleton = () => {
  return (
    <div className='max-w-xl'>
        <form className='space-y-3'>
            <Skeleton height='2rem'/>
            <Skeleton height='20rem'/>
        </form>
    </div>
  )
}

export default IssueFormSkeleton