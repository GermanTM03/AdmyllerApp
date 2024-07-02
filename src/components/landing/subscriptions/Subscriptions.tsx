"use client";
import { Card } from "./cards/Cards";
import { CardData } from "./cards/CardsData";

export function Subscriptions() {
    return (
        <div className="min-h-screen flex items-center justify-center  mt-0 sm:-mt-48 mb-52 container mx-auto sm:mb-40" id="Subscriptions">
            <div className="flex flex-wrap justify-center">
                {CardData.map(card => (
                    <Card
                        key={card.id}
                        title={card.title}
                        price={card.price}
                        image={card.image}
                        benefits={card.benefits}
                    />
                ))}
            </div>
        </div>
    );
}