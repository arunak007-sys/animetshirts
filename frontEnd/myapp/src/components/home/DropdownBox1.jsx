import { Link } from "react-router-dom";

const DropdownBox1 = () => {
    // Content of your dropdown box
    return (
        <div className="dropdown-box"
        
            style={{
                position: 'absolute',
                top: 'calc(80% + 5px)', // Adjust the distance below the link
                left: '50%', // Center horizontally relative to the link
                transform: 'translateX(-50%)', // Center horizontally
                zIndex: 999,
                backgroundColor: 'black',
                // boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                padding: '10px', // Add padding for better appearance 
                height: '230px',
                width: '600px',
                // background:'black',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center', // Center content horizontally
                alignItems: 'center', // Center content vertically
                marginLeft:'160px'
            }}
        >
            <div className="leftDropDwon"
                style={{ height: '100%', width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'left', paddingLeft: '30px', backgroundColor: 'black' }}>
                <Link className='linksNDH'>T-SHIRTS</Link>
                <Link className='linksNDH'>Oversized T-Shirts</Link>
                <Link className='linksNDH'>Plain T-Shirt</Link>
                <Link className='linksNDH'>Tank Top</Link>
                <Link className='linksNDH'>Printed T-Shirt</Link>
            </div>
            <div className="centerDropDown"
                style={{ height: '100%', width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'left', paddingLeft: '10px', backgroundColor: 'black' }}>
                <Link className='linksNDH'>WINTER WEARS</Link>
                <Link className='linksNDH'>Hoodies</Link>
                <Link className='linksNDH'>Jackets</Link>
                <Link className='linksNDH'>Sweatshirt</Link>
                <Link className='linksNDH'>Solids</Link>
            </div>
            <div className="rightDropDown"
                style={{ height: '100%', width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'left', paddingLeft: '10px', backgroundColor: 'black' }}>
                <Link className='linksNDH'>ACCESSORIES</Link>
                <Link className='linksNDH'>Shoes</Link>
                <Link className='linksNDH'>Caps</Link>
                <Link className='linksNDH'>Keychains</Link>

            </div>

        </div>
    );
};
export default DropdownBox1