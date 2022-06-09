import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'
import {InputGroup, FormControl} from 'react-bootstrap'
import { AiOutlineSearch } from 'react-icons/ai';

const Home = ({ marketplace, nft, account }) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [filterdata, setFilterdata] = useState(items)
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
    setFilterdata(items)
  }

  const buyMarketItem = async (item) => {
    account.toLowerCase() === item.seller.toLowerCase() ? alert('You cannot buy your own NFT!') : 
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  function changeHandler(e){
      const search = e.target.value
      handleFilteredData(items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) ))  
  }

  function handleFilteredData(data){
    setFilterdata(data)
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div style={{display: 'flex', background: 'white', padding: '40px', borderRadius: '20px', fontSize: '20px'}}>
          <Spinner animation="border" style={{ display: 'flex' }} />
          <p className='mx-3 my-0'>Loading</p>
        </div>
    </div>
  )
  return (
    <div className="flex justify-center">
      
      {items.length > 0 ?
        <div className="px-5 container">
          <div className='py-5'>
          <InputGroup size="md" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm" style={{background: '#873cc4', color: 'white'}}><AiOutlineSearch /></InputGroup.Text>
            <FormControl aria-label="Small" onChange={changeHandler}  aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          </div>
          <Row xs={1} md={2} lg={4} className="g-4 ">
            
            {filterdata.map((item, idx) => (
              
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title style={{color: "#873cc4"}}>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buyMarketItem(item)} style={{background: '#fc68b6'}} size="sm">
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <div style={{display: 'flex', background: 'white', padding: '40px', borderRadius: '20px', fontSize: '20px'}}>
                <p className='mx-3 my-0'>No assets to be listed!</p>
              </div>
          </div>
        )}
    </div>
  );
}
export default Home