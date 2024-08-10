
type TProps={
    sign:string
}
export default function SignIcon({sign}:TProps){
    return(<>
        {sign==='+'&&<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 10L1 10C0.447715 10 0 9.55228 0 9C0 8.44772 0.447716 8 1 8L17 8C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10Z" fill="white"/>
<path d="M8 17L8 1C8 0.447715 8.44772 0 9 0C9.55228 0 10 0.447716 10 1L10 17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17Z" fill="white"/>
</svg>}
{sign==='-'&&<svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 3.50011L1.5 3.50011C0.671573 3.50011 0 2.82853 0 2.00011C0 1.17168 0.671573 0.500107 1.5 0.500107L16.5 0.500107C17.3284 0.500107 18 1.17168 18 2.00011C18 2.82853 17.3284 3.50011 16.5 3.50011Z" fill="white"/>
</svg>}

</>
    )
}