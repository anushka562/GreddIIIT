import styled from 'styled-components'

const Wrapper = styled.main`
    width: 100%;
    background-color: var(--grey-50);
    // .form{
    //     background-color: var(--white);
    //     padding: 5rem;
    //     padding-top: 6rem;
    //     max-width: 700px;
    //     position: relative;
    // }
    .close-btn{
        position: absolute;
        top: 3rem;
        right: 4rem;
        background: transparent;
        border-color: transparent;
        font-size: 2rem;
        color: var(--red-dark);
        cursor: pointer;
    }
    h3{
      padding: 1rem; 
      padding-left: 3rem;

    }
    .heading{
        text-align: center;
    }
    @media (max-width: 992px){
        .close-btn{
            top: 1.5rem;
            right: 1.5rem;
        }
        .form{
            padding: 2rem;
            padding-top: 4rem;
        }
    }
    .btn{
        // margin-top: 1rem;
        padding: 0.5rem;
    }

    .nav-container{
        display: grid;
        grid-template-columns: 1fr auto;
        background-color: var(--white);
        padding: 2rem;
        // border-radius: 10px;
        margin-bottom: 1rem;
        // position: sticky;
        // top: 7.5rem;
        // color: var(--white);
        // background: var(--primary-500);
    }
    .hide{
        display: hidden;
    }
    h4{
        margin: auto 0;
    }
    .btn-red{
        // margin: auto 0;
        background-color: var(--primary-400);
        font-size: 1.3rem;
    }
    .subgreddiiits-container{
        background-color: var(--white);
        // border-radius: 10px;
        padding: 1rem;
        margin: 1rem 0;
    }

    .main-icon {
        width: 100%;
        height: 80%;
        display: grid;
        place-items: center;
        background: var(--primary-500);
        border-radius: var(--borderRadius);
        font-size: 3rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--white);
        margin: auto;
        margin-right: 1rem;
    }

    .subgreddiiit{
        border: 1px solid var(--black);
        border-radius: 10px;
        padding: 1rem;
        display: grid;
        grid-template-columns: 1fr 10fr 1fr;
        column-gap: 0.5rem;
        margin-bottom: 1rem;
    }
    .name{
        display: block;
        font-size: 1.3rem;
        font-weight: 300;
    }
    .description{
        color: var(--grey-500);
    }
    .info{
        padding: 1rem;
    }
    .detail{
        display: grid;
        grid-template-columns: 1fr 12fr;
        height: 2rem;
    }
    .btn-container{
        display: flex;
        flex-direction: column;
        padding: 1.2rem ;
        margin: auto auto;
    }
    .btn-open{
        font-size: 1.2rem;
        border-radius: 5px;
        width: 120%;
    }
    .btn-delete{
        font-size: 1.2rem;
        border-radius: 5px;
        background-color: #E74646;
        width: 120%;
        margin-top: 1rem;
    }
    .alert-container{
        padding: 2px;
    }


    .alert{
        margin: 0px 0px;
        border-radius: 10px;
    }

    .btn-open,
    .btn-delete {
        letter-spacing: var(--letterSpacing);
        cursor: pointer;
        // height: 30px;
    }
    .btn-open {
        color: var(--green-dark);
        background: var(--green-light);
    }
    .btn-delete {
        color: var(--red-dark);
        background: var(--red-light);
    }

    @media (max-width: 992px){
        .detail{
            grid-template-columns: 1fr;
        }
    }
`

export default Wrapper