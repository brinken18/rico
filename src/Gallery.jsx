import React from 'react'
import axios from 'axios'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { useGlobalContext } from './context'
const url = 'https://api.unsplash.com/search/photos?page=1&client_id=f94KE58da9EpoxUlUmDomoPSskgLjfiAnhw4q8TDAyg&query=office'
const url11 = `https://api.unsplash.com/search/photos?page=1&client_id=${import.meta.env.VITE_API_KEY}`

const Gallery = () => {
  const { searchTerm } = useGlobalContext()

  const url2 = `${url11}&query=${searchTerm}`
  //console.log(url2)

  const response = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      //const result = axios.get(`${url}&query=${searchTerm}`)
      const result = await axios.get(url2)
      return result.data
    }
  })

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    )
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    )
  }

  const results = response.data.results
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    )
  }
  return (
    <section className="image-container">
      {results.map(item => {
        const url = item?.urls?.regular
        return <img src={url} key={item.id} alt={item.alt_description} className="img"></img>
      })}
    </section>
  )
}

export default Gallery
