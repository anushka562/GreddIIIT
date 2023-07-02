import styled from 'styled-components'

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    
  }
  .form-row {
    margin-bottom: 1rem;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 0.5rem;
    column-gap: 1rem;
    

  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }

  .user-info-container{
    margin: 3rem auto;
    width: 100%;
  }

  .nav-links{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .nav-link{
    text-align: center;
    font-size: 1.3rem;
    padding: 0.4rem 0.3rem;
    border-bottom: 1px solid var(--primary-500);
    border-radius: var(--borderRadius);
  }
  .nav-link:hover{
    color: var(--grey-400);
  }

  .nav-link-active{
    background-color: var(--primary-500);
    color: var(--white);
  }
  .nav-link-active:hover{
    background-color: var(--primary-600);
    color: white;
  }

  .info-container{
      margin: 3rem;
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  .btn-block{
    margin-top: 1rem;
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`

export default Wrapper
