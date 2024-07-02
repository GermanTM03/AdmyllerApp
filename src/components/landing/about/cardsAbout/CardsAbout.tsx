import Image from "next/image";
import { CardAboutProps } from "./ICardsAbout";

export function CardAbout({ imageProfile, name, role, description }: CardAboutProps) {
    return (

        <div className="relative w-full max-w-md bg-gradient-to-r from-gray-900 to-black rounded-lg overflow-hidden shadow-md mb-4 md:w-72 mx-auto my-4 hover:bg-gradient-to-r hover:from-blue-700 hover:to-gray-900 transition-colors duration-220">
        <div className="flex justify-center p-4">
            <Image src={imageProfile} width={200} height={200} alt={name} />
        </div>
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-white flex justify-center">{name}</h3>
            <p className="text-sm font-bold mb-4 text-gray-600 flex justify-center">{role}</p>
            <p className="text-sm text-white  flex justify-center">{description}</p>
        </div>
     </div>
    
    );
}
