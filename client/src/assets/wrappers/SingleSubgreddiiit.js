import styled from 'styled-components'

const Wrapper = styled.section`
  .header{
    background-color: var(--white);
    // border-radius: 10px;
    box-shadow: var(--shadow-2);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    color: var(--grey-500);
    div{
        margin: 0.2rem;
    }
    padding-bottom: 1rem;
    margin-bottom: 1.2rem;
  }
  .title{
    font-size: 1.8rem;
    text-transform: capitalize;
    text-align: center;
    color: var(--black);
  }
  .description{
    text-align: center;
  }
  .details{
    display: flex;
    flex-direction: column;
  }
  .row-1{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
    color: var(--black);
  }
  .row-1 div{
    
  }
  .row-2{
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
  }
  @media (max-width: 992px){
    .row-2{
        grid-template-columns: 1fr;
    }
    .header{
      background-color: var(--white);
      // border-radius: 10px;
      box-shadow: var(--shadow-2);
      padding: 0.2rem;
      display: flex;
      flex-direction: column;
      color: var(--grey-500);
      div{
          margin: 0.2rem;
      }
      padding-bottom: 0.2rem;
      margin-bottom: 0.3rem;
    }
  }

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: center;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }

  .main-icon {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 1rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .actions{
    display: flex;
    flex-direction: column;
    align-self: center;
    
    width: auto;
  }

  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
    margin: 0.3rem;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }

  .main-container{
    display: grid;
    grid-template-columns: 3fr 1fr;
    // margin: 0.5rem;
  }

  .posts-container{
    padding: 2rem;
    background: var(--white);
    margin-right: 1rem;
    // border-radius: 15px;
    box-shadow: var(--shadow-2);
  }

  .sub-container{
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
  }

  .btn-container{
    align-self: center;
    button{
        font-size: 1.5rem;
        padding: 1rem;
    }
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  .moderators-container{
    margin-bottom: 1rem;
    padding: 1.2rem;
    background: var(--white);
    // border-radius: 15px;
    box-shadow: var(--shadow-2);
    
    }

    .followers-container{
        margin-bottom: 1rem;
        padding: 1.2rem;
        background: var(--white);
        // border-radius: 15px;
        box-shadow: var(--shadow-2);
    }

    .join-requests-container{
        margin-bottom: 1rem;
        padding: 1.2rem;
        background: var(--white);
        // border-radius: 15px;
        box-shadow: var(--shadow-2);
    }

    .join-request header{
        grid-template-columns: auto 2fr 1fr;
        padding: 0.2rem;
    }
    
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
    }
    .form{
        background-color: var(--white);
        padding: 5rem;
        padding-top: 6rem;
        max-width: 700px;
        position: relative;
    }

    .subtitle{
      font-size: 1.75rem;
      margin-bottom:0.3rem;
    }

`
export default Wrapper