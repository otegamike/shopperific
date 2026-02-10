import React from 'react'

// components
import Header from './header/Header'
import LoadingComponent from './loader/Loading'
import Oops from './errorComponent/Oops'

// types
import type { ErrorObject } from '../hooks/usePage'

interface PageProps {
    children: React.ReactNode;
    title: string;
    pageHeading?: React.ReactNode;
    errorObj: ErrorObject & { retry: () => void };
    isLoading: boolean;
    pageClass?: string;
}

function Page({children, pageHeading, title, errorObj, isLoading, pageClass}: PageProps) {
   


    return (
    <>
        <Header navbar={true} />
        <div>
            <main className='center__content'>
                <section className={`section ${pageClass? pageClass : ""}`} style={{ paddingLeft: "1rem" }} >
                    { pageHeading? pageHeading :  <h3>{title}</h3> }
                    {errorObj.errorState ? 
                        <Oops message={errorObj.errorMsg} retry={errorObj.retry} /> 
                        : 
                        (isLoading ? <LoadingComponent /> : children)
                    }
                </section>
            </main>
        </div>
    </>
  )
}

export default Page