import React from 'react'
import { useNavigate, type To } from 'react-router-dom'

// components
import Header from './header/Header'
import LoadingComponent from './loader/Loading'
import Oops from './errorComponent/Oops'

// svg
import BackButton from '../assets/svg/backButton'

// types
import type { ErrorObject } from '../hooks/usePage'

interface PageProps {
    children: React.ReactNode;
    pageClass?: string;
    style?: React.CSSProperties;
}

function Page({children, pageClass, style}: PageProps) {
   


    return (
    <>
        <Header navbar={true} />
        <div>
            <main className='center__content'>
                <section className={`section ${pageClass? pageClass : ""}`} style={{ paddingLeft: "1rem" , ...style}} >
                    {children}
                </section>
            </main>
        </div>
    </>
  )
}

export default Page

interface PageBodyProps {
    children?: React.ReactNode;
    errorObj: ErrorObject & { retry?: () => void };
    isLoading: boolean;
}

export const PageBody = ({children, errorObj, isLoading}: PageBodyProps) => {
   
   const defaultRetry = () => {
     window.location.reload();
   }

   if (errorObj.errorState) {console.log("errorObj", errorObj.errorMsg); return <Oops message={errorObj.errorMsg || "Something went wrong"} retry={errorObj.retry || defaultRetry} /> }
   if (isLoading) return <LoadingComponent height='80vh' />
   return children
}

export type navLinksProps = {
    label: string;
    path: To;
}

export const PageNavigation = ({navLinks, currentPage}: {navLinks: {label: string, path: To}[], currentPage: string}) => {
   const navigate = useNavigate();
    const navigateTo = (page: To) => {
        navigate(page);
    }

    return (
        <>
            <div className="product__header">
                <span className="header__link" onClick={() => navigateTo("/products")}>
                    <BackButton size={15} fill="var(--text-primary)" />
                    Products
                </span> 
                {navLinks.map((link, index) => {
                    if (!link.label) return;
                    return (
                    <span key={index}>
                    <span className="slash" > | </span>
                    <span className="header__link" onClick={() => navigateTo(link.path)}>{link.label || "loading.."}</span>
                    </span>
                )})}
                <span className="slash" > | </span> {currentPage}
            </div>
        </>
    )
}
    