import React from 'react'

// components
import Header from './header/Header'
import LoadingComponent from './loader/Loading'
import Oops from './errorComponent/Oops'

// types
import type { ErrorObject } from '../hooks/usePage'

interface PageProps {
    children: React.ReactNode;
    pageClass?: string;
}

function Page({children, pageClass}: PageProps) {
   


    return (
    <>
        <Header navbar={true} />
        <div>
            <main className='center__content'>
                <section className={`section ${pageClass? pageClass : ""}`} style={{ paddingLeft: "1rem" }} >
                    {children}
                </section>
            </main>
        </div>
    </>
  )
}

export default Page

interface PageBodyProps {
    children: React.ReactNode;
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