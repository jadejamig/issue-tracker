import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewIssuePage = () => {
  return (
    <div className='max-w-xl'>
        <form className='space-y-3'>
            <Skeleton/>
            <Skeleton height='20rem'/>
        </form>
    </div>
  )
}

export default LoadingNewIssuePage