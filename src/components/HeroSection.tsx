"use client";
import ProductCard from '@/utils/ProductCard';
import SuccessPopUp from '@/utils/SuccessPopUp';
import React from 'react'
import { Container, Row } from 'react-bootstrap';
import Coke from '../../public/coco_cola.jpg'
import TShirt from '../../public/t-shirt.jpg'
import Shampoo from '../../public/shampoo.webp'
import Soap from '../../public/soap.jpg'
import { web3 } from '@/utils';
import { Product_ABI, Product_Address } from '@/utils/Product'
import { coinABI, coinAddress } from '@/utils/Coin';
export default function HeroSection() {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function BuyProduct(productPrice: number, Quantity: number, id: string) {
        const walletAddress = sessionStorage.getItem("address")
        if (!walletAddress) return
        const ProductInstance = new web3.eth.Contract(Product_ABI, Product_Address)
        const coinInstance = new web3.eth.Contract(coinABI, coinAddress)
        const value = web3.utils.toWei(productPrice, "ether")
        //calling approve method
        //@ts-ignore
        await coinInstance.methods.approve(Product_Address, value)
            //@ts-ignore
            .send({ from: walletAddress })
            .then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })

        // @ts-ignore
        await ProductInstance.methods.purchaseProduct(id, Quantity, value)
            // @ts-ignore
            .send({ from: walletAddress })
            .then(data => {
                console.log(data);
                handleShow()
            }).catch(error => {
                console.log(error);
            })

    }

    return (
        <>
            <Container className='my-4'>
                <Row>
                    <ProductCard id="1" price={5} image={TShirt} BuyProduct={BuyProduct} productName="T-shirt For Men" />
                    <ProductCard id="2" price={2} image={Coke} BuyProduct={BuyProduct} productName="Coco Cola Pack of 8" />
                    <ProductCard id="3" price={3} image={Shampoo} BuyProduct={BuyProduct} productName="L'OREAL Shampoo for men" />
                    <ProductCard id="4" price={1} image={Soap} BuyProduct={BuyProduct} productName="Dettol Soap" />
                </Row>
            </Container>
            <SuccessPopUp show={show} handleClose={handleClose} />
        </>
    )
}
