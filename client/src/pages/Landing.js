import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/Landing'
import {Logo2} from '../components/index'
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
        <Logo2/>
        <div className='container page'>
            <div className='info'>
                <h1><span>Join</span> and <span>Connect</span> with the World</h1>
                <p>Share your thoughts with the world and get to know others. Explore the whole world and the people living in it.  </p>

                <Link to='/register' className='btn btn-hero'>
                    Login/Register
                </Link>
            </div>
            <img src={main} alt="gredIIIT" className='img main-img'></img>
        </div>
    </Wrapper>
  )
}

export default Landing
