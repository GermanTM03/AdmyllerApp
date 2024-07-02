import Image from "next/image";
import { CardProps } from "./ICards";
import { FaCheck } from 'react-icons/fa';
import Link from "next/link";

export function Card({ title, price, image, benefits }: CardProps) {
    return (
        <div className=" relative w-full max-w-md lg:w-[300px] h-auto lg:h-[260px] flex flex-col justify-between m-2">
           
            <div className="relative w-full h-auto bg-black rounded-xl rounded-t-none border-t-4 border border-[#050219]">
                 <div className=" relative w-full h-[130px] sm:h-[200px]  rounded-xl bg-white flex justify-center items-center">
                 <Image src={image} 
                       alt={title} 
                       layout="fill"
                       objectFit="cover"
                       className="rounded-xl" 
                   />
            </div>
                <span className="absolute left-16 w-1/2 transform -translate-x-1/2 top-40 w-[100px] sm:w-[140px] h-[40px] bg-black border-t-[5px] border-x-[5px] border border-[#050219] rounded-tr-[20px] flex items-center justify-center text-white font-bold text-xs sm:text-sm tracking-wide">
                    {title}
                </span>
                <div className="text-white p-2">
                    <div className="font-bold text-lg sm:text-xl mb-1 degradedBlue bg-blueLight">{price}</div>
                    <h2 className="text-sm sm:text-base mb-1">Beneficios:</h2>
                    <ul className="list-none">
                        {benefits.map((benefits, index) => (
                            <li key={index} className="flex items-center mb-1">
                                <FaCheck className="text-green-500 mr-1" />
                                <span className="text-xs sm:text-sm">{benefits}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="my-2 flex justify-center">
                        <Link href="#clients" className="px-4 py-1 rounded-md bg-blueRadial text-white font-bold text-xs sm:text-sm tracking-wide">Comprar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
