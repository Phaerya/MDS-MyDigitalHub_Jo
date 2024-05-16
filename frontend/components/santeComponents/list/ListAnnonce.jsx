'use client'
import { Input, Card, CardBody, CardHeader, CardFooter, Divider, Chip } from '@nextui-org/react'
import { MdDirectionsRun } from 'react-icons/md'
import React, { useState, useEffect } from 'react'
import { LuSearch } from 'react-icons/lu'
import client from '@/graphql/apolloClient'
import { GET_ANNONCES } from '@/graphql/queries/sante'
import ModalAnnonce from '@/components/santeComponents/ModalAnnonce'

export const getAnnonces = async () => {
  try {
    const response = await client.query({
      query: GET_ANNONCES
    })
    return response?.data?.annonces?.data
  } catch (error) {
    console.error('Error fetching data: ', error)
  }
}

const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

export const ListAnnonce = ({ InitAnnonces }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [annonces, setAnnonces] = useState(InitAnnonces)
  console.log(annonces)
  // useEffect(() => {
  //   const fetchAnnonces = async () => {
  //     console.log('la')
  //     const data = await getAnnonces()
  //     setAnnonces(data)
  //   }
  //   fetchAnnonces()
  // }, [])

  const handleAddAnnonce = (newAnnonce) => {
    console.log('Début' + newAnnonce[4])
    setAnnonces([newAnnonce, ...annonces])
    console.log('Fin' + annonces)
  }

  const handleSearchChange = e => {
    setSearchTerm(e.target.value)
  }

  const filteredCards = annonces.filter(annonce =>
    annonce.attributes.Title && annonce.attributes.Title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleClear = () => {
    setSearchTerm('')
  }
  return (
    <section className='container mx-auto p-6 w-full mt-10'>
      <h1 className='text-4xl font-bold mb-8 capitalize'>Liste des évènements</h1>
      <ModalAnnonce isOpen={isModalOpen} onOpenChange={setModalOpen} onAdd={handleAddAnnonce} />
      <Input
        value={searchTerm}
        onChange={handleSearchChange}
        onClear={handleClear}
        clearable
        radius='lg'
        placeholder='Rechercher une annonce...'
        startContent={<LuSearch />}
      />

      <div className='flex gap-6 flex-wrap justify-center mt-8'>
        {filteredCards.map((annonce) => (
          <Card key={annonce.id} className='max-w-[400px] border border-gray-700 rounded-xl hover:-translate-y-3 cursor-pointer'>
            <CardHeader className='flex gap-3'>
              <MdDirectionsRun className='text-4xl pointer-events-none flex-shrink-0' />
              <div className='flex flex-col'>
                <p className='text-lg text-bold text-primary'>{annonce.attributes.Title}</p>
                <div className='flex gap-2 pt-3'>
                  <Chip color='primary'>{annonce.attributes.Sport}</Chip>
                  <Chip color='primary'>{annonce.attributes.Niveau}</Chip>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>{annonce.attributes.Description}</p>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className='flex flex-col'>
                <p className='text-bold text-primary'>{formatDate(annonce.attributes.Date)}</p>
                <p className='text-bold text-primary'>{annonce.attributes.Contact}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>

  )
}