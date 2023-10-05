import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import getProductQuery from './graphql/queries/getProductQuery.graphql'
import { useQuery } from 'react-apollo'

interface SaludoProps {}

interface queryOptions {
    id: {
        field: string
        value: string
    }
}

interface queryData {
    product: {
        brand: string
    }
}

const Saludo: SaludoProps = ({}) => {
    const { product } = useProduct()
    const [brandName, setBrandName] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    
    const { data, loading, error } = useQuery<queryData, queryOptions>(getProductQuery, {
        variables: {
            "id": {
                "field": "id",
                "value": product?.productId
            }
        }
    })

    useEffect(() => {
        if (loading) {
            setIsLoading(true)
        }
        if (error) {
            console.log(error)
        }
        if (data){
            setIsLoading(false)
            setBrandName(data?.product?.brand)
        }

    })

  return (!isLoading && <div><p>Hola! Esta es la brand del producto: {brandName}</p></div>)
}

export default Saludo