import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

const Order = () => {

  const {mode, loading, order, detLoading} = useContext(myContext)
  return (
    <div>Order</div>
  )
}

export default Order