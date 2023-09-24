import React, { useState } from 'react'

//importing data
import { currency } from '../../data';

const Trade = () => {

    const [itemName, setItemName] = useState('flash');
    return (
        <section className='section lg:pt-[320px] bg-gradient-to-b from-[#f8f9fb] to-[#e2e3e7]  text-gray-600 lg:-mt-[350px]'>
            <div className='container mx-auto '>
                <h2 className='section-title text-center mb-16'
                    data-aos='fade-up'
                    data-aos-offset='400'>
                    The Three Problems We're Solving
                </h2>
                {/* items */}
                <div className='flex flex-col gap-[45px] lg:flex-row'
                    data-aos='fade-up'
                    data-aos-offset='450'
                >
                    {currency.map(
                        (item, index) => {
                            //destructure item
                            const { image, name, abbr, description } = item;
                            return (
                                // item
                                <div
                                    onClick={() => setItemName(name)}
                                    className={`${name === itemName ? 'bg-blue text-white' : 'bg-white'
                                        } w-full rounded-2xl py-12 px-6 shadow-primary cursor-pointer transition duration-300`}
                                    key={index}
                                >
                                    <div className='flex flex-col justify-center items-center'>
                                        {/* item image */}
                                        <img className='mb-12' src={image} alt='' />
                                        {/* item name */}
                                        <div className='mb-4 flex items-center gap-x-2'>
                                            <div className='text-[32px] font-bold'>{name}</div>
                                            <div className='text-lg text-gray-400 font-medium'>
                                                {abbr}
                                            </div>
                                        </div>
                                        {/* item description */}
                                        <p className='mb-6 text-center'>{description}</p>

                                    </div>
                                </div>
                            );
                        }
                    )}

                </div>
            </div>
        </section>
    )
}

export default Trade
