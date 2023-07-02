import styled from 'styled-components'

const Wrapper = styled.div`
    .post-container{
        border-right: 1px solid var(--black);
        border-bottom: 1px solid var(--black);
        border-radius: 10px;
        padding: 1.2rem;
        margin: 1rem;
        margin-bottom: 2rem;
    }
    .post-header{
        display: grid;
        grid-template-columns: 1fr auto;
        
    }
    .btn-no-style{
        color: var(--red-dark);
        background: transparent;
        padding: 0 0.2rem;
        margin-right: 1rem;
        border: 1px solid var(--red-dark);
        border-radius: 6px;
        cursor: pointer; 
    }
    .title{
        font-size: 1.5rem;
    }
    .description{
        text-align: left;
        font-size: 1.1rem;
    }
    .posted-by{
        text-align: end;
        margin-right: 1.5rem;
        font-size: 0.9rem;
        color: var(--grey-600);
        font-style: italic;

    }
    .btn-follow{
        margin-left: 0.75rem;
        font-size: 0.8rem;
        padding: 0.3rem 0.5rem;
        padding-bottom: 0.15rem;
        border-radius: 5px;
    }
    .votes{
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 0.3rem;
        padding: 0.3rem;
    }
    .btn-vote{
        color: var(--grey-600);
        background: var(--white);
        border: 0.1px solid var(--black);
        font-size: 1rem;
        padding: 0.4rem;
        border-radius: 15px;  
        cursor: pointer; 
    }

    .other{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 0.2rem;
        padding: 0.3rem;
    }

    .btn-other{
        color: var(--grey-600);
        background: var(--white);
        border: 0.1px solid var(--black);
        font-size: 1rem;
        padding: 0.4rem;
        border-radius: 3px;
        cursor: pointer; 

    }
    .comments{
        border-top-right-radius: 8px;
    }
    .save{
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
    }
    .report{
        border-top-left-radius: 8px;
    }
    .upvoted{
        color: var(--green-dark);
        background: var(--green-light);
        border: 0.1px solid var(--green-dark);
    }

    .downvoted{
        color: var(--red-dark);
        background: var(--red-light);
        border: 0.1px solid var(--red-dark);
    }
    .saved{
        color: var(--grey-500);
        background: var(--grey-100);
        border: 0.1px solid var(--black)
    }

    .btn-report{
        font-size: 1.3rem;
    }

    .btn-report-container{
        margin-top: 4.4rem;
    }

    .report-container{
        display: grid;
        grid-template-columns: 1fr auto;
        column-gap: 1rem;
        margin-top: 1rem;
    }

    .report-header{
        font-size: 1.5rem;
        margin-bottom: 0.2rem;
    }
    .concern-container{
        display: grid;
        grid-template-columns: auto 1fr;
    }

    .concern{
        margin: 0.5rem;
        margin-left: 0;
        margin-bottom: 0.3rem;
        font-size: 1.2rem;
        font-weight: 500;
    }
    // .starting{
    //     margin: 30px;
    // }
    .concern-content{
        margin-top: 0.4rem;
        margin-left: 0.3rem;
    }
`

export default Wrapper