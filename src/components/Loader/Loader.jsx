import { RotatingLines } from  'react-loader-spinner'
import { LoaderWrap } from './Loader.styled'

export const Loader = () => {
    return <LoaderWrap>
        <RotatingLines
        strokeColor="black"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
    />
    </LoaderWrap>
}