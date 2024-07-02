import { Comments } from "@/src/components/landing/comments/Comments";
import { Description } from "@/src/components/landing/description/Description";
import { Features } from "@/src/components/landing/features/Features";
import { Hero } from "@/src/components/landing/hero/Hero";



export default function Home() {
    return (
        <>
         
            <Hero></Hero>
            <Description></Description>
            <Features></Features>
            <Comments></Comments>
         
        </>
    );
}